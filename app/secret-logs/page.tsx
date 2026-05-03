'use client';

import { useState, useEffect, useCallback } from 'react';
import { LogEntry } from '@/types';

type AuthState = 'idle' | 'checking' | 'denied' | 'granted';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AdminPage() {
  const [authState, setAuthState] = useState<AuthState>('idle');
  const [password, setPassword] = useState('');
  const [sessionPw, setSessionPw] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState('');

  const fetchLogs = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/logs', {
        headers: { 'x-admin-password': pw },
      });
      if (!res.ok) { setAuthState('denied'); return; }
      const data = await res.json();
      setLogs(data.logs ?? []);
    } catch {
      setError('Failed to load logs.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuth = async () => {
    if (!password.trim()) return;
    setAuthState('checking');
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setSessionPw(password);
        setAuthState('granted');
        fetchLogs(password);
      } else {
        setAuthState('denied');
        setError('Incorrect password. Try again.');
        setPassword('');
      }
    } catch {
      setAuthState('idle');
      setError('Network error. Please retry.');
    }
  };

  const handleClear = async () => {
    if (!confirm('Delete all logs? This cannot be undone.')) return;
    setClearing(true);
    try {
      await fetch('/api/admin/logs', {
        method: 'DELETE',
        headers: { 'x-admin-password': sessionPw },
      });
      setLogs([]);
    } finally {
      setClearing(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const avgFriendship = logs.length
    ? Math.round(logs.reduce((s, l) => s + l.friendshipScore, 0) / logs.length)
    : 0;

  // ── Login screen ────────────────────────────────────────────────────────────
  if (authState !== 'granted') {
    return (
      <main className="min-h-dvh flex items-center justify-center p-5">
        <div className="w-full max-w-xs">
          <div className="card p-8 animate-scale-in">
            <div className="text-center mb-7">
              <div className="text-3xl mb-2">🔐</div>
              <h1 className="font-display text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Admin Access
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Enter the admin password to continue
              </p>
            </div>

            <div className="mb-4">
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                autoFocus
              />
              {error && (
                <p className="text-xs mt-2 animate-fade-in" style={{ color: 'var(--accent)' }}>{error}</p>
              )}
            </div>

            <button
              className="btn-primary"
              onClick={handleAuth}
              disabled={authState === 'checking' || !password.trim()}
            >
              {authState === 'checking' ? '⭮ Checking…' : 'Enter Dashboard →'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Dashboard ───────────────────────────────────────────────────────────────
  return (
    <main className="min-h-dvh p-4 pb-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-2 animate-fade-up">
          <div>
            <div className="badge mb-1">Admin</div>
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Quiz Logs
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              className="btn-secondary text-xs px-3 py-2"
              onClick={() => fetchLogs(sessionPw)}
              disabled={loading}
            >
              {loading ? '⭮' : '↻ Refresh'}
            </button>
            <button
              className="btn-secondary text-xs px-3 py-2"
              onClick={handleClear}
              disabled={clearing || logs.length === 0}
              style={{ color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}
            >
              {clearing ? '⭮' : '🗑 Clear'}
            </button>
          </div>
        </div>

        {/* Stats row */}
        {logs.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-5 animate-fade-up delay-100">
            {[
              { label: 'Total Attempts', value: logs.length },
              { label: 'Avg Friendship', value: `${avgFriendship}%` },
              { label: 'Latest', value: new Date(logs[0]?.timestamp).toLocaleDateString() },
            ].map(({ label, value }) => (
              <div key={label} className="card p-3 text-center">
                <div className="font-display text-lg font-bold" style={{ color: 'var(--accent)' }}>{value}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Logs list */}
        {loading && (
          <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
            <span className="animate-spin-slow inline-block text-2xl">⭮</span>
            <p className="text-sm mt-2">Loading logs…</p>
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className="card p-10 text-center animate-fade-in">
            <div className="text-4xl mb-3">📭</div>
            <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No logs yet</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Quiz results will appear here once someone completes the quiz.</p>
          </div>
        )}

        <div className="space-y-3">
          {logs.map((log, idx) => {
            const open = expanded.has(log.id);
            const correct = log.answers.filter((a, i) => a === log.questions[i]?.correctAnswer).length;
            return (
              <div key={log.id} className="card overflow-hidden animate-fade-up" style={{ animationDelay: `${idx * 0.04}s` }}>
                {/* Row header */}
                <button
                  className="w-full p-4 text-left flex items-center justify-between gap-3"
                  onClick={() => toggleExpand(log.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: 'color-mix(in srgb, var(--accent) 18%, transparent)', color: 'var(--accent)' }}>
                      {log.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{log.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-xs font-bold" style={{ color: 'var(--accent)' }}>{log.friendshipScore}% 💖</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{correct}/{log.questions.length} correct</p>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
                  </div>
                </button>

                {/* Expanded breakdown */}
                {open && (
                  <div className="px-4 pb-4 space-y-3 animate-fade-in border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="pt-3 flex flex-wrap gap-2">
                      <span className="badge">Quiz: {log.quizScore}%</span>
                      <span className="badge">Friendship: {log.friendshipScore}%</span>
                      <span className="badge">{log.friendshipTitle}</span>
                    </div>

                    {log.questions.map((q, i) => {
                      const userAns = log.answers[i];
                      const isCorrect = userAns === q.correctAnswer;
                      return (
                        <div key={q.id} className="rounded-xl p-3 text-sm"
                          style={{ background: isCorrect ? 'rgba(74,222,128,0.07)' : 'rgba(255,80,80,0.07)', border: `1px solid ${isCorrect ? 'rgba(74,222,128,0.18)' : 'rgba(255,80,80,0.18)'}` }}>
                          <div className="flex gap-2 mb-2">
                            <span>{isCorrect ? '✅' : '❌'}</span>
                            <p className="font-medium flex-1" style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>{q.question}</p>
                          </div>
                          <div className="ml-6 space-y-1">
                            {q.options.map((opt, oi) => {
                              const isUser = oi === userAns;
                              const isRight = oi === q.correctAnswer;
                              let dotColor = 'var(--border)';
                              if (isRight) dotColor = 'rgba(74,222,128,0.7)';
                              else if (isUser && !isRight) dotColor = 'rgba(255,80,80,0.7)';
                              return (
                                <div key={oi} className="flex items-center gap-2">
                                  <span className="text-xs font-bold w-4" style={{ color: 'var(--text-muted)' }}>{LETTERS[oi]}</span>
                                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor }} />
                                  <span className="text-xs" style={{ color: isRight || isUser ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: isRight || isUser ? 600 : 400 }}>
                                    {opt}
                                    {isUser && !isRight && <span style={{ color: 'rgba(255,80,80,0.8)', marginLeft: 4 }}>← picked</span>}
                                    {isRight && <span style={{ color: 'rgba(74,222,128,0.8)', marginLeft: 4 }}>✓</span>}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

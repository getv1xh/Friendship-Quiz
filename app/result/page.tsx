'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/lib/quiz-store';
import Certificate from '@/components/Certificate';
import { siteConfig } from '@/config/site';
import { getThemeTokens } from '@/config/themes';

export default function ResultPage() {
  const router = useRouter();
  const { userName, quizScore, friendshipScore, questions, answers, reset } = useQuiz();
  const [downloading, setDownloading] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);
  const tokens = getThemeTokens(siteConfig.theme.default);

  useEffect(() => {
    if (!userName || questions.length === 0) { router.push('/'); return; }

    import('canvas-confetti').then(({ default: confetti }) => {
      const colors = tokens.confettiColors;
      const end = Date.now() + 2200;
      (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    });
  }, []);

  // ── Derive display values ─────────────────────────────────────────────────
  const getMessage = () => {
    const msgs = [...siteConfig.scoring.messages].sort((a, b) => b.minScore - a.minScore);
    return msgs.find((m) => friendshipScore >= m.minScore) ?? msgs[msgs.length - 1];
  };
  const getCertTitle = () => {
    const titles = [...siteConfig.certificate.titles].sort((a, b) => b.minScore - a.minScore);
    return titles.find((t) => friendshipScore >= t.minScore)?.title ?? 'Friend';
  };
  const scoreColor = (s: number) =>
    s >= 80 ? '#4ade80' : s >= 60 ? 'var(--accent)' : s >= 40 ? '#facc15' : 'var(--text-secondary)';

  const handleDownload = async () => {
    if (!certRef.current || downloading) return;
    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(certRef.current, { quality: 0.96, pixelRatio: 2, backgroundColor: '#0d0d0f' });
      const a = document.createElement('a');
      a.download = `certificate-${userName.replace(/\s+/g, '-').toLowerCase()}.png`;
      a.href = dataUrl;
      a.click();
    } catch (e) { console.error(e); }
    finally { setDownloading(false); }
  };

  const handleShare = async () => {
    const text = `I scored ${friendshipScore}% on ${siteConfig.profile.name}'s "Who Knows Me Best?" quiz! 💖 Can you beat me?`;
    if (navigator.share) await navigator.share({ title: siteConfig.meta.title, text }).catch(() => {});
    else {
      await navigator.clipboard.writeText(text).catch(() => {});
      alert('Copied to clipboard! 📋');
    }
  };

  const message = getMessage();
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (!userName) return null;

  return (
    <main className="flex flex-col items-center justify-start p-5 pt-6 pb-12">
      <div className="w-full max-w-sm space-y-4">

        {/* ── Result card ─────────────────────────────────────────────────── */}
        <div className="card p-6 text-center animate-scale-in">
          <div className="text-3xl mb-2">🎉</div>
          <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Hey, {userName}!
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Here are your quiz results
          </p>

          {/* Score circles */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            {[
              { label: 'Quiz Score', value: quizScore, emoji: '🧠' },
              { label: 'Friendship', value: friendshipScore, emoji: '💖' },
            ].map(({ label, value, emoji }) => (
              <div key={label} className="rounded-2xl p-4"
                style={{ background: 'color-mix(in srgb, var(--accent) 6%, transparent)', border: '1px solid var(--border)' }}>
                <div className="text-2xl mb-2">{emoji}</div>
                <div className="score-ring mx-auto mb-2" style={{ width: 68, height: 68 }}>
                  <svg width="68" height="68" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="34" cy="34" r="28" fill="none" stroke="var(--score-track)" strokeWidth="5" />
                    <circle cx="34" cy="34" r="28" fill="none"
                      stroke={scoreColor(value)} strokeWidth="5"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - value / 100)}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1) 0.4s' }}
                    />
                  </svg>
                  <span className="absolute font-bold text-base" style={{ color: scoreColor(value) }}>
                    {value}%
                  </span>
                </div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Message */}
          {message && (
            <div className="rounded-2xl p-4 mb-5 animate-fade-up delay-200 text-left"
              style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid var(--border-accent)' }}>
              <p className="font-bold text-sm mb-1" style={{ color: 'var(--accent)' }}>{message.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{message.message}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button className="btn-primary" onClick={handleShare}>Share My Result 🔗</button>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => setShowCert(!showCert)}>
                {showCert ? 'Hide Cert' : '🏆 Certificate'}
              </button>
              <button className="btn-secondary flex-1" onClick={() => { reset(); router.push('/'); }}>
                🔄 Retry
              </button>
            </div>
          </div>
        </div>

        {/* ── Certificate ─────────────────────────────────────────────────── */}
        {showCert && (
          <div className="animate-scale-in space-y-3">
            <div className="certificate-wrap" ref={certRef}>
              <Certificate
                name={userName}
                friendshipScore={friendshipScore}
                title={getCertTitle()}
                quizOwnerName={siteConfig.profile.name}
                date={date}
              />
            </div>
            <button className="btn-primary" onClick={handleDownload} disabled={downloading}>
              {downloading ? '⭮ Saving…' : '⬇️ Download Certificate'}
            </button>
          </div>
        )}

        {/* ── Breakdown ───────────────────────────────────────────────────── */}
        <div className="card p-5 animate-fade-up delay-300">
          <h3 className="font-display font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
            Q&A Breakdown
          </h3>
          <div className="flex flex-col gap-2">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const correct = q.correctAnswer;
              const isCorrect = userAns === correct;
              return (
                <div key={q.id} className="rounded-xl p-3"
                  style={{ background: isCorrect ? 'rgba(74,222,128,0.07)' : 'rgba(255,80,80,0.07)', border: `1px solid ${isCorrect ? 'rgba(74,222,128,0.2)' : 'rgba(255,80,80,0.2)'}` }}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-sm">{isCorrect ? '✅' : '❌'}</span>
                    <p className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      {q.question}
                    </p>
                  </div>
                  <div className="ml-6 space-y-1">
                    {!isCorrect && (
                      <p className="text-xs" style={{ color: 'rgba(255,80,80,0.85)' }}>
                        Your answer: <strong>{q.options[userAns]}</strong>
                      </p>
                    )}
                    <p className="text-xs" style={{ color: 'rgba(74,222,128,0.85)' }}>
                      Correct: <strong>{q.options[correct]}</strong>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}

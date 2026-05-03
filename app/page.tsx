'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/lib/quiz-store';
import { Question } from '@/types';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  const router = useRouter();
  const { setQuestions, reset } = useQuiz();
  const [loading, setLoading] = useState(false);
  const { profile, quiz } = siteConfig;

  useEffect(() => { reset(); }, []);

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/questions?count=${quiz.questionsPerSession}`);
      const data = await res.json();
      setQuestions(data.questions as Question[]);
      router.push('/quiz');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="card p-8 text-center animate-fade-up">

          {/* Floating emoji row */}
          <div className="flex justify-center gap-2 mb-7">
            {['✨', '💖', '✨'].map((e, i) => (
              <span key={i} className="text-xl animate-float" style={{ animationDelay: `${i * 0.35}s` }}>{e}</span>
            ))}
          </div>

          {/* Avatar */}
          <div className="relative inline-block mb-6 animate-scale-in delay-100">
            <div
              className="w-24 h-24 rounded-full overflow-hidden mx-auto"
              style={{ border: '3px solid var(--border-accent)', boxShadow: '0 0 0 6px color-mix(in srgb, var(--accent) 12%, transparent), 0 8px 32px rgba(0,0,0,0.25)' }}
            >
              {profile.profileImage ? (
                <img src={profile.profileImage} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' }}>
                  🌸
                </div>
              )}
            </div>
            {/* Online badge */}
            <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full border-2"
              style={{ background: '#4ade80', borderColor: 'var(--bg)' }} />
          </div>

          {/* Text */}
          <div className="animate-fade-up delay-200">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
              How well do you know
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight mb-2" style={{ color: 'var(--text-primary)' }}>
              {profile.name}
            </h1>
            {profile.bio && (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6 animate-fade-up delay-200">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="badge">{quiz.questionsPerSession} questions</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-3 mb-7 animate-fade-up delay-300">
            {[
              { emoji: '🧠', label: 'Questions', value: quiz.questionsPerSession },
              { emoji: '⏱️', label: 'Est. time', value: '~2 min' },
            ].map(({ emoji, label, value }) => (
              <div key={label} className="rounded-2xl p-3.5"
                style={{ background: 'color-mix(in srgb, var(--accent) 8%, transparent)', border: '1px solid var(--border)' }}>
                <div className="text-xl mb-1">{emoji}</div>
                <div className="text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>{label}</div>
                <div className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="animate-fade-up delay-400">
            <button className="btn-primary" onClick={handleStart} disabled={loading}>
              {loading
                ? <><span className="animate-spin-slow inline-block">⭮</span> Loading…</>
                : <>Start the Quiz →</>}
            </button>
          </div>

          <p className="text-xs mt-4 animate-fade-up delay-400" style={{ color: 'var(--text-muted)' }}>
            Questions shuffle every session 🎲
          </p>
        </div>
      </div>
    </main>
  );
}

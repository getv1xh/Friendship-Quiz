'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '@/lib/quiz-store';

type Phase = 'question' | 'name';
const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizPage() {
  const router = useRouter();
  const { questions, currentIndex, answers, recordAnswer, setUserName, setResults } = useQuiz();
  const [phase, setPhase] = useState<Phase>('question');
  const [selected, setSelected] = useState<number | null>(null);
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [animating, setAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (questions.length === 0) router.push('/');
  }, [questions]);

  useEffect(() => {
    if (currentIndex >= questions.length && questions.length > 0) {
      setPhase('name');
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [currentIndex, questions.length]);

  const handleOptionSelect = (idx: number) => {
    if (selected !== null || animating) return;
    setSelected(idx);
    setAnimating(true);
    setTimeout(() => {
      recordAnswer(idx);
      setSelected(null);
      setAnimating(false);
    }, 550);
  };

  const handleNameSubmit = async () => {
    const trimmed = nameInput.trim();
    if (!trimmed) { setNameError('Please enter your name 💕'); inputRef.current?.focus(); return; }
    if (trimmed.length < 2) { setNameError('Name must be at least 2 characters'); return; }

    setNameError('');
    setSubmitting(true);
    setUserName(trimmed);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed, answers, questions }),
      });
      const data = await res.json();
      setResults(data.quizScore, data.friendshipScore);
      router.push('/result');
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  };

  if (questions.length === 0) return null;

  const progress = Math.round((currentIndex / questions.length) * 100);
  const currentQuestion = questions[currentIndex];

  // ── Name input phase ────────────────────────────────────────────────────────
  if (phase === 'name') {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center p-5">
        <div className="w-full max-w-sm">
          <div className="card p-8 animate-scale-in">
            <div className="text-center mb-8">
              <div className="text-4xl mb-3 animate-float">✨</div>
              <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Almost done!
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem' }}>
                You answered all {questions.length} questions.<br />
                Who should we credit with this score?
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                Your name
              </label>
              <input
                ref={inputRef}
                type="text"
                className="input-field"
                placeholder="Enter your name…"
                value={nameInput}
                onChange={(e) => { setNameInput(e.target.value); setNameError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                maxLength={50}
                autoComplete="name"
              />
              {nameError && (
                <p className="text-sm mt-2 animate-fade-in" style={{ color: 'var(--accent)' }}>{nameError}</p>
              )}
            </div>

            <button className="btn-primary" onClick={handleNameSubmit} disabled={submitting}>
              {submitting
                ? <><span className="animate-spin-slow inline-block">⭮</span> Calculating…</>
                : <>See My Results 🎉</>}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Question phase ──────────────────────────────────────────────────────────
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <div className="card p-6 animate-fade-in">

          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--accent)' }}>{currentIndex + 1}</span> / {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? 20 : 8,
                    height: 8,
                    background: i < currentIndex ? 'var(--accent)' : i === currentIndex ? 'var(--accent)' : 'var(--border)',
                    opacity: i > currentIndex ? 0.5 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-track mb-6">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Question */}
          <div className="mb-6 animate-fade-up" key={`q-${currentIndex}`}>
            <div className="badge mb-3">🤔 About me</div>
            <h2 className="font-display text-xl font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
              {currentQuestion?.question}
            </h2>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3 animate-fade-up delay-100" key={`opts-${currentIndex}`}>
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn${selected === idx ? ' selected' : ''}`}
                onClick={() => handleOptionSelect(idx)}
                disabled={selected !== null}
              >
                <span className="option-letter">{LETTERS[idx]}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { forwardRef } from 'react';

interface CertificateProps {
  name: string;
  friendshipScore: number;
  title: string;
  quizOwnerName: string;
  date: string;
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ name, friendshipScore, title, quizOwnerName, date }, ref) => (
    <div
      ref={ref}
      style={{
        width: '100%',
        padding: '2rem',
        background: 'linear-gradient(145deg, #1a0d2e, #120820)',
        fontFamily: "'DM Sans', sans-serif",
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        border: '1.5px solid rgba(164,122,255,0.25)',
      }}
    >
      {/* Top gradient bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #a47aff, #ff6b9d, #a47aff)' }} />

      {/* Corner glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(164,122,255,0.2), transparent)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💖</div>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: '#a47aff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Certificate of Friendship
        </p>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(90deg, #a47aff, #ff6b9d)', margin: '0 auto 0.75rem' }} />
        <p style={{ fontSize: '0.82rem', color: '#8b85a0' }}>This certifies that</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '2rem', fontWeight: 700, color: '#f0eeff', marginBottom: '0.25rem', lineHeight: 1.1 }}>
          {name}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(164,122,255,0.2)' }} />
          <p style={{ fontSize: '0.78rem', color: '#8b85a0' }}>has earned the title</p>
          <div style={{ flex: 1, height: 1, background: 'rgba(164,122,255,0.2)' }} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span style={{ display: 'inline-block', background: 'linear-gradient(135deg, #a47aff, #7c52d4)', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: 100, fontSize: '0.95rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(164,122,255,0.35)' }}>
          {title}
        </span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 18, padding: '1rem 2rem', border: '1px solid rgba(164,122,255,0.2)' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#a47aff', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Friendship Score</span>
          <span style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '3rem', fontWeight: 700, color: '#a47aff', lineHeight: 1 }}>{friendshipScore}%</span>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', color: '#8b85a0', marginBottom: '0.2rem' }}>
          Awarded by <strong style={{ color: '#f0eeff' }}>{quizOwnerName}</strong>
        </p>
        <p style={{ fontSize: '0.68rem', color: '#504a63' }}>{date}</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: 4 }}>
          {['🌸', '💕', '✨', '💕', '🌸'].map((e, i) => <span key={i} style={{ fontSize: '0.9rem' }}>{e}</span>)}
        </div>
      </div>
    </div>
  )
);

Certificate.displayName = 'Certificate';
export default Certificate;

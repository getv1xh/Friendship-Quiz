import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      // Fail open only in development when no password is set
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // Constant-time comparison to prevent timing attacks
    const a = Buffer.from(password);
    const b = Buffer.from(adminPassword);
    const match = a.length === b.length && require('crypto').timingSafeEqual(a, b);

    if (!match) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/auth]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

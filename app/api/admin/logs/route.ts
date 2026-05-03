import { NextRequest, NextResponse } from 'next/server';
import { getLogs, clearLogs } from '@/lib/log-store';

function verifyPassword(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword && process.env.NODE_ENV === 'development') return true;
  const auth = req.headers.get('x-admin-password') ?? '';
  if (!auth || !adminPassword) return false;
  try {
    const a = Buffer.from(auth);
    const b = Buffer.from(adminPassword);
    return a.length === b.length && require('crypto').timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyPassword(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ logs: getLogs() });
}

export async function DELETE(req: NextRequest) {
  if (!verifyPassword(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  clearLogs();
  return NextResponse.json({ ok: true });
}

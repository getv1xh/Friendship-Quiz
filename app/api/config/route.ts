import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site';

/** Returns only the client-safe subset of siteConfig */
export async function GET() {
  const { profile, quiz, scoring, certificate, theme, meta } = siteConfig;
  return NextResponse.json({ profile, quiz, scoring, certificate, theme, meta });
}

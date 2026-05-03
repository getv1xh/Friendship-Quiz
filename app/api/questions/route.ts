import { NextRequest, NextResponse } from 'next/server';
import { getRandomQuestions } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const count = parseInt(
    url.searchParams.get('count') || String(siteConfig.quiz.questionsPerSession),
    10
  );
  const questions = getRandomQuestions(count);
  return NextResponse.json({ questions });
}

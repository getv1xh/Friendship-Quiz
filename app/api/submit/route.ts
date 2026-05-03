import { NextRequest, NextResponse } from 'next/server';
import { calculateQuizScore, calculateFriendshipScore, getScoreMessage, getCertificateTitle } from '@/lib/utils';
import { appendLog } from '@/lib/log-store';
import { SubmitPayload } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: SubmitPayload = await req.json();
    const { name, answers, questions } = body;

    // Input validation
    if (!name?.trim() || !Array.isArray(answers) || !Array.isArray(questions)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (answers.length !== questions.length) {
      return NextResponse.json({ error: 'Answer count mismatch' }, { status: 400 });
    }

    const quizScore       = calculateQuizScore(answers, questions);
    const friendshipScore = calculateFriendshipScore(quizScore);
    const message         = getScoreMessage(friendshipScore);
    const friendshipTitle = getCertificateTitle(friendshipScore);

    // Persist to in-memory log (no IP, no device info)
    appendLog({
      name:           name.trim(),
      quizScore,
      friendshipScore,
      friendshipTitle,
      questions,
      answers,
    });

    return NextResponse.json({ quizScore, friendshipScore, message });
  } catch (err) {
    console.error('[submit]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

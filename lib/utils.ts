import { Question, ScoreMessage, CertificateTitle } from "@/types";
import { siteConfig } from "@/config/site";
import questionsData from "@/data/questions.json";

export function getAllQuestions(): Question[] {
  return questionsData as Question[];
}

export function getRandomQuestions(count: number): Question[] {
  const all = getAllQuestions();
  return [...all].sort(() => Math.random() - 0.5).slice(0, count);
}

export function calculateQuizScore(answers: number[], questions: Question[]): number {
  const correct = answers.reduce(
    (acc, answer, idx) => acc + (answer === questions[idx].correctAnswer ? 1 : 0),
    0
  );
  return Math.round((correct / questions.length) * 100);
}

export function calculateFriendshipScore(quizScore: number): number {
  const { bonusMin, bonusMax } = siteConfig.scoring;
  const bonus = Math.floor(Math.random() * (bonusMax - bonusMin + 1)) + bonusMin;
  return Math.min(100, quizScore + bonus);
}

export function getScoreMessage(score: number): ScoreMessage {
  const msgs = [...siteConfig.scoring.messages].sort((a, b) => b.minScore - a.minScore);
  return msgs.find((m) => score >= m.minScore) ?? msgs[msgs.length - 1];
}

export function getCertificateTitle(score: number): string {
  const titles = [...siteConfig.certificate.titles].sort(
    (a: CertificateTitle, b: CertificateTitle) => b.minScore - a.minScore
  );
  return (titles.find((t: CertificateTitle) => score >= t.minScore) as CertificateTitle | undefined)?.title ?? "Friend";
}

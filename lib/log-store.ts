/**
 * Log store — persists quiz attempts in memory across requests.
 * On Vercel / serverless this lives for the lifetime of the process (usually
 * long enough for a session). For a more durable solution swap the in-memory
 * map for a SQLite / Vercel KV / Supabase call behind the same interface.
 */

import { Question } from "@/types";

export interface QuizAttempt {
  id: string;
  timestamp: string;
  name: string;
  quizScore: number;
  friendshipScore: number;
  friendshipTitle: string;
  questions: Question[];
  answers: number[];
}

// Global singleton on the Node.js process
declare global {
  // eslint-disable-next-line no-var
  var __quizLogs: QuizAttempt[] | undefined;
}

function getStore(): QuizAttempt[] {
  if (!global.__quizLogs) global.__quizLogs = [];
  return global.__quizLogs;
}

export function appendLog(attempt: Omit<QuizAttempt, "id" | "timestamp">): QuizAttempt {
  const entry: QuizAttempt = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...attempt,
  };
  const store = getStore();
  store.unshift(entry); // newest first
  // Cap at 500 entries to avoid unbounded memory growth
  if (store.length > 500) store.splice(500);
  return entry;
}

export function getLogs(): QuizAttempt[] {
  return getStore();
}

export function clearLogs(): void {
  global.__quizLogs = [];
}

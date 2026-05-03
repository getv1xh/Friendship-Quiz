export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ScoreMessage {
  minScore: number;
  title: string;
  message: string;
}

export interface CertificateTitle {
  minScore: number;
  title: string;
}

export interface SubmitPayload {
  name: string;
  answers: number[];
  questions: Question[];
}

export interface SubmitResponse {
  quizScore: number;
  friendshipScore: number;
  message: ScoreMessage;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  name: string;
  quizScore: number;
  friendshipScore: number;
  friendshipTitle: string;
  questions: Question[];
  answers: number[];
}

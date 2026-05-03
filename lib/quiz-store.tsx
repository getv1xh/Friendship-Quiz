'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from '@/types';

interface QuizContextType {
  questions: Question[];
  currentIndex: number;
  answers: number[];
  userName: string;
  quizScore: number;
  friendshipScore: number;
  setQuestions: (q: Question[]) => void;
  recordAnswer: (answerIndex: number) => void;
  setUserName: (name: string) => void;
  setResults: (quiz: number, friendship: number) => void;
  reset: () => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userName, setUserName] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [friendshipScore, setFriendshipScore] = useState(0);

  const recordAnswer = (answerIndex: number) => {
    setAnswers((prev) => [...prev, answerIndex]);
    setCurrentIndex((prev) => prev + 1);
  };

  const setResults = (quiz: number, friendship: number) => {
    setQuizScore(quiz);
    setFriendshipScore(friendship);
  };

  const reset = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setUserName('');
    setQuizScore(0);
    setFriendshipScore(0);
  };

  return (
    <QuizContext.Provider value={{
      questions, currentIndex, answers, userName, quizScore, friendshipScore,
      setQuestions, recordAnswer, setUserName, setResults, reset,
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}

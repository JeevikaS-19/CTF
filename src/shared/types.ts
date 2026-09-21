/**
 * shared/types.ts — CONTRACTS. Changes require scaffold-owner PR review.
 * All pairs depend on these types. Do not edit without team sign-off.
 */

export type RoundId = 1 | 2;

export type QuestionType =
  | 'mcq'
  | 'text' // round 1
  | 'cipher'
  | 'symbol-substitution'
  | 'rebus'
  | 'sequence'
  | 'riddle'
  | 'odd-one-out'
  | 'anagram'; // round 2

export interface Question {
  id: string;
  roundId: RoundId;
  qNum: number; // 1-based
  type: QuestionType;
  prompt: string;
  options?: string[]; // for mcq / odd-one-out
  mediaUrl?: string; // image for rebus / symbols
  points: number;
  // NOTE: no `answer` field. Ever. Validation is server-side.
}

export interface Team {
  id: string;
  name: string;
  code: string; // short join code
  createdAt: string;
}

export interface AnswerResult {
  correct: boolean;
  pointsAwarded: number;
  totalPoints: number;
}

export interface LeaderboardEntry {
  rank: number;
  teamId: string;
  teamName: string;
  points: number;
}

export type RoundStatus = 'locked' | 'open' | 'closed';

export interface EventState {
  currentRound: RoundId | null; // null = lobby
  roundStatus: Record<RoundId, RoundStatus>;
}

export interface TeamProgress {
  // organizer-only view
  teamId: string;
  teamName: string;
  currentRound: RoundId | null;
  currentQNum: number | null;
  answered: number;
  correct: number;
  points: number;
  lastActiveAt: string;
}

export interface Session {
  teamId: string;
  teamName: string;
  isAdmin?: boolean;
}

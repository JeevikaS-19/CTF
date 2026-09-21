/**
 * shared/api/questions.ts — stub returning fake data.
 * TODO(backend): replace with real Supabase call.
 * IMPORTANT: This function must NEVER return an `answer` field.
 * Answer validation happens server-side only (Supabase RPC / edge function).
 */

import type { Question, RoundId } from '../types';

export async function getQuestion(roundId: RoundId, qNum: number): Promise<Question> {
  // TODO(backend): fetch from questions table (anon role must NOT see answer column)
  return {
    id: `r${roundId}-q${qNum}`,
    roundId,
    qNum,
    type: roundId === 1 ? 'mcq' : 'riddle',
    prompt: `[Placeholder] Round ${roundId}, Question ${qNum}`,
    options: roundId === 1 ? ['Option A', 'Option B', 'Option C', 'Option D'] : undefined,
    points: 10,
  };
}

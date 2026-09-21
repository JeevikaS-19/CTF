/**
 * shared/api/answers.ts — stub returning fake data.
 * TODO(backend): replace with Supabase RPC `submit_answer`.
 * CRITICAL: Answer checking NEVER happens client-side.
 * The correct answer is never sent to the client. See SCAFFOLD_SPEC.md section 4.
 */

import type { AnswerResult, RoundId } from '../types';

export async function submitAnswer(
  _roundId: RoundId,
  _qNum: number,
  _response: string,
): Promise<AnswerResult> {
  // TODO(backend): call Supabase RPC submit_answer(roundId, qNum, response)
  // The RPC checks the answer server-side and returns the result.
  return {
    correct: true, // fake
    pointsAwarded: 10, // fake
    totalPoints: 10, // fake
  };
}

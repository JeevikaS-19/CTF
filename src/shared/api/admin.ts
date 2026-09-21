/**
 * shared/api/admin.ts — stub returning fake data.
 * TODO(backend): replace with Supabase queries. These endpoints must be
 * protected by admin auth (RLS or service role key — backend owner decides).
 */

import type { EventState, RoundId, RoundStatus, TeamProgress } from '../types';

export async function getAllTeamProgress(): Promise<TeamProgress[]> {
  // TODO(backend): SELECT from teams + submissions, joined + aggregated
  return [
    {
      teamId: 'fake-1',
      teamName: 'Team Alpha',
      currentRound: 1,
      currentQNum: 3,
      answered: 2,
      correct: 2,
      points: 20,
      lastActiveAt: new Date().toISOString(),
    },
  ];
}

export async function setRoundStatus(roundId: RoundId, status: RoundStatus): Promise<EventState> {
  // TODO(backend): UPDATE event_state table, return updated state
  return {
    currentRound: roundId,
    roundStatus: {
      1: roundId === 1 ? status : 'locked',
      2: roundId === 2 ? status : 'locked',
    },
  };
}

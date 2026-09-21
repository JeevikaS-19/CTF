/**
 * shared/api/leaderboard.ts — stub returning fake data.
 * TODO(backend): replace with Supabase query on leaderboard view.
 * Participants POLL this (LEADERBOARD_POLL_MS interval), not realtime subscription.
 */

import type { LeaderboardEntry } from '../types';

export async function getLeaderboard(_limit?: number): Promise<LeaderboardEntry[]> {
  // TODO(backend): SELECT from leaderboard view, limit by _limit
  return [
    { rank: 1, teamId: 'fake-1', teamName: 'Team Alpha', points: 90 },
    { rank: 2, teamId: 'fake-2', teamName: 'Team Beta', points: 80 },
    { rank: 3, teamId: 'fake-3', teamName: 'Team Gamma', points: 70 },
  ];
}

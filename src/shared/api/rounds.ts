/**
 * shared/api/rounds.ts — stub returning fake data.
 * TODO(backend): replace with real Supabase call.
 * NOTE: Participants poll getEventState() every LEADERBOARD_POLL_MS.
 * Do NOT open a realtime channel per phone — see SCAFFOLD_SPEC.md section 9.
 */

import type { EventState } from '../types';

export async function getEventState(): Promise<EventState> {
  // TODO(backend): fetch from event_state table via Supabase
  return {
    currentRound: null, // null = everyone in lobby
    roundStatus: {
      1: 'locked',
      2: 'locked',
    },
  };
}

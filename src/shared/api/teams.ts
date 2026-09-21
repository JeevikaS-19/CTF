/**
 * shared/api/teams.ts — stub returning fake data.
 * TODO(backend): replace with real Supabase call via shared/api/
 */

import type { Team } from '../types';

export async function joinTeam(_name: string, _code?: string): Promise<Team> {
  // TODO(backend): POST /teams or Supabase RPC call
  return {
    id: 'fake-team-id',
    name: _name || 'Fake Team',
    code: _code ?? 'FAKE1',
    createdAt: new Date().toISOString(),
  };
}

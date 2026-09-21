/**
 * shared/constants.ts — CONTRACTS. Changes require scaffold-owner PR review.
 */

import type { RoundId } from './types';

// ── Route path-builders ──────────────────────────────────────────────────────
// Pages MUST use these. Never hardcode path strings.
export const ROUTES = {
  landing: () => '/',
  join: () => '/join',
  lobby: () => '/lobby',
  roundIntro: (roundId: RoundId) => `/round/${roundId}`,
  roundQuestion: (roundId: RoundId, qNum: number) => `/round/${roundId}/q/${qNum}`,
  roundDone: (roundId: RoundId) => `/round/${roundId}/done`,
  games: () => '/games',
  game: (gameId: string) => `/games/${gameId}`,
  leaderboard: () => '/leaderboard',
  finish: () => '/finish',
  screen: () => '/screen',
  adminLogin: () => '/admin/login',
  admin: () => '/admin',
  adminTeams: () => '/admin/teams',
  adminRounds: () => '/admin/rounds',
  devRoutes: () => '/__routes',
} as const;

// ── Round config ─────────────────────────────────────────────────────────────
export const ROUND_QUESTION_COUNT: Record<RoundId, number> = {
  1: 10,
  2: 10, // placeholder until content is final
};

// ── Polling interval ─────────────────────────────────────────────────────────
// Participants poll leaderboard at this interval, NOT via realtime subscription.
// Backend owners: check concurrent-connection limits on your Supabase plan.
export const LEADERBOARD_POLL_MS = 8000;

// ── All route paths (used by RouteIndex dev page) ────────────────────────────
export const ALL_ROUTES = [
  '/',
  '/join',
  '/lobby',
  '/round/:roundId',
  '/round/1/q/:qNum',
  '/round/1/done',
  '/round/2/q/:qNum',
  '/round/2/done',
  '/games',
  '/games/:gameId',
  '/leaderboard',
  '/finish',
  '/screen',
  '/admin/login',
  '/admin',
  '/admin/teams',
  '/admin/rounds',
  '/__routes',
] as const;

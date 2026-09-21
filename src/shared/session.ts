/**
 * shared/session.ts — localStorage session helpers.
 * Every access is wrapped in try/catch for environments
 * where localStorage may be unavailable (private browsing, etc.).
 */

import type { Session } from './types';

const SESSION_KEY = 'games-site:session';

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // localStorage unavailable — silently fail
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // localStorage unavailable — silently fail
  }
}

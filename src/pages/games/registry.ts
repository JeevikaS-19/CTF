/**
 * games/registry.ts
 * AREA: Filler games
 * OWNER: TBD
 * STATUS: stub — empty registry
 * TODO(frontend): add lazy-loaded game components here as they are built
 *
 * Map gameId -> lazy component. GameShell uses this to mount games.
 */

import type { ComponentType } from 'react';

// DECISION: using lazy ComponentType so games can be code-split and built independently.
// Each game owner adds their entry here without touching GameShell.
const gameRegistry: Record<string, () => Promise<{ default: ComponentType }>> = {
  // Example (uncomment when a game is ready):
  // 'trivia-blitz': () => import('./trivia-blitz/TriviaBlitz'),
};

export default gameRegistry;

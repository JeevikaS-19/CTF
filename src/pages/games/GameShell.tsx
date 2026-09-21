/**
 * AREA: Filler games
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): dynamically mount the game component from registry.ts based on gameId param
 * TODO(backend): no backend call needed; games are client-side
 */

import { useParams } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function GameShell() {
  const { gameId } = useParams<{ gameId: string }>();

  return (
    <Placeholder
      title={`Game: ${gameId ?? 'unknown'}`}
      path={`/games/${gameId}`}
      area="Filler games"
      next={{ label: 'Back to Games', to: ROUTES.games() }}
      notes="Mounts a single mini-game from registry.ts by gameId."
    />
  );
}

/**
 * AREA: Filler games
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real game hub — list registered games with icons and descriptions
 * TODO(backend): no backend call needed for listing; games are client-side
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function GameHub() {
  return (
    <Placeholder
      title="Game Hub"
      path="/games"
      area="Filler games"
      next={{ label: 'Back to Lobby', to: ROUTES.lobby() }}
      notes="Filler mini-games list between segments."
    />
  );
}

/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real waiting room UI — show team name, countdown, status
 * TODO(backend): poll getEventState() every LEADERBOARD_POLL_MS, redirect when round opens
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function LobbyPage() {
  return (
    <Placeholder
      title="Lobby"
      path="/lobby"
      area="Scaffold / template"
      next={{ label: 'Round 1 Intro', to: ROUTES.roundIntro(1) }}
      notes="Waiting room. Organizer opens a round to advance players."
    />
  );
}

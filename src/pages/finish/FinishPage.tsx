/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real finish UI — final score, rank, confetti?
 * TODO(backend): fetch final score from leaderboard or session context
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function FinishPage() {
  return (
    <Placeholder
      title="Finish"
      path="/finish"
      area="Scaffold / template"
      next={{ label: 'View Leaderboard', to: ROUTES.leaderboard() }}
      notes="Final score and rank for the team."
    />
  );
}

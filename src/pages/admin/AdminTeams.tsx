/**
 * AREA: Admin/organizer
 * OWNER: TBD (Pair C)
 * STATUS: placeholder
 * TODO(frontend): real per-team progress table — name, round, qNum, points, last active
 * TODO(backend): call getAllTeamProgress() from shared/api/admin.ts
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function AdminTeams() {
  return (
    <Placeholder
      title="Admin — Teams"
      path="/admin/teams"
      area="Admin/organizer"
      next={{ label: 'Round Control →', to: ROUTES.adminRounds() }}
      notes="Per-team progress tracking (organizer only)."
    />
  );
}

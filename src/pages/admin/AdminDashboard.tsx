/**
 * AREA: Admin/organizer
 * OWNER: TBD (Pair C)
 * STATUS: placeholder
 * TODO(frontend): real dashboard — summary stats, quick actions
 * TODO(backend): call getAllTeamProgress() and getEventState()
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function AdminDashboard() {
  return (
    <Placeholder
      title="Admin Dashboard"
      path="/admin"
      area="Admin/organizer"
      next={{ label: 'Teams →', to: ROUTES.adminTeams() }}
      notes="Overview. Shows summary stats and links to teams / rounds."
    />
  );
}

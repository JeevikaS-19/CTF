/**
 * AREA: Admin/organizer
 * OWNER: TBD (Pair C)
 * STATUS: placeholder
 * TODO(frontend): real round control UI — open/close round buttons, status indicators
 * TODO(backend): call setRoundStatus() from shared/api/admin.ts
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';

export default function AdminRoundControl() {
  return (
    <Placeholder
      title="Admin — Round Control"
      path="/admin/rounds"
      area="Admin/organizer"
      next={{ label: 'Dashboard →', to: ROUTES.admin() }}
      notes="Open/close rounds, set current round. Uses setRoundStatus()."
    />
  );
}

/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real landing UI — hero section, event branding, "Join" CTA
 * TODO(backend): no backend call needed for this page
 */

import Placeholder from '../components/Placeholder';
import { ROUTES } from '../shared/constants';

export default function Landing() {
  return (
    <Placeholder
      title="Landing"
      path="/"
      area="Scaffold / template"
      next={{ label: 'Join', to: ROUTES.join() }}
      notes="Event landing page with 'Join' button."
    />
  );
}

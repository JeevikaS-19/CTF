/**
 * AREA: rounds/round2
 * OWNER: TBD (Pair B)
 * STATUS: placeholder
 * TODO(frontend): real Round 2 summary — score, puzzle breakdown, transition message
 * TODO(backend): no additional call needed; score comes from AnswerResult accumulation
 */

import Placeholder from '../../../components/Placeholder';
import { ROUTES } from '../../../shared/constants';

export default function Round2Done() {
  return (
    <Placeholder
      title="Round 2 Done"
      path="/round/2/done"
      area="rounds/round2"
      next={{ label: 'Finish', to: ROUTES.finish() }}
      notes="Round 2 summary. Leads to final finish page."
    />
  );
}

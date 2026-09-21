/**
 * AREA: rounds/round1
 * OWNER: TBD (Pair A)
 * STATUS: placeholder
 * TODO(frontend): real Round 1 summary — score, correct count, transition message
 * TODO(backend): no additional call needed; score comes from AnswerResult accumulation
 */

import Placeholder from '../../../components/Placeholder';
import { ROUTES } from '../../../shared/constants';

export default function Round1Done() {
  return (
    <Placeholder
      title="Round 1 Done"
      path="/round/1/done"
      area="rounds/round1"
      next={{ label: 'Round 2 Intro', to: ROUTES.roundIntro(2) }}
      notes="Round 1 summary. Organizer opens Round 2 to advance."
    />
  );
}

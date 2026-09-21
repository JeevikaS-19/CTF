/**
 * AREA: rounds (shared shell)
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real round intro UI — round title, rules, countdown
 * TODO(backend): no call needed; roundId comes from URL param
 */

import { useParams } from 'react-router-dom';
import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';
import type { RoundId } from '../../shared/types';

export default function RoundIntro() {
  const { roundId } = useParams<{ roundId: string }>();
  const id = Number(roundId) as RoundId;

  return (
    <Placeholder
      title={`Round ${id} Intro`}
      path={`/round/${id}`}
      area="rounds"
      next={{ label: `Start Round ${id}`, to: ROUTES.roundQuestion(id, 1) }}
      notes={`Shared intro shell for all rounds. roundId=${id} from URL.`}
    />
  );
}

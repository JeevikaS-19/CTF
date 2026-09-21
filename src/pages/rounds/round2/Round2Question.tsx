/**
 * AREA: rounds/round2
 * OWNER: TBD (Pair B)
 * STATUS: placeholder
 * TODO(frontend): real Round 2 puzzle UI — cipher, rebus, symbol-substitution, etc.
 * TODO(backend): call getQuestion(2, qNum) and submitAnswer(2, qNum, response) via shared/api
 */

import { useParams } from 'react-router-dom';
import Placeholder from '../../../components/Placeholder';
import { ROUTES, ROUND_QUESTION_COUNT } from '../../../shared/constants';

export default function Round2Question() {
  const { qNum } = useParams<{ qNum: string }>();
  const n = Number(qNum);

  const isLast = n >= ROUND_QUESTION_COUNT[2];
  const nextTo = isLast ? ROUTES.roundDone(2) : ROUTES.roundQuestion(2, n + 1);
  const nextLabel = isLast ? 'Round 2 Done' : `Question ${n + 1}`;

  return (
    <Placeholder
      title={`Round 2 — Question ${n}`}
      path={`/round/2/q/${n}`}
      area="rounds/round2"
      next={{ label: nextLabel, to: nextTo }}
      notes={`qNum=${n}. Total questions: ${ROUND_QUESTION_COUNT[2]}.`}
    />
  );
}

/**
 * AREA: rounds/round1
 * OWNER: TBD (Pair A)
 * STATUS: placeholder
 * TODO(frontend): real Round 1 question UI — MCQ / text input, timer, submit
 * TODO(backend): call getQuestion(1, qNum) and submitAnswer(1, qNum, response) via shared/api
 */

import { useParams } from 'react-router-dom';
import Placeholder from '../../../components/Placeholder';
import { ROUTES, ROUND_QUESTION_COUNT } from '../../../shared/constants';

export default function Round1Question() {
  const { qNum } = useParams<{ qNum: string }>();
  const n = Number(qNum);

  const isLast = n >= ROUND_QUESTION_COUNT[1];
  const nextTo = isLast ? ROUTES.roundDone(1) : ROUTES.roundQuestion(1, n + 1);
  const nextLabel = isLast ? 'Round 1 Done' : `Question ${n + 1}`;

  return (
    <Placeholder
      title={`Round 1 — Question ${n}`}
      path={`/round/1/q/${n}`}
      area="rounds/round1"
      next={{ label: nextLabel, to: nextTo }}
      notes={`qNum=${n}. Total questions: ${ROUND_QUESTION_COUNT[1]}.`}
    />
  );
}

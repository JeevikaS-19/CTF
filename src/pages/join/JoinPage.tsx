/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real join form — team name input, join code input
 * TODO(backend): wire joinTeam() from shared/api/teams.ts, store session, redirect to /lobby
 */

import Placeholder from '../../components/Placeholder';
import { ROUTES } from '../../shared/constants';
import { setSession } from '../../shared/session';
import { useNavigate } from 'react-router-dom';

export default function JoinPage() {
  const navigate = useNavigate();

  // STUB: clicking "Next" sets a fake session and goes to /lobby
  function handleFakeJoin() {
    setSession({ teamId: 'fake-team-id', teamName: 'Fake Team' });
    navigate(ROUTES.lobby());
  }

  return (
    <div>
      <Placeholder
        title="Join Page"
        path="/join"
        area="Scaffold / template"
        notes="Enter team name / join code. Clicking Next sets a fake session."
      />
      <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
        <button
          onClick={handleFakeJoin}
          style={{
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            minHeight: 'var(--tap-min)',
            fontSize: '1rem',
          }}
        >
          Next (fake join) →
        </button>
      </div>
    </div>
  );
}

/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real 404 UI
 */

import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/constants';

export default function NotFound() {
  return (
    <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-text-secondary)' }}>
        404
      </h1>
      <p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-text-secondary)' }}>
        Page not found.
      </p>
      <Link
        to={ROUTES.landing()}
        style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
      >
        ← Back to home
      </Link>
    </div>
  );
}

/**
 * AREA: Scaffold / template
 * OWNER: TBD (Web template)
 * STATUS: dev-only scaffold utility
 *
 * Lists every route as a clickable link. Only accessible in dev mode.
 * Registered in routes.tsx only when import.meta.env.DEV is true.
 */

import { Link } from 'react-router-dom';
import { ALL_ROUTES } from '../../shared/constants';

export default function RouteIndex() {
  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>DEV ONLY</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 'var(--space-4) 0' }}>
        All Routes
      </h1>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ALL_ROUTES.map((path) => (
          <li key={path}>
            <Link
              to={
                path.includes(':roundId')
                  ? path.replace(':roundId', '1')
                  : path.includes(':qNum')
                    ? path.replace(':qNum', '1')
                    : path.includes(':gameId')
                      ? path.replace(':gameId', 'demo')
                      : path
              }
              style={{
                color: 'var(--color-accent)',
                textDecoration: 'none',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                display: 'block',
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface)',
              }}
            >
              {path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: stub only — projector view
 * TODO(frontend): real big-screen leaderboard — large text, auto-scroll, no nav
 * TODO(backend): poll getLeaderboard() every LEADERBOARD_POLL_MS
 *
 * NOTE: This page uses Bare layout (no ParticipantLayout wrapper).
 */

import { ROUTES } from '../../shared/constants';
import { Link } from 'react-router-dom';

export default function BigScreenLeaderboard() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: 'var(--color-text-primary)',
        padding: 'var(--space-8)',
      }}
    >
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>PLACEHOLDER</p>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 'var(--space-4) 0' }}>
        Big Screen Leaderboard
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
        Path: /screen · Area: Scaffold · No layout wrapper.
      </p>
      <Link to={ROUTES.landing()} style={{ color: 'var(--color-accent)' }}>
        ← Home
      </Link>
    </div>
  );
}

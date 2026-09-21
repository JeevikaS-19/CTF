/**
 * layouts/ParticipantLayout.tsx
 * AREA: Scaffold / template
 * OWNER: TBD (Web template)
 * STATUS: placeholder
 * TODO(frontend): real top bar, real bottom nav with icons
 */

import { Outlet, NavLink } from 'react-router-dom';
import { ROUTES } from '../shared/constants';

export default function ParticipantLayout() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
      }}
    >
      {/* Top bar */}
      <header
        style={{
          padding: 'var(--space-3) var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 'var(--tap-min)',
        }}
      >
        <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>🎮 Games Site</span>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>

      {/* Bottom nav — side links from flow diagram */}
      <nav
        style={{
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: 'var(--space-2) 0',
        }}
      >
        {[
          { label: 'Lobby', to: ROUTES.lobby() },
          { label: 'Games', to: ROUTES.games() },
          { label: 'Leaderboard', to: ROUTES.leaderboard() },
        ].map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              padding: 'var(--space-2) var(--space-4)',
              minHeight: 'var(--tap-min)',
              display: 'flex',
              alignItems: 'center',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

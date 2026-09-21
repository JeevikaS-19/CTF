/**
 * layouts/AdminLayout.tsx
 * AREA: Admin/organizer
 * OWNER: TBD (Pair C)
 * STATUS: placeholder
 * TODO(frontend): real sidebar with nav links, admin branding
 */

import { Outlet, NavLink } from 'react-router-dom';
import { ROUTES } from '../shared/constants';

export default function AdminLayout() {
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Simple top bar */}
      <header
        style={{
          padding: 'var(--space-3) var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          gap: 'var(--space-6)',
          alignItems: 'center',
          background: 'var(--color-surface)',
        }}
      >
        <span style={{ fontWeight: 700 }}>🛠 Admin</span>
        {[
          { label: 'Dashboard', to: ROUTES.admin() },
          { label: 'Teams', to: ROUTES.adminTeams() },
          { label: 'Rounds', to: ROUTES.adminRounds() },
        ].map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.admin()}
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              minHeight: 'var(--tap-min)',
              display: 'flex',
              alignItems: 'center',
            })}
          >
            {label}
          </NavLink>
        ))}
      </header>

      <main style={{ flex: 1, padding: 'var(--space-4)' }}>
        <Outlet />
      </main>
    </div>
  );
}

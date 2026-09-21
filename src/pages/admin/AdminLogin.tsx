/**
 * AREA: Admin/organizer
 * OWNER: TBD (Pair C)
 * STATUS: placeholder
 * TODO(frontend): real login form
 * TODO(backend): real admin auth (JWT / Supabase auth). For now, any click sets isAdmin: true.
 *
 * STUB: Clicking "Login" sets isAdmin: true in session and redirects to /admin.
 * Real auth is backend's job.
 */

import { useNavigate } from 'react-router-dom';
import { getSession, setSession } from '../../shared/session';
import { ROUTES } from '../../shared/constants';

export default function AdminLogin() {
  const navigate = useNavigate();

  function handleFakeLogin() {
    // TODO(backend): replace with real auth — validate credentials against Supabase
    const existing = getSession();
    setSession({
      teamId: existing?.teamId ?? 'admin',
      teamName: existing?.teamName ?? 'Organizer',
      isAdmin: true,
    });
    navigate(ROUTES.admin());
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        padding: 'var(--space-6)',
      }}
    >
      <div
        style={{
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-6)',
          width: '100%',
          maxWidth: '360px',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>PLACEHOLDER</p>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 'var(--space-4) 0' }}>
          Admin Login
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Path: /admin/login · Area: Admin/organizer
        </p>
        <button
          onClick={handleFakeLogin}
          style={{
            width: '100%',
            padding: 'var(--space-3)',
            background: 'var(--color-accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            minHeight: 'var(--tap-min)',
            fontSize: '1rem',
          }}
        >
          Login (fake — sets isAdmin: true)
        </button>
      </div>
    </div>
  );
}

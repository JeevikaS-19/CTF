/**
 * guards/RequireTeam.tsx
 * AREA: Scaffold / template
 * OWNER: TBD (Web template)
 * STATUS: scaffold guard — do not remove
 *
 * Redirects to /join if no team session found in localStorage.
 * TODO(backend): once real auth is wired, validate session against server here.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../shared/session';
import { ROUTES } from '../shared/constants';

export default function RequireTeam() {
  const session = getSession();

  if (!session) {
    return <Navigate to={ROUTES.join()} replace />;
  }

  return <Outlet />;
}

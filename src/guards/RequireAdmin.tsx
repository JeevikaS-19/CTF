/**
 * guards/RequireAdmin.tsx
 * AREA: Scaffold / template
 * OWNER: TBD (Web template)
 * STATUS: scaffold guard — do not remove
 *
 * Redirects to /admin/login if session doesn't have isAdmin flag.
 * STUB: AdminLogin sets isAdmin: true on any click — real auth is backend's job.
 * TODO(backend): validate admin token server-side.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../shared/session';
import { ROUTES } from '../shared/constants';

export default function RequireAdmin() {
  const session = getSession();

  if (!session?.isAdmin) {
    return <Navigate to={ROUTES.adminLogin()} replace />;
  }

  return <Outlet />;
}

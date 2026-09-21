/**
 * routes.tsx — THE route table. All routes declared here and only here.
 * Pages never declare their own routes.
 * After scaffold day, changes to this file require scaffold-owner sign-off.
 */

import { createBrowserRouter } from 'react-router-dom';
import ParticipantLayout from './layouts/ParticipantLayout';
import AdminLayout from './layouts/AdminLayout';
import RequireTeam from './guards/RequireTeam';
import RequireAdmin from './guards/RequireAdmin';

// Pages
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import JoinPage from './pages/join/JoinPage';
import LobbyPage from './pages/lobby/LobbyPage';
import RoundIntro from './pages/rounds/RoundIntro';
import Round1Question from './pages/rounds/round1/Round1Question';
import Round1Done from './pages/rounds/round1/Round1Done';
import Round2Question from './pages/rounds/round2/Round2Question';
import Round2Done from './pages/rounds/round2/Round2Done';
import GameHub from './pages/games/GameHub';
import GameShell from './pages/games/GameShell';
import LeaderboardPage from './pages/leaderboard/LeaderboardPage';
import FinishPage from './pages/finish/FinishPage';
import BigScreenLeaderboard from './pages/screen/BigScreenLeaderboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTeams from './pages/admin/AdminTeams';
import AdminRoundControl from './pages/admin/AdminRoundControl';

// Dev-only route index
import RouteIndex from './pages/dev/RouteIndex';

const routes = [
  // ── Participant routes ─────────────────────────────────────────────
  {
    element: <ParticipantLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/join', element: <JoinPage /> },
      { path: '/leaderboard', element: <LeaderboardPage /> },

      // RequireTeam-guarded
      {
        element: <RequireTeam />,
        children: [
          { path: '/lobby', element: <LobbyPage /> },
          { path: '/round/:roundId', element: <RoundIntro /> },
          { path: '/round/1/q/:qNum', element: <Round1Question /> },
          { path: '/round/1/done', element: <Round1Done /> },
          { path: '/round/2/q/:qNum', element: <Round2Question /> },
          { path: '/round/2/done', element: <Round2Done /> },
          { path: '/games', element: <GameHub /> },
          { path: '/games/:gameId', element: <GameShell /> },
          { path: '/finish', element: <FinishPage /> },
        ],
      },
    ],
  },

  // ── Bare (no layout) routes ────────────────────────────────────────
  { path: '/screen', element: <BigScreenLeaderboard /> },
  { path: '/admin/login', element: <AdminLogin /> },

  // ── Admin routes ───────────────────────────────────────────────────
  {
    element: <AdminLayout />,
    children: [
      {
        element: <RequireAdmin />,
        children: [
          { path: '/admin', element: <AdminDashboard /> },
          { path: '/admin/teams', element: <AdminTeams /> },
          { path: '/admin/rounds', element: <AdminRoundControl /> },
        ],
      },
    ],
  },

  // ── 404 ────────────────────────────────────────────────────────────
  { path: '*', element: <NotFound /> },
];

// Dev-only route index — only registered in development builds
if (import.meta.env.DEV) {
  routes.push({ path: '/__routes', element: <RouteIndex /> });
}

export const router = createBrowserRouter(routes);

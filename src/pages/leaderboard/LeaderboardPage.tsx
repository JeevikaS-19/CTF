/**
 * AREA: Scaffold / template
 * OWNER: TBD
 * STATUS: placeholder
 * TODO(frontend): real leaderboard UI — ranked table, auto-polling
 * TODO(backend): poll getLeaderboard() every LEADERBOARD_POLL_MS
 */

import Placeholder from '../../components/Placeholder';

export default function LeaderboardPage() {
  return (
    <Placeholder
      title="Leaderboard"
      path="/leaderboard"
      area="Scaffold / template"
      notes="Public leaderboard. Polls getLeaderboard() every 8 seconds."
    />
  );
}

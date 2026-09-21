/**
 * components/Placeholder.tsx
 * AREA: Scaffold / template
 * OWNER: TBD (Web template)
 * STATUS: scaffold utility — do not remove
 *
 * Renders a clearly-unfinished placeholder for stub pages.
 * Props: title, path, area, owner?, next?: { label, to }, notes?: string
 */

import { Link } from 'react-router-dom';

interface PlaceholderProps {
  title: string;
  path: string;
  area: string;
  owner?: string;
  next?: { label: string; to: string };
  notes?: string;
}

export default function Placeholder({ title, path, area, owner, next, notes }: PlaceholderProps) {
  return (
    <div
      style={{
        border: '2px dashed var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)',
        margin: 'var(--space-4)',
        maxWidth: 'var(--container-max)',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginBottom: '4px' }}>
        PLACEHOLDER
      </p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
        {title}
      </h1>

      <table style={{ fontSize: '0.875rem', borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <Row label="Path" value={path} />
          <Row label="Area" value={area} />
          <Row label="Owner" value={owner ?? 'TBD'} />
        </tbody>
      </table>

      {notes && (
        <p
          style={{
            marginTop: 'var(--space-4)',
            fontSize: '0.85rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          {notes}
        </p>
      )}

      {next && (
        <Link
          to={next.to}
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-6)',
            padding: 'var(--space-3) var(--space-6)',
            background: 'var(--color-accent)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            minHeight: 'var(--tap-min)',
            lineHeight: 'var(--tap-min)',
          }}
        >
          {next.label} →
        </Link>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td
        style={{
          color: 'var(--color-text-secondary)',
          paddingRight: '12px',
          paddingBottom: '4px',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </td>
      <td style={{ fontFamily: 'monospace', paddingBottom: '4px' }}>{value}</td>
    </tr>
  );
}

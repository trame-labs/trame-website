export function Kicker({ children }) {
  return <span className="tl-eyebrow" style={{ color: 'var(--brand-green-500)' }}>{children}</span>;
}

export default function SectionHeading({ kicker, children, maxWidth }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth }}>
      <Kicker>{kicker}</Kicker>
      <h2 className="tl-h2">{children}</h2>
    </div>
  );
}

const lineColor = (tone) => (tone === 'dark' ? 'rgba(252,252,252,.16)' : 'var(--border-default)');

/** Section separator: a single full-width hairline that meets the side rails. */
export function Divider({ tone = 'light' }) {
  return <div aria-hidden="true" style={{ height: 1, background: lineColor(tone) }} />;
}

/** Side outlines: two vertical hairlines at the content column edges, full height of their parent. */
export function Rails({ children, tone = 'light' }) {
  const line = lineColor(tone);
  return (
    <div style={{ position: 'relative' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
        <div style={{ width: 'calc(100% - 48px)', maxWidth: 1200, margin: '0 auto', height: '100%', boxShadow: `inset 1px 0 0 ${line}, inset -1px 0 0 ${line}` }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

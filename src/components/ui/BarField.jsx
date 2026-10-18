/**
 * Vertical-thread background: evenly spaced 1px lines that fade in/out top-to-bottom,
 * the "Grid vertical" layer from the brand visuals. Content sits on top.
 */
export default function BarField({ children, spacing = 16, color = 'rgb(218,221,215)', opacity = 0.6, fade = true, background = 'transparent', style, className }) {
  const lines = `repeating-linear-gradient(90deg, ${color} 0 1px, transparent 1px ${spacing}px)`;
  const mask = fade ? 'linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)' : 'none';
  return (
    <div className={className} style={{ position: 'relative', background, ...style }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: lines, opacity, WebkitMaskImage: mask, maskImage: mask, pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

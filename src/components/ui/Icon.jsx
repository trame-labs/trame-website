/** Material Symbols Outlined glyph (font loaded in index.html). */
export default function Icon({ name, size = 20, weight = 300, fill = 0, color = 'currentColor', style, className }) {
  return (
    <span aria-hidden="true" className={className} style={{
      fontFamily: "'Material Symbols Outlined'", fontWeight: 'normal', fontStyle: 'normal', fontSize: size, lineHeight: 1,
      letterSpacing: 'normal', textTransform: 'none', display: 'inline-block', whiteSpace: 'nowrap', direction: 'ltr',
      fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${Math.min(48, Math.max(20, size))}`,
      color, width: size, height: size, overflow: 'hidden', flexShrink: 0, ...style,
    }}>{name}</span>
  );
}

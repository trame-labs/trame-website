import { useState } from 'react';
import Icon from './Icon.jsx';

const VARIANTS = {
  primary:   { bg: 'var(--action-primary-bg)', hover: 'var(--action-primary-bg-hover)', fg: 'var(--action-primary-fg)', ring: 'none' },
  secondary: { bg: 'var(--action-secondary-bg)', hover: 'var(--action-secondary-bg-hover)', fg: 'var(--action-secondary-fg)', ring: 'none' },
  outline:   { bg: 'var(--surface-page)', hover: 'var(--surface-muted)', fg: 'var(--text-strong)', ring: 'inset 0 0 0 1px var(--border-default)' },
  signal:    { bg: 'var(--brand-yellow-500)', hover: 'var(--brand-yellow-700)', fg: 'var(--brand-green-900)', ring: 'none' },
  inverse:   { bg: 'var(--neutral-10)', hover: 'var(--soft-green-100)', fg: 'var(--brand-green-900)', ring: 'none' },
  ghost:     { bg: 'transparent', hover: 'var(--surface-soft)', fg: 'var(--text-strong)', ring: 'none' },
  ghostInverse: { bg: 'transparent', hover: 'rgba(240,245,235,.08)', fg: 'var(--text-on-inverse)', ring: 'inset 0 0 0 1px rgba(240,245,235,.35)' },
};
const SIZES = {
  sm: { h: 30, px: 9, fs: 13, gap: 8, icon: 14 },
  md: { h: 40, px: 16, fs: 14, gap: 8, icon: 18 },
  lg: { h: 48, px: 20, fs: 16, gap: 10, icon: 20 },
};

export default function Button({ children, variant = 'primary', size = 'md', icon, iconRight, disabled = false, href, onClick, style, className, type = 'button' }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href} type={href ? undefined : type} onClick={disabled ? undefined : onClick} disabled={href ? undefined : disabled} className={className}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap, height: s.h, padding: `0 ${s.px}px`,
        borderRadius: 6, border: 'none', boxShadow: v.ring, cursor: disabled ? 'not-allowed' : 'pointer', textDecoration: 'none',
        backgroundColor: hover && !disabled ? v.hover : v.bg, color: v.fg, opacity: disabled ? 0.45 : 1,
        fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: s.fs, lineHeight: 1, whiteSpace: 'nowrap',
        transform: press && !disabled ? 'scale(0.98)' : 'none', transition: 'background-color 140ms cubic-bezier(.2,.7,.2,1), transform 140ms',
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </Tag>
  );
}

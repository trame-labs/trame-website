import { useEffect, useState } from 'react';
import Button from './ui/Button.jsx';
import Icon from './ui/Icon.jsx';
import Logo from './ui/Logo.jsx';

const field = { height: 42, padding: '0 12px', borderRadius: 6, border: 'none', boxShadow: 'var(--hairline-strong)', font: '400 15px var(--font-sans)', color: 'var(--text-strong)', background: '#fff', outline: 'none' };
const label = { display: 'flex', flexDirection: 'column', gap: 6, font: '500 13px var(--font-sans)', color: 'var(--text-body)', textAlign: 'left' };
const title = { margin: 0, fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em', textAlign: 'left' };

/** The demo request form, shared by the modal and the /demo page. `detailed` adds the optional “chiffre qui ne tombe pas” field. */
export function DemoForm({ onDone, detailed = false, autoFocus = false }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
        <Logo variant="mark" height={44} />
        <h3 style={title}>Merci, c’est noté.</h3>
        <p className="tl-lead tl-lead--sm">Notre équipe vous recontacte sous 24h pour organiser la démo.</p>
        {onDone && <Button variant="secondary" onClick={onDone}>Fermer</Button>}
      </div>
    );
  }
  return (
    // TODO: wire to the real lead endpoint (Make → Attio) — currently only shows the success state.
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span className="tl-eyebrow" style={{ textAlign: 'left' }}>Réserver une démo</span>
      <h3 style={title}>Voyons vos chiffres ensemble.</h3>
      <label style={label}>Email professionnel<input required type="email" name="email" placeholder="prenom@entreprise.eu" style={field} autoFocus={autoFocus} /></label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <label style={label}>Société<input required name="company" style={field} /></label>
        <label style={label}>Rôle
          <select name="role" style={field}>
            <option>CFO</option><option>FP&amp;A</option><option>Contrôle de gestion</option><option>Autre</option>
          </select>
        </label>
      </div>
      {detailed && (
        <label style={label}>Un chiffre qui ne tombe pas ? <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>Facultatif</span>
          <textarea name="issue" rows={3} placeholder="Une marge que l’on recalcule à la main, un écart que personne n’explique…" style={{ ...field, height: 'auto', padding: '10px 12px', resize: 'vertical' }} />
        </label>
      )}
      <Button type="submit" size="lg" iconRight="arrow_forward">Envoyer</Button>
    </form>
  );
}

export default function DemoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,38,21,.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div role="dialog" aria-modal="true" aria-label="Réserver une démo" onClick={(e) => e.stopPropagation()}
        style={{ width: 460, maxWidth: '100%', background: 'var(--surface-page)', borderRadius: 12, boxShadow: 'var(--shadow-popover)', padding: 32, display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
        <button onClick={onClose} aria-label="Fermer" style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <Icon name="close" />
        </button>
        <DemoForm onDone={onClose} autoFocus />
      </div>
    </div>
  );
}

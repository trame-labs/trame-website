// One-page trame-labs.com. Copy is verbatim from the live site; images come from its Framer CDN.
import { useState } from 'react';
import Button from '../components/ui/Button.jsx';
import BarField from '../components/ui/BarField.jsx';
import { Divider, Rails } from '../components/layout/Rails.jsx';
import { IMG } from '../lib/helpers.js';
import Hero from './Hero.jsx';
import CardGrid from './CardGrid.jsx';
import SectionHeading, { Kicker } from './SectionHeading.jsx';

const USE_CASES = [
  ['EoYUl2jSWuULd0DTq2fwObXe43k.png', 'Reconnaissance du revenu', 'Réconciliez CRM, facturation et comptabilité en continu.'],
  ['aUJrfnAXiuMg88EVvg99sYUEuOo.png', 'P&L analytique', 'Croisez vos sources pour descendre sous la maille comptable.'],
  ['P7N8TOc0OKkPv38BSea15yjXznc.png', 'Marges & rentabilité', 'Suivez vos marges par client, produit et entité sans attendre le reporting du mois.'],
  ['AJBM4BbNQW2RnYICjAFrTNhP5ik.png', 'Consolidation', 'Consolidez entités et devises en continu, tout en maintenant la piste d’audit.'],
];

const FEATURES = [
  ['Connectez vos sources de données', 'ERP, CRM, Comptabilité, SIRH, Banques, Excels: vos données sont structurées, historisées, prêtes à l’emploi'],
  ['Détectez les anomalies à l’entrée'],
  ['Créez la mémoire de votre équipe'],
  ['Défendez chaque chiffre, jusqu’à sa source'],
  ['Exposez un contexte gouverné à vos agents'],
];

const BENEFITS = [
  ['t1S1lvvMNyDn26iza75IiOWDTk.png', 'Récupérez du cash', 'Contrats sous-facturés, renouvellements oubliés, doublons de paiement : chaque écart est chiffré'],
  ['s09LzlDi4WYhrSv35on4jfAQ2iM.png', 'Décidez sur ce mois, pas sur le trimestre dernier', 'Vos chiffres se mettent à jour en continu, pour une clôture et un reporting 5x plus rapide'],
  ['8TVwWcY9RmENpQwhUV09fl2fy4.png', 'Des chiffres que vous pouvez prouver', 'Rejouez une clôture avec les règles de l’époque, retrouvez l’auteur et la date des ajustements manuels'],
  ['hxOmcvhrW8L9a3QFrsGkZmVVZn8.png', 'Passez du reporting à l’analyse', 'Marge par client, produit ou canal, rétention, saisonnalité: analysez sans aucune limite'],
];

const INTEGRATION_LOGOS = [
  '4ThL0I7TikN74C9ZhVytj0ADM.jpeg', 'JAXrUYNhY6YXBPyO9X2GUZ757c.png', 'BfnITmS7aDNbGxR16z5rcghsEU.png', '0m7Kj150IYcbJ6XHGu1ADWhTX8.svg',
  'hyofzHc5RkniNlMjBW3pA9mKs.png', 'fLKC2tJ1qrnhMPmD3BX4u7NNdhM.jpeg', 'x8kFNV0kAjF1112stpbRplnHF8.webp', 'O6sZkwK1sJdHkymQhTiQfXnT6dw.webp',
  'N79fmGiEUwCwudqNst3vmpm8iM.png', 'ESRb8XUsjcdJw0KFUcsr08lAw.png', 'sOGQgqQpB2kY0xjSKtyV0iwdZgk.webp',
];

const column = { display: 'flex', flexDirection: 'column', gap: 40 };

function Features() {
  const [active, setActive] = useState(0);
  return (
    <section id="features-section" className="tl-wrap tl-section" style={column}>
      <SectionHeading kicker="Fonctionnalités" maxWidth={760}>Trame transforme vos données fragmentées en chiffres fiables et auditables</SectionHeading>
      <div className="tl-features">
        <div style={{ display: 'flex', flexDirection: 'column' }} role="tablist" aria-orientation="vertical">
          {FEATURES.map(([title, desc], i) => {
            const on = active === i;
            return (
              <button key={title} role="tab" aria-selected={on} onClick={() => setActive(i)}
                style={{
                  textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '18px 0 18px 18px',
                  boxShadow: `inset 2px 0 0 ${on ? 'var(--brand-green-900)' : 'var(--border-default)'}`,
                  display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-sans)',
                }}>
                <span style={{ fontSize: 18, fontWeight: 500, color: on ? 'var(--text-strong)' : 'var(--text-muted)' }}>{title}</span>
                {on && desc && <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-body)' }}>{desc}</span>}
              </button>
            );
          })}
        </div>
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: `url(${IMG('2HXjyDONMWvONblcMecwPSvBGA.png', 1200)}) center / cover`, padding: '48px 40px' }}>
          <img src={IMG('qNtUCKBPFDvbY1UzsQgMYINsCrc.png', 1600)} alt="Interface Trame" loading="lazy"
            style={{ width: '100%', display: 'block', borderRadius: 10, boxShadow: 'var(--shadow-popover)' }} />
        </div>
      </div>
    </section>
  );
}

export default function Home({ onDemo }) {
  return (
    <main>
      <Hero onDemo={onDemo} />

      <Rails>
        <section id="use-case-section" className="tl-wrap tl-section" style={column}>
          <SectionHeading kicker="Cas d’usage" maxWidth={680}>Commencez par le cas d’usage qui vous coûte le plus cher</SectionHeading>
          <CardGrid items={USE_CASES} alt="Aperçu du cas d’usage" />
          <p className="tl-lead" style={{ textAlign: 'center' }}>Automatisez et enrichissez votre P&amp;L, collaborez sur vos budgets et contrôlez les écarts en temps réel.</p>
        </section>

        <Divider />
        <Features />

        <Divider />
        <section id="benefit-section" className="tl-wrap tl-section" style={column}>
          <SectionHeading kicker="Bénéfices">Des résultats dès le premier mois</SectionHeading>
          <CardGrid items={BENEFITS} cardBackground="var(--surface-page)" />
        </section>

        <Divider />
        <section id="integration-section" className="tl-wrap tl-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
          <Kicker>Intégrations</Kicker>
          <h2 className="tl-h2" style={{ maxWidth: 760 }}>Aucune migration, Trame se branche sur vos outils existants</h2>
          <p className="tl-lead" style={{ maxWidth: 600 }}>Trame propose plus de 100 connecteurs : comptabilité, ERP, CRM, banque et SIRH, synchronisés en temps réel.</p>
          <BarField spacing={16} style={{ width: '100%', padding: '32px 0' }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              {INTEGRATION_LOGOS.map((file, i) => (
                <li key={file}>
                  <img src={IMG(file, 256)} alt={'Intégration ' + (i + 1)} loading="lazy"
                    style={{ width: 56, height: 56, objectFit: 'contain', borderRadius: 10, background: '#fff', display: 'block' }} />
                </li>
              ))}
            </ul>
          </BarField>
        </section>

        <Divider />
        <section id="pricing-section" className="tl-wrap tl-section">
          <div className="tl-cta">
            <div className="tl-cta-body" style={{ padding: '56px 48px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
              <h2 className="tl-h2">Tissez la trame de vos décisions, pilotez en toute confiance</h2>
              <p className="tl-lead">Réservez un premier échange et bénéficiez d’un état des lieux de vos sources, vos règles et vos points de friction. Vous repartez en sachant combien vous pouvez gagner.</p>
              <Button size="lg" onClick={onDemo}>Découvrir Trame</Button>
            </div>
            <img src={IMG('GRQ3r1o4lxzvVRkGIfeAEUyy6xY.png', 1400)} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </section>
        <Divider />
      </Rails>
    </main>
  );
}

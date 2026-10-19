// One-page trame-labs.com. Copy follows the V1 vision (“votre finance engineer”); images come from the live site's Framer CDN.
import { useState } from 'react';
import Button from '../components/ui/Button.jsx';
import { Divider, Rails } from '../components/layout/Rails.jsx';
import { IMG } from '../lib/helpers.js';
import { Link, navigate, usePageMeta } from '../lib/router.js';
import { USE_CASES as USE_CASE_ROUTES } from '../content/routes.js';
import LogoMarquee from '../components/LogoMarquee.jsx';
import Hero from './Hero.jsx';
import CardGrid from './CardGrid.jsx';
import SectionHeading from './SectionHeading.jsx';

// [route, question]: the home cards ask the question each use-case page answers.
const USE_CASES = [
  ['/cas-usage/chiffre-affaires', 'Ce que les ventes annoncent, est-ce ce qui est facturé ?'],
  ['/cas-usage/pnl-analytique', 'Quelle marge sur chaque canal, commissions comprises ?'],
  ['/cas-usage/cash-analytique', 'Où en est la trésorerie ce matin, par entité et par devise ?'],
  ['/cas-usage/consolidation', 'Le groupe consolidé, en euros, à J+5 ?'],
].map(([to, q]) => { const u = USE_CASE_ROUTES.find((r) => r.to === to); return [u.img, u.label, q, to]; });

const FEATURES = [
  ['Rapprochez toutes vos sources', 'Compta, CRM, facturation, PSP, banques et paie, rapprochés ligne à ligne selon vos règles. Sans export.'],
  ['Arrêtez le mois à J+5', 'Votre DAF valide, septembre ne bouge plus. Les écarts tardifs passent sur octobre, datés et justifiés.'],
  ['Gardez la mémoire des décisions', 'Qui a décidé quoi, et pourquoi. Quand quelqu’un part, ses décisions restent.'],
  ['Défendez chaque chiffre, jusqu’à sa source', 'Chaque ligne s’ouvre sur ses pièces, sa règle et son auteur.'],
  ['Branchez votre IA, avec vos droits', 'Claude ou ChatGPT interrogent Trame avec les droits de la personne qui pose la question. Chaque lecture est journalisée.'],
];

const BENEFITS = [
  // TODO: Jahia figure awaits written sign-off; Mooncard figure is self-reported.
  ['t1S1lvvMNyDn26iza75IiOWDTk.png', 'Le rapprochement en ½ jour, au lieu de 3', 'CRM, facturation et compta, à chaque cycle. Jahia, éditeur SaaS'],
  ['s09LzlDi4WYhrSv35on4jfAQ2iM.png', 'Le reporting en 1 jour, au lieu de 3', 'Le reporting mensuel, prêt plus tôt. Mooncard, fintech'],
  ['8TVwWcY9RmENpQwhUV09fl2fy4.png', 'La trésorerie chaque matin', 'Trois entités, en devises, au lieu du point du mardi. Typology, beauté'],
  ['hxOmcvhrW8L9a3QFrsGkZmVVZn8.png', 'Un seul chiffre, pour toutes vos IA', 'Le CRM, la facturation et Excel donnent trois chiffres. Trame donne le chiffre arrêté'],
];


const column = { display: 'flex', flexDirection: 'column', gap: 40 };

function Features() {
  const [active, setActive] = useState(0);
  return (
    <section id="features-section" className="tl-wrap tl-section" style={column}>
      <SectionHeading kicker="Fonctionnalités" maxWidth={760}>Des chiffres justes, arrêtés et traçables, que votre IA peut utiliser</SectionHeading>
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
  usePageMeta('Trame Labs — Votre finance engineer', 'Compta, CRM, facturation, PSP, banques et paie rapprochés ligne à ligne, arrêtés à J+5, avec des droits par personne pour brancher Claude ou ChatGPT.');
  return (
    <main>
      <Hero onDemo={onDemo} />

      <Rails>
        <section id="use-case-section" className="tl-wrap tl-section" style={column}>
          <SectionHeading kicker="Cas d’usage" maxWidth={680}>Commencez par la question qui vous coûte le plus cher</SectionHeading>
          <CardGrid items={USE_CASES} alt="Aperçu du cas d’usage" />
          <p className="tl-lead" style={{ textAlign: 'center' }}>Et le <Link to="/cas-usage/budget-realise">budget / réalisé</Link> : quelle équipe dérape, de combien, et pourquoi.</p>
        </section>

        <Divider />
        <Features />

        <Divider />
        <section id="benefit-section" className="tl-wrap tl-section" style={column}>
          <SectionHeading kicker="Bénéfices">Premiers chiffres en deux semaines</SectionHeading>
          <div className="tl-grid-4">
            {BENEFITS.map(([file, title, desc]) => (
              <article key={title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <img src={IMG(file, 256)} alt="" loading="lazy" width="72" height="72" style={{ display: 'block', borderRadius: 'var(--radius-xl)' }} />
                <h3 className="tl-h3">{title}</h3>
                <p className="tl-lead tl-lead--sm">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <Divider />
        <section id="integration-section" className="tl-wrap tl-section tl-integrations">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionHeading kicker="Intégrations" maxWidth={520}>Aucune migration, Trame se branche sur vos outils existants</SectionHeading>
            <p className="tl-lead" style={{ maxWidth: 480 }}>Compta, CRM, facturation, PSP, banques et paie, en lecture seule. Hébergé en Europe, aucun entraînement sur vos données.</p>
            <div><Button variant="outline" href="/integrations" onClick={(e) => { e.preventDefault(); navigate('/integrations'); }} iconRight="arrow_forward">Toutes les intégrations</Button></div>
          </div>
          <LogoMarquee />
        </section>

        <Divider />

        {/* Closing CTA: centred copy over the knitted landscape, framed by the side rails. */}
        <section id="pricing-section" className="tl-cta-frame">
          <div className="tl-wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
            <h2 className="tl-h2 tl-h2--xl" style={{ maxWidth: 860, color: 'var(--text-ink)' }}>Apportez un chiffre qui ne tombe pas</h2>
            <p className="tl-lead tl-lead--sm" style={{ maxWidth: 600, color: 'var(--neutral-600)' }}>Trente minutes de démo. Puis, si vous le voulez, vos sources en lecture seule et, deux semaines plus tard, la liste chiffrée de ce qui ne tombe pas.</p>
            <Button size="lg" onClick={onDemo} style={{ marginTop: 8 }}>Réserver une démo</Button>
          </div>
          <img className="tl-cta-landscape" src="/assets/illustrations/knit-landscape.png" alt="" width="1412" height="648" loading="lazy" />
        </section>
        <Divider />
      </Rails>
    </main>
  );
}

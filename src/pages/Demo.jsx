// Demo page. Copy and blocks follow the « Site Trame V1 » mock-up (demo.html); the hero frame is the site's own.
import { useState } from 'react';
import { usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { PageHero } from '../components/blocks.jsx';
import '../styles/pages/Demo.css';

function DemoRequest() {
  const t = useT();
  const [sent, setSent] = useState(false);
  // TODO: wire the booking tool (HubSpot, Attio or Calendly)
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="form" id="rdv">
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '14px' }}>
        <h2>{t('Trente minutes, à l’heure qui vous va.', 'Thirty minutes, at a time that suits you.')}</h2>
        <label htmlFor="d-name">{t('Nom', 'Name')}<input autoComplete="name" id="d-name" name="name" required /></label>
        <label htmlFor="d-mail">{t('E-mail professionnel', 'Work email')}<input autoComplete="email" id="d-mail" name="email" required type="email" /></label>
        <label htmlFor="d-num">{t('Un chiffre qui ne tombe pas ?', 'A figure that doesn’t add up?')} <span style={{ fontWeight: 400, color: 'var(--faint)' }}>{t('Facultatif', 'Optional')}</span><input id="d-num" name="probleme" placeholder={t('L’ARR du board face au CA comptable, la marge d’un canal…', 'The board’s ARR against booked revenue, a channel’s margin…')} /></label>
        <button className="btn btn-dark" type="submit">{t('Envoyer ma demande', 'Send my request')}</button>
        <p className="done" hidden={!sent} role="status">{t('Merci, nous revenons vers vous très vite pour fixer le créneau.', 'Thank you. We’ll get back to you shortly to set a time.')}</p>
        <p className="fine">{t('Le domaine de votre e-mail nous suffit pour connaître votre société.', 'Your email domain is all we need to know your company.')}</p>
      </form>
    </div>
  );
}

const TICKS = [
  ['Avec une personne qui a déjà fait des clôtures.', 'Quelqu’un de l’équipe qui déploie Trame chez nos clients.',
    'With someone who has run month-end closes.', 'Someone from the team that deploys Trame at our clients.'],
  ['Sur vos outils.', 'Pennylane, HubSpot, Stripe, Shopify, vos banques : dites-nous ce que vous avez.',
    'On your tools.', 'Pennylane, HubSpot, Stripe, Shopify, your banks: tell us what you use.'],
  ['Sans engagement.', 'Si Trame ne vous sert pas, nous vous le dirons.',
    'No commitment.', 'If Trame isn’t useful to you, we’ll tell you.'],
];

const STEPS = [
  ['Jour 1 · 30 minutes', 'L’état des lieux', 'Vos outils, vos entités, votre reporting et vos points de friction. Vous repartez en sachant combien vous pouvez gagner.',
    'Day 1 · 30 minutes', 'The assessment', 'Your tools, your entities, your reporting and your pain points. You leave knowing how much you stand to gain.'],
  ['Dans la semaine', 'Une démo sur un cas proche du vôtre', 'Votre cas d’usage, sur des données qui ressemblent aux vôtres, et le prix pour votre périmètre, par écrit.',
    'Within the week', 'A demo on a case close to yours', 'Your use case, on data that looks like yours, and the price for your scope, in writing.'],
  ['Ensuite', 'Vos premiers chiffres, sur vos données', 'Vos sources branchées en lecture seule, sous accord de confidentialité, et vos premiers écarts chiffrés, avec leur cause.',
    'Then', 'Your first figures, on your data', 'Your sources connected read-only, under a confidentiality agreement, and your first discrepancies quantified, with their cause.'],
];

const FAQ = [
  ['Faut-il préparer quelque chose ?', 'Non. Le mieux est d’apporter un chiffre qui ne tombe pas : un écart que personne n’explique, une marge que l’on recalcule à la main. Nous partons de là.',
    'Do we need to prepare anything?', 'No. The best thing is to bring a figure that doesn’t add up: a variance no one can explain, a margin recalculated by hand. We start from there.'],
  ['Pouvez-vous montrer Trame sur nos propres données ?', 'Oui. Une fois vos sources branchées en lecture seule, sous accord de confidentialité, vous voyez vos propres chiffres, et la liste chiffrée de ce qui ne tombe pas.',
    'Can you show Trame on our own data?', 'Yes. Once your sources are connected read-only, under a confidentiality agreement, you see your own figures, and a quantified list of what doesn’t add up.'],
  ['Combien coûte Trame ?', 'Le prix dépend de vos sources et de vos entités. Nous vous le donnons pendant la démo, par écrit.',
    'How much does Trame cost?', 'The price depends on your sources and your entities. We give it to you during the demo, in writing.'],
  ['Faut-il migrer notre compta ou nos outils ?', 'Non. Trame se branche sur ce que vous avez déjà : votre logiciel comptable, votre CRM, vos banques, votre paie.',
    'Do we need to migrate our accounting or our tools?', 'No. Trame connects to what you already have: your accounting software, your CRM, your banks, your payroll.'],
  ['Qui doit participer ?', 'La personne qui fait le reporting, et si possible le CFO. Si vous avez une équipe data, elle est la bienvenue au deuxième rendez-vous.',
    'Who should attend?', 'The person who does the reporting, and ideally the CFO. If you have a data team, they are welcome at the second meeting.'],
];

export default function Demo() {
  const t = useT();
  usePageMeta(
    t('Réserver une démo | Trame', 'Book a demo | Trame'),
    t('Trente minutes pour faire l’état des lieux de vos sources, de vos règles et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Thirty minutes to assess your sources, your rules and your pain points. You leave knowing how much you stand to gain.'),
  );
  return (
    <main className="v1">
      <PageHero
        kicker={t('Démo', 'Demo')}
        title={t('Montrez-nous vos sources. Nous vous montrons ce que Trame en fait.', 'Show us your sources. We’ll show you what Trame does with them.')}
        lead={t('Trente minutes pour faire l’état des lieux de vos sources, de vos règles et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner, sur votre trésorerie, votre marge, votre chiffre d’affaires ou votre consolidation.', 'Thirty minutes to assess your sources, your rules and your pain points. You leave knowing how much you stand to gain, on your cash, your margin, your revenue or your consolidation.')}
        ctas={false}
      >
        <div className="demo-hero">
          <ul className="ticks" style={{ marginTop: '8px' }}>
            {TICKS.map(([bFr, sFr, bEn, sEn]) => (
              <li key={bFr}><div><b style={{ color: 'var(--on-deep)' }}>{t(bFr, bEn)}</b> <span style={{ color: 'var(--on-deep-muted)' }}>{t(sFr, sEn)}</span></div></li>
            ))}
          </ul>
          <DemoRequest />
        </div>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap">
          <span className="who">{t('Ils travaillent avec Trame', 'They work with Trame')}</span>
          <div className="names"><span>Jahia</span><span>Mooncard</span><span>La Bonne Brosse</span><span>Typology</span></div>
        </div></div>
        <section className="band">
          <div className="wrap">
            <div className="intro"><h2 className="h2">{t('Ce qui se passe ensuite.', 'What happens next.')}</h2></div>
            <ol className="steps s3 timed">
              {STEPS.map(([wFr, bFr, sFr, wEn, bEn, sEn]) => (
                <li key={wFr}><span className="when">{t(wFr, wEn)}</span><b>{t(bFr, bEn)}</b><span>{t(sFr, sEn)}</span></li>
              ))}
            </ol>
          </div>
        </section>
        <section className="band paper tight">
          <div className="wrap">
            <h2 className="h2">{t('Avant de réserver', 'Before you book')}</h2>
            <div className="faq">
              {FAQ.map(([qFr, aFr, qEn, aEn]) => (
                <details key={qFr}><summary>{t(qFr, qEn)}</summary><div><p>{t(aFr, aEn)}</p></div></details>
              ))}
            </div>
          </div>
        </section>
      </Rails>
    </main>
  );
}

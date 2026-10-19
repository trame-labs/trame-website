import { DemoForm } from '../components/DemoModal.jsx';
import { Divider, Rails } from '../components/layout/Rails.jsx';
import { Faq, IconGrid, PageHero, Section, Steps } from '../components/blocks.jsx';
import { usePageMeta } from '../lib/router.js';

const PROMISES = [
  ['support_agent', 'Avec quelqu’un qui a fait des clôtures', 'Une personne de l’équipe qui déploie Trame chez nos clients.'],
  ['cable', 'Sur vos outils', 'Pennylane, HubSpot, Stripe, Shopify, vos banques : dites-nous ce que vous avez.'],
  ['thumb_up', 'Sans engagement', 'Si Trame ne vous sert pas, nous vous le dirons.'],
];

const NEXT = [
  ['Jour 1 · 30 minutes', 'Vos outils, vos entités, votre reporting, et le chiffre qui ne tombe pas.'],
  ['Dans la semaine', 'Une démo sur un cas proche du vôtre, et le prix pour votre périmètre, par écrit.'],
  ['Deux semaines plus tard', 'Le diagnostic : vos sources en lecture seule, et la liste chiffrée de ce qui ne tombe pas.'],
];

const FAQ = [
  ['Faut-il préparer quelque chose ?', 'Non. Le mieux est d’apporter un chiffre qui ne tombe pas : nous partons de là.'],
  ['Pouvez-vous montrer Trame sur nos propres données ?', 'Oui : c’est le diagnostic, sous accord de confidentialité, deux semaines après le branchement en lecture seule.'],
  ['Combien coûte Trame ?', 'Le prix dépend de vos sources et de vos entités. Nous vous le donnons par écrit pendant la démo.'],
  ['Qui doit participer ?', 'La personne qui fait le reporting, et si possible le CFO.'],
];

export default function Demo() {
  usePageMeta('Réserver une démo | Trame', 'Trente minutes sur vos outils et vos règles, puis une démo sur un cas proche du vôtre. Ou le diagnostic : vos écarts chiffrés en deux semaines.');
  return (
    <main>
      <PageHero kicker="Démo" title="Montrez-nous vos sources. Nous vous montrons ce que Trame en fait."
        lead="Trente minutes sur vos outils et vos règles, puis une démo sur un cas proche du vôtre.">
        <div style={{ maxWidth: 520, margin: '0 auto', background: 'var(--surface-page)', borderRadius: 12, boxShadow: '0 40px 90px rgba(0,0,0,.35)', padding: 32 }}>
          <DemoForm detailed />
        </div>
      </PageHero>
      <Rails>
        <Section kicker="Notre promesse" title="Trente minutes utiles">
          <IconGrid items={PROMISES} />
        </Section>
        <Divider />
        <Section kicker="Ensuite" title="Ce qui se passe après la démo">
          <Steps items={NEXT} />
        </Section>
        <Divider />
        <Faq items={FAQ} />
        <Divider />
      </Rails>
    </main>
  );
}

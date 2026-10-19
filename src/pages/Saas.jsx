import { Divider, Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DataCard, Faq, IconGrid, Journal, PageHero, ProofBand, Quote, Related, Section } from '../components/blocks.jsx';
import { USE_CASES } from '../content/routes.js';
import { usePageMeta } from '../lib/router.js';

const T = (cells) => ({ cells, total: true });

const ARR = {
  title: 'Variation de l’ARR · T3 2026 · k€', chip: 'Rapproché de la facturation',
  rows: [
    ['ARR au 30 juin', 'Définition v4 · services exclus', '8 704,1'],
    ['Nouveaux clients', '11 contrats, tous facturés', '+612,0'],
    ['Expansion', 'Montées en gamme et usage', '+298,4'],
    ['Contraction', null, '−84,6'],
    ['Churn', '6 clients, dont 3 résiliations absentes du CRM', '−340,2'],
    T(['ARR au 30 septembre', 'Rétention nette du trimestre : 98,5 %', '9 189,7']),
  ],
  foot: 'Chaque ligne s’ouvre sur ses contrats et ses factures.',
};

const DOES = [
  ['trending_up', 'Un ARR rapproché', 'Depuis les contrats du CRM, rapproché de la facturation et du CA comptable.'],
  ['event_repeat', 'PCA et FAE chaque mois', 'Abonnements étalés et usage facturé à terme échu, rapprochés des comptes 487 et 418.'],
  ['payments', 'Stripe et Chargebee rapprochés', 'Chaque versement éclaté en paiements, frais, remboursements et impayés.'],
  ['pie_chart', 'La marge brute par client', 'Hébergement, support, coûts d’API d’IA imputés avec vos clés.'],
  ['groups', 'La masse salariale par équipe', 'R&D, ventes, customer success, en coût complet. Salaires protégés.'],
  ['savings', 'Burn et runway consolidés', 'Multi-devises. Le burn d’un mois présenté ne change plus après le board.'],
];

const DEFINITIONS = [
  ['3 oct. 26', 'v4', 'Services exclus de l’ARR. Bastien, validé par le CFO.', 'Impact sur septembre : −186,0 k€'],
  ['2 janv. 26', 'v3', 'ARR en euros au taux du budget. CFO.', 'Le change ne fait plus varier l’ARR'],
  ['5 juin 25', 'v2', 'Les contrats en préavis restent dans l’ARR jusqu’à leur fin.', 'Demandé par le board'],
  ['1er mars 25', 'v1', 'ARR = MRR des abonnements actifs × 12.', 'Première définition'],
];

const FAQ = [
  ['Comment l’ARR est-il rapproché du CA comptable ?', 'Contrat par contrat. L’écart est décomposé par cause : services, usage, étalement, change, résiliations.'],
  ['Nos chiffres de board bougeront-ils après la réunion ?', 'Non. Le mois présenté est arrêté ; une correction tardive passe sur le mois suivant, avec son motif.'],
  ['Comment préparer une due diligence ?', 'Mois arrêtés, définitions et ajustements sont déjà là. Vous ouvrez un accès en lecture seule, limité dans le temps.'],
  ['Trame remplace-t-il notre outil de facturation ?', 'Non. Stripe Billing ou Chargebee continuent de facturer ; Trame lit les factures et les rapproche.'],
];

export default function Saas({ onDemo }) {
  usePageMeta('Finance SaaS : un ARR rapproché de la compta | Trame', 'Pour les CFO de SaaS : un ARR rapproché de la facturation et de la compta, PCA et FAE chaque mois, et un burn qui ne change plus d’un board à l’autre.');
  return (
    <main>
      <PageHero kicker="Secteurs · Tech & SaaS" title="Un seul ARR, du CRM à la compta" lead="L’ARR, la marge et le burn de votre board, rapprochés de la compta et arrêtés chaque mois." onDemo={onDemo}>
        <DataCard {...ARR} />
      </PageHero>
      <Rails>
        {/* TODO: Jahia figure awaits written sign-off. */}
        <ProofBand who="Jahia · éditeur SaaS, 6 entités" what="Cycle de revenus : de 3 jours à une demi-journée" />
        <Divider />
        <Section kicker="Ce que vivent les CFO de SaaS" title="Trois ARR pour un seul board"
          lead="Services comptés comme récurrents, résiliations absentes du CRM, Stripe en milliers de lignes nettes de frais.">
          <Quote text="Devant l’actionnaire, bon si oui c’est la data, c’est mon outil qui me l’a dit, ça me suffit pas." who="CFO · éditeur SaaS sous fonds" />
        </Section>
        <Divider />
        <Section kicker="Fonctionnalités" title="Ce que Trame fait pour un SaaS">
          <IconGrid items={DOES} />
        </Section>
        <Divider />
        <Section kicker="Le jour de la due diligence" title="« Comment calculez-vous l’ARR depuis deux ans ? »"
          lead="Ouvrez le journal : chaque version de la définition, qui l’a validée, et les mois qu’elle a touchés."
          aside={<Journal title="Définition · ARR" chip="Version 4 en vigueur" items={DEFINITIONS} foot="Chaque mois se rejoue avec la définition de l’époque." />} />
        <Divider />
        <Related title="Les cas d’usage d’un SaaS" items={USE_CASES.filter((u) => ['/cas-usage/chiffre-affaires', '/cas-usage/consolidation', '/cas-usage/budget-realise'].includes(u.to))} />
        <Divider />
        <Faq items={FAQ} />
        <Divider />
        <ClosingCta title="Un ARR que vous pouvez défendre, ligne par ligne" sub="Apportez l’ARR de votre dernier board et votre CA comptable. Nous vous montrons l’écart, cause par cause." onDemo={onDemo} />
        <Divider />
      </Rails>
    </main>
  );
}

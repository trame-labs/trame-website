import { Divider, Rails } from '../components/layout/Rails.jsx';
import { Answer, ClosingCta, DataCard, Faq, IconGrid, Journal, PageHero, Quote, Related, Section } from '../components/blocks.jsx';
import { USE_CASES } from '../content/routes.js';
import { USE_CASE_PAGES } from '../content/useCases.js';
import { usePageMeta } from '../lib/router.js';

const T = (cells) => ({ cells, total: true });

const ORDER = {
  title: 'Commande n° 10482 · 9 septembre · € HT', chip: 'De la commande à l’écriture',
  rows: [
    ['Chiffre d’affaires net de remise', 'Shopify · 115,20 € TTC', '96,00'],
    ['Coût de revient', null, '−41,00'],
    ['Port et préparation', null, '−7,90'],
    ['Frais Stripe', 'Versement du 12 septembre', '−1,45'],
    ['Publicité attribuée', 'Clé : campagne d’origine', '−12,30'],
    T(['Marge de la commande', '34,7 %', '33,35']),
  ],
  foot: 'La même marge, commande par commande, canal par canal.',
};

const TRACE = [
  ['9 sept.', 'Commande', 'Shopify · 115,20 € TTC', 'Remise de 4 € · livraison en France'],
  ['9 sept.', 'Paiement', 'Stripe · frais de 1,45 €', 'Inclus dans le versement du 12 septembre'],
  ['12 sept.', 'Banque', 'Versement Stripe de 18 412,60 €', '164 commandes, 3 remboursements, frais déduits'],
  ['30 sept.', 'Compta', 'Écriture de ventes, comptes 707 et 411', 'Le compte client Stripe est soldé'],
];

const DOES = [
  ['receipt_long', 'La marge à la commande', 'Net de remises et de retours, après coût de revient, logistique, frais et publicité.'],
  ['storefront', 'Les marketplaces, canal par canal', 'Zalando, Amazon, La Redoute : chaque relevé rapproché des écritures.'],
  ['credit_card', 'Le cash multi-PSP', 'Stripe, PayPal, Shopify Payments, Adyen : chaque versement éclaté.'],
  ['assignment_return', 'Retours et cartes cadeaux', 'Retours rattachés à la commande d’origine, cartes suivies jusqu’à l’utilisation.'],
  ['public', 'La TVA par pays', 'Ventes à distance suivies pays par pays, pour votre déclaration OSS.'],
  ['store', 'Magasins et revendeurs', 'Chaque boutique en centre de profit ; remises de fin d’année provisionnées.'],
];

const FAQ = [
  ['Comment traitez-vous les versements des marketplaces ?', 'Chaque relevé est décomposé en ventes, commissions, frais, remboursements et réserves, puis rapproché de la commande et de l’écriture.'],
  ['D’où vient le coût de revient ?', 'De votre outil de stock ou ERP (Cegid Retail, Fastmag, Odoo), ou de la compta. Trame l’applique commande par commande.'],
  ['Nous avons déjà un outil d’analytics e-commerce.', 'Il compte les ventes et les visites. Trame part de la compta : une marge qui retombe sur votre résultat.'],
  ['Faut-il remplacer notre caisse ou notre outil de stock ?', 'Non. Trame lit votre caisse, votre e-commerce et votre stock tels qu’ils sont.'],
];

export default function Retail({ onDemo }) {
  usePageMeta('Finance e-commerce : marge par produit et canal | Trame', 'Site, marketplaces, revendeurs, boutiques : la marge par produit et par canal après commissions, frais, logistique et retours, rapprochée de la compta.');
  return (
    <main>
      <PageHero kicker="Secteurs · Retail & e-commerce" title="Votre marge par produit et par canal" lead="Site, marketplaces, revendeurs et boutiques, après commissions, frais, logistique et retours. Chaque commande suivie de Shopify à l’écriture." onDemo={onDemo}>
        <DataCard {...ORDER} />
      </PageHero>
      <Rails>
        <Section kicker="Ce que vivent les équipes finance du retail" title="Que rapporte un produit vendu sur Zalando, une fois tout payé ?"
          lead="Les ventes s’affichent partout ; la marge après commissions, logistique et retours, nulle part."
          aside={<DataCard {...USE_CASE_PAGES['/cas-usage/pnl-analytique'].card} />}>
          <Quote text="Je me suis retrouvée avec un écart de 160 000 €." who="Finance manager · ventes privées en ligne, à la clôture" />
        </Section>
        <Divider />
        <Section kicker="De la commande à l’écriture" title="Chaque euro suivi, jusqu’à la compta"
          lead="Commande, paiement, versement, crédit bancaire, écriture : rapprochés, avec les coûts de chaque canal."
          aside={<Journal title="Commande n° 10482" chip="Rapprochée" items={TRACE} foot="De Shopify au compte 707." />} />
        <Divider />
        <Section kicker="Fonctionnalités" title="Ce que Trame fait pour une marque">
          <IconGrid items={DOES} />
        </Section>
        <Divider />
        <Section kicker="Le comité du lundi" title="« On continue Zalando ? »"
          lead="La réponse tient en une phrase, avec ses preuves. La même pour le CEO, la directrice e-commerce et vous."
          aside={<Answer who="La directrice e-commerce, dans Claude" question="Zalando est-il encore rentable, retours et commission comptés ?" figure="48,6 %"
            answer="de marge sur coûts variables en septembre, contre 68,4 % sur le site. L’écart vient de la commission (17,5 %) et des retours (14,2 %). Zalando reste rentable."
            trace="Septembre arrêté le 7 octobre · relevé Zalando rapproché" />} />
        <Divider />
        <Related title="Les cas d’usage d’une marque" items={USE_CASES.filter((u) => ['/cas-usage/pnl-analytique', '/cas-usage/cash-analytique', '/cas-usage/chiffre-affaires'].includes(u.to))} />
        <Divider />
        <Faq items={FAQ} />
        <Divider />
        <ClosingCta title="Sachez ce que rapporte chaque produit, sur chaque canal" sub="Apportez la marge d’un canal que personne ne sait recalculer. Nous vous montrons ce que Trame en fait." onDemo={onDemo} />
        <Divider />
      </Rails>
    </main>
  );
}

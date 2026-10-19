import Button from '../components/ui/Button.jsx';
import { Divider, Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DataCard, Faq, IconGrid, PageHero, Quote, Section } from '../components/blocks.jsx';
import { Kicker } from '../sections/SectionHeading.jsx';
import { usePageMeta } from '../lib/router.js';

const MISSIONS = [
  ['cable', 'Il branche les sources', 'Compta et FEC, CRM, facturation, PSP, banques, paie. Une fois, sans exports.'],
  ['rule', 'Il écrit les règles', 'Tables de mapping, clés de répartition, reconnaissance du revenu, appliquées chaque mois.'],
  ['fact_check', 'Il rapproche et contrôle', 'Chaque écart trouvé, chiffré et expliqué avant la clôture, pas pendant le board.'],
  ['lock', 'Il arrête et trace', 'Le mois présenté ne bouge plus. Chaque correction garde son auteur et sa raison.'],
  ['smart_toy', 'Il outille l’équipe et ses IA', 'Droits par personne, questions en langage naturel, agents sur des chiffres arrêtés.'],
  ['menu_book', 'Il transmet', 'Tout est documenté dans le système. Quand il change de poste, ses règles restent.'],
];

const ROLES = {
  title: 'Trois profils, comparés', chip: 'Rattaché au DAF',
  columns: ['', 'Contrôleur', 'Data engineer', 'Finance engineer'],
  rows: [
    ['Connaît le cut-off, les PCA, l’intragroupe', null, 'Oui', 'Rarement', 'Oui'],
    ['Construit des flux de données', null, 'Dans Excel', 'Oui', 'Oui'],
    ['Écrit les règles de gestion', null, 'Dans des fichiers', 'En tickets', 'Dans un système'],
    ['Arrête et défend les chiffres', null, 'Oui', 'Non', 'Oui'],
  ],
  foot: 'La finance du contrôleur, les outils du data engineer.',
};

const WHY = [
  ['travel_explore', 'Un métier qui naît', 'Apparu aux États-Unis début 2026, il arrive à peine en France.'],
  ['auto_awesome', 'L’IA est dans les outils', 'Mais sur des exports, elle repart de zéro : ni mois arrêté, ni règles, ni droits.'],
  ['group', 'Des équipes qui ne grossissent plus', '« Garder la même taille d’équipe pour accompagner notre croissance. »'],
];

const WAYS = [
  ['person_search', 'Le recruter', 'Un profil rare, des mois de recherche. Ses scripts restent sur son ordinateur : s’il part, ils partent.'],
  ['handshake', 'Confier ce travail à Trame', 'Le produit fait l’ingénierie, notre équipe écrit vos règles avec vous. Premiers chiffres en deux semaines.'],
];

const FAQ = [
  ['Faut-il savoir coder ?', 'Non. Le cœur du métier, c’est la finance. Les outils comme Trame font le reste sans code.'],
  ['Quelle différence avec un FP&A ?', 'Le FP&A analyse et prévoit. Le finance engineer lui fournit des chiffres justes et arrêtés.'],
  ['Notre équipe data peut-elle jouer ce rôle ?', 'Elle garde l’infrastructure ; Trame s’installe sur son entrepôt. La finance garde ses règles.'],
  ['Pourquoi un terme anglais ?', 'C’est celui du marché. « Ingénieur financier » désigne déjà un autre métier, en banque.'],
];

export default function FinanceEngineer({ onDemo }) {
  usePageMeta('Finance engineer : définition et missions | Trame', 'Le finance engineer construit les outils de données de l’équipe finance. Notre définition, ses missions, et comment en confier le travail à Trame.');
  return (
    <main>
      {/* TODO: definition to be validated by the founders before publishing. */}
      <PageHero kicker="Finance engineer" title="Le finance engineer arrive en France"
        lead="Il construit l’infrastructure de données de la finance et branche l’IA sur des chiffres arrêtés. Voici notre définition." onDemo={onDemo} />
      <Rails>
        <section className="tl-wrap tl-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
          <Kicker>finance engineer · n. m. · de l’anglais, 2026</Kicker>
          <p className="tl-h2" style={{ maxWidth: 900 }}>Un professionnel de la finance qui construit l’infrastructure de données de son équipe, arrête les chiffres chaque mois et y branche l’IA.</p>
          <p className="tl-lead tl-lead--sm" style={{ color: 'var(--text-muted)' }}>Définition proposée par Trame, octobre 2026.</p>
        </section>
        <Divider />
        <Section kicker="Ses missions" title="Ce qu’il fait, chaque mois">
          <IconGrid items={MISSIONS} />
        </Section>
        <Divider />
        <Section kicker="Le profil" title="Entre le contrôleur de gestion et le data engineer" lead="Il connaît la finance et sait construire des flux de données." aside={<DataCard {...ROLES} text />} />
        <Divider />
        <Section kicker="Pourquoi maintenant" title="Un métier qui monte">
          <IconGrid items={WHY} />
        </Section>
        <Divider />
        <Section kicker="Deux façons d’y arriver" title="Le recruter, ou confier ce travail à Trame">
          <IconGrid items={WAYS} cols={2} />
          <Quote text="Tu n’as pas besoin d’en recruter un, tu en as un là. Déjà parce que c’est hyper dur à recruter." who="Responsable finance, éditeur SaaS · après une démo" />
        </Section>
        <Divider />
        <Section kicker="Pour aller plus loin" title="Vos contrôleurs peuvent le devenir"
          lead="Finance Shift, la newsletter de Nolwenn Belliard, cofondatrice de Trame, pour les équipes finance qui automatisent leur reporting.">
          <div><Button variant="outline" href="https://financeshift.substack.com/" iconRight="arrow_outward">Lire Finance Shift</Button></div>
        </Section>
        <Divider />
        <Faq items={FAQ} />
        <Divider />
        <ClosingCta title="Le travail d’un finance engineer, sans le recruter" sub="Montrez-nous vos sources et vos règles. Nous vous montrons ce que Trame en fait." onDemo={onDemo} />
        <Divider />
      </Rails>
    </main>
  );
}

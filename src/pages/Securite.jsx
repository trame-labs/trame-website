import { Divider, Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DataCard, Faq, IconGrid, Journal, PageHero, Quote, Section, Steps } from '../components/blocks.jsx';
import { usePageMeta } from '../lib/router.js';

const RIGHTS = {
  title: 'Masse salariale · septembre · qui voit quoi', chip: 'Droits à la ligne',
  columns: ['Qui', 'Ce qu’il voit'],
  rows: [
    ['Nadia, DAF', null, 'Chaque salaire, chaque prime'],
    ['Bastien, contrôleur de gestion', null, 'La masse salariale par équipe'],
    ['Sophie, directrice commerciale', null, 'Le budget de son équipe'],
    ['Claude, pour le CEO', 'L’IA hérite des droits de qui l’interroge', 'Ce que voit le CEO, pas plus'],
    ['Commissaire aux comptes', 'Accès limité dans le temps', 'Les mois arrêtés, en lecture'],
  ],
  foot: 'Chaque lecture est journalisée, celles de l’IA comprises.',
};

// TODO: SOC 2 type and report date to be confirmed before publishing.
const COMMITMENTS = [
  ['public', 'Hébergé en Europe', 'Dans votre entrepôt (BigQuery, Databricks) ou dans un entrepôt européen géré par Trame.'],
  ['verified_user', 'SOC 2', 'Contrôles audités selon le référentiel SOC 2. Rapport transmis sous accord de confidentialité.'],
  ['gavel', 'RGPD', 'Un accord de traitement signé avec chaque client, avec la liste de nos sous-traitants.'],
  ['block', 'Aucun entraînement', 'Aucun modèle n’est entraîné sur vos données, ni par Trame ni par ses fournisseurs d’IA.'],
  ['visibility', 'Lecture seule', 'Trame n’écrit rien dans vos outils et ne peut initier aucun paiement.'],
  ['enhanced_encryption', 'Chiffré et réversible', 'Chiffrement en transit et au repos. Vos données et vos règles s’exportent à tout moment.'],
];

const PATH = [
  ['Vos outils et vos banques', 'Vos données restent dans vos comptes et vos logiciels.'],
  ['Des connexions en lecture seule', 'Banques par Bridge, agréé par l’ACPR ; logiciels par connecteurs autorisés.'],
  ['Trame, en Europe', 'Dans votre entrepôt ou un entrepôt européen. Chiffré.'],
  ['Les droits de chacun', 'Dans Trame, Excel ou Claude, chacun lit ce qu’il a le droit de voir.'],
];

const LOG = [
  ['09:12', 'Lecture', 'Claude, pour le CEO, a lu la marge par canal de septembre.', 'Droits du CEO · aucun salaire consulté'],
  ['08:47', 'Correction', 'Bastien a reclassé un avoir Zalando de 1,8 k€, sur octobre.', 'Motif : reçu après l’arrêté · en attente de validation'],
  ['08:31', 'Export', 'Nadia a exporté le P&L arrêté de septembre.', 'Version du 7 octobre'],
  ['Hier', 'Droits', 'Nadia a ouvert un accès au commissaire aux comptes.', 'Mois arrêtés de 2026 · jusqu’au 30 novembre'],
];

const FAQ = [
  ['Comment Claude ou ChatGPT accèdent-ils à mes chiffres ?', 'Par un connecteur sécurisé (MCP) que vous activez. L’IA interroge Trame avec les droits de la personne connectée, et ses lectures sont journalisées.'],
  ['Nos données sortent-elles d’Europe avec Claude ou ChatGPT ?', 'Seule la réponse à la question posée part vers le fournisseur d’IA de la personne. Le reste ne quitte pas l’Europe.'],
  ['L’IA peut-elle modifier nos chiffres ?', 'Non. Lire et modifier sont deux droits distincts. Une correction est faite et validée par une personne.'],
  ['Que se passe-t-il si je quitte Trame ?', 'Vos données restent dans votre entrepôt. Vos règles, vos mois arrêtés et votre journal s’exportent.'],
];

export default function Securite({ onDemo }) {
  usePageMeta('Sécurité : droits par personne, données en Europe | Trame', 'Hébergé en Europe, RGPD, aucun entraînement sur vos données. Droits par personne et par ligne : votre IA voit ce que voit la personne qui l’interroge.');
  return (
    <main>
      <PageHero kicker="Sécurité et confidentialité" title="Partagez les chiffres. Pas la paie."
        lead="Chacun, et chaque IA, voit exactement ce qu’il a le droit de voir. Vos données restent en Europe et n’entraînent aucun modèle." onDemo={onDemo}>
        <DataCard {...RIGHTS} text />
      </PageHero>
      <Rails>
        <Section kicker="Nos engagements" title="Six engagements, par écrit">
          <IconGrid items={COMMITMENTS} />
        </Section>
        <Divider />
        <Section kicker="Le chemin de vos données" title="De votre banque à votre IA, les droits s’appliquent à chaque étape">
          <Steps items={PATH} />
        </Section>
        <Divider />
        <Section kicker="Des droits à la ligne" title="Votre IA hérite des droits de qui l’interroge"
          lead="Quand votre CEO interroge Claude, Claude interroge Trame avec les droits du CEO. Chaque lecture, correction et export est daté et attribué."
          aside={<Journal title="Journal · 14 octobre" chip="Accès et modifications" items={LOG} foot="Chaque lecture et chaque modification sont datées et attribuées." />}>
          <Quote text="Personne n’a le droit de connecter genre Claude au MCP BigQuery." who="Dirigeant finance, éditeur SaaS · sur ce qui bloque l’IA" />
        </Section>
        <Divider />
        <Faq items={FAQ} />
        <Divider />
        <ClosingCta title="Votre RSSI a des questions ?" sub="Nous répondons à votre questionnaire de sécurité et vous transmettons le rapport SOC 2, sous accord de confidentialité."
          label="Envoyer votre questionnaire" href="mailto:contact@trame-labs.com?subject=Questionnaire%20de%20s%C3%A9curit%C3%A9" />
        <Divider />
      </Rails>
    </main>
  );
}

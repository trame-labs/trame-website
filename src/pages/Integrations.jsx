import { useState } from 'react';
import Icon from '../components/ui/Icon.jsx';
import LogoMarquee from '../components/LogoMarquee.jsx';
import { Divider, Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DataCard, Faq, IconGrid, PageHero, Section } from '../components/blocks.jsx';
import SectionHeading from '../sections/SectionHeading.jsx';
import { usePageMeta } from '../lib/router.js';

const SOURCES = {
  title: 'Vos sources · ce matin', chip: '6 sources à jour',
  rows: [
    ['Pennylane', 'Comptabilité · 3 entités', '7 h 02'],
    ['BNP Paribas, Qonto, Wise', 'Banques · connexion agréée DSP2', '7 h 00'],
    ['Stripe, PayPal', 'Paiement · ventes, remboursements, frais', '7 h 05'],
    ['Shopify', 'E-commerce · 2 316 commandes en septembre', '7 h 06'],
    ['HubSpot', 'CRM · 214 contrats', '7 h 04'],
    ['Journal de paie', 'Fichier · réservé à la direction financière', '3 oct.'],
  ],
  foot: 'Aucune migration : vos outils restent en place.',
};

const STATS = [
  ['120+', 'logiciels de compta, facturation, caisse, e-commerce et paiement'],
  ['1 000+', 'banques dans 29 pays, dont 245 en France'],
  ['3', 'façons de brancher une source : connecteur, entrepôt ou fichier'],
];

const READS = [
  ['account_balance', 'Logiciels comptables', 'Grand livre, FEC, balances par entité. Le point de départ de chaque chiffre.'],
  ['savings', 'Banques', 'Comptes, soldes et mouvements, chaque jour. La trésorerie du jour.'],
  ['credit_card', 'PSP', 'Paiements, frais, remboursements, litiges. Chaque versement éclaté.'],
  ['handshake', 'CRM et facturation', 'Contrats, factures, avoirs. Le CA signé face au CA facturé.'],
  ['shopping_bag', 'E-commerce et marketplaces', 'Commandes, remises, retours, commissions. La marge à la commande.'],
  ['badge', 'Paie', 'Le journal de paie, à chaque paie. La masse salariale par équipe, salaires protégés.'],
];

// TODO: confirm before publishing: payroll (connector or file import?), and the tools held back here (Salesforce, Snowflake, Looker Studio, Power BI).
const CATALOGUE = [
  ['Comptabilité', ['A3ERP', 'ACD', 'AFAS', 'Cegid Loop', 'ContaSOL', 'DATEV', 'Dinero', 'Dynamics 365 Business Central', 'e-Boekhouden', 'Exact Online', 'Fiken', 'Fortnox', 'FreeAgent', 'Fulll', 'Holded', 'Horus', 'InexWeb', 'Inqom', 'Lexoffice', 'Minox', 'Moneybird', 'MyUnisoft', 'NetSuite', 'Nmbrs', 'Octopus', 'Odoo', 'Pennylane', 'Procountor', 'QuickBooks', 'Sage 100', 'Sage 200', 'Sage 50', 'Sage BOB 50', 'Sage Génération Experts', 'Sage Intacct', 'sevDesk', 'SnelStart', 'Tiime', 'Tripletex', 'Twinfield', 'Visma e-conomic', 'Visma eAccounting', 'Visma Spiris', 'Winbooks', 'Xero', 'Yuki']],
  ['Banques', ['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'LCL', 'CIC', 'Crédit Mutuel', 'Banque Populaire', 'Caisse d’Epargne', 'Bred', 'La Banque Postale', 'HSBC', 'Arkéa', 'Qonto', 'Shine', 'Revolut Business', 'Memo Bank', 'Swan', 'N26', 'Bunq', 'Wise', 'Ebury', 'iBanFirst', 'American Express']],
  ['Paiement', ['Stripe', 'PayPal', 'Adyen', 'Shopify Payments', 'Mollie', 'GoCardless', 'Klarna', 'Airwallex', 'Payplug', 'SumUp', 'Square', 'Zettle', 'Lightspeed Payments']],
  ['Facturation et CRM', ['HubSpot', 'Pipedrive', 'Chargebee', 'Hyperline', 'Axonaut', 'Sellsy', 'Boond', 'Dolibarr', 'EBP', 'Evoliz', 'Harvest', 'Odoo Invoicing', 'Qonto Facturation', 'QuickBooks Invoicing', 'Teamleader', 'VosFactures', 'Zoho Invoice']],
  ['E-commerce', ['Shopify', 'WooCommerce', 'PrestaShop', 'Magento', 'Amazon Seller Central', 'eBay', 'Zalando (relevés)', 'La Redoute (relevés)']],
  ['Caisse', ['Lightspeed', 'Shopify POS', 'Square', 'SumUp', 'Zettle', 'Cegid Retail', 'Fastmag', 'HelloCash', 'Hiboutik', 'Clyo Systems', 'Odoo POS']],
  ['Paie', ['PayFit', 'Silae', 'Lucca', 'Sage Paie', 'Cegid Paie', 'ADP']],
  ['Entrepôts et fichiers', ['BigQuery', 'Databricks', 'Excel', 'CSV', 'Google Sheets']],
  ['Vos IA', ['Claude', 'ChatGPT', 'Excel', 'Google Sheets']],
];

const WAYS = [
  ['Par connecteur', 'Autorisé une fois, synchronisé chaque jour, en lecture seule.'],
  ['Par votre entrepôt', 'BigQuery ou Databricks, lus sur place avec les règles de votre équipe data.'],
  ['Par fichier', 'Excel, CSV ou Google Sheets, versionnés comme le reste.'],
];

const FAQ = [
  ['Mon outil n’est pas dans la liste.', 'Dites-le-nous. En attendant, un export régulier en fichier fonctionne, et nous ajoutons des connecteurs chaque mois.'],
  ['Combien de temps pour brancher une source ?', 'Quelques minutes pour autoriser la connexion, quelques jours pour rapprocher l’historique. Premiers chiffres en deux semaines.'],
  ['Les connexions bancaires sont-elles sûres ?', 'Elles passent par Bridge, établissement de paiement agréé par l’ACPR, en lecture seule. Trame ne peut initier aucun paiement.'],
  ['Faut-il changer de logiciel comptable ?', 'Non. Trame part de votre compta telle qu’elle est, et de son FEC.'],
];

function Catalogue() {
  const [cat, setCat] = useState('Tous');
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const groups = CATALOGUE
    .filter(([name]) => cat === 'Tous' || name === cat)
    .map(([name, tools]) => [name, tools.filter((t) => t.toLowerCase().includes(needle))])
    .filter(([, tools]) => tools.length);
  return (
    <section id="catalogue" className="tl-wrap tl-section" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <SectionHeading kicker="Catalogue">Cherchez votre outil</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label className="tl-search">
          <Icon name="search" size={20} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pennylane, Stripe, Qonto…" aria-label="Chercher un outil" />
        </label>
        <div className="tl-chips" role="group" aria-label="Catégories">
          {['Tous', ...CATALOGUE.map(([n]) => n)].map((n) => (
            <button key={n} type="button" aria-pressed={cat === n} onClick={() => setCat(n)}>{n}</button>
          ))}
        </div>
      </div>
      {groups.length ? groups.map(([name, tools]) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h3 className="tl-h3" style={{ margin: 0 }}>{name} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{tools.length}</span></h3>
          <ul className="tl-tools">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )) : (
        <p className="tl-lead">Pas encore dans la liste. Un import de fichier fonctionne en attendant : <a href="mailto:contact@trame-labs.com">dites-nous lequel</a>.</p>
      )}
    </section>
  );
}

export default function Integrations({ onDemo }) {
  usePageMeta('Intégrations : compta, banques, CRM, PSP, paie | Trame', 'Pennylane, Sage, Cegid, HubSpot, Stripe, Shopify, Qonto, BNP Paribas : vos outils et plus de 1 000 banques branchés en lecture seule, sans migration.');
  return (
    <main>
      <PageHero kicker="Intégrations" title="Branché sur vos outils. Sans migration."
        lead="Plus de 120 logiciels et plus de 1 000 banques en Europe, en lecture seule. Trame se branche sur ce que vous avez déjà." onDemo={onDemo}>
        <DataCard {...SOURCES} />
      </PageHero>
      <Rails>
        <section className="tl-wrap tl-section tl-section--tight tl-grid-3">
          {STATS.map(([n, label]) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span className="tl-h2 tl-h2--xl">{n}</span>
              <p className="tl-lead tl-lead--sm">{label}</p>
            </div>
          ))}
        </section>
        <Divider />
        <Section kicker="Ce que Trame lit" title="Et ce que vous en faites" lead="Toutes les connexions sont en lecture seule.">
          <IconGrid items={READS} />
        </Section>
        <Divider />
        <Catalogue />
        <Divider />
        <section className="tl-wrap tl-section tl-integrations">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SectionHeading kicker="Trois façons de brancher" maxWidth={520}>Connecteur, entrepôt ou fichier</SectionHeading>
            {WAYS.map(([t, d]) => (
              <div key={t}><h3 className="tl-h3" style={{ margin: 0 }}>{t}</h3><p className="tl-lead tl-lead--sm">{d}</p></div>
            ))}
          </div>
          <LogoMarquee />
        </section>
        <Divider />
        <Section kicker="Dans l’autre sens" title="Vos IA lisent Trame"
          lead="Claude et ChatGPT se branchent sur Trame par un connecteur sécurisé (MCP), Excel et vos tableaux de bord aussi. Tous lisent les mêmes chiffres arrêtés, avec les droits de la personne connectée." />
        <Divider />
        <Faq items={FAQ} />
        <Divider />
        <ClosingCta title="Vos outils branchés en quelques jours" sub="Dites-nous quels outils vous utilisez. Vos premiers chiffres arrivent en deux semaines." onDemo={onDemo} />
        <Divider />
      </Rails>
    </main>
  );
}

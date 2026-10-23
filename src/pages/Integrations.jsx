// Integrations page. Copy and blocks follow the « Site Trame V1 » mock-up (integrations.html); the hero frame and the closing landscape are the site's own.
import { useMemo, useState } from 'react';
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, LinkButton, PageHero } from '../components/blocks.jsx';

// Catalogue labels, kept together (French / English).
const labels = (t) => ({
  search: t('Chercher un outil', 'Search for a tool'),
  placeholder: t('Pennylane, Stripe, Qonto, Shopify…', 'Pennylane, Stripe, Qonto, Shopify…'),
  filtersLabel: t('Filtrer par catégorie', 'Filter by category'),
  count: (n) => t(`${n} ${n > 1 ? 'outils' : 'outil'}`, `${n} ${n === 1 ? 'tool' : 'tools'}`),
  more: (n) => t(`Voir les ${n} outils`, `See all ${n} tools`),
});

// Catalogue filters: [data-f, French label, English label]. Categories in CATALOGUE use the same keys.
const FILTERS = [
  ['all', 'Tous', 'All'], ['compta', 'Comptabilité', 'Accounting'], ['banques', 'Banques', 'Banks'], ['paiement', 'Paiement', 'Payments'],
  ['crm', 'Facturation', 'Billing'], ['ecommerce', 'E-commerce', 'E-commerce'], ['caisse', 'Caisse', 'Point of sale'], ['paie', 'Paie', 'Payroll'],
  ['data', 'Entrepôts', 'Data warehouses'], ['ia', 'Vos IA', 'Your AI'],
];

// English for the tool descriptions in CATALOGUE (keyed by the French).
const DESC_EN = {
  'Comptabilité · grand livre, écritures, FEC': 'Accounting · general ledger, entries, FEC',
  'Banque · soldes et mouvements, chaque jour': 'Bank · balances and transactions, every day',
  'Paiement · ventes, frais, remboursements': 'Payments · sales, fees, refunds',
  'CRM et facturation · contrats, factures, avoirs': 'CRM and billing · contracts, invoices, credit notes',
  'E-commerce · commandes, retours, commissions': 'E-commerce · orders, returns, commissions',
  'Marketplace · relevés importés chaque mois': 'Marketplace · statements imported every month',
  'Caisse · ventes en boutique': 'Point of sale · in-store sales',
  'Paie · journal de paie, par import': 'Payroll · payroll journal, by import',
  'Entrepôt ou fichier · lu sur place': 'Data warehouse or file · read in place',
  'IA et analyse · lit Trame, avec vos droits': 'AI and analytics · reads Trame, with your permissions',
};

// [category, [[name, description, popular?], …]]. Popular tools (.tool.pop) make up the compact view.
const CATALOGUE = [
  ['compta', [
    ["a3ERP", "Comptabilité · grand livre, écritures, FEC"],
    ["ACD", "Comptabilité · grand livre, écritures, FEC"],
    ["AFAS", "Comptabilité · grand livre, écritures, FEC"],
    ["Cegid Loop", "Comptabilité · grand livre, écritures, FEC", true],
    ["ContaSOL", "Comptabilité · grand livre, écritures, FEC"],
    ["DATEV", "Comptabilité · grand livre, écritures, FEC"],
    ["Dinero", "Comptabilité · grand livre, écritures, FEC"],
    ["Dynamics 365 Business Central", "Comptabilité · grand livre, écritures, FEC"],
    ["e-Boekhouden", "Comptabilité · grand livre, écritures, FEC"],
    ["Exact Online", "Comptabilité · grand livre, écritures, FEC"],
    ["Fiken", "Comptabilité · grand livre, écritures, FEC"],
    ["Fortnox", "Comptabilité · grand livre, écritures, FEC"],
    ["FreeAgent", "Comptabilité · grand livre, écritures, FEC"],
    ["Fulll", "Comptabilité · grand livre, écritures, FEC"],
    ["Holded", "Comptabilité · grand livre, écritures, FEC"],
    ["Horus", "Comptabilité · grand livre, écritures, FEC"],
    ["InexWeb · In Extenso", "Comptabilité · grand livre, écritures, FEC"],
    ["Inqom", "Comptabilité · grand livre, écritures, FEC"],
    ["Lexoffice", "Comptabilité · grand livre, écritures, FEC"],
    ["Minox", "Comptabilité · grand livre, écritures, FEC"],
    ["Moneybird", "Comptabilité · grand livre, écritures, FEC"],
    ["MyUnisoft", "Comptabilité · grand livre, écritures, FEC"],
    ["NetSuite", "Comptabilité · grand livre, écritures, FEC", true],
    ["Nmbrs", "Comptabilité · grand livre, écritures, FEC"],
    ["Octopus", "Comptabilité · grand livre, écritures, FEC"],
    ["Odoo", "Comptabilité · grand livre, écritures, FEC"],
    ["Pennylane", "Comptabilité · grand livre, écritures, FEC", true],
    ["Procountor", "Comptabilité · grand livre, écritures, FEC"],
    ["QuickBooks", "Comptabilité · grand livre, écritures, FEC", true],
    ["Sage 100", "Comptabilité · grand livre, écritures, FEC", true],
    ["Sage 200", "Comptabilité · grand livre, écritures, FEC"],
    ["Sage 50", "Comptabilité · grand livre, écritures, FEC"],
    ["Sage BOB 50", "Comptabilité · grand livre, écritures, FEC"],
    ["Sage Génération Experts", "Comptabilité · grand livre, écritures, FEC"],
    ["Sage Intacct", "Comptabilité · grand livre, écritures, FEC"],
    ["sevDesk", "Comptabilité · grand livre, écritures, FEC"],
    ["SnelStart", "Comptabilité · grand livre, écritures, FEC"],
    ["Tiime", "Comptabilité · grand livre, écritures, FEC"],
    ["Tripletex", "Comptabilité · grand livre, écritures, FEC"],
    ["Twinfield", "Comptabilité · grand livre, écritures, FEC"],
    ["Visma e-conomic", "Comptabilité · grand livre, écritures, FEC"],
    ["Visma eAccounting", "Comptabilité · grand livre, écritures, FEC"],
    ["Visma Spiris", "Comptabilité · grand livre, écritures, FEC"],
    ["Winbooks", "Comptabilité · grand livre, écritures, FEC"],
    ["Xero", "Comptabilité · grand livre, écritures, FEC", true],
    ["Yuki", "Comptabilité · grand livre, écritures, FEC"],
  ]],
  ['banques', [
    ["BNP Paribas", "Banque · soldes et mouvements, chaque jour", true],
    ["Société Générale", "Banque · soldes et mouvements, chaque jour", true],
    ["Crédit Agricole", "Banque · soldes et mouvements, chaque jour"],
    ["LCL", "Banque · soldes et mouvements, chaque jour"],
    ["CIC", "Banque · soldes et mouvements, chaque jour"],
    ["Crédit Mutuel", "Banque · soldes et mouvements, chaque jour"],
    ["Banque Populaire", "Banque · soldes et mouvements, chaque jour"],
    ["Caisse d’Epargne", "Banque · soldes et mouvements, chaque jour"],
    ["Bred", "Banque · soldes et mouvements, chaque jour"],
    ["Natixis", "Banque · soldes et mouvements, chaque jour"],
    ["La Banque Postale", "Banque · soldes et mouvements, chaque jour"],
    ["HSBC", "Banque · soldes et mouvements, chaque jour"],
    ["Arkéa", "Banque · soldes et mouvements, chaque jour"],
    ["Banque Palatine", "Banque · soldes et mouvements, chaque jour"],
    ["Crédit Coopératif", "Banque · soldes et mouvements, chaque jour"],
    ["Rothschild Martin Maurel", "Banque · soldes et mouvements, chaque jour"],
    ["Neuflize OBC", "Banque · soldes et mouvements, chaque jour"],
    ["Banque Transatlantique", "Banque · soldes et mouvements, chaque jour"],
    ["Delubac", "Banque · soldes et mouvements, chaque jour"],
    ["Qonto", "Banque · soldes et mouvements, chaque jour", true],
    ["Shine", "Banque · soldes et mouvements, chaque jour"],
    ["Revolut Business", "Banque · soldes et mouvements, chaque jour"],
    ["Memo Bank", "Banque · soldes et mouvements, chaque jour"],
    ["Blank", "Banque · soldes et mouvements, chaque jour"],
    ["Manager.one", "Banque · soldes et mouvements, chaque jour"],
    ["N26", "Banque · soldes et mouvements, chaque jour"],
    ["Bunq", "Banque · soldes et mouvements, chaque jour"],
    ["BoursoBank", "Banque · soldes et mouvements, chaque jour"],
    ["Wise", "Banque · soldes et mouvements, chaque jour"],
    ["Ebury", "Banque · soldes et mouvements, chaque jour"],
    ["iBanFirst", "Banque · soldes et mouvements, chaque jour"],
    ["American Express", "Banque · soldes et mouvements, chaque jour"],
    ["Swan", "Banque · soldes et mouvements, chaque jour"],
    ["Ponto", "Banque · soldes et mouvements, chaque jour"],
    ["Tink", "Banque · soldes et mouvements, chaque jour"],
    ["Viva", "Banque · soldes et mouvements, chaque jour"],
    ["Amnis", "Banque · soldes et mouvements, chaque jour"],
  ]],
  ['paiement', [
    ["Stripe", "Paiement · ventes, frais, remboursements", true],
    ["PayPal", "Paiement · ventes, frais, remboursements", true],
    ["Adyen", "Paiement · ventes, frais, remboursements", true],
    ["Shopify Payments", "Paiement · ventes, frais, remboursements"],
    ["Mollie", "Paiement · ventes, frais, remboursements"],
    ["GoCardless", "Paiement · ventes, frais, remboursements"],
    ["Klarna", "Paiement · ventes, frais, remboursements"],
    ["Airwallex", "Paiement · ventes, frais, remboursements"],
    ["Payplug", "Paiement · ventes, frais, remboursements"],
    ["SumUp", "Paiement · ventes, frais, remboursements"],
    ["Square", "Paiement · ventes, frais, remboursements"],
    ["Zettle", "Paiement · ventes, frais, remboursements"],
    ["Lightspeed Payments", "Paiement · ventes, frais, remboursements"],
  ]],
  ['crm', [
    ["HubSpot", "CRM et facturation · contrats, factures, avoirs", true],
    ["Salesforce", "CRM et facturation · contrats, factures, avoirs", true],
    ["Pipedrive", "CRM et facturation · contrats, factures, avoirs"],
    ["Attio", "CRM et facturation · contrats, factures, avoirs"],
    ["Chargebee", "CRM et facturation · contrats, factures, avoirs", true],
    ["Hyperline", "CRM et facturation · contrats, factures, avoirs"],
    ["Axonaut", "CRM et facturation · contrats, factures, avoirs"],
    ["Sellsy", "CRM et facturation · contrats, factures, avoirs"],
    ["Billit", "CRM et facturation · contrats, factures, avoirs"],
    ["Boond", "CRM et facturation · contrats, factures, avoirs"],
    ["Digiforma", "CRM et facturation · contrats, factures, avoirs"],
    ["Dolibarr", "CRM et facturation · contrats, factures, avoirs"],
    ["EBP", "CRM et facturation · contrats, factures, avoirs"],
    ["Evoliz", "CRM et facturation · contrats, factures, avoirs"],
    ["Factomos", "CRM et facturation · contrats, factures, avoirs"],
    ["Fatture in Cloud", "CRM et facturation · contrats, factures, avoirs"],
    ["Fuga", "CRM et facturation · contrats, factures, avoirs"],
    ["Harvest", "CRM et facturation · contrats, factures, avoirs"],
    ["Odoo Invoicing", "CRM et facturation · contrats, factures, avoirs"],
    ["Organilog", "CRM et facturation · contrats, factures, avoirs"],
    ["Qonto Facturation", "CRM et facturation · contrats, factures, avoirs"],
    ["QuickBooks Invoicing", "CRM et facturation · contrats, factures, avoirs"],
    ["Sage 100 Gestion commerciale", "CRM et facturation · contrats, factures, avoirs"],
    ["Teamleader", "CRM et facturation · contrats, factures, avoirs"],
    ["VosFactures", "CRM et facturation · contrats, factures, avoirs"],
    ["Zenfacture", "CRM et facturation · contrats, factures, avoirs"],
    ["Zoho Invoice", "CRM et facturation · contrats, factures, avoirs"],
  ]],
  ['ecommerce', [
    ["Shopify", "E-commerce · commandes, retours, commissions", true],
    ["WooCommerce", "E-commerce · commandes, retours, commissions"],
    ["PrestaShop", "E-commerce · commandes, retours, commissions"],
    ["Magento", "E-commerce · commandes, retours, commissions"],
    ["Amazon Seller Central", "E-commerce · commandes, retours, commissions"],
    ["eBay", "E-commerce · commandes, retours, commissions"],
    ["Zalando", "Marketplace · relevés importés chaque mois"],
    ["La Redoute", "Marketplace · relevés importés chaque mois"],
  ]],
  ['caisse', [
    ["Lightspeed", "Caisse · ventes en boutique"],
    ["Shopify POS", "Caisse · ventes en boutique"],
    ["Square", "Caisse · ventes en boutique"],
    ["SumUp", "Caisse · ventes en boutique"],
    ["Zettle", "Caisse · ventes en boutique"],
    ["Cegid Retail", "Caisse · ventes en boutique"],
    ["Fastmag", "Caisse · ventes en boutique"],
    ["HelloCash", "Caisse · ventes en boutique"],
    ["Hiboutik", "Caisse · ventes en boutique"],
    ["Clyo Systems", "Caisse · ventes en boutique"],
    ["Connectill", "Caisse · ventes en boutique"],
    ["Odoo POS", "Caisse · ventes en boutique"],
    ["ShopCaisse", "Caisse · ventes en boutique"],
    ["Mpluskassa", "Caisse · ventes en boutique"],
  ]],
  ['paie', [
    ["PayFit", "Paie · journal de paie, par import", true],
    ["Silae", "Paie · journal de paie, par import"],
    ["Lucca", "Paie · journal de paie, par import"],
    ["Sage Paie", "Paie · journal de paie, par import"],
    ["Cegid Paie", "Paie · journal de paie, par import"],
    ["ADP", "Paie · journal de paie, par import"],
  ]],
  ['data', [
    ["BigQuery", "Entrepôt ou fichier · lu sur place", true],
    ["Databricks", "Entrepôt ou fichier · lu sur place"],
    ["Snowflake", "Entrepôt ou fichier · lu sur place"],
    ["Excel", "Entrepôt ou fichier · lu sur place"],
    ["CSV", "Entrepôt ou fichier · lu sur place"],
    ["Google Sheets", "Entrepôt ou fichier · lu sur place"],
  ]],
  ['ia', [
    ["Claude", "IA et analyse · lit Trame, avec vos droits", true],
    ["ChatGPT", "IA et analyse · lit Trame, avec vos droits", true],
    ["Excel", "IA et analyse · lit Trame, avec vos droits"],
    ["Google Sheets", "IA et analyse · lit Trame, avec vos droits"],
    ["Looker Studio", "IA et analyse · lit Trame, avec vos droits"],
    ["Power BI", "IA et analyse · lit Trame, avec vos droits"],
  ]],
];
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Search, category filters and the compact view (popular tools only, until "Voir les N outils"), as in the mock-up's script.js.
// Search matches the visible text, so it works in either language.
function Catalogue() {
  const t = useT();
  const L = labels(t);
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const q = norm(query.trim());
  const compact = current === 'all' && !q && !expanded;
  const { cats, total } = useMemo(() => {
    let n = 0;
    const list = CATALOGUE.map(([cat, tools]) => {
      const inCat = current === 'all' || cat === current;
      const shown = tools.map(([name, desc, pop]) => [name, t(desc, DESC_EN[desc]), pop]).filter(([name, desc, pop]) => {
        const ok = inCat && (!q || norm(`${name} ${desc}`).includes(q));
        if (ok) n++;
        return ok && (!compact || pop);
      });
      return [cat, shown];
    });
    return { cats: list, total: n };
  }, [q, current, compact, t]);

  return (
    <>
      <div className="int-tools">
        <label className="sr" htmlFor="int-q">{L.search}</label>
        <input autoComplete="off" id="int-q" placeholder={L.placeholder} type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        <span aria-live="polite" className="count" id="int-count">{L.count(total)}</span>
      </div>
      <div aria-label={L.filtersLabel} className="int-filters" role="group">
        {FILTERS.map(([f, fr, en]) => (
          <button key={f} aria-pressed={current === f ? 'true' : 'false'} data-f={f} type="button" onClick={() => setCurrent(f)}>{t(fr, en)}</button>
        ))}
      </div>
      <div className="int-grid cards">
        {cats.map(([cat, tools]) => (
          <div key={cat} className="int-cat" data-cat={cat} hidden={tools.length === 0}>
            {tools.map(([name, desc, pop]) => (
              <div key={name} className={pop ? 'tool pop' : 'tool'}><i aria-hidden="true">{name[0].toUpperCase()}</i><div><b>{name}</b><small>{desc}</small></div></div>
            ))}
          </div>
        ))}
      </div>
      <p style={{ marginTop: '20px' }}><button className="btn btn-line" id="int-more" type="button" hidden={!compact} onClick={() => setExpanded(true)}>{L.more(total)}</button></p>
      <p className="int-empty" hidden={total !== 0} id="int-empty">{t('Aucun outil ne correspond. Un import de fichier fonctionne en attendant, et nous ajoutons des connecteurs chaque mois.', 'No tool matches. A file import works in the meantime, and we add connectors every month.')} <Link to="/demo">{t('Dites-nous lequel.', 'Tell us which one.')}</Link></p>
    </>
  );
}

const FAQ = [
  ['Mon outil n’est pas dans la liste.', 'Dites-le-nous. En attendant, un export régulier en fichier fonctionne, et nous ajoutons des connecteurs chaque mois.',
    'My tool isn’t on the list.', 'Tell us. In the meantime, a regular file export works, and we add connectors every month.'],
  ['Combien d’historique récupérez-vous ?', 'L’historique disponible dans vos logiciels, en général plusieurs exercices. Pour les banques, de quelques mois à trois ans selon l’établissement ; vos relevés plus anciens s’importent en fichier.',
    'How much history do you pull in?', 'Whatever history your software holds, usually several fiscal years. For banks, from a few months to three years depending on the bank; older statements can be imported as files.'],
  ['Faut-il une équipe data ?', 'Non. Notre équipe de déploiement branche vos sources et écrit vos règles avec vous. Si vous avez une équipe data, Trame s’installe sur son entrepôt.',
    'Do we need a data team?', 'No. Our deployment team connects your sources and writes your rules with you. If you have a data team, Trame runs on its data warehouse.'],
  ['Combien de temps pour brancher une source ?', 'Quelques minutes pour autoriser la connexion ; quelques jours pour rapprocher l’historique avec vos règles. Vos premiers chiffres arrivent en deux semaines.',
    'How long does it take to connect a source?', 'A few minutes to authorize the connection; a few days to reconcile the history with your rules. Your first figures arrive within two weeks.'],
  ['Les connexions bancaires sont-elles sûres ?', 'Elles passent par Bridge, établissement de paiement agréé par l’ACPR (n° 16918), en lecture seule. Trame ne peut initier aucun paiement.',
    'Are the bank connections secure?', 'They go through Bridge, a payment institution licensed by the French banking regulator (ACPR, no. 16918), read-only. Trame cannot initiate any payment.'],
  ['Mes données sont-elles copiées chez Trame ?', 'Si vous avez un entrepôt, elles y restent : Trame n’en garde que des métadonnées. Sinon, elles sont hébergées dans un entrepôt européen géré par Trame.',
    'Is my data copied to Trame?', 'If you have a data warehouse, it stays there: Trame keeps only metadata. Otherwise, it is hosted in a European data warehouse managed by Trame.'],
  ['Faut-il changer de logiciel comptable ?', 'Non. Trame part de votre compta telle qu’elle est, et de son FEC.',
    'Do we need to change accounting software?', 'No. Trame starts from your books as they are, and from their FEC (the French general-ledger audit file).'],
];

export default function Integrations() {
  const t = useT();
  usePageMeta(
    t('Intégrations : compta, banques, CRM, PSP, paie | Trame', 'Integrations: accounting, banks, CRM, payment providers, payroll | Trame'),
    t('Pennylane, Sage, Cegid, HubSpot, Stripe, Shopify, Qonto, BNP Paribas : vos outils et plus de 1 000 banques branchés en lecture seule, sans migration.', 'Pennylane, Sage, Cegid, HubSpot, Stripe, Shopify, Qonto, BNP Paribas: your tools and more than 1,000 banks connected read-only, with no migration.'),
  );
  return (
    <main className="v1">
      <PageHero
        kicker={t('Intégrations', 'Integrations')}
        title={t('Gardez vos outils. Trame les relie.', 'Keep your tools. Trame connects them.')}
        lead={t(
          <>Comptabilité, banques, PSP, CRM, facturation, e-commerce, caisse, paie : plus de 120 logiciels et plus de 1 000 banques en Europe. <span>Trame se branche en lecture seule sur ce que vous avez déjà, sans migration.</span></>,
          <>Accounting, banks, payment providers (PSPs), CRM, billing, e-commerce, point of sale, payroll: more than 120 software tools and more than 1,000 banks in Europe. <span>Trame connects read-only to what you already have, with no migration.</span></>,
        )}
        ctas={<><LinkButton to="#catalogue" size="lg" variant="signal">{t('Découvrir les intégrations', 'Explore the integrations')}</LinkButton><LinkButton to="/demo" size="lg" variant="ghostInverse">{t('Réserver une démo', 'Book a demo')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : l’état des sources branchées sur Trame', 'Example: the status of the sources connected to Trame')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Vos sources · ce matin', 'Your sources · this morning')}</p><span className="chip">{t('7 sources à jour', '7 sources up to date')}</span></div>
        <table className="rows">
        <tbody>
        <tr><td>Pennylane<span className="src">{t('Comptabilité · 3 entités', 'Accounting · 3 entities')}</span></td><td className="v">{t('7 h 02', '7:02 am')}</td></tr>
        <tr><td>BNP Paribas, Qonto, Wise<span className="src">{t('Banques · connexion agréée DSP2', 'Banks · PSD2-licensed connection')}</span></td><td className="v">{t('7 h 00', '7:00 am')}</td></tr>
        <tr><td>Stripe, PayPal<span className="src">{t('Paiement · ventes, remboursements, frais', 'Payments · sales, refunds, fees')}</span></td><td className="v">{t('7 h 05', '7:05 am')}</td></tr>
        <tr><td>Shopify<span className="src">{t('E-commerce · 2 316 commandes en septembre', 'E-commerce · 2,316 orders in September')}</span></td><td className="v">{t('7 h 06', '7:06 am')}</td></tr>
        <tr><td>HubSpot<span className="src">{t('CRM · 214 contrats', 'CRM · 214 contracts')}</span></td><td className="v">{t('7 h 04', '7:04 am')}</td></tr>
        <tr><td>{t('Journal de paie', 'Payroll journal')}<span className="src">{t('Fichier · accès réservé à la direction financière', 'File · access restricted to the finance leadership')}</span></td><td className="v">{t('3 oct.', 'Oct 3')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Aucune migration : vos outils restent en place.', 'No migration: your tools stay in place.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <section className="band tight">
        <div className="wrap">
        <div className="stats3">
        <div><span className="big">120+</span><p>{t('logiciels de comptabilité, facturation, caisse, e-commerce, paiement et paie', 'accounting, billing, point-of-sale, e-commerce, payment and payroll tools')}</p></div>
        <div><span className="big">{t('1 000+', '1,000+')}</span><p>{t('banques dans 29 pays, dont 245 en France', 'banks in 29 countries, including 245 in France')}</p></div>
        <div><span className="big">{t('100 %', '100%')}</span><p>{t('en lecture seule : Trame n’écrit rien dans vos outils et n’initie aucun paiement', 'read-only: Trame writes nothing to your tools and initiates no payment')}</p></div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap">
        <div className="intro"><h2 className="h2">{t('Ce que vos outils deviennent, une fois reliés.', 'What your tools become, once connected.')}</h2></div>
        <div className="feats four">
        <div className="feat"><h3>{t('Un seul chiffre', 'One figure')}</h3><p>{t('Compta, CRM, facturation et banques réconciliés ligne à ligne : le même chiffre, quelle que soit la source.', 'Accounting, CRM, billing and banks reconciled line by line: the same figure, whatever the source.')}</p></div>
        <div className="feat"><h3>{t('Plus aucun export', 'No more exports')}</h3><p>{t('Chaque source se met à jour seule, chaque jour. Fini les exports à refaire chaque mois.', 'Every source updates itself, every day. No more exports to redo each month.')}</p></div>
        <div className="feat"><h3>{t('Le détail qui manque à la compta', 'The detail the books lack')}</h3><p>{t('Du contrat à la commande, du salarié au versement : la maille fine, réconciliée avec vos écritures.', 'From contract to order, from employee to payout: the fine-grained detail, reconciled with your entries.')}</p></div>
        <div className="feat"><h3>{t('Vos IA branchées', 'Your AI, connected')}</h3><p>{t('Claude, ChatGPT et Excel lisent Trame, avec les droits de chacun.', 'Claude, ChatGPT and Excel read Trame, with each person’s permissions.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band paper" id="catalogue">
        <div className="wrap">
        <div className="intro">
        <h2 className="h2">{t('Trouvez votre outil.', 'Find your tool.')}</h2>
        <p>{t('Cherchez par nom, ou filtrez par catégorie. Pour les banques, une sélection parmi plus de 1 000 établissements.', 'Search by name, or filter by category. For banks, a selection from more than 1,000 institutions.')}</p>
        </div>
        <Catalogue />
        <p className="int-ask">{t('Votre outil n’est pas dans la liste ? Un import de fichier fonctionne en attendant, et nous ajoutons des connecteurs chaque mois.', 'Your tool isn’t on the list? A file import works in the meantime, and we add connectors every month.')} <Link to="/demo">{t('Dites-nous lequel →', 'Tell us which one →')}</Link></p>
        </div>
        </section>
        <section className="band cream">
        <div className="wrap">
        <div className="intro"><h2 className="h2">{t('Trois façons de brancher une source.', 'Three ways to connect a source.')}</h2></div>
        <div className="feats">
        <div className="feat"><h3>{t('Par connecteur', 'By connector')}</h3><p>{t('Pour vos logiciels et vos banques : une connexion autorisée une fois, synchronisée chaque jour. En lecture seule.', 'For your software and your banks: a connection authorized once, synced every day. Read-only.')}</p></div>
        <div className="feat"><h3>{t('Par votre entrepôt', 'Through your data warehouse')}</h3><p>{t('Vos données sont déjà dans BigQuery, Snowflake ou Databricks ? Trame les lit sur place, avec les règles d’accès de votre équipe data.', 'Your data is already in BigQuery, Snowflake or Databricks? Trame reads it in place, with your data team’s access rules.')}</p></div>
        <div className="feat"><h3>{t('Par fichier', 'By file')}</h3><p>{t('Excel, CSV ou Google Sheets : pour un journal de paie, une banque à l’étranger ou un outil maison. Le fichier est versionné comme le reste.', 'Excel, CSV or Google Sheets: for a payroll journal, a bank abroad or an in-house tool. The file is versioned like everything else.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Dans l’autre sens', 'The other way around')}</p>
        <h2 className="h2">{t('Vos IA lisent Trame.', 'Your AI reads Trame.')}</h2>
        <p>{t('Claude et ChatGPT se branchent sur Trame par un connecteur sécurisé (MCP). Excel et vos tableaux de bord aussi. Tous lisent les mêmes chiffres réconciliés, avec les droits de la personne connectée.', 'Claude and ChatGPT connect to Trame through a secure connector (MCP). So do Excel and your dashboards. They all read the same reconciled figures, with the permissions of the person signed in.')}</p>
        </div>
        <ul className="ticks">
        <li><div><b>{t('Claude et ChatGPT', 'Claude and ChatGPT')}</b> <span>{t('posent vos questions à Trame, avec vos droits.', 'ask Trame your questions, with your permissions.')}</span></div></li>
        <li><div><b>{t('Excel et Google Sheets', 'Excel and Google Sheets')}</b> <span>{t('reçoivent les chiffres validés, à jour.', 'receive the approved figures, up to date.')}</span></div></li>
        <li><div><b>{t('Vos tableaux de bord', 'Your dashboards')}</b> <span>{t('se construisent sur des chiffres qui ne bougent plus.', 'are built on figures that no longer move.')}</span></div></li>
        </ul>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq">{FAQ.map(([qFr, aFr, qEn, aEn]) => (
          <details key={qFr}><summary>{t(qFr, qEn)}</summary><div><p>{t(aFr, aEn)}</p></div></details>
        ))}</div>
        </div>
        </section>
        <ClosingCta
          title={t('Vos outils restent. Les ressaisies disparaissent.', 'Your tools stay. The re-keying goes away.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de vos outils, de vos sources et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first conversation: we run an assessment of your tools, your sources and your pain points. You leave knowing how much you stand to gain.')}
        />
      </Rails>
    </main>
  );
}

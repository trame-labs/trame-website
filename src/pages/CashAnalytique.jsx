// CashAnalytique page. Copy and blocks follow the « Site Trame V1 » mock-up (cash-analytique.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function CashAnalytique() {
  const t = useT();
  usePageMeta(t('Trésorerie consolidée et cash-flow analytique | Trame', 'Consolidated cash and cash flow analytics | Trame'), t('Toutes vos banques et vos PSP réunis chaque jour, réconciliés avec la facturation, la paie et la compta. Votre trésorerie consolidée, chaque variation expliquée.', 'All your banks and payment providers brought together every day, reconciled with invoicing, payroll and the books. Your consolidated cash position, every change explained.'));
  return (
    <main className="v1">
      <PageHero
        kicker={<><Link to="/#usages">{t('Cas d’usage', 'Use cases')}</Link> {t('· Cash analytique', '· Cash analytics')}</>}
        title={t('Votre trésorerie de ce matin, consolidée et expliquée.', 'This morning’s cash position, consolidated and explained.')}
        lead={<>{t('Toutes vos banques et vos PSP réunis chaque jour, puis réconciliés avec la facturation, la paie et la compta.', 'All your banks and payment providers brought together every day, then reconciled with invoicing, payroll and the books.')} <span>{t('Trésorerie du groupe et flux par nature, par entité, devise, client ou projet.', 'Group cash and flows by category, entity, currency, customer or project.')}</span></>}
        ctas={<><DemoButton /><LinkButton to="#comment" size="lg" variant="ghostInverse">{t('Voir comment ça marche', 'See how it works')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : la trésorerie du matin dans Trame', 'Example: the morning cash position in Trame')} className="card" data-ledger="" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t('Trésorerie · 15 octobre, 8 h', 'Cash · October 15, 8 am')} <span>{t('· k€', '· €k')}</span></p>
        <span className="chip">{t('Banques et PSP à jour à 7 h', 'Banks and PSPs updated at 7 am')}</span>
        </div>
        <div className="card-head" style={{ paddingBlock: '10px', background: 'var(--paper)' }}>
        <span style={{ fontSize: '12.5px', color: 'var(--faint)' }}>{t('Vue', 'View')}</span>
        <div aria-label={t('Choisir la vue', 'Choose the view')} className="seg" role="group">
        <button aria-pressed="true" data-who="ent" type="button">{t('Par entité', 'By entity')}</button>
        <button aria-pressed="false" data-who="nat" type="button">{t('Depuis hier', 'Since yesterday')}</button>
        </div>
        </div>
        <table className="rows" data-for="ent">
        <tbody>
        <tr><td>France · BNP, Qonto<span className="src">EUR</span></td><td className="v">{t('2 274,9', '2,274.9')}</td></tr>
        <tr><td>{t('États-Unis · Wise', 'United States · Wise')}<span className="src">{t('864,1 k$ au taux BCE du jour', '$864.1k at today’s ECB rate')}</span></td><td className="v">{t('801,2', '801.2')}</td></tr>
        <tr><td>Holding · Société Générale<span className="src">EUR</span></td><td className="v">{t('1 105,0', '1,105.0')}</td></tr>
        <tr><td>{t('Stripe, PayPal · en transit', 'Stripe, PayPal · in transit')}<span className="src">{t('Rapproché des versements à venir', 'Matched to upcoming payouts')}</span></td><td className="v">{t('137,4', '137.4')}</td></tr>
        <tr className="total"><td>{t('Trésorerie du groupe', 'Group cash')}</td><td className="v">{t('4 318,5', '4,318.5')}</td></tr>
        </tbody>
        </table>
        <table className="rows" data-for="nat" hidden>
        <tbody>
        <tr><td>{t('Encaissements clients', 'Customer receipts')}<span className="src">{t('412 paiements Stripe, rapprochés des factures', '412 Stripe payments, matched to invoices')}</span></td><td className="v pos">{t('+61,8', '+61.8')}</td></tr>
        <tr><td>{t('Charges sociales de septembre', 'September payroll taxes')}<span className="src">{t('URSSAF, échéance du 15', 'URSSAF, due on the 15th')}</span></td><td className="v neg">{t('−142,0', '−142.0')}</td></tr>
        <tr><td>{t('Prestataire logistique', 'Logistics provider')}<span className="src">{t('Facture F-2291, échéance respectée', 'Invoice F-2291, paid on time')}</span></td><td className="v neg">{t('−98,3', '−98.3')}</td></tr>
        <tr><td>{t('Virement intragroupe', 'Intercompany transfer')}<span className="src">{t('Holding vers France, éliminé', 'Holding to France, eliminated')}</span></td><td className="v">{t('0,0', '0.0')}</td></tr>
        <tr className="flag"><td>{t('Non expliqué', 'Unexplained')}<span className="src">{t('2 mouvements à qualifier', '2 transactions to categorize')}</span></td><td className="v neg">{t('−7,9', '−7.9')}</td></tr>
        <tr className="total"><td>{t('Variation depuis hier', 'Change since yesterday')}</td><td className="v">{t('−186,4', '−186.4')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Chaque mouvement remonte à sa facture, son client ou son salarié.', 'Every transaction traces back to its invoice, customer or employee.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap"><span className="who">{t('Typology · beauté, 3 entités, 6 banques, 3 PSP', 'Typology · beauty, 3 entities, 6 banks, 3 PSPs')}</span><span className="figure">{t('Le point de trésorerie du mardi, recalculé chaque matin', 'The Tuesday cash review, recalculated every morning')}</span></div></div>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Aujourd’hui', 'Today')}</p>
        <h2 className="h2">{t('Vous avez le solde de chaque banque. Expliquer sa variation prend une demi-journée.', 'You have every bank balance. Explaining how it moved takes half a day.')}</h2>
        <p>{t('Les relevés arrivent de plusieurs banques et en plusieurs devises ; un versement Stripe mélange ventes, remboursements, frais et litiges. Et entre la date d’opération, la date de valeur et le versement du PSP, les décalages de dates font que le cash de gestion ne retombe jamais tout à fait sur les soldes comptables.', 'Statements come from several banks, in several currencies; a Stripe payout mixes sales, refunds, fees and disputes. And between transaction date, value date and the PSP payout, timing differences mean management cash never quite ties back to the accounting balances.')}</p>
        </div>
        <div className="voices two"><figure className="voice"><blockquote>{t('« Tous les mardis, on fait avec mon équipe une agrégation de tous nos soldes de banque […] pour l’instant c’est très manuel. »', '“Every Tuesday, my team and I pull together all our bank balances […] for now it’s very manual.”')}</blockquote><figcaption><b>{t('Responsable finance', 'Head of finance')}</b> {t('· e-commerce, 3 entités', '· e-commerce, 3 entities')}</figcaption></figure></div><div className="swap"><div className="th">{t('Aujourd’hui', 'Today')}</div><div className="th">{t('Avec Trame', 'With Trame')}</div><div>{t('Les relevés exportés à la main chaque semaine', 'Statements exported by hand every week')}</div><div>{t('Chaque banque et chaque PSP mis à jour chaque jour', 'Every bank and every PSP updated daily')}</div><div>{t('Des versements PSP nets, impossibles à relire', 'Net PSP payouts nobody can break down')}</div><div>{t('Chaque versement éclaté en ventes, frais, remboursements et litiges', 'Every payout split into sales, fees, refunds and disputes')}</div><div>{t('Le cash en transit que personne n’explique', 'Cash in transit nobody can explain')}</div><div>{t('Chaque flux relié à sa facture, son client ou son salarié', 'Every flow linked to its invoice, customer or employee')}</div><div>{t('Des décalages de dates qui empêchent de retomber sur la compta', 'Timing differences that stop you from tying back to the books')}</div><div>{t('Un cash de gestion égal aux soldes comptables, chaque décalage expliqué', 'Management cash that matches the accounting balances, every timing difference explained')}</div></div>
        </div>
        </section>
        <section className="band paper" id="comment">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Comment ça marche', 'How it works')}</p>
        <h2 className="h2">{t('De vos relevés à votre cash-flow analytique.', 'From your bank statements to cash flow analytics.')}</h2>
        </div>
        <ol className="steps"><li><b>{t('Brancher banques et PSP', 'Connect banks and PSPs')}</b><span>{t('Vos banques et vos prestataires de paiement se connectent en lecture seule, en quelques minutes.', 'Your banks and payment providers connect read-only, in a few minutes.')} <Link to="/integrations">{t('Voir les intégrations', 'See the integrations')}</Link></span></li><li><b>{t('Réconcilier ligne à ligne', 'Reconcile line by line')}</b><span>{t('Chaque versement PSP avec ses ventes, chaque encaissement avec sa facture, chaque virement de salaires avec le journal de paie. Les lignes en attente sont listées, avec la personne qui doit les qualifier.', 'Every PSP payout with its sales, every receipt with its invoice, every salary transfer with the payroll journal. Pending lines are listed, with the person who needs to categorize them.')}</span></li><li><b>{t('Classer selon vos règles', 'Categorize by your rules')}</b><span>{t('Clients, fournisseurs, salaires et charges, TVA, financement, intragroupe : vos natures de flux. Trame propose ; vous validez les cas incertains, et ce que vous validez devient une règle.', 'Customers, suppliers, salaries and payroll taxes, VAT, financing, intercompany: your cash flow categories. Trame suggests; you approve the uncertain cases, and what you approve becomes a rule.')}</span></li><li><b>{t('Expliquer chaque variation', 'Explain every change')}</b><span>{t('Par nature, entité, devise ou client, jusqu’au mouvement bancaire. Les décalages entre date d’opération, date de valeur et versement PSP sont rapprochés, pas ignorés.', 'By category, entity, currency or customer, down to the bank transaction. Timing differences between transaction date, value date and PSP payout are reconciled, not ignored.')}</span></li></ol>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que vous pouvez demander', 'What you can ask')}</p>
        <h2 className="h2">{t('À Trame, ou à votre IA, avec vos droits.', 'Ask Trame, or your AI, with your permissions.')}</h2>
        </div>
        <div className="qs"><div className="q"><span>{t('« Pourquoi la trésorerie a-t-elle baissé de 186 k€ depuis hier ? »', '“Why is cash down €186k since yesterday?”')}</span><b>{t('Variation expliquée par nature', 'Change explained by category')}</b></div><div className="q"><span>{t('« Quels clients nous doivent plus de 10 k€ depuis plus de 60 jours ? »', '“Which customers have owed us more than €10k for over 60 days?”')}</span><b>{t('Encaissements attendus et reçus', 'Expected and received payments')}</b></div><div className="q"><span>{t('« Combien nous coûtent Stripe et PayPal ce trimestre, par canal ? »', '“How much are Stripe and PayPal costing us this quarter, by channel?”')}</span><b>{t('Frais d’encaissement', 'Payment processing fees')}</b></div></div>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq"><details><summary>{t('Quelles banques et quels PSP sont couverts ?', 'Which banks and PSPs are covered?')}</summary><div><p>{t('Plus de 1 000 banques en Europe, dont 245 en France, par une connexion agréée DSP2, et les principaux prestataires de paiement. Une banque non couverte, en Europe ou ailleurs, s’importe par relevés.', 'More than 1,000 banks in Europe, 245 of them in France, through a licensed PSD2 connection, plus the main payment providers. A bank that isn’t covered, in Europe or elsewhere, can be imported from statements.')} <Link to="/integrations">{t('Voir toutes les intégrations', 'See all integrations')}</Link></p></div></details><details><summary>{t('À quelle fréquence les soldes sont-ils mis à jour ?', 'How often are balances updated?')}</summary><div><p>{t('Chaque jour, et à la demande, au rythme où vos banques publient leurs relevés.', 'Every day, and on demand, as fast as your banks publish their statements.')}</p></div></details><details><summary>{t('Comment traitez-vous un versement Stripe net de frais et de remboursements ?', 'How do you handle a Stripe payout net of fees and refunds?')}</summary><div><p>{t('Trame le décompose ligne à ligne : ventes brutes, frais, remboursements, litiges, réserves. Chaque vente est rattachée à sa commande ou à sa facture, chaque frais à son canal.', 'Trame breaks it down line by line: gross sales, fees, refunds, disputes, reserves. Every sale is linked to its order or invoice, every fee to its channel.')}</p></div></details><details><summary>{t('Si je change mes natures de flux, que deviennent les mois passés ?', 'If I change my cash flow categories, what happens to past months?')}</summary><div><p>{t('Les mois déjà validés ne bougent pas, sauf si vous en décidez autrement. La nouvelle règle s’applique à partir du mois que vous choisissez, et le changement entre dans le journal.', 'Months already approved don’t move, unless you decide otherwise. The new rule applies from the month you choose, and the change goes into the decision log.')}</p></div></details><details><summary>{t('Pouvez-vous faire des virements ou des paiements ?', 'Can you make transfers or payments?')}</summary><div><p>{t('Non. Trame lit vos comptes ; il ne peut initier aucun paiement.', 'No. Trame reads your accounts; it cannot initiate any payment.')}</p></div></details><details><summary>{t('En quoi est-ce différent d’un outil de trésorerie ?', 'How is this different from a cash management tool?')}</summary><div><p>{t('Un outil de trésorerie part de la banque. Trame réconcilie la banque, les PSP, la facturation, la paie et la compta. Pour votre prévisionnel, branchez Claude sur Trame : il part de flux réconciliés, avec vos catégories et vos droits.', 'A cash management tool starts from the bank. Trame reconciles the bank, PSPs, invoicing, payroll and the books. For your forecast, connect Claude to Trame: it starts from reconciled flows, with your categories and your permissions.')}</p></div></details></div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <p className="label">{t('Sur les mêmes chiffres', 'On the same numbers')}</p>
        <div className="uses" style={{ marginTop: '20px' }}><Link to="/cas-usage/pnl-analytique" className="use"><h3>{t(<>P&amp;L analytique</>, 'Analytical P&L')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre marge par client, produit ou canal, jusqu’à la pièce', 'Your margin by customer, product or channel, down to the source document')}</p></Link><Link to="/cas-usage/chiffre-affaires" className="use"><h3>{t('Chiffre d’affaires', 'Revenue')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Du contrat signé à l’écriture, chaque mois', 'From signed contract to journal entry, every month')}</p></Link><Link to="/cas-usage/consolidation" className="use"><h3>Consolidation</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre groupe consolidé chaque mois, sans fichier Excel', 'Your group consolidated every month, without an Excel file')}</p></Link><Link to="/cas-usage/budget-realise" className="use"><h3>{t('Budget / réalisé', 'Budget vs. actuals')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Quelle équipe dérape, de combien, et pourquoi', 'Which team is off budget, by how much, and why')}</p></Link></div>
        </div>
        </section>
        <ClosingCta
          title={t('Votre trésorerie expliquée en une minute, pas en une demi-journée.', 'Your cash explained in a minute, not half a day.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de vos banques, de vos PSP et de vos écarts. Vous repartez en sachant combien de temps vous pouvez gagner.', 'Book a first call: we run an assessment of your banks, your PSPs and your discrepancies. You leave knowing how much time you can save.')}
        />
      </Rails>
    </main>
  );
}

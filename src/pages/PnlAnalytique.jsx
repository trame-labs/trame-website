// PnlAnalytique page. Copy and blocks follow the « Site Trame V1 » mock-up (pnl-analytique.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function PnlAnalytique() {
  const t = useT();
  usePageMeta(t('P&L analytique : marge par produit, canal, client | Trame', 'Analytical P&L: margin by product, channel, customer | Trame'), t('Votre marge par produit, canal, client ou projet : Trame croise la compta avec le CRM, Shopify et la facturation, applique vos clés de répartition et réconcilie le tout avec vos comptes.', 'Your margin by product, channel, customer or project: Trame combines the books with your CRM, Shopify and invoicing, applies your allocation keys and reconciles it all with your accounts.'));
  return (
    <main className="v1">
      <PageHero
        kicker={<><Link to="/#usages">{t('Cas d’usage', 'Use cases')}</Link> {t(<>· P&amp;L analytique</>, '· Analytical P&L')}</>}
        title={t('Votre marge par client, produit ou canal.', 'Your margin by customer, product or channel.')}
        lead={<>{t('Votre compta connaît vos charges, pas le détail de vos ventes. Trame la croise avec vos outils métier (CRM, Shopify, facturation, paie) pour descendre à la commande, au contrat ou au produit, puis applique vos clés de répartition.', 'Your books know your costs, not the detail of your sales. Trame combines them with your operational tools (CRM, Shopify, invoicing, payroll) to go down to the order, the contract or the product, then applies your allocation keys.')} <span>{t(<>Un P&amp;L de pilotage, à la maille qui vous manque.</>, 'A management P&L, at the level of detail you’re missing.')}</span></>}
        ctas={<><DemoButton /><LinkButton to="#comment" size="lg" variant="ghostInverse">{t('Voir comment ça marche', 'See how it works')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : la marge par canal dans Trame', 'Example: margin by channel in Trame')} className="card" data-ledger="" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t('Marge sur coûts variables par canal · septembre', 'Contribution margin by channel · September')} <span>{t('· k€', '· €k')}</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Arrêté le 7 octobre', 'Closed on Oct 7')}</span>
        </div>
        <table className="rows">
        <thead><tr><th>{t('Canal', 'Channel')}</th><th className="v">{t('CA net', 'Net revenue')}</th><th className="v">{t('Marge', 'Margin')}</th><th className="v">%</th></tr></thead>
        <tbody>
        <tr className="pick" data-row="site"><td>{t('Site · Shopify', 'Website · Shopify')}<span className="src">{t('2 316 commandes', '2,316 orders')}</span></td><td className="v">{t('1 104,2', '1,104.2')}</td><td className="v">{t('755,4', '755.4')}</td><td className="v">{t('68,4', '68.4')}</td></tr>
        <tr aria-expanded="true" className="pick on" data-row="zal"><td>Zalando<span className="src">{t('Relevé de commissions', 'Commission statement')}</span></td><td className="v">{t('418,9', '418.9')}</td><td className="v">{t('203,4', '203.4')}</td><td className="v neg">{t('48,6', '48.6')}</td></tr>
        <tr className="pick" data-row="rev"><td>{t('Revendeurs', 'Resellers')}<span className="src">{t('Factures Pennylane', 'Pennylane invoices')}</span></td><td className="v">{t('319,5', '319.5')}</td><td className="v">{t('142,5', '142.5')}</td><td className="v">{t('44,6', '44.6')}</td></tr>
        <tr className="total"><td>Total</td><td className="v">{t('1 842,6', '1,842.6')}</td><td className="v">{t('1 101,3', '1,101.3')}</td><td className="v">{t('59,8', '59.8')}</td></tr>
        </tbody>
        </table>
        <div className="drawer" data-trame="site" hidden>
        <h4>{t('Site · Shopify', 'Website · Shopify')}</h4>
        <ul><li>{t('Coût de revient des produits vendus', 'Cost of goods sold')}<b>{t('−236,1', '−236.1')}</b></li><li>{t('Logistique, au prorata des colis', 'Logistics, pro rata to parcels')}<b>{t('−88,4', '−88.4')}</b></li><li>{t('Frais Stripe et PayPal', 'Stripe and PayPal fees')}<b>{t('−24,3', '−24.3')}</b></li></ul>
        </div>
        <div className="drawer" data-trame="zal">
        <h4>{t('Zalando · −2,1 points sur août', 'Zalando · −2.1 pts vs. August')}</h4>
        <ul><li>{t('Coût de revient', 'Cost of goods')}<b>{t('−116,5', '−116.5')}</b></li><li>{t('Logistique', 'Logistics')}<b>{t('−25,7', '−25.7')}</b></li><li>{t('Commission Zalando, 17,5 % des ventes depuis le 1er septembre', 'Zalando commission, 17.5% of sales since September 1')}<b>{t('−73,3', '−73.3')}</b></li></ul>
        <p className="dec"><b>{t('Pourquoi la baisse.', 'Why it dropped.')}</b> {t('La commission est passée de 15 à 17,5 %, et les retours de 9,8 à 14,2 % des ventes.', 'The commission went from 15% to 17.5%, and returns from 9.8% to 14.2% of sales.')}</p>
        </div>
        <div className="drawer" data-trame="rev" hidden>
        <h4>{t('Revendeurs', 'Resellers')}</h4>
        <ul><li>{t('Coût de revient, au prix de gros', 'Cost of goods, at wholesale price')}<b>{t('−159,8', '−159.8')}</b></li><li>{t('Logistique, livraisons groupées', 'Logistics, consolidated shipments')}<b>{t('−17,2', '−17.2')}</b></li></ul>
        <p className="dec"><b>{t('Règle v2.', 'Rule v2.')}</b> {t('Remises de fin d’année provisionnées chaque mois, à 4 % du CA.', 'Year-end rebates accrued every month, at 4% of revenue.')}</p>
        </div>
        <figcaption className="card-foot"><span>{t('Cliquez sur un canal pour voir sa marge en détail.', 'Click a channel to see its margin in detail.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap"><span className="who">{t(<>Ils construisent leur P&amp;L analytique avec Trame</>, 'They build their analytical P&L with Trame')}</span><div className="names"><span>La Bonne Brosse</span><span>Jahia</span><span>Mooncard</span></div></div></div>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Aujourd’hui', 'Today')}</p>
        <h2 className="h2">{t('Quel produit, quel canal, quel client vous fait gagner de l’argent ?', 'Which product, which channel, which customer makes you money?')}</h2>
        <p>{t('La compta est faite pour la clôture et l’audit, pas pour expliquer une marge. Le chiffre d’affaires à jour vit ailleurs : dans le CRM, Shopify, l’outil de facturation ou la marketplace, avec ses propres règles. Le détail par produit ou par client se perd dans des écritures agrégées. Et les charges, elles, sont bien en compta, mais à répartir selon des clés qui changent.', 'The books are built for the close and the audit, not for explaining a margin. Up-to-date revenue lives elsewhere: in the CRM, Shopify, the invoicing tool or the marketplace, each with its own rules. The detail by product or customer gets lost in aggregated entries. And costs are in the books, but they have to be allocated with keys that keep changing.')}</p>
        </div>
        <div className="voices two"><figure className="voice"><blockquote>{t('« S’il y avait la possibilité de venir cliquer sur un chiffre et dire OK, bon bah ça c’est la somme de ça qui donne ça […] oui ça serait le top. »', '“If I could just click on a figure and say OK, so this is the sum of that, which gives this […] yes, that would be ideal.”')}</blockquote><figcaption><b>{t('Responsable finance groupe', 'Group head of finance')}</b> {t('· transport', '· transportation')}</figcaption></figure></div><div className="swap"><div className="th">{t('Aujourd’hui', 'Today')}</div><div className="th">{t('Avec Trame', 'With Trame')}</div><div>{t('Le CA exporté du CRM ou de Shopify, les charges exportées de la compta, recollés dans un fichier', 'Revenue exported from the CRM or Shopify, costs exported from the books, pasted together in a file')}</div><div>{t('Ventes et charges réunies chaque jour, à la même maille', 'Sales and costs brought together every day, at the same level of detail')}</div><div>{t('Une ligne de facture pour plusieurs produits, et le détail perdu', 'One invoice line for several products, and the detail lost')}</div><div>{t('Chaque vente à la maille du produit, du contrat ou de la commande', 'Every sale at product, contract or order level')}</div><div>{t('Des clés de répartition qui changent sans que personne le sache', 'Allocation keys that change without anyone knowing')}</div><div>{t('Chaque clé datée, avec son auteur et le mois où elle s’applique', 'Every key dated, with its author and the month it applies from')}</div><div>{t('Des tables de passage refaites à la main chaque mois', 'Mapping tables rebuilt by hand every month')}</div><div>{t('Vos tables de passage, modifiables comme dans Excel, appliquées seules', 'Your mapping tables, editable like in Excel, applied automatically')}</div></div>
        </div>
        </section>
        <section className="band paper" id="comment">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Comment ça marche', 'How it works')}</p>
        <h2 className="h2">{t('De vos outils métier à la marge par client.', 'From your operational tools to margin by customer.')}</h2>
        </div>
        <ol className="steps"><li><b>{t('Partir des ventes, là où elles vivent', 'Start from sales, where they live')}</b><span>{t('CRM, Shopify, facturation, marketplaces : chaque vente à la maille du produit, du client ou du canal, reconnue selon vos règles.', 'CRM, Shopify, invoicing, marketplaces: every sale at product, customer or channel level, recognized according to your rules.')}</span></li><li><b>{t('Rattacher chaque coût direct', 'Attach every direct cost')}</b><span>{t('Coût de revient, transport, frais d’encaissement, commissions, retours, publicité attribuée : sur la ligne qu’il concerne.', 'Cost of goods, shipping, payment fees, commissions, returns, attributed advertising: on the line it relates to.')}</span></li><li><b>{t('Répartir le reste', 'Allocate the rest')}</b><span>{t('Équipes au temps passé ou par règle, loyers à l’effectif, frais de structure au chiffre d’affaires. Chaque clé a sa base, sa date d’effet et son auteur.', 'Teams by time spent or by rule, rent by headcount, overhead by revenue. Every key has its base, its effective date and its author.')}</span></li><li><b>{t('Réconcilier avec la compta', 'Reconcile with the books')}</b><span>{t('Marge brute, marge sur coûts variables, marge de contribution : chaque niveau a sa définition. Ventes et charges sont réconciliées avec vos comptes ; ce qui n’est imputé à aucun axe reste visible.', 'Gross margin, contribution margin, segment margin: each level has its definition. Sales and costs are reconciled with your accounts; whatever isn’t allocated to any dimension stays visible.')}</span></li></ol>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <figure aria-label={t('Exemple : la même collection à deux niveaux de marge', 'Example: the same collection at two margin levels')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Collection été · septembre', 'Summer collection · September')} <span>{t('· k€', '· €k')}</span></p><span className="chip">{t('Clés v3, appliquées depuis juillet', 'Keys v3, applied since July')}</span></div>
        <table className="rows">
        <thead><tr><th></th><th className="v">{t('Coûts directs', 'Direct costs')}</th><th className="v">{t('Coût complet', 'Full cost')}</th></tr></thead>
        <tbody>
        <tr><td>{t('Chiffre d’affaires net', 'Net revenue')}<span className="src">{t('Remises et retours déduits', 'Net of discounts and returns')}</span></td><td className="v">{t('412,6', '412.6')}</td><td className="v">{t('412,6', '412.6')}</td></tr>
        <tr><td>{t('Coût de revient, logistique, frais d’encaissement', 'Cost of goods, logistics, payment fees')}</td><td className="v neg">{t('−160,9', '−160.9')}</td><td className="v neg">{t('−160,9', '−160.9')}</td></tr>
        <tr><td>{t('Publicité attribuée', 'Attributed advertising')}<span className="src">{t('Clé : campagne d’origine de la vente', 'Key: campaign the sale came from')}</span></td><td className="v neg">{t('−58,2', '−58.2')}</td><td className="v neg">{t('−58,2', '−58.2')}</td></tr>
        <tr><td>{t('Équipe produit et studio', 'Product and studio team')}<span className="src">{t('Clé : temps passé déclaré', 'Key: reported time spent')}</span></td><td className="v">{t('non imputé', 'not allocated')}</td><td className="v neg">{t('−31,4', '−31.4')}</td></tr>
        <tr><td>{t('Frais de structure', 'Overhead')}<span className="src">{t('Clé : part du chiffre d’affaires', 'Key: share of revenue')}</span></td><td className="v">{t('non imputé', 'not allocated')}</td><td className="v neg">{t('−22,7', '−22.7')}</td></tr>
        <tr className="total"><td>{t('Marge', 'Margin')}</td><td className="v">{t('193,5', '193.5')}</td><td className="v">{t('139,4', '139.4')}</td></tr>
        <tr className="total"><td>{t('Taux de marge', 'Margin rate')}</td><td className="v">{t('46,9 %', '46.9%')}</td><td className="v">{t('33,8 %', '33.8%')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Coûts directs et coût complet, côte à côte, avec la clé de chaque écart.', 'Direct costs and full cost, side by side, with the key behind each variance.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        <div className="intro">
        <p className="label">{t('Coûts directs et coût complet', 'Direct costs and full cost')}</p>
        <h2 className="h2">{t('47 % de marge, ou 34 % ?', '47% margin, or 34%?')}</h2>
        <p>{t('La même collection gagne 47 % sur ses coûts directs et 34 % en coût complet. Les deux chiffres sont justes et ne mènent pas à la même décision. Trame les montre côte à côte, et sous chaque écart, la clé qui l’explique.', 'The same collection earns 47% on direct costs and 34% at full cost. Both figures are right, and they don’t lead to the same decision. Trame shows them side by side, and under each variance, the key that explains it.')}</p>
        <p>{t('Quand une clé change, elle s’applique à partir d’un mois choisi. Les mois déjà présentés ne bougent pas, sauf si vous décidez de les re-présenter ; ce choix est tracé.', 'When a key changes, it applies from a month you choose. Months already presented don’t move, unless you decide to restate them; that choice is logged.')}</p>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que vous pouvez demander', 'What you can ask')}</p>
        <h2 className="h2">{t('Les questions de marge auxquelles vous répondez enfin.', 'The margin questions you can finally answer.')}</h2>
        <p>{t('Posez-les dans Trame, ou directement à Claude ou ChatGPT : la réponse part des mêmes chiffres, avec vos droits.', 'Ask them in Trame, or directly in Claude or ChatGPT: the answer starts from the same numbers, with your permissions.')}</p>
        </div>
        <div className="qs"><div className="q"><span>{t('« Quels sont nos vingt clients les moins rentables, une fois le support et l’hébergement imputés ? »', '“Which are our twenty least profitable customers, once support and hosting are allocated?”')}</span><b>{t('La marge par client, en coût complet', 'Margin by customer, at full cost')}</b></div><div className="q"><span>{t('« Que nous rapporte vraiment chaque canal de vente, commissions, logistique et retours payés ? »', '“What does each sales channel really earn us, after commissions, logistics and returns?”')}</span><b>{t('La marge nette par canal', 'Net margin by channel')}</b></div><div className="q"><span>{t('« Pourquoi notre marge a-t-elle perdu un point en septembre ? »', '“Why did our margin lose a point in September?”')}</span><b>{t('L’écart expliqué, cause par cause', 'The variance explained, cause by cause')}</b></div></div>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq"><details><summary>{t('Comment répartissez-vous les charges indirectes, et qui choisit les clés ?', 'How do you allocate indirect costs, and who chooses the keys?')}</summary><div><p>{t('Vous choisissez ; notre équipe de déploiement les écrit avec vous. Loyer à l’effectif ou au mètre carré, logiciels au nombre de licences, frais de structure au chiffre d’affaires : chaque clé a sa base, sa date d’effet et son auteur.', 'You choose; our deployment team writes them with you. Rent by headcount or by square foot, software by number of licenses, overhead by revenue: every key has its base, its effective date and its author.')}</p></div></details><details><summary>{t('Si je change une clé en juillet, que deviennent les mois déjà présentés ?', 'If I change a key in July, what happens to months already presented?')}</summary><div><p>{t('Ils ne bougent pas. La nouvelle clé s’applique à partir de juillet. Re-présenter le premier semestre avec la nouvelle clé est un choix explicite, tracé dans le journal.', 'They don’t move. The new key applies from July. Restating the first half with the new key is an explicit choice, recorded in the decision log.')}</p></div></details><details><summary>{t(<>Le P&amp;L analytique retombe-t-il sur le résultat comptable ?</>, 'Does the analytical P&L tie back to the accounting result?')}</summary><div><p>{t('Oui. La somme des axes égale le résultat du mois ; ce qui n’est imputé à aucun axe reste visible sur une ligne « non imputé », avec son explication.', 'Yes. The sum of the dimensions equals the month’s result; whatever isn’t allocated to any dimension stays visible on a “not allocated” line, with its explanation.')}</p></div></details><details><summary>{t('Comment imputez-vous le coût des équipes sans feuilles de temps ?', 'How do you allocate team costs without timesheets?')}</summary><div><p>{t('Par règle : à l’effectif, au chiffre d’affaires, ou selon une répartition que les managers valident chaque trimestre. Si vous avez des temps passés, Trame les utilise.', 'By rule: by headcount, by revenue, or with a split that managers approve every quarter. If you track time spent, Trame uses it.')}</p></div></details><details><summary>{t('Faut-il refaire notre plan analytique ?', 'Do we need to redo our analytical chart of accounts?')}</summary><div><p>{t('Non. Trame part de votre plan comptable et de vos axes actuels, sans toucher à la compta. Vous les enrichissez quand vous voulez.', 'No. Trame starts from your chart of accounts and your current dimensions, without touching the books. You extend them whenever you want.')}</p></div></details><details><summary>{t(<>Mes managers peuvent-ils voir le P&amp;L de leur périmètre sans voir les salaires ?</>, 'Can my managers see the P&L for their scope without seeing salaries?')}</summary><div><p>{t('Oui. Chacun voit son périmètre, masse salariale de l’équipe comprise ; les salaires individuels restent réservés aux personnes que vous désignez.', 'Yes. Each person sees their scope, team payroll included; individual salaries stay reserved for the people you designate.')}</p></div></details></div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <p className="label">{t('Sur les mêmes chiffres', 'On the same numbers')}</p>
        <div className="uses" style={{ marginTop: '20px' }}><Link to="/cas-usage/cash-analytique" className="use"><h3>{t('Cash analytique', 'Cash analytics')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre trésorerie de ce matin, expliquée par entité, client ou projet', 'This morning’s cash position, explained by entity, customer or project')}</p></Link><Link to="/cas-usage/chiffre-affaires" className="use"><h3>{t('Chiffre d’affaires', 'Revenue')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Du contrat signé à l’écriture, chaque mois', 'From signed contract to journal entry, every month')}</p></Link><Link to="/cas-usage/consolidation" className="use"><h3>Consolidation</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre groupe consolidé chaque mois, sans fichier Excel', 'Your group consolidated every month, without an Excel file')}</p></Link><Link to="/cas-usage/budget-realise" className="use"><h3>{t('Budget / réalisé', 'Budget vs. actuals')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Quelle équipe dérape, de combien, et pourquoi', 'Which team is off budget, by how much, and why')}</p></Link></div>
        </div>
        </section>
        <ClosingCta
          title={t('Sachez enfin ce que rapporte chaque client, chaque produit, chaque canal.', 'Finally know what every customer, every product, every channel earns you.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de vos sources de ventes, de vos clés de répartition et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first call: we run an assessment of your sales sources, your allocation keys and your pain points. You leave knowing how much you can gain.')}
        />
      </Rails>
    </main>
  );
}

// ChiffreAffaires page. Copy and blocks follow the « Site Trame V1 » mock-up (revenus.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function ChiffreAffaires() {
  const t = useT();
  usePageMeta(t('Reconnaissance du chiffre d’affaires, PCA et ARR | Trame', 'Revenue recognition, deferred revenue and ARR | Trame'), t('Le CA signé, facturé et comptabilisé réconciliés contrat par contrat, vos règles de reconnaissance appliquées chaque mois, et les contrats oubliés retrouvés avant qu’ils ne coûtent.', 'Signed, invoiced and booked revenue reconciled contract by contract, your recognition rules applied every month, and forgotten contracts found before they cost you.'));
  return (
    <main className="v1">
      <PageHero
        kicker={<><Link to="/#usages">{t('Cas d’usage', 'Use cases')}</Link> {t('· Chiffre d’affaires', '· Revenue')}</>}
        title={t('Votre chiffre d’affaires du mois, du contrat signé à l’écriture.', 'This month’s revenue, from signed contract to journal entry.')}
        lead={<>{t('Abonnements, usage, services, cartes cadeaux : vos règles de reconnaissance appliquées chaque mois, exceptions comprises.', 'Subscriptions, usage, services, gift cards: your recognition rules applied every month, exceptions included.')} <span>{t('Le CA signé, facturé et comptabilisé réconciliés, contrat par contrat.', 'Signed, invoiced and booked revenue reconciled, contract by contract.')}</span></>}
        ctas={<><DemoButton /><LinkButton to="#comment" size="lg" variant="ghostInverse">{t('Voir comment ça marche', 'See how it works')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : du chiffre d’affaires signé au chiffre d’affaires comptabilisé, septembre', 'Example: from signed revenue to booked revenue, September')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Septembre · du signé au comptabilisé', 'September · from signed to booked')} <span>{t('· k€', '· €k')}</span></p><span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Arrêté le 7 octobre', 'Closed on Oct 7')}</span></div>
        <table className="rows">
        <tbody>
        <tr><td>{t('CA signé selon le CRM', 'Signed revenue per the CRM')}<span className="src">{t('Contrats actifs en septembre', 'Active contracts in September')}</span></td><td className="v">{t('812,9', '812.9')}</td></tr>
        <tr><td>{t('Contrats actifs non facturés', 'Active contracts not invoiced')}<span className="src">{t('5 contrats · liste prête pour la facturation', '5 contracts · list ready for invoicing')}</span></td><td className="v neg">{t('−30,2', '−30.2')}</td></tr>
        <tr><td>{t('Services facturés hors CRM', 'Services invoiced outside the CRM')}<span className="src">{t('3 factures sans contrat', '3 invoices without a contract')}</span></td><td className="v pos">{t('+12,6', '+12.6')}</td></tr>
        <tr className="total"><td>{t('CA facturé', 'Invoiced revenue')}<span className="src">{t('Journal des ventes, factures et avoirs', 'Sales journal, invoices and credit notes')}</span></td><td className="v">{t('795,3', '795.3')}</td></tr>
        <tr><td>{t('Étalement des abonnements payés d’avance', 'Spreading of prepaid subscriptions')}<span className="src">{t('Variation des PCA, compte 487', 'Change in deferred revenue, account 487')}</span></td><td className="v neg">{t('−41,8', '−41.8')}</td></tr>
        <tr><td>{t('Usage consommé, facturé en octobre', 'Usage consumed, invoiced in October')}<span className="src">{t('FAE, compte 418', 'Accrued revenue, account 418')}</span></td><td className="v pos">{t('+17,9', '+17.9')}</td></tr>
        <tr className="total"><td>{t('CA comptabilisé', 'Booked revenue')}<span className="src">{t('Comptes 706', 'Accounts 706')}</span></td><td className="v">{t('771,4', '771.4')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Chaque écart s’ouvre sur ses contrats et ses factures.', 'Every discrepancy opens onto its contracts and invoices.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap"><span className="who">{t('Jahia · éditeur SaaS, 6 entités', 'Jahia · SaaS company, 6 entities')}</span><span className="figure">{t('De 3 jours à une demi-journée par cycle de chiffre d’affaires', 'From 3 days to half a day per revenue cycle')}</span></div></div>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Aujourd’hui', 'Today')}</p>
        <h2 className="h2">{t('Le CRM, la facturation et la compta donnent trois chiffres d’affaires.', 'The CRM, invoicing and the books give three different revenue figures.')}</h2>
        <p>{t('Les PCA sont recalculés à la main, dans un fichier, à chaque clôture. Des contrats signés ne sont jamais facturés, et l’ARR présenté au board change de définition d’un trimestre à l’autre.', 'Deferred revenue is recalculated by hand, in a file, at every close. Signed contracts never get invoiced, and the ARR presented to the board changes definition from one quarter to the next.')}</p>
        </div>
        <div className="voices two"><figure className="voice"><blockquote>{t('« Pour les CAC notamment, j’ai besoin d’avoir la donnée telle qu’au moment où je l’ai sortie. »', '“For the auditors especially, I need the data exactly as it was when I pulled it.”')}</blockquote><figcaption><b>{t(<>FP&amp;A</>, 'FP&A')}</b> · e-commerce</figcaption></figure></div><div className="swap"><div className="th">{t('Aujourd’hui', 'Today')}</div><div className="th">{t('Avec Trame', 'With Trame')}</div><div>{t('Les PCA recalculés à la main, dans un fichier, à chaque clôture', 'Deferred revenue recalculated by hand, in a file, at every close')}</div><div>{t('Les PCA et les FAE calculés chaque mois, contrat par contrat', 'Deferred and unbilled revenue calculated every month, contract by contract')}</div><div>{t('Trois jours par cycle de chiffre d’affaires', 'Three days per revenue cycle')}</div><div>{t('Une demi-journée', 'Half a day')}</div><div>{t('Des corrections qui se perdent dans les fichiers', 'Corrections lost in files')}</div><div>{t('Chaque ajustement gardé avec son auteur et sa raison', 'Every adjustment kept with its author and its reason')}</div><div>{t('Des contrats signés jamais facturés', 'Signed contracts never invoiced')}</div><div>{t('La liste des contrats à facturer, chaque mois', 'The list of contracts to invoice, every month')}</div></div>
        </div>
        </section>
        <section className="band paper" id="comment">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Comment ça marche', 'How it works')}</p>
        <h2 className="h2">{t('Du contrat signé au chiffre d’affaires comptabilisé.', 'From signed contract to booked revenue.')}</h2>
        </div>
        <ol className="steps"><li><b>{t('Brancher le CRM, la facturation et la compta', 'Connect the CRM, invoicing and the books')}</b><span>{t('HubSpot, Salesforce ou Attio, Stripe ou Chargebee, Pennylane ou Sage : ce que vous avez déjà.', 'HubSpot, Salesforce or Attio, Stripe or Chargebee, Pennylane or Sage: whatever you already have.')}</span></li><li><b>{t('Écrire vos règles, et vos exceptions', 'Write your rules, and your exceptions')}</b><span>{t('Abonnement au prorata, usage au mois, services à l’avancement, avenants et résiliations. Et surtout vos exceptions : le client facturé à part, le contrat renégocié. Celles qui reviennent deviennent des règles.', 'Prorated subscriptions, monthly usage, services by percentage of completion, amendments and cancellations. And above all your exceptions: the customer invoiced separately, the renegotiated contract. The ones that recur become rules.')}</span></li><li><b>{t('Réconcilier les trois versions', 'Reconcile the three versions')}</b><span>{t('Chaque contrat relié à ses factures et à ses écritures. Chaque écart a sa ligne, sa cause et sa correction.', 'Every contract linked to its invoices and its journal entries. Every discrepancy has its line, its cause and its correction.')}</span></li><li><b>{t('Suivre chaque mois', 'Track every month')}</b><span>{t('CA comptabilisé, PCA, FAE et ARR calculés ensemble, chaque mois. Une correction tardive est datée et tracée, sans réécrire le mois présenté.', 'Booked revenue, deferred revenue, unbilled revenue and ARR calculated together, every month. A late correction is dated and logged, without rewriting the month already presented.')}</span></li></ol>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que ça rapporte', 'The payoff')}</p>
        <h2 className="h2">{t('Moins de temps à rapprocher. Plus de chiffre d’affaires facturé.', 'Less time reconciling. More revenue invoiced.')}</h2>
        </div>
        <div className="stats3">
        <div><span className="big">{t('−80 %', '−80%')}</span><p>{t('de temps passé à rapprocher le CRM, la facturation et la compta, à chaque cycle', 'time spent reconciling the CRM, invoicing and the books, every cycle')}</p><cite>{t('Éditeur SaaS, 6 entités · mesuré : 3 jours → ½ journée', 'SaaS company, 6 entities · measured: 3 days → half a day')}</cite></div>
        <div><span className="big">{t('30 jours', '30 days')}</span><p>{t('rendus chaque année à l’équipe finance, pour l’analyse plutôt que le rapprochement', 'given back to the finance team every year, for analysis instead of reconciliation')}</p><cite>{t('Même client · mesuré', 'Same customer · measured')}</cite></div>
        <div><span className="big">{t('30 k€', '€30k')}</span><p>{t('de chiffre d’affaires retrouvé : cinq contrats toujours actifs, qui n’étaient plus facturés', 'in revenue recovered: five contracts still active that were no longer being invoiced')}</p><cite>{t('Même client · déclaré', 'Same customer · reported')}</cite></div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Ce que Trame trouve en passant', 'What Trame finds along the way')}</p>
        <h2 className="h2">{t('Des contrats signés, jamais facturés.', 'Contracts signed, never invoiced.')}</h2>
        <p>{t('En réconciliant le CRM, la facturation et la compta, Trame trouve ce qui ne colle pas : des lignes de contrat sans montant, des dates de signature dans le futur, des résiliations jamais saisies, et des clients toujours actifs qu’on a cessé de facturer. Chaque anomalie arrive chiffrée, avec le contrat concerné.', 'By reconciling the CRM, invoicing and the books, Trame finds what doesn’t match: contract lines with no amount, signature dates in the future, cancellations never entered, and customers still active who are no longer being invoiced. Every anomaly comes with its amount and the contract concerned.')}</p>
        <figure className="testimonial" style={{ gap: '16px' }}>
        <blockquote style={{ fontSize: 'clamp(20px,2.2vw,26px)' }}>{t('« Typiquement c’est des anomalies que je ne peux pas voir sauf si je connais parfaitement mes suivis et mes clients. »', '“Typically, these are anomalies I can’t see unless I know my tracking and my customers perfectly.”')}</blockquote>
        <figcaption><span aria-hidden="true" className="avatar">CFO</span><div><b>CFO</b><br /><span>{t('Éditeur SaaS, 6 entités', 'SaaS company, 6 entities')}</span></div></figcaption>
        </figure>
        </div>
        <figure aria-label={t('Exemple : un ARR rapproché du CRM à la facturation', 'Example: ARR reconciled from the CRM to invoicing')} className="card" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t('ARR · fin septembre', 'ARR · end of September')} <span>{t('· k€', '· €k')}</span></p>
        <span className="chip">{t('CRM, facturation et compta rapprochés', 'CRM, invoicing and books reconciled')}</span>
        </div>
        <table className="rows">
        <tbody>
        <tr><td>{t('ARR selon le CRM', 'ARR per the CRM')}<span className="src">{t('HubSpot · 214 contrats', 'HubSpot · 214 contracts')}</span></td><td className="v">{t('9 412,0', '9,412.0')}</td></tr>
        <tr><td>{t('Services saisis comme récurrents', 'Services entered as recurring')}<span className="src">{t('12 lignes reclassées', '12 lines reclassified')}</span></td><td className="v neg">{t('−186,0', '−186.0')}</td></tr>
        <tr><td>{t('Résiliations absentes du CRM', 'Cancellations missing from the CRM')}<span className="src">{t('3 contrats, préavis échus', '3 contracts, notice period over')}</span></td><td className="v neg">{t('−74,5', '−74.5')}</td></tr>
        <tr><td>{t('Avenants facturés, absents du CRM', 'Amendments invoiced, missing from the CRM')}<span className="src">{t('2 contrats', '2 contracts')}</span></td><td className="v pos">{t('+38,2', '+38.2')}</td></tr>
        <tr className="total"><td>{t('ARR rapproché de la facturation', 'ARR reconciled with invoicing')}</td><td className="v">{t('9 189,7', '9,189.7')}</td></tr>
        <tr><td>{t('Revenu reconnu en septembre', 'Revenue recognized in September')}<span className="src">{t('Règles de reconnaissance v4', 'Recognition rules v4')}</span></td><td className="v">{t('771,4', '771.4')}</td></tr>
        <tr><td>{t('Produits constatés d’avance au 30/09', 'Deferred revenue at 09/30')}<span className="src">{t('Rapprochés du compte 487', 'Reconciled with account 487')}</span></td><td className="v">{t('2 914,6', '2,914.6')}</td></tr>
        </tbody>
        </table>
        <div className="note"><span aria-hidden="true" className="dot"></span><p><b>{t('À facturer : 30,2 k€.', 'To invoice: €30.2k.')}</b> {t('Cinq contrats actifs n’ont pas été facturés en septembre. Liste et montants prêts pour la facturation.', 'Five active contracts weren’t invoiced in September. List and amounts ready for invoicing.')}</p></div>
        <figcaption className="card-foot"><span>{t('Chaque écart a sa ligne, son contrat et sa correction.', 'Every discrepancy has its line, its contract and its correction.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que vous pouvez demander', 'What you can ask')}</p>
        <h2 className="h2">{t('Sur votre chiffre d’affaires, à Trame ou à votre IA.', 'Ask Trame or your AI about your revenue.')}</h2>
        </div>
        <div className="qs"><div className="q"><span>{t('« Combien de chiffre d’affaires comptabiliser ce mois-ci, et que reste-t-il à facturer ? »', '“How much revenue do we book this month, and what’s left to invoice?”')}</span><b>{t('CA comptabilisé et FAE', 'Booked and unbilled revenue')}</b></div><div className="q"><span>{t('« Le chiffre annoncé par les ventes correspond-il à ce qui est facturé ? »', '“Does the number sales announced match what’s invoiced?”')}</span><b>{t('Signé et facturé', 'Signed and invoiced')}</b></div><div className="q"><span>{t('« Quels contrats arrivent à échéance sans renouvellement saisi ? »', '“Which contracts are expiring with no renewal entered?”')}</span><b>{t('Renouvellements', 'Renewals')}</b></div></div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq"><details><summary>{t('Mon ARR de board et mon CA comptable ne racontent pas la même chose. Pouvez-vous expliquer l’écart ?', 'My board ARR and my accounting revenue tell different stories. Can you explain the gap?')}</summary><div><p>{t('Oui, ligne à ligne : services comptés comme récurrents, résiliations non saisies dans le CRM, étalement, usage, change. Chaque cause a son montant et ses contrats.', 'Yes, line by line: services counted as recurring, cancellations not entered in the CRM, spreading, usage, FX. Every cause has its amount and its contracts.')}</p></div></details><details><summary>{t('Comment calculez-vous les PCA, et qui passe l’écriture ?', 'How do you calculate deferred revenue, and who posts the entry?')}</summary><div><p>{t('Trame calcule les PCA contrat par contrat selon vos règles et fournit la justification. Votre cabinet ou votre comptable passe l’écriture, comme aujourd’hui.', 'Trame calculates deferred revenue contract by contract according to your rules and provides the supporting detail. Your accounting firm or your accountant posts the entry, as they do today.')}</p></div></details><details><summary>{t('Vos règles suivent-elles les normes comptables ?', 'Do your rules follow accounting standards?')}</summary><div><p>{t('Trame applique vos règles de reconnaissance, celles que votre cabinet a validées (PCG, ou IFRS 15 pour les groupes qui l’appliquent). Il ne les invente pas, et chaque version est tracée.', 'Trame applies your recognition rules, the ones your accounting firm has approved (French GAAP, or IFRS 15 for groups that apply it). It doesn’t invent them, and every version is logged.')}</p></div></details><details><summary>{t('Que se passe-t-il quand un contrat change en cours de mois ?', 'What happens when a contract changes mid-month?')}</summary><div><p>{t('L’échéancier est recalculé à partir de la date de l’avenant. Les mois déjà validés ne bougent pas ; la régularisation passe sur le mois en cours.', 'The schedule is recalculated from the amendment date. Months already approved don’t move; the adjustment goes into the current month.')}</p></div></details><details><summary>{t('Qui définit l’ARR ?', 'Who defines ARR?')}</summary><div><p>{t('Vous. Trame applique votre définition et garde chaque version. Vous pouvez la faire évoluer, rejouer les mois passés avec l’ancienne ou la nouvelle, et mesurer l’impact d’un changement avant de le valider.', 'You do. Trame applies your definition and keeps every version. You can change it, replay past months with the old one or the new one, and measure the impact of a change before approving it.')}</p></div></details><details><summary>{t('Faut-il changer d’outil de facturation ?', 'Do we need to change invoicing tools?')}</summary><div><p>{t('Non. Trame lit vos factures où elles sont : Stripe, Chargebee, Pennylane, votre outil maison.', 'No. Trame reads your invoices where they are: Stripe, Chargebee, Pennylane, your in-house tool.')}</p></div></details></div>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <p className="label">{t('Sur les mêmes chiffres', 'On the same numbers')}</p>
        <div className="uses" style={{ marginTop: '20px' }}><Link to="/cas-usage/cash-analytique" className="use"><h3>{t('Cash analytique', 'Cash analytics')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre trésorerie de ce matin, expliquée par entité, client ou projet', 'This morning’s cash position, explained by entity, customer or project')}</p></Link><Link to="/cas-usage/pnl-analytique" className="use"><h3>{t(<>P&amp;L analytique</>, 'Analytical P&L')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre marge par client, produit ou canal, jusqu’à la pièce', 'Your margin by customer, product or channel, down to the source document')}</p></Link><Link to="/cas-usage/consolidation" className="use"><h3>Consolidation</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre groupe consolidé chaque mois, sans fichier Excel', 'Your group consolidated every month, without an Excel file')}</p></Link><Link to="/cas-usage/budget-realise" className="use"><h3>{t('Budget / réalisé', 'Budget vs. actuals')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Quelle équipe dérape, de combien, et pourquoi', 'Which team is off budget, by how much, and why')}</p></Link></div>
        </div>
        </section>
        <ClosingCta
          title={t('Tout ce que vous signez est facturé. Tout ce que vous facturez est expliqué.', 'Everything you sign gets invoiced. Everything you invoice is explained.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de votre CRM, de votre facturation et de vos règles de reconnaissance. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first call: we run an assessment of your CRM, your invoicing and your recognition rules. You leave knowing how much you can gain.')}
        />
      </Rails>
    </main>
  );
}

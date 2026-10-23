// BudgetRealise page. Copy and blocks follow the « Site Trame V1 » mock-up (budget-reel.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function BudgetRealise() {
  const t = useT();
  usePageMeta(t('Contrôle budgétaire et écarts par équipe | Trame', 'Budget control and variances by team | Trame'), t('Votre budget reste dans Excel ou votre outil de planification. Trame lui oppose un réalisé fiable, par équipe, masse salariale comprise, et Claude refait votre réestimé.', 'Your budget stays in Excel or your planning tool. Trame sets reliable actuals against it, by team, payroll included, and Claude redoes your reforecast.'));
  return (
    <main className="v1">
      <PageHero
        kicker={<><Link to="/#usages">{t('Cas d’usage', 'Use cases')}</Link> {t('· Budget / réalisé', '· Budget vs. actuals')}</>}
        title={t('Quelle équipe dérape, et de combien.', 'Which team is off budget, and by how much.')}
        lead={<>{t('Votre budget reste dans Excel ou dans votre outil de planification.', 'Your budget stays in Excel or in your planning tool.')} <span>{t('Chaque mois, Trame le compare au réalisé, équipe par équipe, masse salariale comprise.', 'Every month, Trame compares it to actuals, team by team, payroll included.')}</span></>}
        ctas={<><DemoButton /><LinkButton to="#comment" size="lg" variant="ghostInverse">{t('Voir comment ça marche', 'See how it works')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : la masse salariale par équipe, budget et réalisé', 'Example: payroll by team, budget vs. actuals')} className="card" data-ledger="" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t('Masse salariale · budget / réalisé · septembre', 'Payroll · budget vs. actuals · September')} <span>{t('· k€', '· €k')}</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Réalisé arrêté le 7 octobre', 'Actuals closed on Oct 7')}</span>
        </div>
        <table className="rows">
        <thead><tr><th>{t('Équipe', 'Team')}</th><th className="v">Budget</th><th className="v">{t('Réalisé', 'Actuals')}</th><th className="v">{t('Écart', 'Variance')}</th></tr></thead>
        <tbody>
        <tr className="pick" data-row="tech"><td>{t('Produit et tech', 'Product and tech')}<span className="src">{t('24 personnes · 25 budgétées', '24 people · 25 budgeted')}</span></td><td className="v">{t('310,0', '310.0')}</td><td className="v">{t('298,4', '298.4')}</td><td className="v pos">{t('−11,6', '−11.6')}</td></tr>
        <tr aria-expanded="true" className="pick flag on" data-row="sales"><td>{t('Ventes et marketing', 'Sales and marketing')}<span className="src">{t('19 personnes · 17 budgétées', '19 people · 17 budgeted')}</span></td><td className="v">{t('175,0', '175.0')}</td><td className="v">{t('201,9', '201.9')}</td><td className="v neg">{t('+26,9', '+26.9')}</td></tr>
        <tr className="pick" data-row="ops"><td>{t('Opérations et support', 'Operations and support')}<span className="src">{t('15 personnes · 15 budgétées', '15 people · 15 budgeted')}</span></td><td className="v">{t('115,0', '115.0')}</td><td className="v">{t('112,5', '112.5')}</td><td className="v pos">{t('−2,5', '−2.5')}</td></tr>
        <tr className="total"><td>Total</td><td className="v">{t('600,0', '600.0')}</td><td className="v">{t('612,8', '612.8')}</td><td className="v neg">{t('+12,8', '+12.8')}</td></tr>
        </tbody>
        </table>
        <div className="drawer" data-trame="tech" hidden>
        <h4>{t('Produit et tech · −11,6', 'Product and tech · −11.6')}</h4>
        <ul><li>{t('Développeur budgété en septembre, arrivée prévue le 3 novembre', 'Developer budgeted for September, start date set for November 3')}<b>{t('−8,1', '−8.1')}</b></li><li>{t('Prime d’équipe décalée en octobre', 'Team bonus moved to October')}<b>{t('−3,5', '−3.5')}</b></li></ul>
        </div>
        <div className="drawer" data-trame="sales">
        <h4>{t('Ventes et marketing · +26,9', 'Sales and marketing · +26.9')}</h4>
        <ul><li>{t('Deux commerciaux arrivés un mois plus tôt que prévu', 'Two sales reps started a month earlier than planned')}<b>{t('+17,3', '+17.3')}</b></li><li>{t('Commissions sur les ventes de septembre', 'Commissions on September sales')}<b>{t('+9,6', '+9.6')}</b></li></ul>
        <p className="dec"><b>{t('2 oct. · Sophie, directrice commerciale.', 'Oct 2 · Sophie, head of sales.')}</b> {t('Recrutements avancés pour la rentrée, validés par le CEO le 28 août.', 'Hires brought forward for the fall, approved by the CEO on August 28.')}</p>
        </div>
        <div className="drawer" data-trame="ops" hidden>
        <h4>{t('Opérations et support · −2,5', 'Operations and support · −2.5')}</h4>
        <p className="dec"><b>{t('Heures supplémentaires', 'Overtime')}</b> {t('moins élevées que prévu en septembre.', 'lower than planned in September.')}</p>
        </div>
        <figcaption className="card-foot"><span>{t('Cliquez sur une équipe pour voir d’où vient l’écart.', 'Click a team to see where the variance comes from.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap"><span className="who">{t('Pour les équipes qui suivent leur budget dans Excel ou un outil de planification', 'For teams that track their budget in Excel or a planning tool')}</span><span className="figure">{t('Le réalisé, à la maille de votre budget, chaque mois', 'Actuals, at the level of detail of your budget, every month')}</span></div></div>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Aujourd’hui', 'Today')}</p>
        <h2 className="h2">{t('Le réalisé du mois arrive trop tard pour piloter le budget.', 'The month’s actuals arrive too late to steer the budget.')}</h2>
        <p>{t('Il n’est pas à la maille du budget, et quelqu’un le recolle à la main. La paie et les effectifs budgétés ne se rapprochent qu’à la main, et les commentaires des managers se perdent dans les e-mails.', 'They don’t match the budget’s level of detail, and someone pastes them back in by hand. Payroll and budgeted headcount only get reconciled by hand, and managers’ comments get lost in emails.')}</p>
        </div>
        <div className="swap"><div className="th">{t('Aujourd’hui', 'Today')}</div><div className="th">{t('Avec Trame', 'With Trame')}</div><div>{t('Les chiffres réels collés à la main dans le fichier de budget', 'Actual figures pasted by hand into the budget file')}</div><div>{t('Le réalisé à jour, à la maille de votre budget', 'Up-to-date actuals, at the level of detail of your budget')}</div><div>{t('Des écarts découverts au trimestre', 'Variances discovered at quarter end')}</div><div>{t('Des écarts suivis chaque mois, équipe par équipe', 'Variances tracked every month, team by team')}</div><div>{t('Les effectifs suivis à part', 'Headcount tracked separately')}</div><div>{t('La masse salariale réalisée face aux effectifs budgétés, poste par poste', 'Actual payroll against budgeted headcount, position by position')}</div><div>{t('Un écart sans explication', 'A variance with no explanation')}</div><div>{t('Chaque écart avec sa cause et le commentaire du manager', 'Every variance with its cause and the manager’s comment')}</div></div>
        </div>
        </section>
        <section className="band paper" id="comment">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Comment ça marche', 'How it works')}</p>
        <h2 className="h2">{t('Votre budget, face à un réalisé fiable.', 'Your budget, against reliable actuals.')}</h2>
        </div>
        <ol className="steps"><li><b>{t('Importer votre budget, tel qu’il est', 'Import your budget, as it is')}</b><span>{t('Excel, Google Sheets ou votre outil de planification. Budget initial, réestimé, atterrissage : chaque version est gardée.', 'Excel, Google Sheets or your planning tool. Original budget, reforecast, landing: every version is kept.')}</span></li><li><b>{t('Rattacher à la maille du réalisé', 'Map to the level of detail of actuals')}</b><span>{t('Chaque ligne du budget reliée une fois aux comptes, aux équipes et aux postes, sans refaire votre modèle.', 'Every budget line linked once to accounts, teams and positions, without rebuilding your model.')}</span></li><li><b>{t('Suivre le réalisé au fil du mois', 'Track actuals through the month')}</b><span>{t('Compta, paie et effectifs réconciliés au fil de l’eau. Les écarts au-dessus de votre seuil, par exemple 10 k€ ou 5 %, remontent en tête, sans attendre le trimestre.', 'Books, payroll and headcount reconciled as you go. Variances above your threshold, for example €10k or 5%, rise to the top, without waiting for quarter end.')}</span></li><li><b>{t('Expliquer et partager', 'Explain and share')}</b><span>{t('Chaque manager commente ses écarts ; son commentaire reste attaché à la ligne. Chacun voit son équipe, sans salaire individuel.', 'Each manager comments on their variances; the comment stays attached to the line. Everyone sees their team, with no individual salaries.')}</span></li></ol>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <figure aria-label={t('Exemple : l’écart de masse salariale de septembre, décomposé', 'Example: the September payroll variance, broken down')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Écart de masse salariale · septembre', 'Payroll variance · September')} <span>{t('· k€', '· €k')}</span></p><span className="chip warn">{t('+12,8 sur budget', '+12.8 vs. budget')}</span></div>
        <table className="rows">
        <tbody>
        <tr><td>{t('Effet effectif', 'Headcount effect')}<span className="src">{t('58 personnes contre 57 budgétées : deux commerciaux en avance, un développeur attendu en novembre', '58 people against 57 budgeted: two sales reps early, one developer expected in November')}</span></td><td className="v neg">{t('+9,2', '+9.2')}</td></tr>
        <tr><td>{t('Effet prix', 'Rate effect')}<span className="src">{t('Augmentations d’avril au-dessus du budget', 'April raises above budget')}</span></td><td className="v neg">{t('+2,2', '+2.2')}</td></tr>
        <tr><td>{t('Effet structure', 'Mix effect')}<span className="src">{t('Recrutements plus juniors que prévu', 'Hires more junior than planned')}</span></td><td className="v pos">{t('−2,2', '−2.2')}</td></tr>
        <tr><td>{t('Variable et commissions', 'Variable pay and commissions')}<span className="src">{t('Ventes de septembre au-dessus de l’objectif', 'September sales above target')}</span></td><td className="v neg">{t('+9,6', '+9.6')}</td></tr>
        <tr><td>{t('Décalages', 'Timing')}<span className="src">{t('Prime d’équipe passée en octobre, heures supplémentaires', 'Team bonus moved to October, overtime')}</span></td><td className="v pos">{t('−6,0', '−6.0')}</td></tr>
        <tr className="total"><td>{t('Écart total', 'Total variance')}</td><td className="v">{t('+12,8', '+12.8')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Chaque effet s’ouvre sur les postes concernés, pour qui a le droit de les voir.', 'Each effect opens onto the positions concerned, for whoever has permission to see them.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        <div className="intro">
        <p className="label">{t('La masse salariale, décomposée', 'Payroll, broken down')}</p>
        <h2 className="h2">{t('Un écart de 12,8 k€. Voici d’où il vient.', 'A €12.8k variance. Here’s where it comes from.')}</h2>
        <p>{t('La masse salariale est souvent le premier poste de coûts. Trame en décompose l’écart comme un contrôleur : effet effectif, effet prix, effet structure, variable, décalages. Le GVT et l’effet report se suivent sur l’année.', 'Payroll is often the largest cost line. Trame breaks down its variance the way a controller would: headcount effect, rate effect, mix effect, variable pay, timing. Pay drift and carry-over effects are tracked over the year.')}</p>
        <p>{t('Chaque effet remonte aux postes concernés. Un manager voit son équipe ; les salaires individuels restent réservés aux personnes que vous désignez.', 'Each effect traces back to the positions concerned. A manager sees their team; individual salaries stay reserved for the people you designate.')}</p>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Le réestimé', 'The reforecast')}</p>
        <h2 className="h2">{t('Sur des chiffres justes, Claude refait votre réestimé en quelques minutes.', 'On accurate numbers, Claude redoes your reforecast in minutes.')}</h2>
        <p>{t('Le réestimé est l’exercice que tout le monde repousse. Branché sur Trame, Claude part du réalisé réconcilié, avec vos règles et vos droits : il projette la fin d’année à partir du réalisé, des recrutements prévus et de vos hypothèses, et vous dit ce qui a bougé depuis le budget. Votre outil de planification, si vous en avez un, reçoit les mêmes chiffres.', 'The reforecast is the exercise everyone puts off. Connected to Trame, Claude starts from reconciled actuals, with your rules and your permissions: it projects year end from actuals, planned hires and your assumptions, and tells you what has moved since the budget. Your planning tool, if you have one, gets the same numbers.')}</p>
        <figure className="voice" style={{ marginTop: '8px' }}><blockquote>{t('« Si tu as des actuals propres, franchement, c’est à la portée de vraiment pas mal de monde, surtout avec Claude. »', '“If you have clean actuals, honestly, it’s within reach of a lot of people, especially with Claude.”')}</blockquote><figcaption><b>{t('Responsable finance', 'Head of finance')}</b> {t('· éditeur SaaS', '· SaaS company')}</figcaption></figure>
        </div>
        <div aria-label={t('Exemple d’échange avec une IA branchée sur Trame', 'Example of a conversation with an AI connected to Trame')} className="chat">
        <span className="who">{t('La CFO, dans Claude', 'The CFO, in Claude')}</span>
        <p className="bubble q2">{t('Refais le réestimé de masse salariale à partir du réalisé à fin septembre et des recrutements prévus. Qu’est-ce qui a bougé depuis le budget ?', 'Redo the payroll reforecast from actuals through September and planned hires. What has moved since the budget?')}</p>
        <p className="bubble a"><span className="num">{t('7 412 k€ · +96 k€ sur le budget', '€7,412k · +€96k vs. budget')}</span>{t('Deux commerciaux arrivés en avance (+52 k€), des commissions au-dessus de l’objectif (+38 k€) et les augmentations d’avril (+24 k€), en partie compensés par un développeur décalé à novembre (−18 k€). Le détail par équipe est prêt à exporter dans Excel.', 'Two sales reps who started early (+€52k), commissions above target (+€38k) and the April raises (+€24k), partly offset by a developer pushed to November (−€18k). The detail by team is ready to export to Excel.')}<span className="trace">{t('Réalisé à fin septembre · calculé avec les droits de la CFO · exemple fictif', 'Actuals through September · calculated with the CFO’s permissions · fictional example')}</span></p>
        </div>
        </div>
        </section>
        <section className="band tight paper">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq"><details><summary>{t('Faut-il refaire notre budget dans Trame ?', 'Do we need to rebuild our budget in Trame?')}</summary><div><p>{t('Non. Vous importez le fichier existant et vous rattachez ses lignes une fois aux comptes et aux équipes.', 'No. You import the existing file and map its lines once to accounts and teams.')}</p></div></details><details><summary>{t('Est-ce un outil de planification ?', 'Is this a planning tool?')}</summary><div><p>{t('Non. Trame produit un réalisé juste et réconcilié. Le budget et le réestimé se construisent où vous voulez : Excel, Claude ou un outil de planification, que Trame alimente.', 'No. Trame produces accurate, reconciled actuals. The budget and reforecast get built wherever you want: Excel, Claude or a planning tool, which Trame feeds.')}</p></div></details><details><summary>{t('Comment rapprochez-vous la paie des effectifs budgétés ?', 'How do you reconcile payroll with budgeted headcount?')}</summary><div><p>{t('Poste par poste : chaque salarié du journal de paie est rattaché à un poste budgété. Arrivées décalées, départs et remplacements apparaissent comme tels.', 'Position by position: every employee in the payroll journal is mapped to a budgeted position. Delayed starts, departures and replacements show up as such.')}</p></div></details><details><summary>{t('Mes managers peuvent-ils suivre leur budget sans voir les salaires ?', 'Can my managers track their budget without seeing salaries?')}</summary><div><p>{t('Oui. Ils voient le budget, le réalisé et les écarts de leur équipe, masse salariale agrégée comprise ; jamais un salaire individuel.', 'Yes. They see their team’s budget, actuals and variances, aggregated payroll included; never an individual salary.')}</p></div></details><details><summary>{t('Peut-on suivre le réestimé en plus du budget initial ?', 'Can we track the reforecast alongside the original budget?')}</summary><div><p>{t('Oui. Budget initial, réestimés successifs et atterrissage restent côte à côte, chacun daté.', 'Yes. Original budget, successive reforecasts and landing stay side by side, each one dated.')}</p></div></details><details><summary>{t('Quand le réalisé du mois est-il disponible ?', 'When are the month’s actuals available?')}</summary><div><p>{t('Au fil du mois : le réalisé provisoire se met à jour chaque jour, signalé comme tel, et vous validez la version définitive quand la compta est passée.', 'Throughout the month: provisional actuals update every day, flagged as such, and you approve the final version once the books are posted.')}</p></div></details></div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <p className="label">{t('Sur les mêmes chiffres', 'On the same numbers')}</p>
        <div className="uses" style={{ marginTop: '20px' }}><Link to="/cas-usage/cash-analytique" className="use"><h3>{t('Cash analytique', 'Cash analytics')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre trésorerie de ce matin, expliquée par entité, client ou projet', 'This morning’s cash position, explained by entity, customer or project')}</p></Link><Link to="/cas-usage/pnl-analytique" className="use"><h3>{t(<>P&amp;L analytique</>, 'Analytical P&L')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre marge par client, produit ou canal, jusqu’à la pièce', 'Your margin by customer, product or channel, down to the source document')}</p></Link><Link to="/cas-usage/chiffre-affaires" className="use"><h3>{t('Chiffre d’affaires', 'Revenue')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Du contrat signé à l’écriture, chaque mois', 'From signed contract to journal entry, every month')}</p></Link><Link to="/cas-usage/consolidation" className="use"><h3>Consolidation</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre groupe consolidé chaque mois, sans fichier Excel', 'Your group consolidated every month, without an Excel file')}</p></Link></div>
        </div>
        </section>
        <ClosingCta
          title={t('Chaque écart expliqué, avant qu’il ne devienne un problème.', 'Every variance explained, before it becomes a problem.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de votre budget, de votre réalisé et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first call: we run an assessment of your budget, your actuals and your pain points. You leave knowing how much you can gain.')}
        />
      </Rails>
    </main>
  );
}

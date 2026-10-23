// Saas page. Copy and blocks follow the « Site Trame V1 » mock-up (saas.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function Saas() {
  const t = useT();
  usePageMeta(
    t('Finance SaaS : un ARR réconcilié avec la compta | Trame', 'SaaS finance: an ARR reconciled with the books | Trame'),
    t('Pour les CFO de SaaS : un ARR réconcilié avec la facturation et la compta, un chiffre d’affaires reconnu sans fichier, et un burn qui ne change plus d’un board à l’autre.', 'For SaaS CFOs: an ARR reconciled with billing and the books, revenue recognized without spreadsheets, and a burn that no longer changes from one board meeting to the next.'),
  );
  return (
    <main className="v1">
      <PageHero
        kicker={t('Secteurs · Tech & SaaS', 'Sectors · Tech & SaaS')}
        title={t('Un seul ARR, du CRM à la compta.', 'One ARR, from CRM to the books.')}
        lead={t(
          <>L’ARR, la marge et le burn de votre board, réconciliés avec la compta, avec une version validée pour chaque board. <span>Pour les CFO de SaaS qui les défendent devant un fonds, un commissaire aux comptes ou un acheteur.</span></>,
          <>The ARR, margin and burn you take to your board, reconciled with the books, with an approved version for every board meeting. <span>For SaaS CFOs who defend them in front of a fund, an auditor or a buyer.</span></>,
        )}
        ctas={<><DemoButton /><LinkButton to="/cas-usage/chiffre-affaires" size="lg" variant="ghostInverse">{t('Voir le cas Chiffre d’affaires', 'See the Revenue use case')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : le pont d’ARR du trimestre', 'Example: the quarter’s ARR bridge')} className="card" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t('Variation de l’ARR · T3 2026 ', 'ARR bridge · Q3 2026 ')}<span>{t('· k€', '· €k')}</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Rapproché de la facturation', 'Reconciled with billing')}</span>
        </div>
        <table className="rows">
        <tbody>
        <tr><td>{t('ARR au 30 juin', 'ARR at June 30')}<span className="src">{t('Retraité en définition v4 · services exclus', 'Restated under definition v4 · services excluded')}</span></td><td className="v">{t('8 704,1', '8,704.1')}</td></tr>
        <tr><td>{t('Nouveaux clients', 'New customers')}<span className="src">{t('11 contrats, tous facturés', '11 contracts, all invoiced')}</span></td><td className="v pos">{t('+612,0', '+612.0')}</td></tr>
        <tr><td>{t('Expansion', 'Expansion')}<span className="src">{t('Montées en gamme et usage', 'Upgrades and usage')}</span></td><td className="v pos">{t('+298,4', '+298.4')}</td></tr>
        <tr><td>{t('Contraction', 'Contraction')}</td><td className="v neg">{t('−84,6', '−84.6')}</td></tr>
        <tr><td>{t('Churn', 'Churn')}<span className="src">{t('6 clients, dont 3 résiliations non saisies dans le CRM', '6 customers, including 3 cancellations never entered in the CRM')}</span></td><td className="v neg">{t('−340,2', '−340.2')}</td></tr>
        <tr className="total"><td>{t('ARR au 30 septembre', 'ARR at September 30')}</td><td className="v">{t('9 189,7', '9,189.7')}</td></tr>
        <tr><td>{t('Rétention nette', 'Net retention')}<span className="src">{t('Sur le trimestre', 'Over the quarter')}</span></td><td className="v">{t('98,5 %', '98.5%')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Chaque ligne s’ouvre sur ses contrats et ses factures.', 'Each line opens onto its contracts and invoices.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap"><span className="who">{t('Jahia · éditeur SaaS, 6 entités', 'Jahia · SaaS software company, 6 entities')}</span><span className="figure">{t('Cycle de chiffre d’affaires : de 3 jours à une demi-journée', 'Revenue cycle: from 3 days to half a day')}</span></div></div>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que vivent les CFO de SaaS', 'What SaaS CFOs deal with')}</p>
        <h2 className="h2">{t('Le CRM, la facturation et la compta donnent trois ARR à votre board.', 'Your CRM, billing and books give your board three different ARRs.')}</h2>
        <p>{t('L’ARR du board et le CA comptable divergent : des services comptés comme récurrents, des résiliations non saisies dans le CRM, des avenants jamais saisis. Stripe arrive en milliers de lignes nettes de frais. Et la masse salariale, qui fait l’essentiel des coûts, ne se lit pas par équipe.', 'Board ARR and booked revenue diverge: services counted as recurring, cancellations never entered in the CRM, amendments never recorded. Stripe arrives as thousands of lines, net of fees. And payroll, most of your costs, can’t be read by team.')}</p>
        </div>
        <div className="voices two"><figure className="voice"><blockquote>{t('« Devant l’actionnaire, bon si oui c’est la data, c’est mon outil qui me l’a dit, ça me suffit pas. »', '“In front of the shareholder, ‘well, it’s the data, my tool told me so’ just isn’t good enough for me.”')}</blockquote><figcaption>{t(<><b>CFO</b> · éditeur SaaS sous fonds</>, <><b>CFO</b> · fund-backed SaaS company</>)}</figcaption></figure></div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap">
        <div className="intro"><h2 className="h2">{t('Ce que Trame fait pour un SaaS.', 'What Trame does for a SaaS company.')}</h2></div>
        <div className="feats">
        <div className="feat"><h3>{t('Un ARR rapproché', 'A reconciled ARR')}</h3><p>{t('Calculé depuis les contrats du CRM et rapproché de la facturation et du CA comptable ; variation de l’ARR et rétention nette, chacune avec sa définition.', 'Calculated from CRM contracts and reconciled with billing and booked revenue; ARR bridge and net retention, each with its own definition.')}</p></div>
        <div className="feat"><h3>{t('Un chiffre d’affaires reconnu, sans fichier', 'Revenue recognized, without spreadsheets')}</h3><p>{t('Abonnements étalés, usage facturé à terme échu, régularisations : votre CA reconnu chaque mois selon vos règles, sans recalcul à la main ni écart avec la compta.', 'Spread subscriptions, usage billed in arrears, true-ups: your revenue recognized every month according to your rules, with no manual recalculation and no variance with the books.')}</p></div>
        <div className="feat"><h3>{t('Stripe et Chargebee rapprochés', 'Stripe and Chargebee reconciled')}</h3><p>{t('Chaque versement éclaté en paiements, frais, remboursements et impayés, rattaché à sa facture.', 'Every payout broken down into payments, fees, refunds and failed payments, matched to its invoice.')}</p></div>
        <div className="feat"><h3>{t('La marge brute par client', 'Gross margin by customer')}</h3><p>{t('Hébergement, support, coûts d’API d’IA : imputés par client ou par produit, avec vos clés.', 'Hosting, support, AI API costs: allocated by customer or by product, with your allocation keys.')}</p></div>
        <div className="feat"><h3>{t('La masse salariale par équipe', 'Payroll by team')}</h3><p>{t('R&D, ventes, customer success, fonctions support, en coût complet ; les salaires individuels protégés. Les temps passés en R&D sont disponibles pour votre dossier de crédit d’impôt recherche.', 'R&D, sales, customer success, support functions, at fully loaded cost; individual salaries protected. Time spent on R&D is available for your research tax credit claim.')}</p></div>
        <div className="feat"><h3>{t('Burn et runway consolidés', 'Consolidated burn and runway')}</h3><p>{t('Trésorerie du groupe, multi-devises, burn mensuel validé : le burn présenté au board ne change plus après la réunion.', 'Group cash, multi-currency, approved monthly burn: the burn presented to the board no longer changes after the meeting.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Le jour de la due diligence', 'Due diligence day')}</p>
        <h2 className="h2">{t('« Comment calculez-vous l’ARR depuis deux ans ? »', '“How have you calculated ARR over the past two years?”')}</h2>
        <p>{t('L’acheteur veut la définition, ses changements, et l’impact de chacun. Avec Trame, vous ouvrez le journal : chaque version de la définition, qui l’a proposée, qui l’a validée, et les mois qu’elle a touchés.', 'The buyer wants the definition, its changes, and the impact of each. With Trame, you open the log: every version of the definition, who proposed it, who approved it, and the months it affected.')}</p>
        <p>{t('Vous pouvez ouvrir à votre fonds ou à l’acheteur un accès en lecture seule aux mois validés, limité dans le temps.', 'You can give your fund or the buyer time-limited, read-only access to the approved months.')}</p>
        </div>
        <figure aria-label={t('Exemple : l’historique de la définition de l’ARR', 'Example: the history of the ARR definition')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Définition · ARR', 'Definition · ARR')}</p><span className="chip">{t('Version 4 en vigueur', 'Version 4 in force')}</span></div>
        <ol className="journal">
        <li><time>{t('3 oct. 26', 'Oct 3, 26')}</time><div><span className="kind">v4</span>{t(<><b>Services exclus de l’ARR.</b> Bastien, validé par le CFO.</>, <><b>Services excluded from ARR.</b> Bastien, approved by the CFO.</>)}<span className="who">{t('Impact sur septembre : −186,0 k€ · aligné sur la définition du fonds', 'Impact on September: −€186.0k · aligned with the fund’s definition')}</span></div></li>
        <li><time>{t('2 janv. 26', 'Jan 2, 26')}</time><div><span className="kind">v3</span>{t(<><b>ARR en euros au taux du budget.</b> CFO.</>, <><b>ARR in euros at the budget rate.</b> CFO.</>)}<span className="who">{t('Les contrats en dollars ne font plus varier l’ARR avec le change', 'Dollar contracts no longer move ARR with the exchange rate')}</span></div></li>
        <li><time>{t('5 juin 25', 'Jun 5, 25')}</time><div><span className="kind">v2</span>{t(<><b>Les contrats en préavis restent dans l’ARR jusqu’à leur fin.</b> CFO.</>, <><b>Contracts under notice stay in ARR until they end.</b> CFO.</>)}<span className="who">{t('Demandé par le board', 'Requested by the board')}</span></div></li>
        <li><time>{t('1er mars 25', 'Mar 1, 25')}</time><div><span className="kind">v1</span>{t(<><b>ARR = MRR des abonnements actifs × 12.</b> Première définition.</>, <><b>ARR = MRR of active subscriptions × 12.</b> First definition.</>)}</div></li>
        </ol>
        <figcaption className="card-foot"><span>{t('Chaque mois se rejoue avec la définition de l’époque.', 'Each month replays with the definition in force at the time.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <p className="label">{t('Tous les cas d’usage, pour un SaaS', 'All use cases, for a SaaS company')}</p>
        <div className="uses">
        <Link to="/cas-usage/cash-analytique" className="use"><h3>{t('Cash analytique', 'Cash analytics')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Burn, runway et trésorerie multi-devises, chaque matin.', 'Burn, runway and multi-currency cash, every morning.')}</p></Link>
        <Link to="/cas-usage/pnl-analytique" className="use"><h3>{t('P&L analytique', 'Analytical P&L')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('La marge brute par client et par produit, hébergement et support imputés.', 'Gross margin by customer and by product, with hosting and support allocated.')}</p></Link>
        <Link to="/cas-usage/chiffre-affaires" className="use"><h3>{t('Chiffre d’affaires', 'Revenue')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('ARR, PCA et FAE réconciliés du CRM à la compta, chaque mois.', 'ARR, deferred revenue and unbilled revenue reconciled from CRM to the books, every month.')}</p></Link>
        <Link to="/cas-usage/consolidation" className="use"><h3>{t('Consolidation', 'Consolidation')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Holding et filiales, multi-devises, intragroupe éliminé, chaque mois.', 'Holding company and subsidiaries, multi-currency, intercompany eliminated, every month.')}</p></Link>
        <Link to="/cas-usage/budget-realise" className="use"><h3>{t('Budget / réalisé', 'Budget vs. actuals')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('La masse salariale réalisée face aux effectifs budgétés, équipe par équipe.', 'Actual payroll against budgeted headcount, team by team.')}</p></Link>
        </div>
        <p className="muted mt-m">{t('Branché sur HubSpot, Salesforce, Attio, Stripe, Chargebee, Pennylane, Qonto, vos banques et votre entrepôt. ', 'Connected to HubSpot, Salesforce, Attio, Stripe, Chargebee, Pennylane, Qonto, your banks and your data warehouse. ')}<Link to="/integrations">{t('Toutes les intégrations →', 'All integrations →')}</Link></p>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq">
        <details><summary>{t('Comment l’ARR est-il rapproché du CA comptable ?', 'How is ARR reconciled with booked revenue?')}</summary><div><p>{t('Contrat par contrat : chaque ligne d’ARR est reliée à ses factures et à ses écritures. L’écart entre l’ARR et le CA comptable est décomposé par cause : services, usage, étalement, change, résiliations.', 'Contract by contract: every ARR line is linked to its invoices and its journal entries. The variance between ARR and booked revenue is broken down by cause: services, usage, spreading, FX, cancellations.')}</p></div></details>
        <details><summary>{t('Gérez-vous l’usage et les contrats pluriannuels ?', 'Do you handle usage and multi-year contracts?')}</summary><div><p>{t('Oui. L’usage est importé et valorisé selon votre grille ; les contrats pluriannuels sont étalés selon votre règle, avec les PCA correspondants.', 'Yes. Usage is imported and priced according to your rate card; multi-year contracts are spread according to your rule, with the matching deferred revenue.')}</p></div></details>
        <details><summary>{t('Nos chiffres de board vont-ils encore bouger après la réunion ?', 'Will our board figures still move after the meeting?')}</summary><div><p>{t('Non. La version présentée est validée et ne bouge plus. Une correction tardive passe sur le mois suivant, avec son motif, et le board d’après voit les deux.', 'No. The version presented is approved and no longer moves. A late correction goes into the following month, with its reason, and the next board sees both.')}</p></div></details>
        <details><summary>{t('Comment préparer une due diligence avec Trame ?', 'How do you prepare a due diligence with Trame?')}</summary><div><p>{t('Les mois validés, les définitions de l’ARR et de l’EBITDA ajusté, et chaque ajustement avec son auteur sont déjà là. Vous ouvrez un accès en lecture seule, limité dans le temps.', 'The approved months, the definitions of ARR and adjusted EBITDA, and every adjustment with its author are already there. You open time-limited, read-only access.')}</p></div></details>
        <details><summary>{t('Nos filiales aux États-Unis et au Royaume-Uni sont-elles consolidées en euros ?', 'Are our US and UK subsidiaries consolidated in euros?')}</summary><div><p>{t('Oui, au taux moyen pour le compte de résultat et au taux de clôture pour le bilan, avec l’intragroupe éliminé.', 'Yes, at the average rate for the income statement and the closing rate for the balance sheet, with intercompany eliminated.')}</p></div></details>
        <details><summary>{t('Trame remplace-t-il notre outil de facturation ?', 'Does Trame replace our billing tool?')}</summary><div><p>{t('Non. Stripe Billing, Chargebee ou votre outil maison continuent de facturer. Trame lit les factures et les rapproche du CRM et de la compta.', 'No. Stripe Billing, Chargebee or your in-house tool keep invoicing. Trame reads the invoices and reconciles them with the CRM and the books.')}</p></div></details>
        </div>
        </div>
        </section>
        <ClosingCta
          title={t('Un ARR que vous pouvez défendre, ligne par ligne.', 'An ARR you can defend, line by line.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de votre ARR, de votre CRM et de votre compta. Vous repartez en sachant d’où viennent vos écarts, et combien vous pouvez gagner.', 'Book a first call: we run an assessment of your ARR, your CRM and your books. You leave knowing where your discrepancies come from, and how much you stand to gain.')}
        />
      </Rails>
    </main>
  );
}

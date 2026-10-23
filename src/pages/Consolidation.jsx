// Consolidation page. Copy and blocks follow the « Site Trame V1 » mock-up (consolidation.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function Consolidation() {
  const t = useT();
  usePageMeta(t('Consolidation de gestion multi-entités | Trame', 'Multi-entity management consolidation | Trame'), t('Entités, devises, intragroupe et retraitements : votre consolidé de gestion chaque mois, sans fichier Excel, chaque chiffre relié à son écriture.', 'Entities, currencies, intercompany and adjustments: your management consolidation every month, without an Excel file, every figure linked to its journal entry.'));
  return (
    <main className="v1">
      <PageHero
        kicker={<><Link to="/#usages">{t('Cas d’usage', 'Use cases')}</Link> · Consolidation</>}
        title={t('Votre groupe consolidé, sans fichier de consolidation.', 'Your group consolidated, without a consolidation file.')}
        lead={<>{t('Chaque mois, Trame convertit vos filiales, élimine l’intragroupe et applique vos retraitements de gestion.', 'Every month, Trame converts your subsidiaries, eliminates intercompany and applies your management adjustments.')} <span>{t('Votre consolidé de gestion chaque mois, chaque chiffre relié à son entité et à son écriture.', 'Your management consolidation every month, every figure linked to its entity and its journal entry.')}</span></>}
        ctas={<><DemoButton /><LinkButton to="#comment" size="lg" variant="ghostInverse">{t('Voir comment ça marche', 'See how it works')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : un P&L consolidé de groupe dans Trame', 'Example: a consolidated group P&L in Trame')} className="card" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t(<>Groupe · P&amp;L consolidé · septembre</>, 'Group · consolidated P&L · September')} <span>{t('· k€', '· €k')}</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Consolidé le 7 octobre', 'Consolidated on Oct 7')}</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
        <table className="rows" style={{ minWidth: '470px' }}>
        <thead><tr><th></th><th className="v">France</th><th className="v">{t('États-Unis', 'United States')}</th><th className="v">Canada</th><th className="v">{t('Élim.', 'Elim.')}</th><th className="v">{t('Groupe', 'Group')}</th></tr></thead>
        <tbody>
        <tr><td>{t('Chiffre d’affaires', 'Revenue')}</td><td className="v">{t('612,4', '612.4')}</td><td className="v">{t('298,1', '298.1')}</td><td className="v">{t('41,0', '41.0')}</td><td className="v neg">{t('−41,0', '−41.0')}</td><td className="v">{t('910,5', '910.5')}</td></tr>
        <tr><td>{t('Charges de personnel', 'Personnel costs')}</td><td className="v">{t('−301,7', '−301.7')}</td><td className="v">{t('−168,2', '−168.2')}</td><td className="v">{t('−29,6', '−29.6')}</td><td className="v">{t('0,0', '0.0')}</td><td className="v">{t('−499,5', '−499.5')}</td></tr>
        <tr><td>{t('Autres charges', 'Other expenses')}</td><td className="v">{t('−222,5', '−222.5')}</td><td className="v">{t('−108,5', '−108.5')}</td><td className="v">{t('−7,3', '−7.3')}</td><td className="v">{t('41,0', '41.0')}</td><td className="v">{t('−297,3', '−297.3')}</td></tr>
        <tr className="total"><td>EBITDA</td><td className="v">{t('88,2', '88.2')}</td><td className="v">{t('21,4', '21.4')}</td><td className="v">{t('4,1', '4.1')}</td><td className="v">{t('0,0', '0.0')}</td><td className="v">{t('113,7', '113.7')}</td></tr>
        </tbody>
        </table>
        </div>
        <div className="note"><span aria-hidden="true" className="dot"></span><p><b>{t('Intragroupe éliminé : 41,0 k€.', 'Intercompany eliminated: €41.0k.')}</b> {t(<>Refacturation de R&amp;D du Canada vers la France, rapprochée des deux côtés. États-Unis et Canada convertis au taux moyen de septembre.</>, 'R&D recharge from Canada to France, reconciled on both sides. United States and Canada converted at the September average rate.')}</p></div>
        <figcaption className="card-foot"><span>{t('Chaque chiffre consolidé remonte à son entité et à son écriture.', 'Every consolidated figure traces back to its entity and its journal entry.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <div className="logos"><div className="wrap"><span className="who">{t('Pour les groupes de 2 à 20 entités, en France et à l’étranger', 'For groups of 2 to 20 entities, in France and abroad')}</span><span className="figure">{t('Un consolidé de gestion chaque mois, sans fichier Excel', 'A management consolidation every month, without an Excel file')}</span></div></div>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Aujourd’hui', 'Today')}</p>
        <h2 className="h2">{t('Chaque clôture, le même fichier, refait à la main.', 'Every close, the same file, rebuilt by hand.')}</h2>
        <p>{t('Chaque filiale a son logiciel, son plan de comptes et sa devise. Les soldes intragroupe ne tombent jamais du premier coup, les taux se ressaisissent, et au premier rachat, il faut tout refaire.', 'Each subsidiary has its own software, chart of accounts and currency. Intercompany balances never match on the first try, rates get re-entered, and at the first acquisition, everything has to be rebuilt.')}</p>
        </div>
        <div className="voices two"><figure className="voice"><blockquote>{t('« Je sors 10 fichiers Excel de tous les outils, j’essaie de les faire matcher entre eux. »', '“I pull 10 Excel files out of all the tools and try to make them match each other.”')}</blockquote><figcaption><b>CFO</b> {t('· cabinet de conseil, 10 entités', '· consulting firm, 10 entities')}</figcaption></figure></div><div className="swap"><div className="th">{t('Aujourd’hui', 'Today')}</div><div className="th">{t('Avec Trame', 'With Trame')}</div><div>{t('Un fichier Excel par clôture, refait à chaque rachat', 'One Excel file per close, rebuilt at every acquisition')}</div><div>{t('Une nouvelle entité se branche ; vos règles s’appliquent', 'A new entity connects; your rules apply')}</div><div>{t('Les soldes intragroupe rapprochés à la main', 'Intercompany balances reconciled by hand')}</div><div>{t('Les opérations réciproques rapprochées par paire d’entités, écarts signalés', 'Reciprocal transactions reconciled by pair of entities, discrepancies flagged')}</div><div>{t('Les taux de change ressaisis chaque mois', 'Exchange rates re-entered every month')}</div><div>{t('Taux BCE moyens, journaliers ou de clôture, figés avec la version validée', 'ECB average, daily or closing rates, locked with the approved version')}</div><div>{t('Un consolidé qui arrive des semaines après la clôture', 'A consolidation that arrives weeks after the close')}</div><div>{t('Un consolidé à jour au fil de l’eau, validé quand vous le décidez', 'A consolidation kept up to date as you go, approved when you decide')}</div></div>
        </div>
        </section>
        <section className="band paper" id="comment">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Comment ça marche', 'How it works')}</p>
        <h2 className="h2">{t(<>De la balance de chaque entité au P&amp;L du groupe.</>, 'From each entity’s trial balance to the group P&L.')}</h2>
        </div>
        <ol className="steps"><li><b>{t('Brancher la compta de chaque entité', 'Connect each entity’s books')}</b><span>{t('Pennylane ou Sage en France, Xero, Exact ou DATEV à l’étranger : chaque entité garde son logiciel et sa devise.', 'Pennylane or Sage in France, Xero, Exact or DATEV abroad: each entity keeps its software and its currency.')}</span></li><li><b>{t('Passer au plan de comptes groupe', 'Map to the group chart of accounts')}</b><span>{t('Une table de passage écrite une fois pour chaque plan local. Les comptes nouveaux sont signalés dès qu’ils apparaissent.', 'A mapping table written once for each local chart. New accounts are flagged as soon as they appear.')}</span></li><li><b>{t('Rapprocher et éliminer l’intragroupe', 'Reconcile and eliminate intercompany')}</b><span>{t('Refacturations, frais de siège, prêts et comptes courants : rapprochés des deux côtés, éliminés, écarts listés.', 'Recharges, head office fees, loans and current accounts: reconciled on both sides, eliminated, discrepancies listed.')}</span></li><li><b>{t('Convertir et valider', 'Convert and approve')}</b><span>{t('Taux moyen ou journalier pour le compte de résultat, taux de clôture pour le bilan, écart de conversion isolé. Vous validez la version présentée.', 'Average or daily rate for the income statement, closing rate for the balance sheet, translation difference isolated. You approve the version presented.')}</span></li></ol>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <div className="card" style={{ padding: '28px', display: 'grid', gap: '16px' }}>
        <p className="label">{t('Vérifiez-le vous-même', 'Check it yourself')}</p>
        <ol className="steps timed" style={{ margin: 0, gridTemplateColumns: 'minmax(0,1fr)', gap: '10px' }}>
        <li style={{ padding: '16px 18px' }}><span className="when">1</span><b>{t('Consolidé = total des entités + éliminations + retraitements', 'Consolidated = sum of entities + eliminations + adjustments')}</b><span>{t('La règle s’affiche sur chaque ligne du consolidé, colonne par colonne.', 'The rule is shown on every line of the consolidation, column by column.')}</span></li>
        <li style={{ padding: '16px 18px' }}><span className="when">2</span><b>{t('Les soldes réciproques sont à zéro, ou expliqués', 'Reciprocal balances are at zero, or explained')}</b><span>{t('Chaque paire d’entités, chaque écart intragroupe avec son montant et sa cause.', 'Every pair of entities, every intercompany discrepancy with its amount and its cause.')}</span></li>
        <li style={{ padding: '16px 18px' }}><span className="when">3</span><b>{t('Les taux sont ceux de la version validée', 'The rates are those of the approved version')}</b><span>{t('Taux moyen ou journalier de septembre pour le compte de résultat, taux du 30 septembre pour le bilan. Source BCE, figés avec le mois.', 'September average or daily rate for the income statement, September 30 rate for the balance sheet. ECB source, locked with the month.')}</span></li>
        <li style={{ padding: '16px 18px' }}><span className="when">4</span><b>{t('Chaque chiffre descend jusqu’à l’écriture', 'Every figure goes down to the journal entry')}</b><span>{t('Du groupe à l’entité, de l’entité au compte, du compte à l’écriture de son FEC.', 'From group to entity, entity to account, account to the entry in its FEC (the French general-ledger audit file).')}</span></li>
        </ol>
        </div>
        <div className="intro">
        <p className="label">{t('Pour le contrôleur qui défend le chiffre', 'For the financial controller who defends the number')}</p>
        <h2 className="h2">{t('Un consolidé qu’on peut vérifier en quatre étapes.', 'A consolidation you can check in four steps.')}</h2>
        <p>{t('Trame affiche sa méthode : la règle de bouclage, les écarts intragroupe, les taux et leur source, et le chemin jusqu’à l’écriture. Votre CFO, votre auditeur et votre fonds suivent le même chemin que vous.', 'Trame shows its method: the tie-out rule, the intercompany discrepancies, the rates and their source, and the path down to the journal entry. Your CFO, your auditor and your investors follow the same path as you.')}</p>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que vous pouvez demander', 'What you can ask')}</p>
        <h2 className="h2">{t('Le groupe, entité par entité.', 'Ask about the group, entity by entity.')}</h2>
        </div>
        <div className="qs"><div className="q"><span>{t('« Quelle filiale pèse le plus sur l’EBITDA du groupe ? »', '“Which subsidiary weighs most on group EBITDA?”')}</span><b>{t('Contribution par entité', 'Contribution by entity')}</b></div><div className="q"><span>{t('« Combien nous a coûté le change sur le dollar ce trimestre ? »', '“How much did the dollar exchange rate cost us this quarter?”')}</span><b>{t('Écart de conversion', 'Translation difference')}</b></div><div className="q"><span>{t('« À quoi ressemble le groupe à périmètre constant, sans la société rachetée en mars ? »', '“What does the group look like on a like-for-like basis, without the company acquired in March?”')}</span><b>{t('Périmètre', 'Scope')}</b></div></div>
        </div>
        </section>
        <section className="band tight paper">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq"><details><summary>{t('Est-ce une consolidation de gestion ou statutaire ?', 'Is this a management or a statutory consolidation?')}</summary><div><p>{t('De gestion, chaque mois. Les comptes consolidés statutaires restent chez votre cabinet ou dans votre outil ; Trame leur fournit des chiffres rapprochés et justifiés.', 'Management, every month. Statutory consolidated accounts stay with your accounting firm or in your tool; Trame gives them reconciled, documented figures.')}</p></div></details><details><summary>{t('Comment traitez-vous un écart intragroupe entre deux filiales ?', 'How do you handle an intercompany discrepancy between two subsidiaries?')}</summary><div><p>{t('Il est listé avec son montant, les deux écritures concernées et sa cause probable : décalage de date, taux, facture non reçue. Vous le corrigez à la source ou vous le justifiez ; dans les deux cas, c’est tracé.', 'It’s listed with its amount, the two entries involved and its likely cause: timing difference, rate, invoice not received. You fix it at the source or you justify it; either way, it’s logged.')}</p></div></details><details><summary>{t('Quels taux de change utilisez-vous ?', 'Which exchange rates do you use?')}</summary><div><p>{t('Les taux BCE par défaut : taux moyen du mois ou taux journalier pour le compte de résultat, taux de fin de mois pour le bilan. Vous pouvez imposer les vôtres ; ils sont figés avec la version validée.', 'ECB rates by default: monthly average or daily rate for the income statement, month-end rate for the balance sheet. You can set your own; they’re locked with the approved version.')}</p></div></details><details><summary>{t('Nos filiales sont sur des logiciels comptables différents.', 'Our subsidiaries use different accounting software.')}</summary><div><p>{t('C’est le cas habituel. Trame lit Pennylane, Sage, Cegid, Xero, Exact, DATEV, NetSuite et d’autres, et passe chacun au plan de comptes du groupe.', 'That’s the usual case. Trame reads Pennylane, Sage, Cegid, Xero, Exact, DATEV, NetSuite and others, and maps each one to the group chart of accounts.')}</p></div></details><details><summary>{t('Et quand nous rachetons une société ?', 'And when we acquire a company?')}</summary><div><p>{t('Elle se branche avec son historique ; vous écrivez sa table de passage une fois. Les mois déjà validés du groupe ne changent pas, et vous comparez à périmètre constant.', 'It connects with its history; you write its mapping table once. The group’s months already approved don’t change, and you compare on a like-for-like basis.')}</p></div></details><details><summary>{t('Que se passe-t-il si une filiale n’a pas fini sa clôture ?', 'What happens if a subsidiary hasn’t finished its close?')}</summary><div><p>{t('Elle entre avec une estimation documentée. Ses chiffres définitifs arrivent le mois suivant : l’écart passe sur ce mois-là, daté et expliqué, et septembre ne bouge pas.', 'It goes in with a documented estimate. Its final figures arrive the following month: the variance goes into that month, dated and explained, and September doesn’t move.')}</p></div></details></div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <p className="label">{t('Sur les mêmes chiffres', 'On the same numbers')}</p>
        <div className="uses" style={{ marginTop: '20px' }}><Link to="/cas-usage/cash-analytique" className="use"><h3>{t('Cash analytique', 'Cash analytics')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre trésorerie de ce matin, expliquée par entité, client ou projet', 'This morning’s cash position, explained by entity, customer or project')}</p></Link><Link to="/cas-usage/pnl-analytique" className="use"><h3>{t(<>P&amp;L analytique</>, 'Analytical P&L')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Votre marge par client, produit ou canal, jusqu’à la pièce', 'Your margin by customer, product or channel, down to the source document')}</p></Link><Link to="/cas-usage/chiffre-affaires" className="use"><h3>{t('Chiffre d’affaires', 'Revenue')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Du contrat signé à l’écriture, chaque mois', 'From signed contract to journal entry, every month')}</p></Link><Link to="/cas-usage/budget-realise" className="use"><h3>{t('Budget / réalisé', 'Budget vs. actuals')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Quelle équipe dérape, de combien, et pourquoi', 'Which team is off budget, by how much, and why')}</p></Link></div>
        </div>
        </section>
        <ClosingCta
          title={t('Toutes vos filiales, un seul chiffre. Plus de fichier de consolidation.', 'All your subsidiaries, one number. No more consolidation file.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de vos entités, de vos flux intragroupe et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first call: we run an assessment of your entities, your intercompany flows and your pain points. You leave knowing how much you can gain.')}
        />
      </Rails>
    </main>
  );
}

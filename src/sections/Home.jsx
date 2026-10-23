// Home page. Copy and blocks follow the « Site Trame V1 » mock-up (index.html); the hero and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton } from '../components/blocks.jsx';
import Hero from './Hero.jsx';
import ProductScreen from '../components/product/ProductScreen.jsx';

export default function Home() {
  const t = useT();
  usePageMeta(
    t('Trame · La data platform des équipes finance', 'Trame · The data foundation for finance teams'),
    t('Compta, CRM, facturation, PSP, banques et paie réconciliés ligne à ligne, chaque décision tracée, et des droits par personne pour brancher Claude ou ChatGPT.', 'Accounting, CRM, invoicing, payment providers, banks and payroll reconciled line by line, every decision tracked, and per-person permissions to connect Claude or ChatGPT.'),
  );
  return (
    <main className="v1">
      <Hero
        kicker={t('La data platform pour les équipes finance', 'The data foundation for finance teams')}
        title={t('Votre finance engineer.', 'Your finance engineer.')}
        lead={t(<>Trame réunit votre compta, vos ventes, vos banques et votre paie dans une base fiable et auditable, prête pour l’IA. <span>Le travail d’un finance engineer, sans le recruter.</span></>, <>Trame brings your accounting, sales, banks and payroll together in one reliable, auditable foundation, ready for AI. <span>The work of a finance engineer, without the hire.</span></>)}
        pills={[t('Tous vos outils réconciliés', 'All your tools reconciled'), t('Un seul chiffre pour toute l’entreprise', 'One number for the whole company'), t('Chaque décision gardée, avec son auteur', 'Every decision kept, with its author'), t('Les salaires protégés, même de l’IA', 'Salaries protected, even from AI')]}
        wide
        ctas={<><DemoButton /><LinkButton to="#mois" size="lg" variant="ghostInverse">{t('Voir comment ça marche', 'See how it works')}</LinkButton></>}
      >
        <ProductScreen />
      </Hero>
      <Rails>
        <div className="logos"><div className="wrap">
        <span className="who">{t('Ils travaillent avec Trame', 'They work with Trame')}</span>
        <div className="names"><span>Jahia</span><span>Mooncard</span><span>La Bonne Brosse</span><span>Typology</span></div>
        </div></div>
        <section className="band paper tight">
        <div className="wrap">
        <figure className="testimonial">
        <blockquote>{t('« Avant, chaque board commençait par deux jours à refaire les chiffres. Maintenant, je les ouvre : ils sont justes, et je sais d’où vient chacun. »', '“Every board meeting used to start with two days of redoing the numbers. Now I just open them: they’re right, and I know where each one comes from.”')}</blockquote>
        <figcaption><span aria-hidden="true" className="avatar">AL</span><div><b>Adrien Leleu</b><br /><span>{t('CFO, Jahia · éditeur SaaS, 6 entités', 'CFO, Jahia · SaaS company, 6 entities')}</span></div><span className="chip warn" style={{ marginLeft: 'auto' }}>{t('Citation proposée, à valider', 'Proposed quote, pending approval')}</span></figcaption>
        </figure>
        <div className="ba three">
        <div><span className="n">{t('−80 %', '−80%')}</span><p>{t('de temps passé à rapprocher le CRM, la facturation et la compta, à chaque cycle de chiffre d’affaires', 'time spent reconciling the CRM, invoicing and the books, every revenue cycle')}</p><cite>{t('Jahia · éditeur SaaS · mesuré : 3 jours → ½ journée', 'Jahia · SaaS company · measured: 3 days → half a day')}</cite></div>
        <div><span className="n">{t('30 k€', '€30k')}</span><p>{t('de chiffre d’affaires retrouvé : cinq contrats toujours actifs, qui n’étaient plus facturés', 'in revenue recovered: five contracts still active that were no longer being invoiced')}</p><cite>{t('Jahia · éditeur SaaS · déclaré', 'Jahia · SaaS company · self-reported')}</cite></div>
        <div><span className="n">{t('24 jours', '24 days')}</span><p>{t('rendus chaque année au contrôle de gestion, sur le seul reporting mensuel', 'given back to the controlling team each year, on monthly reporting alone')}</p><cite>{t('Mooncard · fintech · déclaré : 3 jours → 1 par mois', 'Mooncard · fintech · self-reported: 3 days → 1 per month')}</cite></div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Sans Trame', 'Without Trame')}</p>
        <h2 className="h2">{t('Chaque outil a son IA. Et chaque IA, son chiffre.', 'Every tool has its own AI. And every AI, its own number.')}</h2>
        <p>{t('Votre CRM, votre outil de facturation et Excel ont tous leur IA. Posez-leur la même question, le chiffre d’affaires de septembre : trois outils, trois réponses, et aucune ne retombe sur la compta.', 'Your CRM, your invoicing tool and Excel all have their own AI. Ask them the same question, September revenue: three tools, three answers, and none of them ties back to the books.')}</p>
        <p>{t('Avec Trame, toutes vos IA partent du même chiffre de référence, rapproché ligne à ligne de vos outils et de votre comptabilité.', 'With Trame, all your AIs start from the same reference figure, reconciled line by line with your tools and your books.')}</p>
        </div>
        <div aria-label={t('Exemple : trois réponses différentes à la même question', 'Example: three different answers to the same question')} className="inflation">
        <p className="cap">{t('« Quel chiffre d’affaires en septembre ? » · exemple fictif', '“What was revenue in September?” · fictional example')}</p>
        <div className="src"><span>{t('L’IA du CRM', 'The CRM’s AI')}</span><b>{t('1 921,0 k€', '€1,921.0k')}</b></div>
        <div className="src"><span>{t('L’IA de la facturation', 'The invoicing tool’s AI')}</span><b>{t('1 874,3 k€', '€1,874.3k')}</b></div>
        <div className="src"><span>{t('L’IA d’Excel', 'Excel’s AI')}</span><b>{t('1 836,9 k€', '€1,836.9k')}</b></div>
        <div className="ref"><span>{t('Trame · arrêté le 7 octobre', 'Trame · closed on Oct 7')}</span><b>{t('1 842,6 k€', '€1,842.6k')}</b></div>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Lundi, 8 h', 'Monday, 8 am')}</p>
        <h2 className="h2">{t('Votre CEO demande à Claude pourquoi la marge a baissé.', 'Your CEO asks Claude why margin dropped.')}</h2>
        <p>{t('Claude sait analyser. Mais sur un export, il ne connaît ni vos règles de gestion, ni le chiffre présenté au board, ni ce qu’il a le droit de voir : il calcule avec ce qu’on lui donne, et se trompe sans le savoir. Branché sur Trame, il part de chiffres déjà réconciliés, avec vos définitions et les droits du CEO. Il répond juste, et cite sa source.', 'Claude knows how to analyze. But working from an export, it knows neither your business rules, nor the figure presented to the board, nor what it’s allowed to see: it calculates with what it’s given, and gets it wrong without knowing. Connected to Trame, it starts from figures already reconciled, with your definitions and the CEO’s permissions. It answers correctly, and cites its source.')}</p>
        </div>
        <div className="vs">
        <div>
        <p className="vs-h">{t('Claude, sur un export Excel du 12 octobre', 'Claude, on an Excel export from Oct 12')}</p>
        <p className="bubble q2">{t('Pourquoi la marge sur Zalando a-t-elle baissé en septembre ?', 'Why did the Zalando margin drop in September?')}</p>
        <p className="bubble a weak">{t(<><span className="num">≈ 51 %</span>La marge semble stable par rapport à août. Les données disponibles ne permettent pas d’expliquer une baisse.<span className="trace">Sans les retours de fin de mois ni la nouvelle commission · aucun droit appliqué · exemple fictif</span></>, <><span className="num">≈ 51%</span>Margin looks stable compared with August. The available data doesn’t explain a drop.<span className="trace">Without end-of-month returns or the new commission · no permissions applied · fictional example</span></>)}</p>
        </div>
        <div>
        <p className="vs-h good">{t('Claude, branché sur Trame', 'Claude, connected to Trame')}</p>
        <p className="bubble q2">{t('Pourquoi la marge sur Zalando a-t-elle baissé en septembre ?', 'Why did the Zalando margin drop in September?')}</p>
        <p className="bubble a">{t(<><span className="num">48,6 % · −2,1 points</span>La commission Zalando est passée de 15 à 17,5 % le 1er septembre, et les retours de 9,8 à 14,2 % des ventes.<span className="trace">Septembre, arrêté le 7 octobre · 2 316 commandes rapprochées de la compta · calculé avec les droits du CEO · exemple fictif</span></>, <><span className="num">48.6% · −2.1 pts</span>The Zalando commission went from 15% to 17.5% on September 1, and returns from 9.8% to 14.2% of sales.<span className="trace">September, closed on Oct 7 · 2,316 orders reconciled with the books · calculated with the CEO’s permissions · fictional example</span></>)}</p>
        </div>
        </div>
        <p className="mt-m"><Link to="/demo" className="btn btn-light">{t('Réserver une démo', 'Book a demo')}</Link></p>
        </div>
        </section>
        <section className="band" id="mois">
        <div className="wrap">
        <div className="split top-a">
        <div className="intro">
        <p className="label">{t('Des chiffres justes', 'Accurate numbers')}</p>
        <h2 className="h2">{t('Un mois avec votre nouveau finance engineer.', 'A month with your new finance engineer.')}</h2>
        </div>
        <div className="intro">
        <p>{t('Ce que ferait un finance engineer dans votre équipe, Trame le fait chaque jour : brancher vos outils, réconcilier les chiffres selon vos règles, garder la trace de chaque décision et servir le même chiffre à toute l’entreprise, IA comprises. Le produit fait l’ingénierie, notre équipe de déploiement écrit vos règles avec vous, et votre CFO garde la main.', 'What a finance engineer would do on your team, Trame does every day: connect your tools, reconcile the numbers according to your rules, keep a record of every decision and serve the same number to the whole company, AI included. The product does the engineering, our deployment team writes your rules with you, and your CFO stays in control.')}</p>
        <p><Link to="/finance-engineer" className="btn btn-line">{t('Lire notre définition du finance engineer', 'Read our definition of a finance engineer')}</Link></p>
        </div>
        </div>
        <ol className="steps timed">
        <li><span className="when">{t('Chaque matin', 'Every morning')}</span><b>{t('Vos sources arrivent seules', 'Your sources come in on their own')}</b><span>{t('Compta, CRM, facturation, PSP, banques et paie, sans un seul export.', 'Accounting, CRM, invoicing, PSPs, banks and payroll, without a single export.')}</span><span className="ex">{t('Ce matin : 412 paiements Stripe rattachés à leurs factures.', 'This morning: 412 Stripe payments matched to their invoices.')}</span></li>
        <li><span className="when">{t('Au fil de l’eau', 'As it happens')}</span><b>{t('Les écarts remontent avec leur cause', 'Discrepancies surface with their cause')}</b><span>{t('Réconciliés ligne à ligne selon vos règles, dès qu’ils apparaissent : pas besoin d’attendre la fin du mois.', 'Reconciled line by line according to your rules, as soon as they appear: no need to wait for month-end.')}</span><span className="ex">{t('Mardi : un avoir de 3,4 k€ reclassé en retour, motif noté.', 'Tuesday: a €3.4k credit note reclassified as a return, reason noted.')}</span></li>
        <li><span className="when">{t('Avant le board', 'Before the board')}</span><b>{t('Votre CFO valide la version présentée', 'Your CFO approves the version presented')}</b><span>{t('Elle ne bougera plus. Ce qui arrive ensuite est daté, attribué et expliqué.', 'It won’t move again. Anything that comes in afterward is dated, attributed and explained.')}</span><span className="ex">{t('Le 7 : septembre validé, prêt pour le board du 9.', 'Oct 7: September approved, ready for the board meeting on the 9th.')}</span></li>
        <li><span className="when">{t('Tout le mois', 'All month')}</span><b>{t('Chacun pose ses questions', 'Everyone asks their own questions')}</b><span>{t('L’équipe dans Trame, le CEO dans Claude, le contrôleur dans Excel : les mêmes chiffres, selon les droits de chacun.', 'The team in Trame, the CEO in Claude, the controller in Excel: the same numbers, according to each person’s permissions.')}</span><span className="ex">{t('Lundi : le CEO interroge Claude sur la marge par canal.', 'Monday: the CEO asks Claude about margin by channel.')}</span></li>
        </ol>
        </div>
        </section>
        <section className="band paper" id="septembre">
        <div className="wrap">
        <div className="split top-a">
        <div className="intro">
        <p className="label">{t('Temps réel et versions validées', 'Real time and approved versions')}</p>
        <h2 className="h2">{t('Pilotez sur les chiffres du matin. Présentez une version qui ne bouge plus.', 'Steer on this morning’s numbers. Present a version that no longer moves.')}</h2>
        </div>
        <div className="intro">
        <p>{t('Dans Trame, vos chiffres se mettent à jour chaque jour : vous pilotez sur la donnée la plus fraîche. Et quand vous présentez un mois au board, vous en validez la version. Une correction tardive ne la réécrit pas : elle arrive sur le mois suivant, avec sa date, son auteur et son motif.', 'In Trame, your numbers update every day: you steer on the freshest data. And when you present a month to the board, you approve that version. A late correction doesn’t rewrite it: it lands in the following month, with its date, its author and its reason.')}</p>
        <figure className="voice"><blockquote>{t('« Les chiffres bougent, et ils bougent rétroactivement. »', '“The numbers move, and they move retroactively.”')}</blockquote><figcaption>{t(<><b>Directeur financier</b> · éditeur SaaS</>, <><b>CFO</b> · SaaS company</>)}</figcaption></figure>
        </div>
        </div>
        <div className="mt-m" style={{ maxWidth: '860px' }}><figure aria-label={t('Exemple : trois événements tardifs, le mois arrêté ne bouge pas', 'Example: three late events, the closed month doesn’t move')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t(<>EBITDA de septembre <span>· k€</span></>, <>September EBITDA <span>· €k</span></>)}</p><span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Arrêté le 7 octobre · présenté au board le 9', 'Closed on Oct 7 · presented to the board on Oct 9')}</span></div>
        <div style={{ overflowX: 'auto' }}>
        <table className="rows" style={{ minWidth: '460px' }}>
        <thead><tr><th>{t('Ce qui arrive', 'What happens')}</th><th className="v">{t('Dans un tableur', 'In a spreadsheet')}</th><th className="v">{t('Dans Trame', 'In Trame')}</th></tr></thead>
        <tbody>
        <tr><td>{t('7 oct. · Septembre arrêté et présenté', 'Oct 7 · September closed and presented')}</td><td className="v">{t('214,5', '214.5')}</td><td className="v pos">{t('214,5', '214.5')}</td></tr>
        <tr><td>{t('12 oct. · Remboursement Stripe de 1,2 k€ sur une commande de septembre', 'Oct 12 · €1.2k Stripe refund on a September order')}<span className="src">{t('Dans Trame : passé sur octobre, avec son motif', 'In Trame: moved to October, with its reason')}</span></td><td className="v neg">{t('213,3', '213.3')}</td><td className="v pos">{t('214,5', '214.5')}</td></tr>
        <tr><td>{t('16 oct. · Facture logistique de septembre reçue en retard, 3,8 k€', 'Oct 16 · September logistics invoice received late, €3.8k')}<span className="src">{t('Dans Trame : passée sur octobre, avec son motif', 'In Trame: moved to October, with its reason')}</span></td><td className="v neg">{t('209,5', '209.5')}</td><td className="v pos">{t('214,5', '214.5')}</td></tr>
        <tr><td>{t('21 oct. · Remise de 1,4 k€ accordée sur une vente de septembre', 'Oct 21 · €1.4k discount granted on a September sale')}<span className="src">{t('Dans Trame : passée sur octobre, avec son motif', 'In Trame: moved to October, with its reason')}</span></td><td className="v neg">{t('208,1', '208.1')}</td><td className="v pos">{t('214,5', '214.5')}</td></tr>
        <tr className="total"><td>{t('Board de novembre · septembre vaut', 'November board · September stands at')}</td><td className="v neg">{t('208,1', '208.1')}</td><td className="v pos">{t('214,5', '214.5')}</td></tr>
        </tbody>
        </table>
        </div>
        <figcaption className="card-foot"><span>{t('Trois écarts passés sur octobre, chacun daté, attribué et justifié.', 'Three variances moved to October, each one dated, attributed and justified.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure></div>
        <p className="mt-m"><Link to="/demo" className="btn btn-line">{t('Réserver une démo', 'Book a demo')}</Link></p>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <figure aria-label={t('Exemple : le journal des décisions d’une équipe finance', 'Example: a finance team’s decision log')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Journal des décisions · octobre', 'Decision log · October')}</p><span className="chip">{t('12 décisions ce mois-ci', '12 decisions this month')}</span></div>
        <ol className="journal">
        <li><time>{t('7 oct.', 'Oct 7')}</time><div>{t(<><span className="kind">Arrêté</span><b>Septembre arrêté</b> par Nadia, CFO.<span className="who">Version présentée au board le 9 octobre</span></>, <><span className="kind">Close</span><b>September closed</b> by Nadia, CFO.<span className="who">Version presented to the board on October 9</span></>)}</div></li>
        <li><time>{t('3 oct.', 'Oct 3')}</time><div>{t(<><span className="kind">Définition</span><b>Marge par canal v2 : la publicité est imputée au canal qu’elle sert.</b> Proposé par Bastien, validé par Nadia.<span className="who">Raison : comparer le site et Zalando à coûts égaux</span></>, <><span className="kind">Definition</span><b>Margin by channel v2: advertising is allocated to the channel it serves.</b> Proposed by Bastien, approved by Nadia.<span className="who">Reason: compare the website and Zalando on equal costs</span></>)}</div></li>
        <li><time>{t('3 oct.', 'Oct 3')}</time><div>{t(<><span className="kind">Correction</span><b>Avoirs Zalando classés en retours.</b> Bastien, contrôleur de gestion.<span className="who">Impact : −3,4 k€ sur les remises, +3,4 k€ sur les retours</span></>, <><span className="kind">Correction</span><b>Zalando credit notes classified as returns.</b> Bastien, financial controller.<span className="who">Impact: −€3.4k on discounts, +€3.4k on returns</span></>)}</div></li>
        <li><time>{t('1er oct.', 'Oct 1')}</time><div>{t(<><span className="kind">Règle</span><b>Frais de port refacturés sortis du coût des ventes.</b> Nadia.<span className="who">S’applique à partir de septembre ; août n’est pas modifié</span></>, <><span className="kind">Rule</span><b>Re-invoiced shipping fees taken out of cost of sales.</b> Nadia.<span className="who">Applies from September on; August is unchanged</span></>)}</div></li>
        </ol>
        <figcaption className="card-foot"><span>{t('Chaque ligne s’ouvre sur les chiffres qu’elle a changés.', 'Each line opens onto the numbers it changed.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        <div className="intro">
        <p className="label">{t('La mémoire des décisions', 'Decision memory')}</p>
        <h2 className="h2">{t('Six mois plus tard, vous savez encore pourquoi.', 'Six months later, you still know why.')}</h2>
        <p>{t('Pourquoi la marge par canal a changé de définition, qui a reclassé ces avoirs, ce qui a été présenté au board en mars : Trame le garde, avec l’auteur et la raison de chaque décision. Quand quelqu’un part, ses décisions restent.', 'Why margin by channel changed definition, who reclassified those credit notes, what was presented to the board in March: Trame keeps it, with the author and the reason for every decision. When someone leaves, their decisions stay.')}</p>
        </div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('La gouvernance de l’équipe', 'Team governance')}</p>
        <h2 className="h2">{t('Chacun voit ce qu’il a le droit de voir. Votre IA aussi.', 'Everyone sees what they’re allowed to see. Your AI too.')}</h2>
        <p>{t(<>Contrôleurs, FP&amp;A et direction commentent, valident et tranchent sur les mêmes chiffres. Les droits se règlent par personne et par ligne ; quand votre CEO interroge Claude, Claude interroge Trame avec les droits du CEO. Et vous savez à tout moment qui a consulté quel chiffre, y compris quand c’est une IA.</>, <>Controllers, FP&amp;A and leadership comment, approve and decide on the same numbers. Permissions are set per person and per row; when your CEO asks Claude, Claude queries Trame with the CEO’s permissions. And you always know who looked at which figure, including when it’s an AI.</>)}</p>
        <p><Link to="/securite" className="btn btn-line">{t('Voir la sécurité', 'See security')}</Link></p>
        </div>
        <figure aria-label={t('Exemple : qui voit quoi sur la masse salariale', 'Example: who sees what on payroll')} className="card" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t(<>Masse salariale · septembre <span>· qui voit quoi</span></>, <>Payroll · September <span>· who sees what</span></>)}</p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Droits à la ligne', 'Row-level permissions')}</span>
        </div>
        <table className="rows">
        <thead><tr><th>{t('Qui', 'Who')}</th><th>{t('Ce qu’il voit', 'What they see')}</th></tr></thead>
        <tbody>
        <tr><td>Nadia, CFO</td><td>{t('Chaque salaire, chaque prime', 'Every salary, every bonus')}<span className="src">{t('Accès complet à la paie', 'Full payroll access')}</span></td></tr>
        <tr><td>{t('Bastien, contrôleur de gestion', 'Bastien, financial controller')}</td><td>{t('La masse salariale par équipe', 'Payroll by team')}<span className="src">{t('Aucun salaire individuel', 'No individual salaries')}</span></td></tr>
        <tr><td>{t('Sophie, directrice commerciale', 'Sophie, head of sales')}</td><td>{t('Le budget et le réalisé de son équipe', 'Her team’s budget vs. actuals')}<span className="src">{t('Rien sur les autres équipes', 'Nothing on other teams')}</span></td></tr>
        <tr><td>{t('Claude, pour le CEO', 'Claude, for the CEO')}</td><td>{t('Ce que voit le CEO, pas plus', 'What the CEO sees, no more')}<span className="src">{t('L’IA hérite des droits de qui l’interroge', 'The AI inherits the permissions of whoever asks it')}</span></td></tr>
        <tr><td>{t('Commissaire aux comptes', 'Auditor')}</td><td>{t('Les mois arrêtés, en lecture', 'Closed months, read-only')}<span className="src">{t('Accès limité dans le temps', 'Time-limited access')}</span></td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Chaque lecture est journalisée, celles de l’IA comprises.', 'Every read is logged, the AI’s included.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        </div>
        </section>
        <section className="band">
        <div className="wrap">
        <h2 className="h2">{t('Trame fiabilise vos chiffres. Votre IA les analyse.', 'Trame makes your numbers reliable. Your AI analyzes them.')}</h2>
        <div className="intro mt-s"><p>{t('Gardez Claude, ChatGPT et Excel pour analyser, prévoir et présenter. Vos tableaux de bord, demandez-les à votre IA : Trame lui donne les mêmes chiffres, réconciliés au centime, écarts expliqués, avec les droits de chacun.', 'Keep Claude, ChatGPT and Excel to analyze, forecast and present. Ask your AI for your dashboards: Trame gives it the same numbers, reconciled to the cent, variances explained, with each person’s permissions.')}</p></div>
        <div className="swap strike">
        <div className="th">{t('Ce qui disparaît', 'What goes away')}</div><div className="th">{t('Ce que vous gardez', 'What you keep')}</div>
        <div>{t('Les exports et les rapprochements refaits à la main chaque mois', 'Exports and reconciliations redone by hand every month')}</div><div>{t('Vos outils actuels : rien à migrer, rien à remplacer', 'Your current tools: nothing to migrate, nothing to replace')}</div>
        <div>{t('Le fichier Excel que seule une personne sait mettre à jour', 'The Excel file only one person knows how to update')}</div><div>{t('Excel, pour modéliser sur des chiffres qui ne bougent plus', 'Excel, to model on numbers that no longer move')}</div>
        <div>{t('Les scripts et agents maison qui repartent d’un export à chaque question, sans vos règles ni vos droits', 'Homegrown scripts and agents that start over from an export for every question, without your rules or your permissions')}</div><div>{t('Claude ou ChatGPT, pour analyser et prévoir sur des chiffres justes', 'Claude or ChatGPT, to analyze and forecast on accurate numbers')}</div>
        <div>{t('Les écarts découverts la veille du board', 'Variances discovered the day before the board meeting')}</div><div>{t('Votre équipe, qui passe du rapprochement à l’analyse', 'Your team, moving from reconciliation to analysis')}</div>
        </div>
        <p className="muted mt-s">{t('Votre équipe data garde son entrepôt ; la paie reste réservée à la direction financière.', 'Your data team keeps its data warehouse; payroll stays reserved for the finance leadership.')}</p>
        <p className="label mt-l" id="usages" style={{ marginBottom: '-16px' }}>{t('Par où commencer', 'Where to start')}</p>
        <div className="qs"><Link to="/cas-usage/cash-analytique" className="q"><span>{t('Où en est notre trésorerie ce matin, par entité et par devise ?', 'Where does our cash stand this morning, by entity and by currency?')}</span><b>{t('Cash analytique →', 'Cash analytics →')}</b></Link><Link to="/cas-usage/pnl-analytique" className="q"><span>{t('Quelle marge sur chaque canal, commissions et frais compris ?', 'What margin on each channel, commissions and fees included?')}</span><b>{t(<>P&amp;L analytique →</>, <>Analytical P&amp;L →</>)}</b></Link><Link to="/cas-usage/chiffre-affaires" className="q"><span>{t('Le chiffre d’affaires annoncé par les ventes correspond-il à ce qui est facturé ?', 'Does the revenue reported by sales match what’s been invoiced?')}</span><b>{t('Chiffre d’affaires →', 'Revenue →')}</b></Link><Link to="/cas-usage/consolidation" className="q"><span>{t('Le groupe consolidé, en euros, chaque mois ?', 'The consolidated group, in euros, every month?')}</span><b>Consolidation →</b></Link><Link to="/cas-usage/budget-realise" className="q"><span>{t('Quelle équipe dérape par rapport au budget, et de combien ?', 'Which team is going over budget, and by how much?')}</span><b>{t('Budget / réalisé →', 'Budget vs. actuals →')}</b></Link></div>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <h2 className="h2">{t('Les questions que posent les CFO.', 'The questions CFOs ask.')}</h2>
        <div className="faq"><details><summary>{t('« Notre cabinet nous rend la compta à J+20. »', '“Our accounting firm hands us the books on business day 20.”')}</summary><div><p>{t('Trame n’attend pas le cabinet. Il part de ce qui est déjà en compta, de la facturation, des banques et de la paie, avec des estimations documentées pour le reste, comme les factures fournisseurs attendues. Quand le cabinet passe ses écritures, l’écart arrive daté et justifié.', 'Trame doesn’t wait for the firm. It starts from what’s already in the books, invoicing, banks and payroll, with documented estimates for the rest, such as expected supplier invoices. When the firm posts its entries, the variance arrives dated and justified.')}</p></div></details><details><summary>{t('« On fait déjà tout avec Claude. »', '“We already do everything with Claude.”')}</summary><div><p>{t('Claude rapproche les exports qu’on lui donne, une fois. Le mois suivant, tout est à refaire. Il ne garde ni le chiffre présenté au board, ni vos règles, ni les décisions de l’équipe, et il lit la paie si elle est dans le fichier. Branché sur Trame, il part de chiffres réconciliés et validés, avec les droits de la personne qui l’interroge.', 'Claude reconciles the exports you give it, once. The next month, it all has to be redone. It keeps neither the figure presented to the board, nor your rules, nor the team’s decisions, and it reads payroll if it’s in the file. Connected to Trame, it starts from reconciled, approved numbers, with the permissions of the person asking.')}</p></div></details><details><summary>{t('« Notre équipe data va le construire. »', '“Our data team will build it.”')}</summary><div><p>{t('Elle sait construire un entrepôt. Un reporting de gestion fiable demande aussi le cut-off, les versions présentées, vos règles et des droits à la ligne : des mois de travail, puis la maintenance. Trame s’installe sur son entrepôt en quelques semaines.', 'They know how to build a data warehouse. Reliable management reporting also takes cut-off, presented versions, your rules and row-level permissions: months of work, then maintenance. Trame sets up on their warehouse in a few weeks.')}</p></div></details><details><summary>{t('« Nos données ne sont pas propres. »', '“Our data isn’t clean.”')}</summary><div><p>{t('C’est le point de départ habituel. Trame trouve les écarts entre vos outils et vous les rend chiffrés, avec leur cause, avant qu’ils n’arrivent au board.', 'That’s the usual starting point. Trame finds the discrepancies between your tools and hands them back to you quantified, with their cause, before they reach the board.')}</p></div></details><details><summary>{t('« On a déjà un outil de planification. »', '“We already have a planning tool.”')}</summary><div><p>{t('Gardez-le. Trame lui envoie le réalisé, à la maille de votre budget. Si vous n’en avez pas, Claude branché sur Trame suffit souvent pour bâtir un budget ou un réestimé.', 'Keep it. Trame sends it the actuals, at the granularity of your budget. If you don’t have one, Claude connected to Trame is often enough to build a budget or a reforecast.')}</p></div></details><details><summary>{t('« Ça ne remplace pas notre expert-comptable. »', '“This doesn’t replace our accountant.”')}</summary><div><p>{t('Non. Votre cabinet produit les comptes ; Trame produit les chiffres de gestion, rapprochés de ces comptes et de leur FEC.', 'No. Your accounting firm produces the financial statements; Trame produces the management numbers, reconciled with those statements and their FEC (the French general-ledger audit file).')}</p></div></details></div>
        </div>
        </section>
        <ClosingCta
          title={t('Tissez la trame de vos décisions, pilotez en toute confiance.', 'Weave the thread of your decisions. Steer with confidence.')}
          sub={t('Réservez un premier échange et bénéficiez d’un état des lieux de vos sources, de vos règles et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first conversation and get an assessment of your sources, your rules and your pain points. You’ll leave knowing how much you stand to gain.')}
        />
      </Rails>
    </main>
  );
}

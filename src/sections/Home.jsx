// Home page. Copy and blocks follow the « Site Trame V1 » mock-up (index.html); the hero and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton } from '../components/blocks.jsx';
import Hero from './Hero.jsx';

export default function Home() {
  const t = useT();
  usePageMeta('Trame · La data platform des équipes finance', 'Compta, CRM, facturation, PSP, banques et paie réconciliés ligne à ligne, chaque décision tracée, et des droits par personne pour brancher Claude ou ChatGPT.');
  return (
    <main className="v1">
      <Hero
        kicker="La data platform pour les équipes finance"
        title="Votre finance engineer."
        lead={<>Trame réunit votre compta, vos ventes, vos banques et votre paie dans une base fiable et auditable, prête pour l’IA. <span>Le travail d’un finance engineer, sans le recruter.</span></>}
        pills={['Tous vos outils réconciliés', 'Un seul chiffre pour toute l’entreprise', 'Chaque décision gardée, avec son auteur', 'Les salaires protégés, même de l’IA']}
        ctas={<><DemoButton /><LinkButton to="#mois" size="lg" variant="ghostInverse">Voir comment ça marche</LinkButton></>}
      >
        <figure aria-label="Exemple : un P&amp;L arrêté dans Trame, ligne par ligne" className="card" data-autocycle="" data-ledger="" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">Société exemple · P&amp;L de septembre <span>· k€</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>Arrêté le 7 octobre</span>
        </div>
        <div className="card-head" style={{ paddingBlock: '10px', background: 'var(--paper)' }}>
        <span style={{ fontSize: '12.5px', color: 'var(--faint)' }}>Vu par</span>
        <div aria-label="Choisir qui regarde" className="seg" role="group">
        <button aria-pressed="true" data-who="daf" type="button">CFO</button>
        <button aria-pressed="false" data-who="ctrl" type="button">Contrôleur</button>
        <button aria-pressed="false" data-who="ia" type="button">Claude, pour le CEO</button>
        </div>
        </div>
        <table className="rows">
        <tbody>
        <tr className="pick" data-row="ca"><td>Chiffre d’affaires<span className="src">Shopify · Zalando · revendeurs, rapprochés de la compta</span></td><td className="v">1 842,6</td></tr>
        <tr className="pick" data-row="mb"><td>Marge sur coûts variables<span className="src">Coût de revient · logistique · commissions</span></td><td className="v">1 101,3</td></tr>
        <tr aria-expanded="true" className="pick on" data-row="ms"><td>Masse salariale
                <span className="src" data-for="daf">Paie de septembre · 58 salariés · détail par salarié</span>
        <span className="src" data-for="ctrl" hidden>Par équipe · salaires individuels masqués</span>
        <span className="src" data-for="ia" hidden>Par équipe · aucun salaire individuel</span></td>
        <td className="v">−612,8</td></tr>
        <tr className="pick" data-row="ac"><td>Autres charges<span className="src">Pennylane · notes de frais · abonnements</span></td><td className="v">−274,0</td></tr>
        <tr className="pick total" data-row="eb"><td>EBITDA<span className="src">Version présentée au board le 9 octobre</span></td><td className="v">214,5</td></tr>
        </tbody>
        </table>
        <div className="drawer" data-trame="ca" hidden>
        <h4>D’où vient le chiffre d’affaires</h4>
        <ul><li>Shopify · 2 316 commandes<b>1 104,2</b></li><li>Zalando · relevé de commissions<b>418,9</b></li><li>Revendeurs · factures Pennylane<b>319,5</b></li></ul>
        <p className="dec"><b>Règle v3.</b> Chiffre d’affaires reconnu à l’expédition, net des retours.</p>
        <p className="dec"><b>3 oct. · Bastien, contrôleur de gestion.</b> Avoirs Zalando de septembre classés en retours, pas en remises. Validé par le CFO.</p>
        </div>
        <div className="drawer" data-trame="mb" hidden>
        <h4>D’où vient la marge sur coûts variables</h4>
        <ul><li>Chiffre d’affaires<b>1 842,6</b></li><li>Coût de revient des ventes<b>−512,4</b></li><li>Logistique · factures du prestataire<b>−131,3</b></li><li>Commissions · Zalando et PSP<b>−97,6</b></li></ul>
        <p className="dec"><b>1er oct. · Nadia, CFO.</b> Frais de port refacturés aux clients reclassés en chiffre d’affaires, au lieu d’être déduits de la logistique.</p>
        </div>
        <div className="drawer" data-trame="ms">
        <h4>D’où vient la masse salariale</h4>
        <div data-for="daf">
        <ul><li>Camille D. · product manager<b>−9,8</b></li><li>Hugo M. · développeur<b>−8,9</b></li><li>56 autres salariés<b>−568,4</b></li><li>Primes du troisième trimestre provisionnées<b>−25,7</b></li></ul>
        <p className="dec" style={{ marginTop: '10px' }}><b>7 oct. · Nadia, CFO.</b> Primes du trimestre provisionnées sur septembre. Paie rapprochée des comptes 641 et 645 ; seul écart, cette provision.</p>
        </div>
        <div data-for="ctrl" hidden>
        <ul><li>Produit et tech<b>−298,4</b></li><li>Ventes et marketing<b>−201,9</b></li><li>Opérations et support<b>−112,5</b></li><li>Camille D. · product manager<b className="masked">••••</b></li><li>Hugo M. · développeur<b className="masked">••••</b></li></ul>
        <p className="hint" style={{ marginTop: '8px' }}>Ici, les salaires individuels sont réservés au CFO. Vous décidez qui les voit.</p>
        </div>
        <div data-for="ia" hidden>
        <ul><li>Produit et tech<b>−298,4</b></li><li>Ventes et marketing<b>−201,9</b></li><li>Opérations et support<b>−112,5</b></li></ul>
        <p className="hint" style={{ marginTop: '8px' }}>Claude répond avec les droits du CEO : la masse salariale par équipe, aucun salaire individuel.</p>
        </div>
        </div>
        <div className="drawer" data-trame="ac" hidden>
        <h4>D’où viennent les autres charges</h4>
        <ul><li>Marketing · régies publicitaires<b>−146,3</b></li><li>Locaux et abonnements<b>−82,6</b></li><li>Honoraires et frais divers<b>−45,1</b></li></ul>
        <p className="dec"><b>Règle v2.</b> Abonnements annuels étalés sur douze mois.</p>
        </div>
        <div className="drawer" data-trame="eb" hidden>
        <h4>D’où vient l’EBITDA</h4>
        <p className="dec"><b>7 oct. · Nadia, CFO.</b> Septembre arrêté. Version présentée au board le 9 octobre.</p>
        <p className="dec"><b>12 oct. · écart daté.</b> Remboursement Stripe de 1,2 k€ sur une commande de septembre. Septembre ne bouge pas ; l’écart passe sur octobre, avec son motif.</p>
        </div>
        <figcaption className="card-foot"><span>Septembre est arrêté. Ce qui change après passe sur octobre, daté et justifié. Cliquez sur une ligne pour voir d’où elle vient.</span><em>Exemple fictif</em></figcaption>
        </figure>
      </Hero>
      <Rails>
        <div className="logos"><div className="wrap">
        <span className="who">Ils travaillent avec Trame</span>
        <div className="names"><span>Jahia</span><span>Mooncard</span><span>La Bonne Brosse</span><span>Typology</span></div>
        </div></div>
        <section className="band paper tight">
        <div className="wrap">
        <figure className="testimonial">
        <blockquote>« Avant, chaque board commençait par deux jours à refaire les chiffres. Maintenant, je les ouvre : ils sont justes, et je sais d’où vient chacun. »</blockquote>
        <figcaption><span aria-hidden="true" className="avatar">AL</span><div><b>Adrien Leleu</b><br /><span>CFO, Jahia · éditeur SaaS, 6 entités</span></div><span className="chip warn" style={{ marginLeft: 'auto' }}>Citation proposée, à valider</span></figcaption>
        </figure>
        <div className="ba three">
        <div><span className="n">−80 %</span><p>de temps passé à rapprocher le CRM, la facturation et la compta, à chaque cycle de chiffre d’affaires</p><cite>Jahia · éditeur SaaS · mesuré : 3 jours → ½ journée</cite></div>
        <div><span className="n">30 k€</span><p>de chiffre d’affaires retrouvé : cinq contrats toujours actifs, qui n’étaient plus facturés</p><cite>Jahia · éditeur SaaS · déclaré</cite></div>
        <div><span className="n">24 jours</span><p>rendus chaque année au contrôle de gestion, sur le seul reporting mensuel</p><cite>Mooncard · fintech · déclaré : 3 jours → 1 par mois</cite></div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <div className="intro">
        <p className="label">Sans Trame</p>
        <h2 className="h2">Chaque outil a son IA. Et chaque IA, son chiffre.</h2>
        <p>Votre CRM, votre outil de facturation et Excel ont tous leur IA. Posez-leur la même question, le chiffre d’affaires de septembre : trois outils, trois réponses, et aucune ne retombe sur la compta.</p>
        <p>Avec Trame, toutes vos IA partent du même chiffre de référence, rapproché ligne à ligne de vos outils et de votre comptabilité.</p>
        </div>
        <div aria-label="Exemple : trois réponses différentes à la même question" className="inflation">
        <p className="cap">« Quel chiffre d’affaires en septembre ? » · exemple fictif</p>
        <div className="src"><span>L’IA du CRM</span><b>1 921,0 k€</b></div>
        <div className="src"><span>L’IA de la facturation</span><b>1 874,3 k€</b></div>
        <div className="src"><span>L’IA d’Excel</span><b>1 836,9 k€</b></div>
        <div className="ref"><span>Trame · arrêté le 7 octobre</span><b>1 842,6 k€</b></div>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <p className="label">Lundi, 8 h</p>
        <h2 className="h2">Votre CEO demande à Claude pourquoi la marge a baissé.</h2>
        <p>Claude sait analyser. Mais sur un export, il ne connaît ni vos règles de gestion, ni le chiffre présenté au board, ni ce qu’il a le droit de voir : il calcule avec ce qu’on lui donne, et se trompe sans le savoir. Branché sur Trame, il part de chiffres déjà réconciliés, avec vos définitions et les droits du CEO. Il répond juste, et cite sa source.</p>
        </div>
        <div className="vs">
        <div>
        <p className="vs-h">Claude, sur un export Excel du 12 octobre</p>
        <p className="bubble q2">Pourquoi la marge sur Zalando a-t-elle baissé en septembre ?</p>
        <p className="bubble a weak"><span className="num">≈ 51 %</span>La marge semble stable par rapport à août. Les données disponibles ne permettent pas d’expliquer une baisse.<span className="trace">Sans les retours de fin de mois ni la nouvelle commission · aucun droit appliqué · exemple fictif</span></p>
        </div>
        <div>
        <p className="vs-h good">Claude, branché sur Trame</p>
        <p className="bubble q2">Pourquoi la marge sur Zalando a-t-elle baissé en septembre ?</p>
        <p className="bubble a"><span className="num">48,6 % · −2,1 points</span>La commission Zalando est passée de 15 à 17,5 % le 1er septembre, et les retours de 9,8 à 14,2 % des ventes.<span className="trace">Septembre, arrêté le 7 octobre · 2 316 commandes rapprochées de la compta · calculé avec les droits du CEO · exemple fictif</span></p>
        </div>
        </div>
        <p className="mt-m"><Link to="/demo" className="btn btn-light">Réserver une démo</Link></p>
        </div>
        </section>
        <section className="band" id="mois">
        <div className="wrap">
        <div className="split top-a">
        <div className="intro">
        <p className="label">Des chiffres justes</p>
        <h2 className="h2">Un mois avec votre nouveau finance engineer.</h2>
        </div>
        <div className="intro">
        <p>Ce que ferait un finance engineer dans votre équipe, Trame le fait chaque jour : brancher vos outils, réconcilier les chiffres selon vos règles, garder la trace de chaque décision et servir le même chiffre à toute l’entreprise, IA comprises. Le produit fait l’ingénierie, notre équipe de déploiement écrit vos règles avec vous, et votre CFO garde la main.</p>
        <p><Link to="/finance-engineer" className="btn btn-line">Lire notre définition du finance engineer</Link></p>
        </div>
        </div>
        <ol className="steps timed">
        <li><span className="when">Chaque matin</span><b>Vos sources arrivent seules</b><span>Compta, CRM, facturation, PSP, banques et paie, sans un seul export.</span><span className="ex">Ce matin : 412 paiements Stripe rattachés à leurs factures.</span></li>
        <li><span className="when">Au fil de l’eau</span><b>Les écarts remontent avec leur cause</b><span>Réconciliés ligne à ligne selon vos règles, dès qu’ils apparaissent : pas besoin d’attendre la fin du mois.</span><span className="ex">Mardi : un avoir de 3,4 k€ reclassé en retour, motif noté.</span></li>
        <li><span className="when">Avant le board</span><b>Votre CFO valide la version présentée</b><span>Elle ne bougera plus. Ce qui arrive ensuite est daté, attribué et expliqué.</span><span className="ex">Le 7 : septembre validé, prêt pour le board du 9.</span></li>
        <li><span className="when">Tout le mois</span><b>Chacun pose ses questions</b><span>L’équipe dans Trame, le CEO dans Claude, le contrôleur dans Excel : les mêmes chiffres, selon les droits de chacun.</span><span className="ex">Lundi : le CEO interroge Claude sur la marge par canal.</span></li>
        </ol>
        </div>
        </section>
        <section className="band paper" id="septembre">
        <div className="wrap">
        <div className="split top-a">
        <div className="intro">
        <p className="label">Temps réel et versions validées</p>
        <h2 className="h2">Pilotez sur les chiffres du matin. Présentez une version qui ne bouge plus.</h2>
        </div>
        <div className="intro">
        <p>Dans Trame, vos chiffres se mettent à jour chaque jour : vous pilotez sur la donnée la plus fraîche. Et quand vous présentez un mois au board, vous en validez la version. Une correction tardive ne la réécrit pas : elle arrive sur le mois suivant, avec sa date, son auteur et son motif.</p>
        <figure className="voice"><blockquote>« Les chiffres bougent, et ils bougent rétroactivement. »</blockquote><figcaption><b>Directeur financier</b> · éditeur SaaS</figcaption></figure>
        </div>
        </div>
        <div className="mt-m" style={{ maxWidth: '860px' }}><figure aria-label="Exemple : trois événements tardifs, le mois arrêté ne bouge pas" className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">EBITDA de septembre <span>· k€</span></p><span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>Arrêté le 7 octobre · présenté au board le 9</span></div>
        <div style={{ overflowX: 'auto' }}>
        <table className="rows" style={{ minWidth: '460px' }}>
        <thead><tr><th>Ce qui arrive</th><th className="v">Dans un tableur</th><th className="v">Dans Trame</th></tr></thead>
        <tbody>
        <tr><td>7 oct. · Septembre arrêté et présenté</td><td className="v">214,5</td><td className="v pos">214,5</td></tr>
        <tr><td>12 oct. · Remboursement Stripe de 1,2 k€ sur une commande de septembre<span className="src">Dans Trame : passé sur octobre, avec son motif</span></td><td className="v neg">213,3</td><td className="v pos">214,5</td></tr>
        <tr><td>16 oct. · Facture logistique de septembre reçue en retard, 3,8 k€<span className="src">Dans Trame : passée sur octobre, avec son motif</span></td><td className="v neg">209,5</td><td className="v pos">214,5</td></tr>
        <tr><td>21 oct. · Remise de 1,4 k€ accordée sur une vente de septembre<span className="src">Dans Trame : passée sur octobre, avec son motif</span></td><td className="v neg">208,1</td><td className="v pos">214,5</td></tr>
        <tr className="total"><td>Board de novembre · septembre vaut</td><td className="v neg">208,1</td><td className="v pos">214,5</td></tr>
        </tbody>
        </table>
        </div>
        <figcaption className="card-foot"><span>Trois écarts passés sur octobre, chacun daté, attribué et justifié.</span><em>Exemple fictif</em></figcaption>
        </figure></div>
        <p className="mt-m"><Link to="/demo" className="btn btn-line">Réserver une démo</Link></p>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <figure aria-label="Exemple : le journal des décisions d’une équipe finance" className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">Journal des décisions · octobre</p><span className="chip">12 décisions ce mois-ci</span></div>
        <ol className="journal">
        <li><time>7 oct.</time><div><span className="kind">Arrêté</span><b>Septembre arrêté</b> par Nadia, CFO.<span className="who">Version présentée au board le 9 octobre</span></div></li>
        <li><time>3 oct.</time><div><span className="kind">Définition</span><b>Marge par canal v2 : la publicité est imputée au canal qu’elle sert.</b> Proposé par Bastien, validé par Nadia.<span className="who">Raison : comparer le site et Zalando à coûts égaux</span></div></li>
        <li><time>3 oct.</time><div><span className="kind">Correction</span><b>Avoirs Zalando classés en retours.</b> Bastien, contrôleur de gestion.<span className="who">Impact : −3,4 k€ sur les remises, +3,4 k€ sur les retours</span></div></li>
        <li><time>1er oct.</time><div><span className="kind">Règle</span><b>Frais de port refacturés sortis du coût des ventes.</b> Nadia.<span className="who">S’applique à partir de septembre ; août n’est pas modifié</span></div></li>
        </ol>
        <figcaption className="card-foot"><span>Chaque ligne s’ouvre sur les chiffres qu’elle a changés.</span><em>Exemple fictif</em></figcaption>
        </figure>
        <div className="intro">
        <p className="label">La mémoire des décisions</p>
        <h2 className="h2">Six mois plus tard, vous savez encore pourquoi.</h2>
        <p>Pourquoi la marge par canal a changé de définition, qui a reclassé ces avoirs, ce qui a été présenté au board en mars : Trame le garde, avec l’auteur et la raison de chaque décision. Quand quelqu’un part, ses décisions restent.</p>
        </div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap split">
        <div className="intro">
        <p className="label">La gouvernance de l’équipe</p>
        <h2 className="h2">Chacun voit ce qu’il a le droit de voir. Votre IA aussi.</h2>
        <p>Contrôleurs, FP&amp;A et direction commentent, valident et tranchent sur les mêmes chiffres. Les droits se règlent par personne et par ligne ; quand votre CEO interroge Claude, Claude interroge Trame avec les droits du CEO. Et vous savez à tout moment qui a consulté quel chiffre, y compris quand c’est une IA.</p>
        <p><Link to="/securite" className="btn btn-line">Voir la sécurité</Link></p>
        </div>
        <figure aria-label="Exemple : qui voit quoi sur la masse salariale" className="card" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">Masse salariale · septembre <span>· qui voit quoi</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>Droits à la ligne</span>
        </div>
        <table className="rows">
        <thead><tr><th>Qui</th><th>Ce qu’il voit</th></tr></thead>
        <tbody>
        <tr><td>Nadia, CFO</td><td>Chaque salaire, chaque prime<span className="src">Accès complet à la paie</span></td></tr>
        <tr><td>Bastien, contrôleur de gestion</td><td>La masse salariale par équipe<span className="src">Aucun salaire individuel</span></td></tr>
        <tr><td>Sophie, directrice commerciale</td><td>Le budget et le réalisé de son équipe<span className="src">Rien sur les autres équipes</span></td></tr>
        <tr><td>Claude, pour le CEO</td><td>Ce que voit le CEO, pas plus<span className="src">L’IA hérite des droits de qui l’interroge</span></td></tr>
        <tr><td>Commissaire aux comptes</td><td>Les mois arrêtés, en lecture<span className="src">Accès limité dans le temps</span></td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>Chaque lecture est journalisée, celles de l’IA comprises.</span><em>Exemple fictif</em></figcaption>
        </figure>
        </div>
        </section>
        <section className="band">
        <div className="wrap">
        <h2 className="h2">Trame fiabilise vos chiffres. Votre IA les analyse.</h2>
        <div className="intro mt-s"><p>Gardez Claude, ChatGPT et Excel pour analyser, prévoir et présenter. Vos tableaux de bord, demandez-les à votre IA : Trame lui donne les mêmes chiffres, réconciliés au centime, écarts expliqués, avec les droits de chacun.</p></div>
        <div className="swap strike">
        <div className="th">Ce qui disparaît</div><div className="th">Ce que vous gardez</div>
        <div>Les exports et les rapprochements refaits à la main chaque mois</div><div>Vos outils actuels : rien à migrer, rien à remplacer</div>
        <div>Le fichier Excel que seule une personne sait mettre à jour</div><div>Excel, pour modéliser sur des chiffres qui ne bougent plus</div>
        <div>Les scripts et agents maison qui repartent d’un export à chaque question, sans vos règles ni vos droits</div><div>Claude ou ChatGPT, pour analyser et prévoir sur des chiffres justes</div>
        <div>Les écarts découverts la veille du board</div><div>Votre équipe, qui passe du rapprochement à l’analyse</div>
        </div>
        <p className="muted mt-s">Votre équipe data garde son entrepôt ; la paie reste réservée à la direction financière.</p>
        <p className="label mt-l" id="usages" style={{ marginBottom: '-16px' }}>Par où commencer</p>
        <div className="qs"><Link to="/cas-usage/cash-analytique" className="q"><span>Où en est notre trésorerie ce matin, par entité et par devise ?</span><b>Cash analytique →</b></Link><Link to="/cas-usage/pnl-analytique" className="q"><span>Quelle marge sur chaque canal, commissions et frais compris ?</span><b>P&amp;L analytique →</b></Link><Link to="/cas-usage/chiffre-affaires" className="q"><span>Le chiffre d’affaires annoncé par les ventes correspond-il à ce qui est facturé ?</span><b>Chiffre d’affaires →</b></Link><Link to="/cas-usage/consolidation" className="q"><span>Le groupe consolidé, en euros, chaque mois ?</span><b>Consolidation →</b></Link><Link to="/cas-usage/budget-realise" className="q"><span>Quelle équipe dérape par rapport au budget, et de combien ?</span><b>Budget / réalisé →</b></Link></div>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <h2 className="h2">Les questions que posent les CFO.</h2>
        <div className="faq"><details><summary>« Notre cabinet nous rend la compta à J+20. »</summary><div><p>Trame n’attend pas le cabinet. Il part de ce qui est déjà en compta, de la facturation, des banques et de la paie, avec des estimations documentées pour le reste, comme les factures fournisseurs attendues. Quand le cabinet passe ses écritures, l’écart arrive daté et justifié.</p></div></details><details><summary>« On fait déjà tout avec Claude. »</summary><div><p>Claude rapproche les exports qu’on lui donne, une fois. Le mois suivant, tout est à refaire. Il ne garde ni le chiffre présenté au board, ni vos règles, ni les décisions de l’équipe, et il lit la paie si elle est dans le fichier. Branché sur Trame, il part de chiffres réconciliés et validés, avec les droits de la personne qui l’interroge.</p></div></details><details><summary>« Notre équipe data va le construire. »</summary><div><p>Elle sait construire un entrepôt. Un reporting de gestion fiable demande aussi le cut-off, les versions présentées, vos règles et des droits à la ligne : des mois de travail, puis la maintenance. Trame s’installe sur son entrepôt en quelques semaines.</p></div></details><details><summary>« Nos données ne sont pas propres. »</summary><div><p>C’est le point de départ habituel. Trame trouve les écarts entre vos outils et vous les rend chiffrés, avec leur cause, avant qu’ils n’arrivent au board.</p></div></details><details><summary>« On a déjà un outil de planification. »</summary><div><p>Gardez-le. Trame lui envoie le réalisé, à la maille de votre budget. Si vous n’en avez pas, Claude branché sur Trame suffit souvent pour bâtir un budget ou un réestimé.</p></div></details><details><summary>« Ça ne remplace pas notre expert-comptable. »</summary><div><p>Non. Votre cabinet produit les comptes ; Trame produit les chiffres de gestion, rapprochés de ces comptes et de leur FEC.</p></div></details></div>
        </div>
        </section>
        <ClosingCta
          title="Tissez la trame de vos décisions, pilotez en toute confiance."
          sub="Réservez un premier échange et bénéficiez d’un état des lieux de vos sources, de vos règles et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner."
        />
      </Rails>
    </main>
  );
}

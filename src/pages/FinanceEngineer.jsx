// FinanceEngineer page. Copy and blocks follow the « Site Trame V1 » mock-up (finance-engineer.html); the hero frame and the closing landscape are the site's own.
import { usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function FinanceEngineer() {
  const t = useT();
  usePageMeta(
    t('Finance engineer : définition et rôle | Trame', 'Finance engineer: definition and role | Trame'),
    t('Le finance engineer rend les chiffres de l’entreprise justes, explicables et utilisables par tous, IA comprises. Notre définition, et comment confier ce travail à Trame.', 'The finance engineer makes the company’s figures accurate, explainable and usable by everyone, AI included. Our definition, and how to hand this work to Trame.'),
  );
  return (
    <main className="v1">
      <PageHero
        kicker="Finance engineer"
        title={t('Le finance engineer, nouveau pilier des équipes finance.', 'The finance engineer, a new pillar of finance teams.')}
        lead={t(
          <>Les équipes finance les plus avancées s’organisent autour d’un nouveau profil : celui qui construit l’infrastructure de données dont dépend la finance, et branche l’IA sur des chiffres justes. <span>Voici notre définition, et comment confier ce travail à Trame sans recruter.</span></>,
          <>The most advanced finance teams are organizing around a new profile: the person who builds the data infrastructure finance depends on, and connects AI to accurate figures. <span>Here is our definition, and how to hand this work to Trame without hiring.</span></>,
        )}
        ctas={<><LinkButton to="#definition" size="lg" variant="signal">{t('Lire la définition', 'Read the definition')}</LinkButton><DemoButton variant="ghostInverse" /></>}
      >
        <figure className="card" style={{ margin: 0, padding: '32px', display: 'grid', gap: '22px' }}>
        <p className="label">{t('Sur le finance engineer', 'On the finance engineer')}</p>
        <blockquote style={{ margin: 0, fontWeight: 300, fontSize: 'clamp(22px,2.4vw,28px)', lineHeight: 1.35, letterSpacing: '-0.01em' }}>{t('« Pas besoin d’en recruter un : avec Trame, on l’a déjà. Et ce profil-là, on ne le trouve nulle part. »', '“No need to hire one: with Trame, we already have it. And that profile is nowhere to be found.”')}</blockquote>
        <figcaption style={{ fontSize: '14.5px', color: 'var(--muted)' }}><b style={{ color: 'var(--ink)' }}>{t('Responsable finance, éditeur SaaS', 'Head of finance, SaaS software company')}</b>{t(' · après une démo de Trame', ' · after a Trame demo')}</figcaption>
        </figure>
      </PageHero>
      <Rails>
        <section className="band" id="definition">
        <div className="wrap">
        <p className="label">{t('Notre définition', 'Our definition')}</p>
        <h2 className="h2" style={{ marginTop: '12px' }}>{t('Qu’est-ce qu’un finance engineer ?', 'What is a finance engineer?')}</h2>
        <div className="defn">
        <p className="term">{t('Finance Engineer, définition', 'Finance Engineer, definition')}</p>
        <p className="def">{t('Le professionnel de la finance qui rend les chiffres de l’entreprise justes, explicables et utilisables par tous, IA comprises. En automatisant ce que l’équipe refait chaque mois à la main, il libère du temps pour l’analyse et donne à la direction un chiffre auquel elle peut se fier.', 'The finance professional who makes the company’s figures accurate, explainable and usable by everyone, AI included. By automating what the team redoes by hand every month, they free up time for analysis and give leadership a figure it can rely on.')}</p>
        </div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap">
        <div className="intro">
        <h2 className="h2">{t('Ce qu’il fait, chaque mois.', 'What they do, every month.')}</h2>
        <p>{t('Le finance engineer écrit dans un système ce que l’équipe refait chaque mois à la main : imports, règles, rapprochements, contrôles. Le système tourne même quand il est en congé.', 'The finance engineer writes into a system what the team redoes by hand every month: imports, rules, reconciliations, checks. The system keeps running even when they are on vacation.')}</p>
        </div>
        <div className="feats">
        <div className="feat"><h3>{t('Il branche les sources', 'They connect the sources')}</h3><p>{t('Compta et FEC, CRM, facturation, PSP, banques, paie. Une fois, sans exports à refaire chaque mois.', 'Accounting and FEC (the French general-ledger audit file), CRM, billing, payment providers (PSPs), banks, payroll. Once, with no exports to redo every month.')}</p></div>
        <div className="feat"><h3>{t('Il écrit les règles', 'They write the rules')}</h3><p>{t('Tables de mapping, clés de répartition, règles de reconnaissance du revenu. Écrites une fois, appliquées tous les mois.', 'Mapping tables, allocation keys, revenue recognition rules. Written once, applied every month.')}</p></div>
        <div className="feat"><h3>{t('Il rapproche et contrôle', 'They reconcile and check')}</h3><p>{t('Chaque écart entre deux sources est trouvé, chiffré et expliqué avant la clôture, pas pendant le board.', 'Every discrepancy between two sources is found, quantified and explained before the close, not during the board meeting.')}</p></div>
        <div className="feat"><h3>{t('Il fige et trace', 'They lock and trace')}</h3><p>{t('La version présentée au board ne bouge plus. Chaque correction garde son auteur, sa date et sa raison.', 'The version presented to the board no longer moves. Every correction keeps its author, its date and its reason.')}</p></div>
        <div className="feat"><h3>{t('Il outille l’équipe et ses IA', 'They equip the team and its AIs')}</h3><p>{t('Droits par personne, questions en langage naturel, agents qui travaillent sur des chiffres fiables.', 'Per-person permissions, questions in plain language, agents that work on reliable figures.')}</p></div>
        <div className="feat"><h3>{t('Il transmet', 'They hand over')}</h3><p>{t('Tout est documenté dans le système. Quand il change de poste, ses règles restent.', 'Everything is documented in the system. When they change jobs, their rules stay.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <h2 className="h2">{t('Entre le contrôleur de gestion et le data engineer.', 'Between the financial controller and the data engineer.')}</h2>
        <p>{t('Le finance engineer connaît la finance et sait construire des flux de données. Il est rattaché au CFO.', 'The finance engineer knows finance and knows how to build data pipelines. They report to the CFO.')}</p>
        </div>
        <div className="feats">
        <div className="feat"><h3>{t('Le contrôleur de gestion', 'The financial controller')}</h3><p>{t('Connaît le cut-off, les PCA et l’intragroupe. Construit dans Excel, et défend les chiffres.', 'Knows cut-off, deferred revenue and intercompany. Builds in Excel, and defends the figures.')}</p></div>
        <div className="feat"><h3>{t('Le data engineer', 'The data engineer')}</h3><p>{t('Construit et maintient des flux de données. Écrit les règles de gestion sur demande, en tickets.', 'Builds and maintains data pipelines. Writes business rules on request, through tickets.')}</p></div>
        <div className="feat fe"><h3>{t('Le finance engineer', 'The finance engineer')}</h3><p>{t('Les deux à la fois : la finance et la donnée. Ses règles vivent dans un système, tracées, et il défend les chiffres.', 'Both at once: finance and data. Their rules live in a system, traced, and they defend the figures.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap split top-a">
        <div className="intro">
        <h2 className="h2">{t('Pourquoi le métier monte maintenant.', 'Why the role is rising now.')}</h2>
        <p>{t('Le terme s’est imposé début 2026 : des investisseurs comme a16z et des communautés comme CFO Connect lui consacrent des articles, et les équipes finance qui avancent le plus vite recrutent déjà ce profil.', 'The term took hold in early 2026: investors like a16z and communities like CFO Connect are writing about it, and the fastest-moving finance teams are already hiring for the profile.')}</p>
        </div>
        <ul className="ticks">
        <li><div>{t(<><b>L’IA est entrée dans les outils de la finance.</b> <span>Claude et ChatGPT sont dans Excel ; Pennylane, Qonto et Agicap ont ouvert un accès pour les IA.</span></>, <><b>AI has entered finance tools.</b> <span>Claude and ChatGPT are in Excel; Pennylane, Qonto and Agicap have opened access for AI.</span></>)}</div></li>
        <li><div>{t(<><b>Une IA rapproche ce qu’on lui donne, une fois.</b> <span>Elle ne garde ni la version présentée, ni vos règles, ni vos droits : sur des exports, chaque réponse repart de zéro.</span></>, <><b>An AI reconciles what you give it, once.</b> <span>It keeps neither the version presented, nor your rules, nor your permissions: on exports, every answer starts from scratch.</span></>)}</div></li>
        <li><div>{t(<><b>Les équipes ne grossissent plus.</b> <span>« Garder la même taille d’équipe pour accompagner notre croissance », résume le directeur général adjoint d’une marque e-commerce.</span></>, <><b>Teams are no longer growing.</b> <span>“Keep the same team size to support our growth,” as the deputy CEO of an e-commerce brand puts it.</span></>)}</div></li>
        </ul>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap">
        <div className="intro">
        <h2 className="h2">{t('Le recruter, ou confier ce travail à Trame.', 'Hire one, or hand this work to Trame.')}</h2>
        </div>
        <div className="feats two" style={{ borderTopColor: 'var(--on-deep)' }}>
        <div className="feat" style={{ borderBottomColor: 'var(--on-deep-line)' }}><h3>{t('Le recruter', 'Hire one')}</h3><p className="muted">{t('Un profil rare, des mois de recherche, et un savoir qui part avec lui.', 'A rare profile, months of searching, and know-how that leaves when they do.')}</p></div>
        <div className="feat" style={{ borderBottomColor: 'var(--on-deep-line)', paddingLeft: '24px', borderLeft: '1px solid var(--on-deep-line)' }}><h3>{t('Confier ce travail à Trame', 'Hand this work to Trame')}</h3><p className="muted">{t('Le produit fait l’ingénierie, notre équipe écrit vos règles avec vous, vos contrôleurs gardent la main.', 'The product does the engineering, our team writes your rules with you, your controllers stay in charge.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq">
        <details><summary>{t('Faut-il savoir coder pour devenir finance engineer ?', 'Do you need to code to become a finance engineer?')}</summary><div><p>{t('Non. Le cœur du métier, c’est la finance : savoir quelle règle appliquer, et pourquoi. Les outils comme Trame font le reste sans code. Ceux qui connaissent SQL vont plus vite, c’est tout.', 'No. The core of the job is finance: knowing which rule to apply, and why. Tools like Trame do the rest without code. Those who know SQL go faster, that’s all.')}</p></div></details>
        <details><summary>{t('Est-ce un poste ou une fonction ?', 'Is it a job or a function?')}</summary><div><p>{t('Les deux. Les grandes équipes recrutent un finance engineer. Les équipes de deux à dix personnes en confient le travail à un outil, et leurs contrôleurs en prennent la casquette.', 'Both. Large teams hire a finance engineer. Teams of two to ten people hand the work to a tool, and their controllers wear the hat.')}</p></div></details>
        <details><summary>{t('Quelle différence avec un FP&A ?', 'How is it different from FP&A?')}</summary><div><p>{t('Le FP&A analyse et prévoit. Le finance engineer lui fournit des chiffres justes et fiables sur lesquels prévoir.', 'FP&A analyzes and forecasts. The finance engineer gives FP&A accurate, reliable figures to forecast on.')}</p></div></details>
        <details><summary>{t('Notre équipe data peut-elle jouer ce rôle ?', 'Can our data team play this role?')}</summary><div><p>{t('Elle sait construire un entrepôt. Le cut-off, les mois présentés au board, les règles de gestion et les droits sur la paie sont des sujets de finance. Trame s’installe sur son entrepôt : elle garde l’infrastructure, la finance garde ses règles.', 'It knows how to build a data warehouse. Cut-off, the months presented to the board, business rules and payroll permissions are finance matters. Trame installs on its data warehouse: the data team keeps the infrastructure, finance keeps its rules.')}</p></div></details>
        <details><summary>{t('Trame remplace-t-il ce poste ?', 'Does Trame replace this role?')}</summary><div><p>{t('Trame fait le travail d’ingénierie que personne n’a le temps de faire. Il ne remplace personne dans l’équipe : il donne aux contrôleurs et aux FP&A les outils pour le piloter.', 'Trame does the engineering work nobody has time to do. It replaces no one on the team: it gives controllers and FP&A the tools to run it.')}</p></div></details>
        <details><summary>{t('Pourquoi un terme anglais ?', 'Why the term “finance engineer”?')}</summary><div><p>{t('Parce que c’est celui que le marché emploie, et qu’aucune traduction ne dit la même chose. « Ingénieur financier » désigne déjà un autre métier, en banque.', 'Because it’s the one the market uses, and no other term says the same thing. “Financial engineer” already means a different job, in banking.')}</p></div></details>
        </div>
        </div>
        </section>
        <ClosingCta
          title={t('Un finance engineer dans votre équipe, sans recrutement.', 'A finance engineer on your team, without hiring.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de vos sources, de vos règles et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first call: we run an assessment of your sources, your rules and your pain points. You leave knowing how much you stand to gain.')}
        />
      </Rails>
    </main>
  );
}

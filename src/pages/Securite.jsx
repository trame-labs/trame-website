// Securite page. Copy and blocks follow the « Site Trame V1 » mock-up (securite.html); the hero frame and the closing landscape are the site's own.
import { usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function Securite() {
  const t = useT();
  usePageMeta(
    t('Sécurité : droits par personne, données en Europe | Trame', 'Security: per-person permissions, data in Europe | Trame'),
    t('Hébergé en Europe, RGPD, aucun entraînement sur vos données. Droits par personne et par ligne : votre IA voit ce que voit la personne qui l’interroge.', 'Hosted in Europe, GDPR, no training on your data. Per-person, row-level permissions: your AI sees what the person asking it sees.'),
  );
  return (
    <main className="v1">
      <PageHero
        kicker={t('Sécurité et confidentialité', 'Security and privacy')}
        title={t('Partagez les chiffres. Pas la paie.', 'Share the figures. Not the payroll.')}
        lead={t('Trame donne à chacun, et à chaque IA, exactement ce qu’il a le droit de voir. Vos données restent en Europe et ne servent jamais à entraîner un modèle.', 'Trame gives everyone, and every AI, exactly what they are allowed to see. Your data stays in Europe and is never used to train a model.')}
        pills={[t('Hébergé en Europe', 'Hosted in Europe'), 'SOC 2', t('RGPD', 'GDPR'), t('Aucun entraînement', 'No training'), t('Lecture seule', 'Read-only')]}
        ctas={<><DemoButton /><LinkButton to="#engagements" size="lg" variant="ghostInverse">{t('Voir nos engagements', 'See our commitments')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : qui voit quoi sur la masse salariale', 'Example: who sees what on payroll')} className="card" style={{ margin: 0 }}>
        <div className="card-head">
        <p className="card-title">{t('Masse salariale · septembre ', 'Payroll · September ')}<span>{t('· qui voit quoi', '· who sees what')}</span></p>
        <span className="chip"><svg aria-hidden="true"><use href="#i-lock"></use></svg>{t('Droits à la ligne', 'Row-level permissions')}</span>
        </div>
        <table className="rows">
        <thead><tr><th>{t('Qui', 'Who')}</th><th>{t('Ce qu’il voit', 'What they see')}</th></tr></thead>
        <tbody>
        <tr><td>Nadia, CFO</td><td>{t('Chaque salaire, chaque prime', 'Every salary, every bonus')}<span className="src">{t('Accès complet à la paie', 'Full access to payroll')}</span></td></tr>
        <tr><td>{t('Bastien, contrôleur de gestion', 'Bastien, financial controller')}</td><td>{t('La masse salariale par équipe', 'Payroll by team')}<span className="src">{t('Aucun salaire individuel', 'No individual salaries')}</span></td></tr>
        <tr><td>{t('Sophie, directrice commerciale', 'Sophie, head of sales')}</td><td>{t('Le budget et le réalisé de son équipe', 'Her team’s budget and actuals')}<span className="src">{t('Rien sur les autres équipes', 'Nothing on other teams')}</span></td></tr>
        <tr><td>{t('Claude, pour le CEO', 'Claude, for the CEO')}</td><td>{t('Ce que voit le CEO, pas plus', 'What the CEO sees, no more')}<span className="src">{t('L’IA hérite des droits de qui l’interroge', 'The AI inherits the permissions of whoever asks it')}</span></td></tr>
        <tr><td>{t('Commissaire aux comptes', 'Auditor')}</td><td>{t('Les mois arrêtés, en lecture', 'Closed months, read-only')}<span className="src">{t('Accès limité dans le temps', 'Time-limited access')}</span></td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('Chaque lecture est journalisée, celles de l’IA comprises.', 'Every read is logged, including the AI’s.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <section className="band" id="engagements">
        <div className="wrap">
        <div className="intro">
        <h2 className="h2">{t('Cinq engagements.', 'Five commitments.')}</h2>
        </div>
        <div className="feats">
        <div className="feat"><h3>{t('Hébergé en Europe', 'Hosted in Europe')}</h3><p>{t('Vos données restent dans votre entrepôt (BigQuery, Databricks) ou dans un entrepôt européen géré par Trame.', 'Your data stays in your data warehouse (BigQuery, Databricks) or in a European data warehouse managed by Trame.')}</p></div>
        <div className="feat"><h3>SOC 2</h3><p>{t('Nos contrôles de sécurité sont audités selon le référentiel SOC 2 [type et date du rapport à préciser]. Le rapport vous est transmis sous accord de confidentialité.', 'Our security controls are audited against the SOC 2 framework [report type and date to confirm]. The report is shared with you under a non-disclosure agreement.')}</p></div>
        <div className="feat"><h3>{t('RGPD', 'GDPR')}</h3><p>{t('Un accord de traitement des données signé avec chaque client, avec la liste de nos sous-traitants.', 'A data processing agreement signed with every customer, with the list of our subprocessors.')}</p></div>
        <div className="feat"><h3>{t('Aucun entraînement', 'No training')}</h3><p>{t('Trame n’entraîne aucun modèle sur vos données, et ses fournisseurs d’IA non plus, par contrat. Depuis Claude ou ChatGPT, utilisez un compte professionnel, qui exclut l’entraînement.', 'Trame trains no model on your data, and neither do its AI providers, by contract. From Claude or ChatGPT, use a business account, which excludes training.')}</p></div>
        <div className="feat"><h3>{t('Lecture seule', 'Read-only')}</h3><p>{t('Trame lit vos logiciels et vos banques ; il n’y écrit rien et ne peut initier aucun paiement.', 'Trame reads your software and your banks; it writes nothing to them and cannot initiate any payment.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Le chemin de vos données', 'Your data’s path')}</p>
        <h2 className="h2">{t('De votre banque à votre IA, les droits s’appliquent à chaque étape.', 'From your bank to your AI, permissions apply at every step.')}</h2>
        </div>
        <ol className="steps s5">
        <li><b>{t('Vos outils et vos banques', 'Your tools and your banks')}</b><span>{t('Vos données restent dans vos comptes et vos logiciels.', 'Your data stays in your accounts and your software.')}</span></li>
        <li><b>{t('Des connexions en lecture seule', 'Read-only connections')}</b><span>{t('Banques par Bridge, établissement de paiement agréé par l’ACPR (n° 16918) ; logiciels par connecteurs autorisés une fois.', 'Banks through Bridge, a payment institution licensed by the French banking regulator (ACPR, no. 16918); software through connectors authorized once.')}</span></li>
        <li><b>{t('Trame, en Europe', 'Trame, in Europe')}</b><span>{t('Dans votre entrepôt, ou dans un entrepôt européen géré par Trame. Chiffré en transit et au repos.', 'In your data warehouse, or in a European data warehouse managed by Trame. Encrypted in transit and at rest.')}</span></li>
        <li><b>{t('Les droits de chacun', 'Everyone’s permissions')}</b><span>{t('Par personne et par ligne. Les salaires individuels restent réservés à qui de droit.', 'Per person and per row. Individual salaries stay reserved for those entitled to see them.')}</span></li>
        <li><b>{t('Vous, votre équipe, votre IA', 'You, your team, your AI')}</b><span>{t('Dans Trame, dans Excel ou dans Claude, chacun ne lit que ce qu’il a le droit de voir. Tout est journalisé.', 'In Trame, in Excel or in Claude, everyone reads only what they are allowed to see. Everything is logged.')}</span></li>
        </ol>
        </div>
        </section>
        <section className="band">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Vos IA, sous contrôle', 'Your AIs, under control')}</p>
        <h2 className="h2">{t('Votre IA voit ce que vous voyez. Rien de plus.', 'Your AI sees what you see. Nothing more.')}</h2>
        <p>{t('Quand votre CEO pose une question à Claude, Claude interroge Trame avec les droits du CEO : s’il ne voit pas les salaires, Claude non plus.', 'When your CEO asks Claude a question, Claude queries Trame with the CEO’s permissions: if the CEO can’t see salaries, neither can Claude.')}</p>
        <p>{t('Vous décidez qui voit quoi, personne par personne : la CFO voit chaque salaire, un manager voit la masse salariale de son équipe, sans salaire individuel.', 'You decide who sees what, person by person: the CFO sees every salary, a manager sees their team’s payroll, with no individual salaries.')}</p>
        </div>
        <figure className="voice" style={{ margin: 0 }}>
        <blockquote>{t('« Personne n’a le droit de connecter genre Claude au MCP BigQuery. »', '“Nobody is allowed to connect, like, Claude to the BigQuery MCP.”')}</blockquote>
        <figcaption>{t(<><b>Dirigeant finance, éditeur SaaS</b> · sur ce qui bloque l’IA dans la finance</>, <><b>Finance executive, SaaS software company</b> · on what holds AI back in finance</>)}</figcaption>
        </figure>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Tout est journalisé', 'Everything is logged')}</p>
        <h2 className="h2">{t('Qui a vu quoi, qui a changé quoi, et pourquoi.', 'Who saw what, who changed what, and why.')}</h2>
        <p>{t('Chaque lecture, chaque correction, chaque export et chaque changement de droits est daté et attribué, y compris quand c’est une IA qui lit. Votre commissaire aux comptes retrouve le chemin de chaque chiffre.', 'Every read, every correction, every export and every permission change is dated and attributed, including when an AI is reading. Your auditor can trace the path of every figure.')}</p>
        </div>
        <figure aria-label={t('Exemple de journal des accès et des modifications', 'Example of an access and change log')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Journal · 14 octobre', 'Log · October 14')}</p><span className="chip grey">{t('Accès et modifications', 'Access and changes')}</span></div>
        <ol className="journal">
        <li><time>{t('09:12', '9:12 am')}</time><div><span className="kind">{t('Lecture', 'Read')}</span>{t(<><b>Claude, pour Paul (CEO)</b> a lu la marge par canal de septembre.</>, <><b>Claude, for Paul (CEO)</b> read September’s margin by channel.</>)}<span className="who">{t('Droits de Paul · aucun salaire consulté', 'Paul’s permissions · no salaries viewed')}</span></div></li>
        <li><time>{t('08:47', '8:47 am')}</time><div><span className="kind">{t('Correction', 'Correction')}</span>{t(<><b>Bastien</b> a reclassé un avoir Zalando de 1,8 k€ en retour, sur octobre.</>, <><b>Bastien</b> reclassified a €1.8k Zalando credit note as a return, in October.</>)}<span className="who">{t('Motif : avoir reçu après l’arrêté de septembre · en attente de validation', 'Reason: credit note received after the September close · pending approval')}</span></div></li>
        <li><time>{t('08:31', '8:31 am')}</time><div><span className="kind">{t('Export', 'Export')}</span>{t(<><b>Nadia</b> a exporté le P&amp;L arrêté de septembre.</>, <><b>Nadia</b> exported September’s closed P&amp;L.</>)}<span className="who">{t('Version du 7 octobre', 'October 7 version')}</span></div></li>
        <li><time>{t('Hier', 'Yesterday')}</time><div><span className="kind">{t('Droits', 'Permissions')}</span>{t(<><b>Nadia</b> a ouvert un accès en lecture au commissaire aux comptes.</>, <><b>Nadia</b> gave the auditor read access.</>)}<span className="who">{t('Mois arrêtés de 2026 · jusqu’au 30 novembre', '2026 closed months · until November 30')}</span></div></li>
        </ol>
        <figcaption className="card-foot"><span>{t('Chaque lecture et chaque modification sont datées et attribuées.', 'Every read and every change is dated and attributed.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
        </div>
        </section>
        <section className="band">
        <div className="wrap split top-a">
        <div className="intro">
        <p className="label">{t('Votre équipe data garde la main', 'Your data team stays in charge')}</p>
        <h2 className="h2">{t('Trame s’installe sur votre entrepôt.', 'Trame installs on your data warehouse.')}</h2>
        <p>{t('Si vous avez un entrepôt de données, Trame s’y installe et en respecte les règles d’accès. Vos données n’en sortent pas : Trame n’en garde que des métadonnées, comme vos règles et l’historique de vos décisions. Vous n’en avez pas ? Trame vous en fournit un, en Europe.', 'If you have a data warehouse, Trame installs on it and follows its access rules. Your data doesn’t leave it: Trame keeps only metadata, such as your rules and the history of your decisions. Don’t have one? Trame provides one, in Europe.')}</p>
        </div>
        <ul className="ticks">
        <li><div>{t(<><b>Chiffrement</b> <span>en transit et au repos.</span></>, <><b>Encryption</b> <span>in transit and at rest.</span></>)}</div></li>
        <li><div>{t(<><b>Connexion</b> <span>par SSO Google ou Microsoft, double authentification. [À confirmer]</span></>, <><b>Sign-in</b> <span>through Google or Microsoft SSO, two-factor authentication. [To confirm]</span></>)}</div></li>
        <li><div>{t(<><b>Accès de l’équipe Trame</b> <span>limités, sur autorisation du client, et journalisés.</span></>, <><b>Trame team access</b> <span>limited, with the customer’s authorization, and logged.</span></>)}</div></li>
        <li><div>{t(<><b>Tests d’intrusion</b> <span>[Fréquence et dernier test, à confirmer]</span></>, <><b>Penetration tests</b> <span>[Frequency and latest test, to confirm]</span></>)}</div></li>
        <li><div>{t(<><b>Réversibilité</b> <span>vos données et vos règles s’exportent à tout moment.</span></>, <><b>Reversibility</b> <span>your data and your rules can be exported at any time.</span></>)}</div></li>
        </ul>
        </div>
        </section>
        <section className="band tight paper" id="rapport">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <p className="muted small" style={{ marginTop: '12px' }}>{t('Page mise à jour le [date de mise en ligne].', 'Page updated on [publication date].')}</p>
        <div className="faq">
        <details><summary>{t('L’équipe Trame peut-elle voir mes données ?', 'Can the Trame team see my data?')}</summary><div><p>{t('Seulement pendant le déploiement ou à votre demande, avec votre autorisation, et chaque accès est journalisé.', 'Only during deployment or at your request, with your authorization, and every access is logged.')}</p></div></details>
        <details><summary>{t('Comment Claude ou ChatGPT accèdent-ils à mes chiffres ?', 'How do Claude or ChatGPT access my figures?')}</summary><div><p>{t('Par un connecteur sécurisé (MCP) que vous activez. L’IA interroge Trame avec les droits de la personne connectée : elle ne voit que ce que cette personne voit, et ses lectures sont journalisées.', 'Through a secure connector (MCP) that you turn on. The AI queries Trame with the signed-in person’s permissions: it sees only what that person sees, and its reads are logged.')}</p></div></details>
        <details><summary>{t('L’IA peut-elle voir des données que l’utilisateur ne voit pas ?', 'Can the AI see data the user can’t?')}</summary><div><p>{t('Non. Elle hérite exactement de ses droits. Si la personne ne voit pas les salaires, l’IA ne les voit pas non plus.', 'No. It inherits exactly that user’s permissions. If the person can’t see salaries, neither can the AI.')}</p></div></details>
        <details><summary>{t('Nos données sortent-elles d’Europe quand on utilise Claude ou ChatGPT ?', 'Does our data leave Europe when we use Claude or ChatGPT?')}</summary><div><p>{t('Seule la réponse à la question posée, calculée avec les droits de la personne, part vers le fournisseur d’IA qu’elle utilise, selon les conditions de son propre compte. Le reste de vos données ne quitte pas l’Europe.', 'Only the answer to the question asked, computed with that person’s permissions, goes to the AI provider they use, under the terms of their own account. The rest of your data does not leave Europe.')}</p></div></details>
        <details><summary>{t('En quoi est-ce différent de coller un export dans ChatGPT ?', 'How is this different from pasting an export into ChatGPT?')}</summary><div><p>{t('Un export contient tout, sans droits, et il est périmé dès le lendemain. Avec Trame, l’IA ne reçoit que ce que la personne a le droit de voir, sur des chiffres rapprochés et arrêtés, et chaque question est journalisée.', 'An export contains everything, with no permissions, and it is out of date by the next day. With Trame, the AI receives only what the person is allowed to see, on reconciled and closed figures, and every question is logged.')}</p></div></details>
        <details><summary>{t('L’IA peut-elle modifier nos chiffres ?', 'Can the AI change our figures?')}</summary><div><p>{t('Non. Lire et modifier sont deux droits distincts. L’IA lit ; une correction est faite et validée par une personne, avec son motif.', 'No. Reading and editing are two separate permissions. The AI reads; a correction is made and approved by a person, with its reason.')}</p></div></details>
        <details><summary>{t('Pouvez-vous déclencher des paiements ?', 'Can you trigger payments?')}</summary><div><p>{t('Non. Les connexions bancaires sont en lecture seule : Trame ne peut initier aucun paiement.', 'No. Bank connections are read-only: Trame cannot initiate any payment.')}</p></div></details>
        <details><summary>{t('Que se passe-t-il si je quitte Trame ?', 'What happens if I leave Trame?')}</summary><div><p>{t('Vos données restent dans votre entrepôt. Vos règles, vos mois validés et votre journal des décisions s’exportent.', 'Your data stays in your data warehouse. Your rules, your approved months and your decision log can be exported.')}</p></div></details>
        </div>
        </div>
        </section>
        <ClosingCta
          title={t('Vos données restent les vôtres. Votre RSSI peut le vérifier.', 'Your data stays yours. Your CISO can check.')}
          sub={t('Réservez un premier échange : nous répondons à votre questionnaire de sécurité et vous transmettons le rapport SOC 2, sous accord de confidentialité.', 'Book a first call: we answer your security questionnaire and send you the SOC 2 report, under a non-disclosure agreement.')}
        />
      </Rails>
    </main>
  );
}

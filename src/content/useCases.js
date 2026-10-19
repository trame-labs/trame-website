// Use-case pages, condensed from the internal V1 mock-up. All figures are fictional examples and tie out with the home page.
const T = (cells) => ({ cells, total: true });

export const USE_CASE_PAGES = {
  '/cas-usage/cash-analytique': {
    meta: ['Trésorerie et cash-flow rapprochés de la compta | Trame', 'Banques et PSP réunis chaque jour et rapprochés des factures, de la paie et de la compta. Chaque mois, un tableau de flux qui retombe sur les soldes comptables.'],
    title: 'Votre trésorerie de ce matin, expliquée',
    lead: 'Banques et PSP réunis chaque jour, rapprochés de la facturation, de la paie et de la compta.',
    card: {
      title: 'Trésorerie · 15 octobre, 8 h · k€', chip: 'À jour à 7 h',
      rows: [
        ['France · BNP, Qonto', 'EUR', '2 274,9'],
        ['États-Unis · Wise', '864,1 k$ au taux BCE du jour', '801,2'],
        ['Holding · Société Générale', 'EUR', '1 105,0'],
        ['Stripe, PayPal · en transit', 'Rapproché des versements à venir', '137,4'],
        T(['Trésorerie du groupe', null, '4 318,5']),
        ['Variation depuis hier', 'Encaissements, URSSAF, logistique · 2 mouvements à qualifier', '−186,4'],
      ],
      foot: 'Chaque mouvement remonte à sa facture, son client ou son salarié.',
    },
    proof: ['Typology · beauté', 'Le point de trésorerie du mardi, recalculé chaque matin'],
    problem: {
      title: 'Vous avez le solde de chaque banque. Pas l’explication de sa variation.',
      lead: 'Plusieurs banques, plusieurs devises, et des versements Stripe qui mélangent ventes, frais et remboursements.',
      quote: ['Tous les mardis, on fait avec mon équipe une agrégation de tous nos soldes de banque […] c’est très manuel.', 'Responsable finance · e-commerce, 3 entités'],
      compare: [
        ['Les relevés exportés à la main', 'Chaque banque et chaque PSP, chaque jour'],
        ['Des versements PSP illisibles', 'Éclatés en ventes, frais, remboursements, litiges'],
        ['Du cash en transit inexpliqué', 'Chaque flux relié à sa facture ou son salarié'],
        ['Un tableau qui ne retombe pas sur la compta', 'Un tableau de flux arrêté, égal aux soldes'],
      ],
    },
    steps: [
      ['Brancher banques et PSP', 'Plus de 1 000 banques en Europe, Stripe, PayPal, Adyen. En lecture seule.'],
      ['Rapprocher ligne à ligne', 'Chaque versement avec ses ventes, chaque encaissement avec sa facture.'],
      ['Classer selon vos règles', 'Trame propose, vous validez. Ce que vous validez devient une règle.'],
      ['Arrêter le mois', 'Le tableau de flux retombe sur les soldes comptables.'],
    ],
    focus: {
      kicker: 'Le mois, arrêté', title: 'Un tableau de flux qui retombe sur la compta',
      lead: 'Cash de gestion et cash comptable donnent le même chiffre. Les lignes non rapprochées sont listées, avec qui doit les qualifier.',
      card: {
        title: 'Flux de trésorerie · septembre · k€', chip: '98,7 % rapproché',
        rows: [
          ['Trésorerie au 31 août', 'Banques et PSP, toutes entités', '4 371,6'],
          ['Encaissements clients', 'Rapprochés des factures', '+1 902,4'],
          ['Frais d’encaissement et commissions', 'Stripe, PayPal, Zalando', '−97,6'],
          ['Fournisseurs', 'Achats, logistique, publicité', '−897,2'],
          ['Salaires et charges sociales', 'Rapprochés du journal de paie', '−604,9'],
          ['TVA et impôts', null, '−169,4'],
          T(['Trésorerie au 30 septembre', 'Égale aux soldes comptables', '4 504,9']),
        ],
        foot: 'Chaque ligne s’ouvre sur ses mouvements bancaires.',
      },
    },
    questions: [
      ['Pourquoi la trésorerie a-t-elle baissé de 186 k€ depuis hier ?', 'Variation par nature'],
      ['Quels clients nous doivent plus de 10 k€ depuis 60 jours ?', 'Encaissements attendus'],
      ['Combien nous coûtent Stripe et PayPal ce trimestre ?', 'Frais d’encaissement'],
    ],
    faq: [
      ['Quelles banques et quels PSP sont couverts ?', 'Plus de 1 000 banques en Europe par connexion agréée DSP2, et Stripe, PayPal, Adyen, GoCardless, Mollie, Shopify Payments. Les autres s’importent par relevés.'],
      ['Les soldes sont-ils en temps réel ?', 'Ils sont mis à jour chaque jour, et à la demande. Les banques publient leurs relevés une fois par jour.'],
      ['Trame peut-il faire des paiements ?', 'Non. Trame lit vos comptes ; il ne peut initier aucun paiement.'],
      ['En quoi est-ce différent d’un outil de trésorerie ?', 'Un outil de trésorerie part de la banque. Trame rapproche banque, PSP, facturation, paie et compta, puis arrête le mois.'],
    ],
    cta: 'Une variation de trésorerie que personne n’explique, un versement Stripe illisible : montrez-le-nous en démo.',
  },

  '/cas-usage/pnl-analytique': {
    meta: ['P&L analytique : marge par produit, canal, client | Trame', 'Votre marge par produit, canal, client ou projet, jusqu’à la commande. Des clés de répartition datées, un P&L qui retombe sur le résultat comptable.'],
    title: 'Votre marge par client, produit ou canal',
    lead: 'Votre compta croisée avec vos outils métier, jusqu’à la commande. Vos clés appliquées chaque mois, et un P&L qui retombe sur le résultat.',
    card: {
      title: 'Marge sur coûts variables par canal · septembre · k€', chip: 'Arrêté le 7 octobre',
      columns: ['Canal', 'CA net', 'Marge', '%'],
      rows: [
        ['Site · Shopify', '2 316 commandes', '1 104,2', '755,4', '68,4'],
        ['Zalando', 'Commission passée de 15 à 17,5 %', '418,9', '203,4', '48,6'],
        ['Revendeurs', 'Factures Pennylane', '319,5', '142,5', '44,6'],
        T(['Total', null, '1 842,6', '1 101,3', '59,8']),
      ],
      foot: 'Chaque canal s’ouvre sur le détail de sa marge.',
    },
    proof: ['La Bonne Brosse · site, revendeurs, boutiques', 'La marge par produit et par canal, rapprochée de la compta'],
    problem: {
      title: 'Quel produit, quel canal, quel client vous fait gagner de l’argent ?',
      lead: 'Votre compta donne un résultat, pas une marge par client. Et les clés de répartition vivent dans un fichier que seule une personne sait mettre à jour.',
      quote: ['S’il y avait la possibilité de venir cliquer sur un chiffre et dire OK, ça c’est la somme de ça […] ça serait le top.', 'Responsable finance groupe · transport'],
      compare: [
        ['Des tables de passage refaites chaque mois', 'Modifiables comme dans Excel, appliquées seules'],
        ['Une compta agrégée, le détail ailleurs', 'Le détail rapproché de l’écriture'],
        ['Des clés qui changent sans que personne le sache', 'Chaque clé datée, avec son auteur'],
        ['Un P&L qui ne retombe pas sur le résultat', 'La somme des axes égale au résultat'],
      ],
    },
    steps: [
      ['Rattacher chaque vente', 'À sa facture ou sa commande, rapprochée de son écriture.'],
      ['Rattacher les coûts directs', 'Coût de revient, transport, frais, commissions, retours, publicité.'],
      ['Répartir le reste', 'Chaque clé a sa base, sa date d’effet et son auteur.'],
      ['Arrêter et boucler', 'La somme des axes retombe sur le résultat comptable.'],
    ],
    focus: {
      kicker: 'Coûts directs et coût complet', title: '47 % de marge, ou 34 % ?',
      lead: 'Les deux chiffres sont justes, et ne mènent pas à la même décision. Trame les montre côte à côte, avec la clé qui explique chaque écart.',
      card: {
        title: 'Collection été · septembre · k€', chip: 'Clés v3',
        columns: ['', 'Coûts directs', 'Coût complet'],
        rows: [
          ['Chiffre d’affaires net', 'Remises et retours déduits', '412,6', '412,6'],
          ['Coût de revient, logistique, frais', null, '−160,9', '−160,9'],
          ['Publicité attribuée', 'Clé : campagne d’origine', '−58,2', '−58,2'],
          ['Équipe produit et studio', 'Clé : temps passé', 'non imputé', '−31,4'],
          ['Frais de structure', 'Clé : part du CA', 'non imputé', '−22,7'],
          T(['Marge', null, '193,5 · 46,9 %', '139,4 · 33,8 %']),
        ],
        foot: 'Coûts directs et coût complet, avec la clé de chaque écart.',
      },
    },
    questions: [
      ['Quels sont nos vingt clients les moins rentables, en coût complet ?', 'Marge par client'],
      ['Combien rapporte Zalando, commission et retours payés ?', 'Marge par canal'],
      ['Pourquoi la marge a-t-elle perdu un point en septembre ?', 'Écart expliqué'],
    ],
    faq: [
      ['Qui choisit les clés de répartition ?', 'Vous. Notre équipe de déploiement les écrit avec vous : chaque clé a sa base, sa date d’effet et son auteur.'],
      ['Si je change une clé, les mois présentés bougent-ils ?', 'Non. La nouvelle clé s’applique à partir du mois choisi. Re-présenter un mois est un choix explicite, tracé.'],
      ['Faut-il refaire notre plan analytique ?', 'Non. Trame part de votre plan comptable et de vos axes actuels, sans toucher à la compta.'],
      ['Mes managers voient-ils les salaires ?', 'Non. Chacun voit son périmètre, masse salariale de l’équipe comprise, jamais un salaire individuel.'],
    ],
    cta: 'Une marge par canal que personne ne sait recalculer ? Montrez-la-nous, nous vous montrons ce que Trame en fait.',
  },

  '/cas-usage/chiffre-affaires': {
    meta: ['Reconnaissance du chiffre d’affaires, PCA et ARR | Trame', 'Le CA signé, facturé et comptabilisé rapprochés contrat par contrat, vos règles de reconnaissance appliquées chaque mois, PCA, FAE et ARR arrêtés.'],
    title: 'Votre chiffre d’affaires, du contrat signé à l’écriture',
    lead: 'Vos règles de reconnaissance appliquées chaque mois. Le CA signé, facturé et comptabilisé rapprochés, contrat par contrat.',
    card: {
      title: 'Septembre · du signé au comptabilisé · k€', chip: 'Arrêté le 7 octobre',
      rows: [
        ['CA signé selon le CRM', 'Contrats actifs en septembre', '812,9'],
        ['Contrats actifs non facturés', '5 contrats · liste prête pour la facturation', '−30,2'],
        ['Services facturés hors CRM', '3 factures sans contrat', '+12,6'],
        T(['CA facturé', 'Factures et avoirs', '795,3']),
        ['Étalement des abonnements', 'Variation des PCA, compte 487', '−41,8'],
        ['Usage consommé, facturé en octobre', 'FAE, compte 418', '+17,9'],
        T(['CA comptabilisé', 'Comptes 706', '771,4']),
      ],
      foot: 'Chaque écart s’ouvre sur ses contrats et ses factures.',
    },
    // TODO: Jahia figure awaits written sign-off from Adrien Leleu.
    proof: ['Jahia · éditeur SaaS, 6 entités', 'De 3 jours à une demi-journée par cycle de chiffre d’affaires'],
    problem: {
      title: 'Le CRM, la facturation et la compta donnent trois chiffres d’affaires',
      lead: 'Les PCA se recalculent à la main à chaque clôture, et des contrats signés ne sont jamais facturés.',
      quote: ['Pour les CAC notamment, j’ai besoin d’avoir la donnée telle qu’au moment où je l’ai sortie.', 'FP&A · e-commerce'],
      compare: [
        ['Les PCA recalculés à la main à la clôture', 'La cascade des PCA chaque mois'],
        ['Trois jours par cycle de chiffre d’affaires', 'Une demi-journée'],
        ['Des corrections perdues dans les fichiers', 'Chaque ajustement avec son auteur'],
        ['Des contrats signés jamais facturés', 'La liste des contrats à facturer'],
      ],
    },
    steps: [
      ['Brancher vos outils', 'HubSpot ou Pipedrive, Stripe ou Chargebee, Pennylane ou Sage.'],
      ['Écrire vos règles', 'Abonnements, usage, services, avenants. Une fois, avec notre équipe.'],
      ['Rapprocher les trois versions', 'Chaque contrat relié à ses factures et à ses écritures.'],
      ['Arrêter le mois', 'CA, PCA, FAE et ARR arrêtés ensemble.'],
    ],
    focus: {
      kicker: 'Chaque mois, pas seulement à la clôture', title: 'La cascade des PCA, contrat par contrat',
      lead: 'Rapprochée du compte 487. Votre cabinet passe l’écriture ; Trame lui fournit le calcul et sa justification.',
      card: {
        title: 'Produits constatés d’avance · septembre · k€', chip: 'Rapproché du 487',
        rows: [
          ['PCA au 31 août', null, '2 956,4'],
          ['Abonnements facturés d’avance', 'Contrat par contrat, selon leur échéancier', '+729,6'],
          ['Repris en chiffre d’affaires', 'Règles de reconnaissance v4', '−771,4'],
          T(['PCA au 30 septembre', 'Égal au solde du 487, sans écart', '2 914,6']),
        ],
        foot: 'La même cascade, client par client et contrat par contrat.',
      },
    },
    questions: [
      ['Combien de CA comptabiliser ce mois-ci, et que reste-t-il à facturer ?', 'CA comptabilisé et FAE'],
      ['Ce que les ventes annoncent, est-ce ce qui est facturé ?', 'Signé et facturé'],
      ['Quels contrats arrivent à échéance sans renouvellement ?', 'Renouvellements'],
    ],
    faq: [
      ['Pouvez-vous expliquer l’écart entre ARR et CA comptable ?', 'Oui, ligne à ligne : services comptés comme récurrents, résiliations non saisies, étalement, usage, change.'],
      ['Qui passe l’écriture des PCA ?', 'Votre cabinet, comme aujourd’hui. Trame calcule les PCA contrat par contrat et fournit la justification.'],
      ['Vos règles suivent-elles les normes comptables ?', 'Trame applique les règles validées par votre cabinet (PCG, ou IFRS 15). Il ne les invente pas, et chaque version est tracée.'],
      ['Faut-il changer d’outil de facturation ?', 'Non. Trame lit vos factures où elles sont : Stripe, Chargebee, Pennylane, votre outil maison.'],
    ],
    cta: 'Un ARR qui ne colle pas avec la compta, des PCA calculés à la main : nous vous montrons l’écart, cause par cause.',
  },

  '/cas-usage/consolidation': {
    meta: ['Consolidation de gestion multi-entités à J+5 | Trame', 'Entités, devises, intragroupe et retraitements : votre consolidé de gestion à J+5, sans fichier Excel, chaque chiffre relié à son écriture.'],
    title: 'Votre groupe consolidé, sans fichier de consolidation',
    lead: 'Filiales converties, intragroupe éliminé, retraitements appliqués : le consolidé de gestion à J+5, chaque chiffre relié à son écriture.',
    card: {
      title: 'Groupe · P&L consolidé · septembre · k€', chip: 'Consolidé le 7 octobre',
      columns: ['', 'France', 'États-Unis', 'Canada', 'Élim.', 'Groupe'],
      rows: [
        ['Chiffre d’affaires', null, '612,4', '298,1', '41,0', '−41,0', '910,5'],
        ['Charges de personnel', null, '−301,7', '−168,2', '−29,6', '0,0', '−499,5'],
        ['Autres charges', null, '−222,5', '−108,5', '−7,3', '41,0', '−297,3'],
        T(['EBITDA', null, '88,2', '21,4', '4,1', '0,0', '113,7']),
      ],
      note: 'Intragroupe éliminé : 41,0 k€ de refacturation de R&D du Canada vers la France, rapprochée des deux côtés.',
      foot: 'Chaque chiffre remonte à son entité et à son écriture.',
    },
    proof: ['Pour les groupes de 2 à 20 entités', 'Un consolidé de gestion à J+5, chaque mois'],
    problem: {
      title: 'Chaque clôture, le même fichier, refait à la main',
      lead: 'Chaque filiale a son logiciel, son plan de comptes et sa devise. Et au premier rachat, tout est à refaire.',
      quote: ['Je sors 10 fichiers Excel de tous les outils, j’essaie de les faire matcher entre eux.', 'DAF · cabinet de conseil, 10 entités'],
      compare: [
        ['Un fichier refait à chaque rachat', 'Une entité se branche, vos règles s’appliquent'],
        ['L’intragroupe rapproché à la main', 'Rapproché par paire d’entités, écarts signalés'],
        ['Les taux ressaisis chaque mois', 'Taux BCE, figés à l’arrêté'],
        ['Un consolidé de gestion à J+15', 'Un consolidé de gestion à J+5'],
      ],
    },
    steps: [
      ['Brancher chaque entité', 'Pennylane, Sage, Xero, Exact, DATEV : chacune garde son logiciel.'],
      ['Passer au plan groupe', 'Une table de passage écrite une fois par plan local.'],
      ['Éliminer l’intragroupe', 'Refacturations, frais de siège, prêts : rapprochés des deux côtés.'],
      ['Convertir et arrêter', 'Taux moyen, taux de clôture, écart de conversion isolé.'],
    ],
    // TODO: these four checks must exist in the product before publishing.
    focus: {
      kicker: 'Pour le contrôleur qui défend le chiffre', title: 'Un consolidé vérifiable en quatre contrôles',
      lead: 'Trame affiche sa méthode. Votre DAF, votre auditeur et votre fonds suivent le même chemin que vous.',
      card: {
        title: 'Contrôles du consolidé · septembre', chip: '4 sur 4',
        rows: [
          ['Consolidé = entités + éliminations + retraitements', 'Affiché sur chaque ligne', 'OK'],
          ['Soldes réciproques à zéro, ou expliqués', 'Chaque paire d’entités', 'OK'],
          ['Taux du mois arrêté', 'Source BCE, figés avec le mois', 'OK'],
          ['Chaque chiffre descend jusqu’à l’écriture', 'Groupe, entité, compte, FEC', 'OK'],
        ],
        foot: 'La méthode, visible à chaque arrêté.',
      },
    },
    questions: [
      ['Quelle filiale pèse le plus sur l’EBITDA du groupe ?', 'Contribution par entité'],
      ['Combien nous a coûté le change sur le dollar ce trimestre ?', 'Écart de conversion'],
      ['À quoi ressemble le groupe à périmètre constant ?', 'Périmètre'],
    ],
    faq: [
      ['Consolidation de gestion ou statutaire ?', 'De gestion, chaque mois. Les comptes consolidés statutaires restent chez votre cabinet ; Trame leur fournit des chiffres rapprochés.'],
      ['Quels taux de change utilisez-vous ?', 'Les taux BCE par défaut, ou les vôtres. Ils sont figés avec le mois arrêté.'],
      ['Et quand nous rachetons une société ?', 'Elle se branche avec son historique. Les mois déjà arrêtés ne changent pas, et vous comparez à périmètre constant.'],
      ['Et si une filiale n’a pas clôturé à J+5 ?', 'Elle entre avec une estimation documentée. L’écart passe sur le mois suivant, daté et expliqué.'],
    ],
    cta: 'Un écart intragroupe qui revient chaque mois, un fichier à refaire après un rachat : montrez-le-nous en démo.',
  },

  '/cas-usage/budget-realise': {
    meta: ['Contrôle budgétaire et écarts par équipe | Trame', 'Votre budget reste dans Excel ou votre outil de planification. Trame lui oppose le réalisé arrêté à J+5, par équipe, masse salariale comprise.'],
    title: 'Quelle équipe dérape, et de combien',
    lead: 'Votre budget reste dans Excel ou votre outil de planification. Chaque mois à J+5, Trame le compare au réalisé arrêté, équipe par équipe.',
    card: {
      title: 'Masse salariale · budget / réalisé · septembre · k€', chip: 'Réalisé arrêté le 7 octobre',
      columns: ['Équipe', 'Budget', 'Réalisé', 'Écart'],
      rows: [
        ['Produit et tech', '24 personnes · 25 budgétées', '310,0', '298,4', '−11,6'],
        ['Ventes et marketing', '19 personnes · 17 budgétées', '175,0', '201,9', '+26,9'],
        ['Opérations et support', '15 personnes · 15 budgétées', '115,0', '112,5', '−2,5'],
        T(['Total', null, '600,0', '612,8', '+12,8']),
      ],
      foot: 'Chaque équipe s’ouvre sur la cause de son écart.',
    },
    proof: ['Pour les équipes qui budgètent dans Excel ou un outil de planification', 'Le réalisé arrêté, à la maille de votre budget'],
    problem: {
      title: 'Le réalisé arrive trop tard pour piloter le budget',
      lead: 'Il n’est pas à la maille du budget, la paie se rapproche à la main, et les commentaires des managers se perdent dans les e-mails.',
      quote: ['Si tu as des actuals propres, franchement, c’est à la portée de vraiment pas mal de monde, surtout avec Claude.', 'Responsable finance · éditeur SaaS'],
      compare: [
        ['Le réalisé collé à la main dans le budget', 'Le réalisé arrêté à J+5, à la maille du budget'],
        ['Des écarts découverts au trimestre', 'Des écarts suivis chaque mois'],
        ['Les effectifs suivis à part', 'La paie face aux postes budgétés'],
        ['Un écart sans explication', 'Chaque écart avec le commentaire du manager'],
      ],
    },
    steps: [
      ['Importer votre budget', 'Excel, Google Sheets ou votre outil, tel quel. Chaque version gardée.'],
      ['Rattacher au réalisé', 'Chaque ligne reliée une fois aux comptes, équipes et postes.'],
      ['Arrêter à J+5', 'Compta, paie et effectifs rapprochés. Les gros écarts en tête.'],
      ['Expliquer et partager', 'Chaque manager commente ses écarts, sans voir les salaires.'],
    ],
    focus: {
      kicker: 'La masse salariale, décomposée', title: 'Un écart de 12,8 k€. Voici d’où il vient.',
      lead: 'Effet effectif, effet prix, effet structure, variable, décalages : l’écart décomposé comme le ferait un contrôleur.',
      card: {
        title: 'Écart de masse salariale · septembre · k€', chip: '+12,8 sur budget',
        rows: [
          ['Effet effectif', '58 personnes contre 57 budgétées', '+9,2'],
          ['Effet prix', 'Augmentations d’avril au-dessus du budget', '+2,2'],
          ['Effet structure', 'Recrutements plus juniors que prévu', '−2,2'],
          ['Variable et commissions', 'Ventes au-dessus de l’objectif', '+9,6'],
          ['Décalages', 'Prime passée en octobre, heures sup.', '−6,0'],
          T(['Écart total', null, '+12,8']),
        ],
        foot: 'Chaque effet s’ouvre sur les postes concernés, pour qui a le droit.',
      },
    },
    questions: [
      ['Quelle équipe dépasse son budget de plus de 5 % ?', 'Écarts par équipe'],
      ['Prépare un budget 2027 de masse salariale par équipe.', 'Budget, dans Claude'],
      ['Où en est l’atterrissage par rapport au réestimé ?', 'Réestimé'],
    ],
    faq: [
      ['Faut-il refaire notre budget dans Trame ?', 'Non. Vous importez le fichier existant et rattachez ses lignes une fois.'],
      ['Est-ce un outil de planification ?', 'Non. Trame produit le réalisé arrêté. Le budget se construit où vous voulez, et Trame l’alimente.'],
      ['Mes managers voient-ils les salaires ?', 'Non. Ils voient le budget, le réalisé et les écarts de leur équipe, jamais un salaire individuel.'],
      ['Quand le réalisé est-il disponible ?', 'À J+5, une fois le mois arrêté. Avant, un réalisé provisoire, signalé comme tel.'],
    ],
    cta: 'Un écart de masse salariale que personne n’explique, un budget recollé chaque mois : nous vous montrons vos écarts décomposés.',
  },
};

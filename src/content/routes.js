// Site map: shared by the nav, the footer and the "related" grids.
export const USE_CASES = [
  { to: '/cas-usage/cash-analytique', label: 'Cash analytique', desc: 'Votre trésorerie de ce matin, expliquée', img: 'P7N8TOc0OKkPv38BSea15yjXznc.png' },
  { to: '/cas-usage/pnl-analytique', label: 'P&L analytique', desc: 'Votre marge par client, produit ou canal', img: 'aUJrfnAXiuMg88EVvg99sYUEuOo.png' },
  { to: '/cas-usage/chiffre-affaires', label: 'Chiffre d’affaires', desc: 'Du contrat signé à l’écriture, chaque mois', img: 'EoYUl2jSWuULd0DTq2fwObXe43k.png' },
  { to: '/cas-usage/consolidation', label: 'Consolidation', desc: 'Le groupe consolidé à J+5, sans fichier', img: 'AJBM4BbNQW2RnYICjAFrTNhP5ik.png' },
  { to: '/cas-usage/budget-realise', label: 'Budget / réalisé', desc: 'Quelle équipe dérape, et de combien', img: 'CVp8EhqQ1k0rw6UCzQgruVAamI.png' },
];

export const SECTORS = [
  { to: '/secteurs/saas', label: 'Tech & SaaS', desc: 'Un seul ARR, du CRM à la compta' },
  { to: '/secteurs/retail-e-commerce', label: 'Retail & e-commerce', desc: 'Votre marge par produit et par canal' },
];

export const PAGES = [
  { to: '/finance-engineer', label: 'Finance engineer' },
  { to: '/integrations', label: 'Intégrations' },
  { to: '/securite', label: 'Sécurité' },
];

export const byPath = (to) => USE_CASES.find((u) => u.to === to);

import { useEffect } from 'react';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import Sprite from './components/Sprite.jsx';
import Home from './sections/Home.jsx';
import CashAnalytique from './pages/CashAnalytique.jsx';
import PnlAnalytique from './pages/PnlAnalytique.jsx';
import ChiffreAffaires from './pages/ChiffreAffaires.jsx';
import Consolidation from './pages/Consolidation.jsx';
import BudgetRealise from './pages/BudgetRealise.jsx';
import Saas from './pages/Saas.jsx';
import Retail from './pages/Retail.jsx';
import FinanceEngineer from './pages/FinanceEngineer.jsx';
import Integrations from './pages/Integrations.jsx';
import Securite from './pages/Securite.jsx';
import Demo from './pages/Demo.jsx';
import MentionsLegales from './pages/MentionsLegales.jsx';
import NotFound from './pages/NotFound.jsx';
import Simulateur from './pages/Simulateur.jsx';
import { LangContext } from './lib/i18n.js';
import { attachBehaviors } from './lib/behaviors.js';
import { useLocation } from './lib/router.js';
import { scrollToId } from './lib/helpers.js';

// Language-neutral paths; English pages are the same paths under /en.
export const PAGES = {
  '/': Home,
  '/cas-usage/cash-analytique': CashAnalytique,
  '/cas-usage/pnl-analytique': PnlAnalytique,
  '/cas-usage/chiffre-affaires': ChiffreAffaires,
  '/cas-usage/consolidation': Consolidation,
  '/cas-usage/budget-realise': BudgetRealise,
  '/secteurs/saas': Saas,
  '/secteurs/retail-e-commerce': Retail,
  '/finance-engineer': FinanceEngineer,
  '/integrations': Integrations,
  '/securite': Securite,
  '/simulateur': Simulateur,
  '/demo': Demo,
  '/mentions-legales': MentionsLegales,
};

export default function App() {
  const { lang, path, hash } = useLocation();

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // New page: back to the top, or to the requested section once it has rendered.
  useEffect(() => {
    if (hash) requestAnimationFrame(() => scrollToId(hash));
    else window.scrollTo(0, 0);
  }, [path, hash]);

  // Wire the example cards' interactions on every new page (or language).
  useEffect(() => attachBehaviors(document.getElementById('root')), [path, lang]);

  const Page = PAGES[path] || NotFound;
  return (
    <LangContext.Provider value={lang}>
      <Sprite />
      <Nav path={path} />
      <Page key={lang + path} />
      <Footer />
    </LangContext.Provider>
  );
}

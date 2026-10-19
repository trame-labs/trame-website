import { useEffect, useState } from 'react';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import Home from './sections/Home.jsx';
import UseCasePage from './pages/UseCasePage.jsx';
import Saas from './pages/Saas.jsx';
import Retail from './pages/Retail.jsx';
import FinanceEngineer from './pages/FinanceEngineer.jsx';
import Integrations from './pages/Integrations.jsx';
import Securite from './pages/Securite.jsx';
import Demo from './pages/Demo.jsx';
import MentionsLegales from './pages/MentionsLegales.jsx';
import { USE_CASE_PAGES } from './content/useCases.js';
import { useLocation } from './lib/router.js';
import { scrollToId } from './lib/helpers.js';

const PAGES = {
  '/': Home,
  '/secteurs/saas': Saas,
  '/secteurs/retail-e-commerce': Retail,
  '/finance-engineer': FinanceEngineer,
  '/integrations': Integrations,
  '/securite': Securite,
  '/demo': Demo,
  '/mentions-legales': MentionsLegales,
};

export default function App() {
  const [demo, setDemo] = useState(false);
  const openDemo = () => setDemo(true);
  const { path, hash } = useLocation();

  // New page: back to the top, or to the requested section once it has rendered.
  useEffect(() => {
    if (hash) requestAnimationFrame(() => scrollToId(hash));
    else window.scrollTo(0, 0);
  }, [path, hash]);

  const Page = PAGES[path];
  return (
    <>
      <Nav onDemo={openDemo} path={path} />
      {USE_CASE_PAGES[path]
        ? <UseCasePage key={path} path={path} onDemo={openDemo} />
        : Page ? <Page onDemo={openDemo} /> : <Home onDemo={openDemo} />}
      <Footer />
      <DemoModal open={demo} onClose={() => setDemo(false)} />
    </>
  );
}

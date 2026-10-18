import { useState } from 'react';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import DemoModal from './components/DemoModal.jsx';
import Home from './sections/Home.jsx';

export default function App() {
  const [demo, setDemo] = useState(false);
  const openDemo = () => setDemo(true);
  return (
    <>
      <Nav onDemo={openDemo} />
      <Home onDemo={openDemo} />
      <Footer />
      <DemoModal open={demo} onClose={() => setDemo(false)} />
    </>
  );
}

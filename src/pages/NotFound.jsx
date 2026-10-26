// Unknown paths. Pre-rendered as 404.html, which static hosts serve with a 404 status.
import { usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { PageHero, LinkButton } from '../components/blocks.jsx';

export default function NotFound() {
  const t = useT();
  usePageMeta(
    t('Page introuvable | Trame', 'Page not found | Trame'),
    t('Cette page n’existe pas ou a été déplacée.', 'This page does not exist or has moved.'),
    { noindex: true },
  );
  return (
    <main className="v1">
      <PageHero
        kicker="404"
        title={t('Cette page n’existe pas', 'This page does not exist')}
        lead={t('Elle a peut-être été déplacée. Repartez de l’accueil ou réservez une démo.', 'It may have moved. Start again from the home page or book a demo.')}
        ctas={<LinkButton to="/" size="lg" variant="signal">{t('Retour à l’accueil', 'Back to the home page')}</LinkButton>}
      />
    </main>
  );
}

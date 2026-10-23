// Legal notice. Copy follows the « Site Trame V1 » mock-up (mentions-legales.html); bracketed items are to confirm before publishing.
import { usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { PageHero } from '../components/blocks.jsx';

export default function MentionsLegales() {
  const t = useT();
  usePageMeta(
    t('Mentions légales | Trame', 'Legal notice | Trame'),
    t('Mentions légales du site de Trame Labs, SAS au capital de 10 000 €, 32 rue de Paris, 92100 Boulogne-Billancourt.', 'Legal notice for the Trame Labs website, SAS with share capital of €10,000, 32 rue de Paris, 92100 Boulogne-Billancourt, France.'),
  );
  return (
    <main className="v1">
      <PageHero kicker={t('Informations légales', 'Legal information')} title={t('Mentions légales', 'Legal notice')} ctas={false} />
      <Rails>
        <section className="band tight paper">
          <div className="wrap">
            <div className="feats two" style={{ marginTop: 0 }}>
              <div className="feat"><h3>{t('Éditeur du site', 'Website publisher')}</h3><p>{t(
                <>Trame Labs, société par actions simplifiée au capital de 10 000 €<br />Siège social : 32 rue de Paris, 92100 Boulogne-Billancourt<br />SIREN 100 223 304 · RCS [Nanterre, à confirmer]<br />TVA intracommunautaire : FR91 100 223 304<br />Contact : contact@trame-labs.com</>,
                <>Trame Labs, a simplified joint-stock company (SAS) with share capital of €10,000<br />Registered office: 32 rue de Paris, 92100 Boulogne-Billancourt, France<br />SIREN 100 223 304 · RCS [Nanterre, to be confirmed]<br />EU VAT number: FR91 100 223 304<br />Contact: contact@trame-labs.com</>,
              )}</p></div>
              <div className="feat"><h3>{t('Direction de la publication', 'Publication director')}</h3><p>{t('[Nom de la directrice de la publication, à confirmer], représentante légale de Dune SAS, présidente de Trame Labs.', '[Name of the publication director, to be confirmed], legal representative of Dune SAS, President of Trame Labs.')}</p></div>
              <div className="feat"><h3>{t('Hébergement', 'Hosting')}</h3><p>{t('Framer B.V., Amsterdam, Pays-Bas. [Adresse complète à confirmer]', 'Framer B.V., Amsterdam, the Netherlands. [Full address to be confirmed]')}</p></div>
              <div className="feat"><h3>{t('Données personnelles', 'Personal data')}</h3><p>{t('Les données saisies dans les formulaires servent à vous recontacter et à identifier votre société. Vous pouvez y accéder, les corriger ou les faire supprimer en écrivant à contact@trame-labs.com. Détails dans la politique de confidentialité [à rédiger].', 'The data entered in the forms is used to contact you and to identify your company. You can access, correct or delete it by writing to contact@trame-labs.com. Details in the privacy policy [to be written].')}</p></div>
              <div className="feat"><h3>{t('Propriété intellectuelle', 'Intellectual property')}</h3><p>{t('Les textes, visuels et marques de ce site appartiennent à Trame Labs ou à leurs titulaires. Les logos clients sont affichés avec leur accord.', 'The text, visuals and trademarks on this site belong to Trame Labs or to their respective owners. Client logos are displayed with their consent.')}</p></div>
              <div className="feat"><h3>{t('Cookies', 'Cookies')}</h3><p>{t('[À compléter selon les outils de mesure retenus. Sans cookie non essentiel, aucun bandeau n’est nécessaire.]', '[To be completed depending on the analytics tools chosen. Without non-essential cookies, no banner is needed.]')}</p></div>
            </div>
          </div>
        </section>
      </Rails>
    </main>
  );
}

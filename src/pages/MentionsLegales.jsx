import { Divider, Rails } from '../components/layout/Rails.jsx';
import { PageHero } from '../components/blocks.jsx';
import { usePageMeta } from '../lib/router.js';

// TODO: bracketed items to confirm before publishing (RCS, publication director, host address, privacy policy, cookies).
const BLOCKS = [
  ['Éditeur du site', ['Trame Labs, société par actions simplifiée au capital de 10 000 €.', 'Siège social : 32 rue de Paris, 92100 Boulogne-Billancourt.', 'SIREN 100 223 304 · RCS [Nanterre, à confirmer] · TVA intracommunautaire FR91 100 223 304.', 'Contact : contact@trame-labs.com']],
  ['Direction de la publication', ['[Nom de la directrice de la publication, à confirmer], représentante légale de Dune SAS, présidente de Trame Labs.']],
  ['Hébergement', ['[Hébergeur et adresse complète, à confirmer]']],
  ['Données personnelles', ['Les données saisies dans les formulaires servent à vous recontacter et à identifier votre société. Vous pouvez y accéder, les corriger ou les faire supprimer en écrivant à contact@trame-labs.com.']],
  ['Propriété intellectuelle', ['Les textes, visuels et marques de ce site appartiennent à Trame Labs ou à leurs titulaires. Les logos clients sont affichés avec leur accord.']],
  ['Cookies', ['[À compléter selon les outils de mesure retenus. Sans cookie non essentiel, aucun bandeau n’est nécessaire.]']],
];

export default function MentionsLegales() {
  usePageMeta('Mentions légales | Trame', 'Mentions légales du site de Trame Labs, SAS au capital de 10 000 €, 32 rue de Paris, 92100 Boulogne-Billancourt.');
  return (
    <main>
      <PageHero kicker="Informations légales" title="Mentions légales" />
      <Rails>
        <section className="tl-wrap tl-section" style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 840 }}>
          {BLOCKS.map(([h, ps]) => (
            <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h2 className="tl-h3" style={{ margin: 0 }}>{h}</h2>
              {ps.map((p) => <p key={p} className="tl-lead tl-lead--sm">{p}</p>)}
            </div>
          ))}
        </section>
        <Divider />
      </Rails>
    </main>
  );
}

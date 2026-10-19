import { Divider, Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, Compare, DataCard, Faq, PageHero, ProofBand, Questions, Quote, Related, Section, Steps } from '../components/blocks.jsx';
import { USE_CASE_PAGES } from '../content/useCases.js';
import { USE_CASES } from '../content/routes.js';
import { usePageMeta } from '../lib/router.js';

/** One template for the five use-case pages; content lives in content/useCases.js. */
export default function UseCasePage({ path, onDemo }) {
  const p = USE_CASE_PAGES[path];
  const label = USE_CASES.find((u) => u.to === path).label;
  usePageMeta(...p.meta);
  return (
    <main>
      <PageHero kicker={`Cas d’usage · ${label}`} title={p.title} lead={p.lead} onDemo={onDemo}>
        <DataCard {...p.card} />
      </PageHero>
      <Rails>
        <ProofBand who={p.proof[0]} what={p.proof[1]} />
        <Divider />
        <Section kicker="Aujourd’hui" title={p.problem.title} lead={p.problem.lead} aside={<Compare rows={p.problem.compare} />}>
          <Quote text={p.problem.quote[0]} who={p.problem.quote[1]} />
        </Section>
        <Divider />
        <Section kicker="Comment ça marche" title="Quatre étapes, une seule fois">
          <Steps items={p.steps} />
        </Section>
        <Divider />
        <Section kicker={p.focus.kicker} title={p.focus.title} lead={p.focus.lead} aside={<DataCard {...p.focus.card} />} />
        <Divider />
        <Section kicker="Ce que vous pouvez demander" title="À Trame, ou à votre IA, avec vos droits">
          <Questions items={p.questions} />
        </Section>
        <Divider />
        <Faq items={p.faq} />
        <Divider />
        <Related items={USE_CASES.filter((u) => u.to !== path)} />
        <Divider />
        <ClosingCta sub={p.cta} onDemo={onDemo} />
        <Divider />
      </Rails>
    </main>
  );
}

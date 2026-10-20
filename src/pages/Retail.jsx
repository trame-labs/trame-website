// Retail page. Copy and blocks follow the « Site Trame V1 » mock-up (retail.html); the hero frame and the closing landscape are the site's own.
import { Link, usePageMeta } from '../lib/router.js';
import { useT } from '../lib/i18n.js';
import { Rails } from '../components/layout/Rails.jsx';
import { ClosingCta, DemoButton, LinkButton, PageHero } from '../components/blocks.jsx';

export default function Retail() {
  const t = useT();
  usePageMeta(
    t('Finance e-commerce : marge par produit et canal | Trame', 'E-commerce finance: margin by product and channel | Trame'),
    t('Site, marketplaces, revendeurs, boutiques : toutes vos ventes réunies à la maille du produit, et la marge de chaque canal après commissions, logistique, publicité et retours.', 'Website, marketplaces, resellers, stores: all your sales brought together at product level, and the margin of each channel after commissions, logistics, advertising and returns.'),
  );
  return (
    <main className="v1">
      <PageHero
        kicker={t('Secteurs · Retail & e-commerce', 'Sectors · Retail & e-commerce')}
        title={t('Votre marge par produit et par canal.', 'Your margin by product and by channel.')}
        lead={t(
          <>La marge de votre site, de vos marketplaces, de vos revendeurs et de vos boutiques, après commissions, logistique, publicité et retours. <span>Toutes vos sources de ventes réunies dans une seule base, à la maille du produit.</span></>,
          <>The margin of your website, your marketplaces, your resellers and your stores, after commissions, logistics, advertising and returns. <span>All your sales sources brought together in a single base, at product level.</span></>,
        )}
        ctas={<><DemoButton /><LinkButton to="/cas-usage/pnl-analytique" size="lg" variant="ghostInverse">{t('Voir le cas P&L analytique', 'See the Analytical P&L use case')}</LinkButton></>}
      >
        <figure aria-label={t('Exemple : une commande suivie de Shopify à l’écriture comptable, et sa marge', 'Example: an order traced from Shopify to the journal entry, and its margin')} className="card" style={{ margin: 0 }}>
        <div className="card-head"><p className="card-title">{t('Commande n° 10482 · 9 septembre', 'Order #10482 · September 9')}</p><span className="chip">{t('De la commande à l’écriture', 'From order to journal entry')}</span></div>
        <ol className="journal">
        <li><time>{t('9 sept.', 'Sep 9')}</time><div><span className="kind">{t('Commande', 'Order')}</span><b>{t('Shopify · 115,20 € TTC', 'Shopify · €115.20 incl. VAT')}</b><span className="who">{t('Remise de 4 € appliquée · livraison en France', '€4 discount applied · shipped within France')}</span></div></li>
        <li><time>{t('9 sept.', 'Sep 9')}</time><div><span className="kind">{t('Paiement', 'Payment')}</span><b>{t('Stripe · 115,20 €, frais de 1,45 €', 'Stripe · €115.20, €1.45 fee')}</b><span className="who">{t('Inclus dans le versement du 12 septembre', 'Included in the September 12 payout')}</span></div></li>
        <li><time>{t('12 sept.', 'Sep 12')}</time><div><span className="kind">{t('Banque', 'Bank')}</span><b>{t('BNP Paribas · versement Stripe de 18 412,60 €', 'BNP Paribas · Stripe payout of €18,412.60')}</b><span className="who">{t('164 commandes, 3 remboursements, frais déduits', '164 orders, 3 refunds, fees deducted')}</span></div></li>
        <li><time>{t('30 sept.', 'Sep 30')}</time><div><span className="kind">{t('Compta', 'Books')}</span><b>{t('707 et 411 · écriture de ventes de septembre', 'Accounts 707 and 411 · September sales entry')}</b><span className="who">{t('Le compte client Stripe est soldé', 'The Stripe customer account is cleared')}</span></div></li>
        </ol>
        <table className="rows" style={{ borderTop: '1px solid var(--line)' }}>
        <thead><tr><th>{t('Marge de la commande', 'Order margin')}</th><th className="v">{t('€ HT', '€ excl. VAT')}</th></tr></thead>
        <tbody>
        <tr><td>{t('Chiffre d’affaires net de remise', 'Revenue net of discount')}</td><td className="v">{t('96,00', '96.00')}</td></tr>
        <tr><td>{t('Coût de revient', 'Cost of goods')}</td><td className="v neg">{t('−41,00', '−41.00')}</td></tr>
        <tr><td>{t('Port et préparation', 'Shipping and fulfillment')}</td><td className="v neg">{t('−7,90', '−7.90')}</td></tr>
        <tr><td>{t('Frais Stripe', 'Stripe fees')}</td><td className="v neg">{t('−1,45', '−1.45')}</td></tr>
        <tr><td>{t('Publicité attribuée', 'Attributed advertising')}<span className="src">{t('Clé : campagne d’origine de la commande', 'Key: the order’s source campaign')}</span></td><td className="v neg">{t('−12,30', '−12.30')}</td></tr>
        <tr className="total"><td>{t('Marge · 34,7 %', 'Margin · 34.7%')}</td><td className="v">{t('33,35', '33.35')}</td></tr>
        </tbody>
        </table>
        <figcaption className="card-foot"><span>{t('La même marge, commande par commande, canal par canal.', 'The same margin, order by order, channel by channel.')}</span><em>{t('Exemple fictif', 'Fictional example')}</em></figcaption>
        </figure>
      </PageHero>
      <Rails>
        <section className="band">
        <div className="wrap">
        <div className="intro">
        <p className="label">{t('Ce que vivent les équipes finance du retail', 'What retail finance teams deal with')}</p>
        <h2 className="h2">{t('Vos ventes vivent dans cinq outils. Votre marge, dans aucun.', 'Your sales live in five tools. Your margin, in none.')}</h2>
        <p>{t('Le site sur Shopify, les revendeurs dans la compta, les grands magasins dans leurs propres relevés, les États-Unis dans un autre logiciel, en dollars. Chaque outil a sa définition du chiffre d’affaires brut, du net ou des frais de port, et la facturation remonte agrégée : le détail par produit se perd en route. Pour savoir ce que rapporte une référence, quelqu’un recolle tout à la main, et l’erreur se propage jusqu’aux prévisions de production.', 'The website on Shopify, resellers in the books, department stores in their own statements, the US in another system, in dollars. Each tool has its own definition of gross revenue, net revenue or shipping fees, and invoicing comes through aggregated: the product detail gets lost on the way. To know what a SKU earns, someone stitches everything back together by hand, and the error carries all the way into production forecasts.')}</p>
        </div>
        <div className="voices two"><figure className="voice"><blockquote>{t('« Je me suis retrouvée avec un écart de 160 000 €. »', '“I ended up with a €160,000 discrepancy.”')}</blockquote><figcaption>{t(<><b>Finance manager</b> · ventes privées en ligne, à la clôture</>, <><b>Finance manager</b> · online flash sales, at closing</>)}</figcaption></figure></div>
        </div>
        </section>
        <section className="band paper">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Le socle', 'The foundation')}</p>
        <h2 className="h2">{t('Une seule base de ventes, par produit, canal, pays et mois.', 'A single sales base, by product, channel, country and month.')}</h2>
        <p>{t('Trame réunit toutes vos sources de ventes, construit un référentiel produit unique et une nomenclature commune, puis neutralise ce qui ne doit pas compter deux fois : les ventes entre filiales, les factures déjà comptées ailleurs. Le tout réconcilié avec votre comptabilité.', 'Trame brings all your sales sources together, builds a single product master and a common nomenclature, then neutralizes what must not count twice: sales between subsidiaries, invoices already counted elsewhere. All of it reconciled with your books.')}</p>
        <p>{t('Sur cette base, chaque canal porte ses coûts : commissions, logistique, publicité, frais d’encaissement, loyer et équipe des boutiques. Vous voyez enfin qu’une boutique, avec son loyer et ses vendeurs, peut rapporter plus que le site, où publicité et logistique pèsent vite 20 % du chiffre d’affaires.', 'On this base, each channel carries its own costs: commissions, logistics, advertising, payment fees, store rent and staff. You finally see that a store, with its rent and its sales staff, can earn more than the website, where advertising and logistics quickly weigh 20% of revenue.')}</p>
        </div>
        <div className="swap">
        <div className="th">{t('Aujourd’hui', 'Today')}</div><div className="th">{t('Avec Trame', 'With Trame')}</div>
        <div>{t('CA brut, net, frais de port : une définition par outil', 'Gross revenue, net revenue, shipping fees: one definition per tool')}</div><div>{t('Une nomenclature unique, versionnée, pour toutes vos analyses', 'A single, versioned nomenclature for all your analyses')}</div>
        <div>{t('La facturation agrégée, le détail produit perdu', 'Aggregated invoicing, product detail lost')}</div><div>{t('Chaque vente à la maille du produit, du canal et du pays', 'Every sale at the level of product, channel and country')}</div>
        <div>{t('Les relevés des grands magasins, chacun dans son format', 'Department store statements, each in its own format')}</div><div>{t('Ventes, remises et retours de chaque enseigne lus et réconciliés', 'Sales, discounts and returns from each retailer read and reconciled')}</div>
        <div>{t('Les ventes entre filiales neutralisées à la main', 'Sales between subsidiaries neutralized by hand')}</div><div>{t('Les flux intragroupe identifiés et exclus d’office', 'Intercompany flows identified and excluded automatically')}</div>
        </div>
        </div>
        </section>
        <section className="band">
        <div className="wrap">
        <div className="intro"><h2 className="h2">{t('Ce que Trame fait pour une marque.', 'What Trame does for a brand.')}</h2></div>
        <div className="feats">
        <div className="feat"><h3>{t('La marge à la commande', 'Margin per order')}</h3><p>{t('Chiffre d’affaires net de remises et de retours, coût de revient, logistique, frais d’encaissement, commissions, publicité attribuée.', 'Revenue net of discounts and returns, cost of goods, logistics, payment fees, commissions, attributed advertising.')}</p></div>
        <div className="feat"><h3>{t('Marketplaces et grands magasins', 'Marketplaces and department stores')}</h3><p>{t('Ventes, commissions, remises, frais logistiques, retours et réserves de chaque relevé, quel que soit son format, réconciliés avec les écritures.', 'Sales, commissions, discounts, logistics fees, returns and reserves from each statement, whatever its format, reconciled with the journal entries.')}</p></div>
        <div className="feat"><h3>{t('Le cash multi-PSP', 'Multi-PSP cash')}</h3><p>{t('Stripe, PayPal, Shopify Payments, Adyen : chaque versement éclaté et rapproché du compte client ; litiges et rétrofacturations suivis.', 'Stripe, PayPal, Shopify Payments, Adyen: every payout broken down and reconciled with the customer account; disputes and chargebacks tracked.')}</p></div>
        <div className="feat"><h3>{t('Filiales et devises', 'Subsidiaries and currencies')}</h3><p>{t('Ventes aux États-Unis en dollars, production en euros : chaque vente convertie, chaque flux entre filiales neutralisé.', 'US sales in dollars, production in euros: every sale converted, every flow between subsidiaries neutralized.')}</p></div>
        <div className="feat"><h3>{t('Des prévisions sur un historique propre', 'Forecasts built on clean history')}</h3><p>{t('Historique, saisonnalité et croissance par référence, pour dimensionner vos collections et vos éditions limitées avec Claude.', 'History, seasonality and growth by SKU, to size your collections and limited editions with Claude.')}</p></div>
        <div className="feat"><h3>{t('Magasins et revendeurs', 'Stores and resellers')}</h3><p>{t('Chaque boutique en centre de profit (CA, marge, masse salariale, loyer) ; remises de fin d’année des revendeurs provisionnées chaque mois.', 'Each store as a profit center (revenue, margin, payroll, rent); year-end reseller rebates accrued every month.')}</p></div>
        </div>
        </div>
        </section>
        <section className="band dark">
        <div className="wrap split">
        <div className="intro">
        <p className="label">{t('Le comité du lundi', 'The Monday meeting')}</p>
        <h2 className="h2">{t('« On continue de vendre sur Zalando ? »', '“Do we keep selling on Zalando?”')}</h2>
        <p>{t('La question revient à chaque comité. Avec Trame, la réponse tient en une phrase, avec ses preuves, et elle est la même pour le CEO, la directrice e-commerce et vous.', 'The question comes up at every meeting. With Trame, the answer fits in one sentence, with its evidence, and it is the same for the CEO, the head of e-commerce and you.')}</p>
        </div>
        <div aria-label={t('Exemple d’échange avec une IA branchée sur Trame', 'Example of an exchange with an AI connected to Trame')} className="chat">
        <span className="who">{t('La directrice e-commerce, dans Claude', 'The head of e-commerce, in Claude')}</span>
        <p className="bubble q2">{t('Zalando est-il encore rentable une fois les retours et la commission comptés ?', 'Is Zalando still profitable once returns and commission are counted?')}</p>
        <p className="bubble a"><span className="num">{t('48,6 %', '48.6%')}</span>{t('de marge sur coûts variables en septembre, contre 68,4 % sur le site. L’écart vient de la commission (17,5 % des ventes) et des retours (14,2 % des ventes). Zalando reste rentable ; un point de retour en moins rapporterait environ 2 k€ de marge par mois.', 'contribution margin in September, against 68.4% on the website. The gap comes from the commission (17.5% of sales) and returns (14.2% of sales). Zalando remains profitable; one point less in returns would bring in about €2k of margin per month.')}<span className="trace">{t('Septembre, arrêté le 7 octobre · relevé Zalando rapproché de la compta · exemple fictif', 'September, closed on October 7 · Zalando statement reconciled with the books · fictional example')}</span></p>
        </div>
        </div>
        </section>
        <section className="band tight">
        <div className="wrap">
        <p className="label">{t('Tous les cas d’usage, pour une marque', 'All use cases, for a brand')}</p>
        <div className="uses">
        <Link to="/cas-usage/pnl-analytique" className="use"><h3>{t('P&L analytique', 'Analytical P&L')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('La marge par produit, canal, pays ou collection, chaque mois.', 'Margin by product, channel, country or collection, every month.')}</p></Link>
        <Link to="/cas-usage/cash-analytique" className="use"><h3>{t('Cash analytique', 'Cash analytics')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Toutes vos banques et vos PSP, chaque matin, par entité et par devise.', 'All your banks and payment providers (PSPs), every morning, by entity and by currency.')}</p></Link>
        <Link to="/cas-usage/chiffre-affaires" className="use"><h3>{t('Chiffre d’affaires', 'Revenue')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Ventes, retours et cartes cadeaux comptabilisés selon vos règles.', 'Sales, returns and gift cards recorded according to your rules.')}</p></Link>
        <Link to="/cas-usage/consolidation" className="use"><h3>{t('Consolidation', 'Consolidation')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Filiales à l’étranger, ventes en devises, flux intragroupe neutralisés.', 'Foreign subsidiaries, sales in foreign currencies, intercompany flows neutralized.')}</p></Link>
        <Link to="/cas-usage/budget-realise" className="use"><h3>{t('Budget / réalisé', 'Budget vs. actuals')}</h3><span aria-hidden="true" className="arrow">→</span><p>{t('Boutiques et équipes face à leur budget, chaque mois.', 'Stores and teams against their budget, every month.')}</p></Link>
        </div>
        <p className="muted mt-m">{t('Branché sur Shopify, WooCommerce, PrestaShop, Amazon, Stripe, PayPal, Adyen, Lightspeed, Pennylane, vos banques et votre entrepôt ; relevés Zalando et La Redoute importés chaque mois. ', 'Connected to Shopify, WooCommerce, PrestaShop, Amazon, Stripe, PayPal, Adyen, Lightspeed, Pennylane, your banks and your data warehouse; Zalando and La Redoute statements imported every month. ')}<Link to="/integrations">{t('Toutes les intégrations →', 'All integrations →')}</Link></p>
        </div>
        </section>
        <section className="band paper tight">
        <div className="wrap">
        <h2 className="h2">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
        <div className="faq">
        <details><summary>{t('Comment traitez-vous les versements des marketplaces, nets de commissions et de frais ?', 'How do you handle marketplace payouts, net of commissions and fees?')}</summary><div><p>{t('Trame décompose chaque relevé en ventes, commissions, frais logistiques, remboursements et réserves, et rapproche chaque ligne de sa commande et de l’écriture.', 'Trame breaks each statement down into sales, commissions, logistics fees, refunds and reserves, and reconciles each line with its order and the journal entry.')}</p></div></details>
        <details><summary>{t('D’où vient le coût de revient ?', 'Where does the cost of goods come from?')}</summary><div><p>{t('De la valorisation du stock dans votre outil de stock ou votre ERP (Cegid Retail, Fastmag, Odoo), ou dans votre compta. Trame l’applique commande par commande.', 'From the inventory valuation in your inventory tool or ERP (Cegid Retail, Fastmag, Odoo), or in your books. Trame applies it order by order.')}</p></div></details>
        <details><summary>{t('Nous avons déjà un outil d’analytics e-commerce. À quoi sert Trame ?', 'We already have an e-commerce analytics tool. What is Trame for?')}</summary><div><p>{t('Votre outil d’analytics compte les ventes et les visites. Trame part de la compta : coût de revient, logistique, frais, commissions et retours, rapprochés des écritures. C’est une marge qui retombe sur votre résultat comptable.', 'Your analytics tool counts sales and visits. Trame starts from the books: cost of goods, logistics, fees, commissions and returns, reconciled with the journal entries. It’s a margin that ties back to your accounting profit.')}</p></div></details>
        <details><summary>{t('Les retours sont-ils rattachés à la commande d’origine ?', 'Are returns linked to the original order?')}</summary><div><p>{t('Dans le mois validé, un retour d’octobre passe sur octobre, avec son motif. Dans l’analyse des retours, il reste rattaché à sa commande de septembre, pour calculer le vrai taux de retour de chaque produit.', 'In the approved month, an October return goes into October, with its reason. In the returns analysis, it stays linked to its September order, to calculate the true return rate of each product.')}</p></div></details>
        <details><summary>{t('Comment répartissez-vous la logistique ou la publicité entre les canaux ?', 'How do you allocate logistics or advertising across channels?')}</summary><div><p>{t('Avec vos clés de répartition : au colis, au poids, au chiffre d’affaires, à la campagne. Écrites une fois, appliquées chaque mois, chaque changement tracé.', 'With your allocation keys: by parcel, by weight, by revenue, by campaign. Written once, applied every month, every change tracked.')}</p></div></details>
        <details><summary>{t('Faut-il remplacer notre caisse ou notre outil de stock ?', 'Do we need to replace our POS or our inventory tool?')}</summary><div><p>{t('Non. Trame lit votre caisse, votre e-commerce et votre stock tels qu’ils sont.', 'No. Trame reads your POS, your e-commerce platform and your inventory as they are.')}</p></div></details>
        </div>
        </div>
        </section>
        <ClosingCta
          title={t('Chaque référence, chaque canal, sa vraie marge.', 'Every SKU, every channel, its true margin.')}
          sub={t('Réservez un premier échange : nous faisons l’état des lieux de vos sources de ventes, de vos canaux et de vos points de friction. Vous repartez en sachant combien vous pouvez gagner.', 'Book a first call: we run an assessment of your sales sources, your channels and your pain points. You leave knowing how much you stand to gain.')}
        />
      </Rails>
    </main>
  );
}

const occasions = [
  { title: "Family celebrations", image: "/assets/display.jpg", href: "#visit" },
  { title: "Weddings", image: "/assets/wedding-cake.jpg", href: "#weddings" },
  { title: "Special occasions", image: "/assets/castle-fireworks.jpg", href: "#occasions" },
];

function SparkMark() {
  return <span className="spark-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Newry Fireworks home">
          <SparkMark />
          <span><strong>NEWRY</strong><small>FIREWORKS</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a><a href="#weddings">Weddings</a><a href="#occasions">Occasions</a><a href="#about">About</a><a href="#safety">Safety</a>
        </nav>
        <div className="header-actions">
          <a className="text-link" href="#shop">Search</a>
          <a className="text-link" href="#shop" aria-label="Shopping cart, zero items">Cart (0)</a>
          <a className="outline-button compact" href="#visit">Visit our store</a>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <nav><a href="#shop">Shop</a><a href="#weddings">Weddings</a><a href="#occasions">Occasions</a><a href="#about">About</a><a href="#safety">Safety</a><a href="#visit">Visit our store</a></nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Newry · Northern Ireland</p>
          <h1>Fireworks for<br />life’s biggest<br />moments.</h1>
          <span className="rule" />
          <p className="lede">Shop retail fireworks in Newry, or plan an unforgettable display for your wedding or celebration.</p>
          <div className="button-row">
            <a className="button" href="#shop">Shop fireworks</a>
            <a className="outline-button" href="#weddings">Plan your event</a>
          </div>
        </div>
        <div className="hero-image" role="img" aria-label="Newlyweds watching a golden firework display" />
      </section>

      <div className="trust" id="safety"><span>Expert advice</span><b>•</b><span>Quality products</span><b>•</b><span>Licensed &amp; insured</span></div>

      <section className="occasions section-dark" id="shop">
        <div className="section-heading"><p className="eyebrow">Shop by occasion</p><h2>Make the night yours.</h2></div>
        <div className="occasion-grid" id="occasions">
          {occasions.map((item) => (
            <article className="occasion-card" key={item.title}>
              <a href={item.href} aria-label={`Explore ${item.title}`}><img src={item.image} alt="" /></a>
              <h3>{item.title}</h3><a className="arrow-link" href={item.href}>Explore <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="wedding" id="weddings">
        <div className="wedding-copy">
          <p className="eyebrow">Wedding displays</p>
          <h2>A wedding finale<br />they’ll never forget.</h2>
          <span className="rule" />
          <p>From intimate celebrations to show-stopping spectacles, we design and deliver breathtaking firework displays tailored to your day.</p>
          <a className="outline-button light" href="mailto:info@newryfireworks.com?subject=Wedding%20display%20enquiry">Discover wedding displays</a>
        </div>
        <img src="/assets/wedding-display.jpg" alt="A wide Newry Fireworks display lighting the night sky" />
      </section>

      <section className="about section-dark" id="about">
        <div className="about-image-wrap"><img src="/assets/wedding-fair.jpg" alt="Newry Fireworks consultation stand at a wedding fair" /></div>
        <div className="about-copy">
          <p className="eyebrow">Meet the team</p><h2>Local knowledge.<br />Personal service.</h2>
          <p>Visit us, talk through your celebration, and get straightforward advice from a team that knows fireworks inside out.</p>
          <a className="arrow-link" href="mailto:info@newryfireworks.com">Start a conversation <span>→</span></a>
        </div>
      </section>

      <section className="visit" id="visit">
        <div><p className="eyebrow">Retail shop</p><h2>Visit us in Newry.</h2></div>
        <p>Explore our retail range in person and get expert advice on choosing the right fireworks for your occasion.</p>
        <a className="button" href="https://maps.google.com/?q=Newry+Northern+Ireland" target="_blank" rel="noreferrer">Get directions</a>
      </section>

      <footer>
        <a className="brand" href="#top"><SparkMark /><span><strong>NEWRY</strong><small>FIREWORKS</small></span></a>
        <div><a href="#shop">Shop</a><a href="#weddings">Weddings</a><a href="#occasions">Occasions</a><a href="#safety">Safety</a></div>
        <div className="footer-contact"><a href="mailto:info@newryfireworks.com">info@newryfireworks.com</a><span>Newry, Northern Ireland</span></div>
        <small>© 2026 Newry Fireworks. All rights reserved.</small>
      </footer>
    </main>
  );
}

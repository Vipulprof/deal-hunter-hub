import HeroBanner from "@/components/HeroBanner";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import { products, categories, stores } from "@/data/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./Home.css";

export default function Home() {
  const trending = products.filter(p => p.badge === "Trending" || p.badge === "Best Seller");
  const topPicks = products.filter(p => p.dealScore >= 8.5).slice(0, 4);
  const recommended = products.slice(0, 8);

  const trustItems = [
    { icon: "✔", title: "Verified Deals", sub: "Hand-picked daily" },
    { icon: "🏬", title: "Trusted Stores", sub: "Amazon, Flipkart & more" },
    { icon: "💸", title: "No Extra Cost", sub: "Same price, better deals" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="home-container home-section home-section--hero">
        <HeroBanner />
      </section>

      {/* Trust strip */}
      <section className="home-container home-section home-section--trust">
        <div className="trust-mobile">
          {trustItems.map((t) => (
            <div key={t.title} className="trust-mobile__card">
              <div className="trust-mobile__icon">{t.icon}</div>
              <div className="trust-text">
                <p className="trust-text__title">{t.title}</p>
                <p className="trust-text__sub">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="trust-desktop">
          {trustItems.map((t) => (
            <div key={t.title} className="trust-desktop__item">
              <div className="trust-desktop__icon">{t.icon}</div>
              <div className="trust-text">
                <p className="trust-text__title">{t.title}</p>
                <p className="trust-text__sub trust-text__sub--truncate">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="home-container home-section home-section--categories">
        <SectionHeader title="Shop by Category" link="/categories" />
        <div className="categories-row">
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/products?category=${cat.id}`} className="category-link">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="category-card"
              >
                <div className="category-card__circle">
                  <img src={cat.image} alt={cat.name} className="category-card__img" loading="lazy" />
                </div>
                <span className="category-card__name">{cat.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="home-container home-section home-section--trending">
        <SectionHeader title="🔥 Trending Now" subtitle="120+ shoppers viewed these today" link="/hot-deals" />
        <div className="scroll-row">
          {trending.map((p, i) => (
            <div key={p.id} className="scroll-row__item">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Top Picks */}
      <section className="home-container home-section home-section--top-picks">
        <SectionHeader title="⭐ Top Picks" subtitle="Highest deal scores, curated for you" link="/hot-deals" />
        <div className="grid-2-4">
          {topPicks.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Magic Assistant CTA */}
      <section className="home-container home-section home-section--magic">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="magic-cta"
        >
          <div>
            <h3 className="magic-cta__title">Can't find what you need? ✨</h3>
            <p className="magic-cta__text">
              Our Magic Assistant will hunt down the best deal for any product. Just tell us what you want!
            </p>
          </div>
          <Link to="/magic-assistant" className="magic-cta__btn">
            Try Magic Assistant <ArrowRight className="magic-cta__btn-icon" />
          </Link>
        </motion.div>
      </section>

      {/* Recommended */}
      <section className="home-container home-section home-section--recommended">
        <SectionHeader title="Recommended for You" subtitle="Based on popular trends" link="/products" />
        <div className="grid-recommended">
          {recommended.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* All Platforms */}
      <section className="home-container home-section home-section--platforms">
        <SectionHeader
          title="👉 Shop Across Top Platforms"
          subtitle="Compare and shop from trusted stores in one place"
        />
        <div className="stores-grid">
          {stores.map((store, i) => (
            <Link key={store.id} to={`/stores`} className="store-link">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="store-card"
              >
                <div className="store-card__logo">
                  <span className="store-card__logo-text">{store.logo.includes('http') ? '🛍️' : store.logo}</span>
                </div>
                <div className="store-card__info">
                  <h3 className="store-card__name">{store.name}</h3>
                  <p className="store-card__desc">{store.description.split('.')[0]}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="stores-mobile">
          {stores.map((store, i) => (
            <Link key={store.id} to={`/stores`} className="store-card--mobile">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
              >
                <div className="store-card__logo">
                  <span className="store-card__logo-text">{store.logo.includes('http') ? '🛍️' : store.logo}</span>
                </div>
                <h3 className="store-card__name">{store.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="stores-trust">
          <span className="stores-trust__item">✔ Trusted Platforms</span>
          <span className="stores-trust__item">✔ Verified Links</span>
        </div>
      </section>
    </div>
  );
}

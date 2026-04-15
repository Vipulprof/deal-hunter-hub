import HeroBanner from "@/components/HeroBanner";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import { products, categories, stores } from "@/data/products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const trending = products.filter(p => p.badge === "Trending" || p.badge === "Best Seller");
  const topPicks = products.filter(p => p.dealScore >= 8.5).slice(0, 4);
  const recommended = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="container pt-6 pb-8">
        <HeroBanner />
      </section>

      {/* Categories */}
      <section className="container pb-10">
        <SectionHeader title="Shop by Category" link="/categories" />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="shrink-0 group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-20 sm:w-24 flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-center">{cat.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container pb-10">
        <SectionHeader title="🔥 Trending Now" subtitle="Most popular picks today" link="/hot-deals" />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {trending.map((p, i) => (
            <div key={p.id} className="shrink-0 w-[220px] sm:w-[260px]">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Top Picks */}
      <section className="container pb-10">
        <SectionHeader title="⭐ Top Picks" subtitle="Highest deal scores, curated for you" link="/hot-deals" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topPicks.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Magic Assistant CTA */}
      <section className="container pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 sm:p-12 text-primary-foreground flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-heading font-bold text-2xl mb-2">Can't find what you need? ✨</h3>
            <p className="text-primary-foreground/80 text-sm max-w-md">
              Our Magic Assistant will hunt down the best deal for any product. Just tell us what you want!
            </p>
          </div>
          <Link
            to="/magic-assistant"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:scale-105 transition-transform shrink-0"
          >
            Try Magic Assistant <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Recommended */}
      <section className="container pb-10">
        <SectionHeader title="Recommended for You" subtitle="Based on popular trends" link="/products" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommended.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* All Platforms */}
      <section className="container pb-16">
        <SectionHeader 
          title="👉 Shop Across Top Platforms" 
          subtitle="Compare and shop from trusted stores in one place" 
        />
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {stores.map((store, i) => (
            <Link
              key={store.id}
              to={`/stores`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="w-20 h-20 flex items-center justify-center">
                  <span className="text-4xl">{store.logo.includes('http') ? '🛍️' : store.logo}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm mb-1">{store.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{store.description.split('.')[0]}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="flex md:hidden gap-4 overflow-x-auto pb-2 scrollbar-none">
          {stores.map((store, i) => (
            <Link
              key={store.id}
              to={`/stores`}
              className="shrink-0 w-[140px] group"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <span className="text-3xl">{store.logo.includes('http') ? '🛍️' : store.logo}</span>
                </div>
                <h3 className="font-semibold text-xs text-center">{store.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">✔ Trusted Platforms</span>
          <span className="flex items-center gap-1">✔ Verified Links</span>
        </div>
      </section>
    </div>
  );
}

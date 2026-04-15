import { stores } from "@/data/products";
import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck, TrendingUp, BadgeCheck, Flame, Star, ArrowRight, Sparkles } from "lucide-react";
import { useState, useCallback } from "react";
import RedirectLoader from "@/components/RedirectLoader";

const storeAccents: Record<string, { bg: string; border: string; badge: string; gradient: string }> = {
  amazon: {
    bg: "bg-orange-50",
    border: "border-orange-200/60",
    badge: "bg-orange-100 text-orange-700",
    gradient: "from-orange-500 to-amber-500",
  },
  flipkart: {
    bg: "bg-blue-50",
    border: "border-blue-200/60",
    badge: "bg-blue-100 text-blue-700",
    gradient: "from-blue-500 to-indigo-500",
  },
  myntra: {
    bg: "bg-pink-50",
    border: "border-pink-200/60",
    badge: "bg-pink-100 text-pink-700",
    gradient: "from-pink-500 to-rose-500",
  },
  ajio: {
    bg: "bg-purple-50",
    border: "border-purple-200/60",
    badge: "bg-purple-100 text-purple-700",
    gradient: "from-purple-500 to-violet-500",
  },
  croma: {
    bg: "bg-green-50",
    border: "border-green-200/60",
    badge: "bg-green-100 text-green-700",
    gradient: "from-green-500 to-emerald-500",
  },
  nykaa: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200/60",
    badge: "bg-fuchsia-100 text-fuchsia-700",
    gradient: "from-fuchsia-500 to-pink-500",
  },
};

const popularStores = ["amazon", "flipkart", "myntra"];

const trustPoints = [
  { icon: ShieldCheck, title: "Compare Prices", desc: "Across all major platforms" },
  { icon: BadgeCheck, title: "Verified Deals Only", desc: "Every deal is quality-checked" },
  { icon: Star, title: "No Extra Cost", desc: "Same price, better experience" },
  { icon: TrendingUp, title: "Save More", desc: "Average savings of 25%" },
];

export default function AllStores() {
  const [redirecting, setRedirecting] = useState(false);
  const [redirectStore, setRedirectStore] = useState("");

  const handleVisit = useCallback((name: string) => {
    setRedirectStore(name);
    setRedirecting(true);
  }, []);

  return (
    <>
      {redirecting && <RedirectLoader storeName={redirectStore} onComplete={() => setRedirecting(false)} />}

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/30 to-secondary/5">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-8 left-[10%] text-6xl">🛒</div>
          <div className="absolute top-12 right-[15%] text-5xl">📦</div>
          <div className="absolute bottom-8 left-[25%] text-4xl">🏷️</div>
          <div className="absolute bottom-12 right-[30%] text-5xl">💰</div>
        </div>
        <div className="container py-12 md:py-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Trusted by thousands of shoppers
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              All Stores
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Compare deals from India's most trusted platforms — all in one place
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Shop Through Us */}
      <section className="container py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="bg-card rounded-xl p-4 md:p-5 border border-border/50 shadow-[var(--shadow-card)] text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-sm md:text-base text-foreground mb-1">{point.title}</h3>
              <p className="text-xs text-muted-foreground">{point.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trending Now Banner */}
      <section className="container pb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/20"
        >
          <Flame className="w-5 h-5 text-secondary shrink-0" />
          <p className="text-sm font-medium text-foreground">
            <span className="text-secondary font-bold">Trending Now:</span> Thousands of users are comparing deals across stores right now!
          </p>
        </motion.div>
      </section>

      {/* Store Cards */}
      <section className="container py-6 md:py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {stores.map((store, i) => {
            const accent = storeAccents[store.id] || storeAccents.amazon;
            const isPopular = popularStores.includes(store.id);

            return (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className={`group relative bg-card rounded-2xl border ${accent.border} shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${accent.badge}`}>
                      <Flame className="w-3 h-3" /> Popular
                    </span>
                  </div>
                )}

                {/* Card Top Accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${accent.gradient}`} />

                <div className="p-5 md:p-6 flex flex-col flex-1">
                  {/* Logo & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl ${accent.bg} flex items-center justify-center p-2.5 border ${accent.border}`}>
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-2xl">🏬</span>';
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground">{store.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs text-primary font-medium">Verified Store</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                    {store.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`px-3 py-1.5 rounded-lg ${accent.bg} text-xs font-semibold text-foreground`}>
                      🔥 {store.productCount.toLocaleString()}+ deals
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                      ✔ Trusted Platform
                    </div>
                  </div>

                  {/* Visit Button */}
                  <button
                    onClick={() => handleVisit(store.name)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${accent.gradient} text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    Visit Store <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-br from-primary/5 to-accent/30 rounded-2xl p-8 md:p-10 border border-border/50"
        >
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
            Can't find your store?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-5 max-w-md mx-auto">
            We're constantly adding new stores. Let us know which platform you'd like to see next!
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:scale-105 transition-transform">
            <ExternalLink className="w-4 h-4" /> Request a Store
          </button>
        </motion.div>
      </section>
    </>
  );
}

import { stores } from "@/data/products";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState, useCallback } from "react";
import RedirectLoader from "@/components/RedirectLoader";

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
      <div className="container py-8">
        <SectionHeader title="🏬 All Stores" subtitle="Trusted platforms we compare deals from" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] hover-lift border border-border/50 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl mb-4">
                🛍️
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">{store.name}</h3>
              <p className="text-sm text-muted-foreground mb-3 flex-1">{store.description}</p>
              <p className="text-xs text-muted-foreground mb-4">{store.productCount.toLocaleString()} products tracked</p>
              <button
                onClick={() => handleVisit(store.name)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-4 h-4" /> Visit Store
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

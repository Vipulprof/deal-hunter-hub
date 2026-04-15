import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Star, ExternalLink, ShieldCheck, ArrowLeft, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import RedirectLoader from "@/components/RedirectLoader";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [redirecting, setRedirecting] = useState(false);
  const [redirectStore, setRedirectStore] = useState("");

  const handleViewDeal = useCallback((store: string) => {
    setRedirectStore(store);
    setRedirecting(true);
  }, []);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline">← Browse all products</Link>
      </div>
    );
  }

  const savings = product.originalPrice - product.price;
  const bestPrice = product.priceComparison
    ? Math.min(...product.priceComparison.map(p => p.price))
    : product.price;

  return (
    <>
      {redirecting && (
        <RedirectLoader
          storeName={redirectStore}
          onComplete={() => setRedirecting(false)}
        />
      )}
      <div className="container py-6">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-bold rounded-full">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-sm text-muted-foreground mb-1">{product.store} • {product.category}</p>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-secondary text-secondary" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-lg text-sm font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Deal Score: {product.dealScore}/10
              </span>
            </div>

            {/* Price */}
            <div className="bg-accent/50 rounded-xl p-5 mb-6">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-heading font-bold">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-sm font-bold rounded-md">
                  -{product.discount}%
                </span>
              </div>
              <p className="text-success font-semibold text-sm">You save ₹{savings.toLocaleString()}</p>
            </div>

            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{product.description}</p>

            {/* Features */}
            {product.features && (
              <div className="mb-6">
                <h3 className="font-heading font-semibold mb-2">Why This Product</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map(f => (
                    <span key={f} className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Price Comparison */}
            {product.priceComparison && (
              <div className="mb-6">
                <h3 className="font-heading font-semibold mb-3">Price Comparison</h3>
                <div className="space-y-2">
                  {product.priceComparison.map(pc => (
                    <div
                      key={pc.store}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        pc.price === bestPrice ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{pc.store}</span>
                        {pc.price === bestPrice && (
                          <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                            BEST DEAL
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-bold">₹{pc.price.toLocaleString()}</span>
                        <button
                          onClick={() => handleViewDeal(pc.store)}
                          className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-lg hover:scale-105 transition-transform flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> View Deal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trust */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-success" /> Verified Deal</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-success" /> Trusted Store</span>
            </div>
          </motion.div>
        </div>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-border p-4 z-40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="font-heading font-bold text-lg">₹{product.price.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground ml-2 line-through">₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={() => handleViewDeal(product.store)}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:scale-105 transition-transform text-sm"
            >
              View Deal →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

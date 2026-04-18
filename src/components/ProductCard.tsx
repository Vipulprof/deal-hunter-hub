import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Flame, Award, TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const savings = product.originalPrice - product.price;
  const isHotDeal = product.discount >= 40;
  const isTopDeal = product.dealScore >= 9;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group relative block bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] border border-border/50 transition-all duration-300 gradient-border"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />

          {/* Top-left badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {isTopDeal && (
              <span className="inline-flex items-center gap-1 px-2 py-1 gradient-deal text-white text-[10px] font-bold rounded-full shadow-md">
                <Award className="w-2.5 h-2.5" /> BEST DEAL
              </span>
            )}
            {product.badge && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-card/90 backdrop-blur text-foreground text-[10px] font-bold rounded-full shadow-sm">
                {product.badge === "Trending" && <TrendingUp className="w-2.5 h-2.5 text-secondary" />}
                {product.badge}
              </span>
            )}
          </div>

          {/* Discount */}
          <span className="absolute top-2.5 right-2.5 px-2 py-1 gradient-deal text-white text-xs font-extrabold rounded-lg shadow-md">
            -{product.discount}%
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-foreground/85 to-transparent p-3">
            <span className="block text-center text-background text-xs font-semibold">
              View Best Price →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3.5">
          <p className="text-[11px] text-muted-foreground mb-1 font-medium uppercase tracking-wide">
            {product.store} · {product.category}
          </p>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-lg font-extrabold font-heading text-foreground">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>

          {/* Savings pill */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success rounded-md mb-2.5">
            <Flame className="w-3 h-3" />
            <span className="text-[11px] font-bold">Save ₹{savings.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-[11px] text-muted-foreground">({product.reviews.toLocaleString()})</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 bg-accent text-accent-foreground rounded-md">
              {product.dealScore}/10
            </span>
          </div>
        </div>

        {isHotDeal && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-b-md shadow-sm">
            🔥 HOT
          </div>
        )}
      </Link>
    </motion.div>
  );
}

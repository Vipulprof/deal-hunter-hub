import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const savings = product.originalPrice - product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover-lift border border-border/50"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
              {product.badge}
            </span>
          )}
          <span className="absolute top-3 right-3 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-lg">
            -{product.discount}%
          </span>
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-card text-foreground text-xs font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" /> Quick View
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.store} • {product.category}</p>
          <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold font-heading">₹{product.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          </div>
          <p className="text-xs text-success font-medium mb-2">You save ₹{savings.toLocaleString()}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span className="text-xs font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-accent text-accent-foreground rounded-md">
              {product.dealScore}/10
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Flame, Award, TrendingUp } from "lucide-react";
import type { Product } from "@/data/products";
import "./ProductCard.css";

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
      <Link to={`/product/${product.id}`} className="product-card">
        <div className="product-card__image-wrap">
          <img
            src={product.image}
            alt={product.name}
            className="product-card__image"
            loading="lazy"
          />

          <div className="product-card__badges">
            {isTopDeal && (
              <span className="product-card__badge product-card__badge--best">
                <Award className="product-card__badge-icon" /> BEST DEAL
              </span>
            )}
            {product.badge && (
              <span className="product-card__badge product-card__badge--meta">
                {product.badge === "Trending" && <TrendingUp className="product-card__badge-icon product-card__badge-icon--secondary" />}
                {product.badge}
              </span>
            )}
          </div>

          <span className="product-card__discount">-{product.discount}%</span>

          <div className="product-card__hover-overlay">
            <span className="product-card__hover-text">View Best Price →</span>
          </div>
        </div>

        <div className="product-card__info">
          <p className="product-card__meta">{product.store} · {product.category}</p>
          <h3 className="product-card__title">{product.name}</h3>
          <div className="product-card__prices">
            <span className="product-card__price">₹{product.price.toLocaleString()}</span>
            <span className="product-card__original">₹{product.originalPrice.toLocaleString()}</span>
          </div>

          <div className="product-card__savings">
            <Flame className="product-card__savings-icon" />
            <span className="product-card__savings-text">Save ₹{savings.toLocaleString()}</span>
          </div>

          <div className="product-card__footer">
            <div className="product-card__rating">
              <Star className="product-card__star" />
              <span className="product-card__rating-value">{product.rating}</span>
              <span className="product-card__reviews">({product.reviews.toLocaleString()})</span>
            </div>
            <span className="product-card__deal-score">{product.dealScore}/10</span>
          </div>
        </div>

        {isHotDeal && <div className="product-card__hot">🔥 HOT</div>}
      </Link>
    </motion.div>
  );
}

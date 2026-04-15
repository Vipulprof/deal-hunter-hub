import { categories } from "@/data/products";
import SectionHeader from "@/components/SectionHeader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <div className="container py-8">
      <SectionHeader title="🗂 All Categories" subtitle="Browse by category to find the best deals" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className="group block bg-card rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover-lift border border-border/50"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center">
                <span className="text-2xl mb-1 block">{cat.icon}</span>
                <h3 className="font-heading font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.productCount.toLocaleString()} products</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

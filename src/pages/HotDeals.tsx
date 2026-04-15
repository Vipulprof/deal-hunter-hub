import { useState, useMemo } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { Flame, Clock, TrendingUp } from "lucide-react";

const sortOptions = [
  { value: "discount", label: "Highest Discount" },
  { value: "score", label: "Best Deal Score" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export default function HotDeals() {
  const [sort, setSort] = useState("discount");
  const [minDiscount, setMinDiscount] = useState(0);

  const sorted = useMemo(() => {
    let filtered = products.filter(p => p.discount >= minDiscount);
    switch (sort) {
      case "discount": return [...filtered].sort((a, b) => b.discount - a.discount);
      case "score": return [...filtered].sort((a, b) => b.dealScore - a.dealScore);
      case "price-low": return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high": return [...filtered].sort((a, b) => b.price - a.price);
      default: return filtered;
    }
  }, [sort, minDiscount]);

  return (
    <div className="container py-8">
      <SectionHeader title="🔥 Hot Deals" subtitle="Biggest discounts across all stores" />

      {/* Urgency Banner */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {[
          { icon: <Flame className="w-4 h-4" />, label: "Limited Time", color: "bg-destructive/10 text-destructive" },
          { icon: <TrendingUp className="w-4 h-4" />, label: "Trending", color: "bg-secondary/20 text-secondary" },
          { icon: <Clock className="w-4 h-4" />, label: "Selling Fast", color: "bg-primary/10 text-primary" },
        ].map((tag) => (
          <span key={tag.label} className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${tag.color}`}>
            {tag.icon} {tag.label}
          </span>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-sm"
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={minDiscount}
          onChange={(e) => setMinDiscount(Number(e.target.value))}
          className="px-4 py-2 rounded-lg border border-border bg-card text-sm"
        >
          <option value={0}>All Discounts</option>
          <option value={20}>20%+ Off</option>
          <option value={30}>30%+ Off</option>
          <option value={50}>50%+ Off</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No deals found with this filter. Try a lower discount threshold.
        </div>
      )}
    </div>
  );
}

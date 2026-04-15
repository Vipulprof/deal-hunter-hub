import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const [sort, setSort] = useState("score");
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);

  const filtered = useMemo(() => {
    let list = selectedCategory
      ? products.filter(p => p.category === selectedCategory)
      : products;
    switch (sort) {
      case "score": return [...list].sort((a, b) => b.dealScore - a.dealScore);
      case "price-low": return [...list].sort((a, b) => a.price - b.price);
      case "price-high": return [...list].sort((a, b) => b.price - a.price);
      case "discount": return [...list].sort((a, b) => b.discount - a.discount);
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [sort, selectedCategory]);

  const categoryName = categories.find(c => c.id === selectedCategory)?.name;

  return (
    <div className="container py-8">
      <SectionHeader
        title={categoryName ? `${categoryName}` : "All Products"}
        subtitle={`${filtered.length} products found`}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-sm"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 rounded-lg border border-border bg-card text-sm"
        >
          <option value="score">Best Deal</option>
          <option value="discount">Highest Discount</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">No products found.</div>
      )}
    </div>
  );
}

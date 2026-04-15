import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  const handleSelect = (id: string) => {
    onClose();
    navigate(`/product/${id}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="container max-w-2xl pt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {results.length > 0 && (
                <div className="py-2">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(p.id)}
                      className="w-full flex items-center gap-3 px-5 py-3 hover:bg-muted transition-colors text-left"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">₹{p.price.toLocaleString()} • {p.store}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {query.length > 1 && results.length === 0 && (
                <div className="py-8 text-center text-muted-foreground text-sm">
                  No products found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

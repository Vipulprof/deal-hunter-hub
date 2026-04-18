import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bannerSlides } from "@/data/products";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % bannerSlides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + bannerSlides.length) % bannerSlides.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[440px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={bannerSlides[current].image}
              alt={bannerSlides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 max-w-xl">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 backdrop-blur border border-secondary/40 text-secondary text-[11px] font-bold mb-3 uppercase tracking-wider"
            >
              ⚡ Limited Time Deals
            </motion.span>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-background mb-3 leading-tight"
            >
              {bannerSlides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-background/85 text-sm sm:text-base mb-6 max-w-md"
            >
              {bannerSlides[current].subtitle}
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
              <Link
                to="/hot-deals"
                className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:scale-105 transition-transform text-sm"
              >
                {bannerSlides[current].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? "w-6 bg-secondary" : "bg-background/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

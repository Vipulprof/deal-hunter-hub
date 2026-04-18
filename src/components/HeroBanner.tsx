import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { bannerSlides } from "@/data/products";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const next = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    else setCurrent((c) => (c + 1) % bannerSlides.length);
  }, [emblaApi]);

  const prev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    else setCurrent((c) => (c - 1 + bannerSlides.length) % bannerSlides.length);
  }, [emblaApi]);

  // Sync embla → current index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const scrollTo = (i: number) => {
    if (emblaApi) emblaApi.scrollTo(i);
    else setCurrent(i);
  };

  const renderSlide = (slide: typeof bannerSlides[number], idx: number) => (
    <div className="relative h-[280px] sm:h-[360px] md:h-[440px] w-full overflow-hidden">
      <img
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading={idx === 0 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
      <div className="relative h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-xl">
        <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/20 backdrop-blur border border-secondary/40 text-secondary text-[11px] font-bold mb-3 uppercase tracking-wider">
          ⚡ Limited Time Deals
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-background mb-3 leading-tight">
          {slide.title}
        </h2>
        <p className="text-background/85 text-sm sm:text-base mb-5 sm:mb-6 max-w-md line-clamp-2">
          {slide.subtitle}
        </p>
        <Link
          to="/hot-deals"
          className="inline-flex w-fit items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl shadow-md hover:scale-105 transition-transform text-sm"
        >
          {slide.cta}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Mobile: swipeable embla carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {bannerSlides.map((slide, idx) => (
              <div key={idx} className="min-w-0 shrink-0 grow-0 basis-full">
                {renderSlide(slide, idx)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: animated fade transition with arrows */}
      <div className="hidden md:block relative h-[440px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {renderSlide(bannerSlides[current], current)}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-secondary" : "w-1.5 bg-background/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

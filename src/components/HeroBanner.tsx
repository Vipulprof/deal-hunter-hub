import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { bannerSlides } from "@/data/products";
import { Link } from "react-router-dom";
import "./HeroBanner.css";

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

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

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
    <div className="hero-slide">
      <img
        src={slide.image}
        alt={slide.title}
        className="hero-slide__image"
        loading={idx === 0 ? "eager" : "lazy"}
      />
      <div className="hero-slide__overlay-h" />
      <div className="hero-slide__overlay-v" />
      <div className="hero-slide__content">
        <span className="hero-slide__pill">⚡ Limited Time Deals</span>
        <h2 className="hero-slide__title">{slide.title}</h2>
        <p className="hero-slide__subtitle">{slide.subtitle}</p>
        <Link
          to={slide.title.toLowerCase().includes("magic") ? "/magic-assistant" : "/hot-deals"}
          className="hero-slide__cta"
        >
          {slide.cta}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="hero-banner">
      {/* Mobile: swipeable embla carousel */}
      <div className="hero-banner__mobile">
        <div className="hero-banner__embla" ref={emblaRef}>
          <div className="hero-banner__embla-track">
            {bannerSlides.map((slide, idx) => (
              <div key={idx} className="hero-banner__embla-slide">
                {renderSlide(slide, idx)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: animated fade transition with arrows */}
      <div className="hero-banner__desktop">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="hero-banner__desktop-slide"
          >
            {renderSlide(bannerSlides[current], current)}
          </motion.div>
        </AnimatePresence>

        <button onClick={prev} aria-label="Previous slide" className="hero-banner__arrow hero-banner__arrow--left">
          <ChevronLeft className="hero-banner__arrow-icon" />
        </button>
        <button onClick={next} aria-label="Next slide" className="hero-banner__arrow hero-banner__arrow--right">
          <ChevronRight className="hero-banner__arrow-icon" />
        </button>
      </div>

      <div className="hero-banner__dots">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-banner__dot${i === current ? " hero-banner__dot--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

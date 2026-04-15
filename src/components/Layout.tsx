import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart, ChevronUp, Zap } from "lucide-react";
import SearchOverlay from "./SearchOverlay";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/hot-deals", label: "Hot Deals" },
  { to: "/categories", label: "Categories" },
  { to: "/stores", label: "Stores" },
  { to: "/magic-assistant", label: "Magic ✨" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5 text-center font-medium tracking-wide">
        <Zap className="inline w-3 h-3 mr-1" />
        Free shipping on orders over ₹499 • Verified deals from trusted stores
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-card/95 backdrop-blur-md shadow-[var(--shadow-sticky)]" : "bg-card"
        }`}
      >
        <div className="container flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">DealHunt</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors hidden sm:flex">
              <Heart className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link to="/dashboard" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <User className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <nav className="container py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background mt-12">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg">DealHunt</span>
            </div>
            <p className="text-sm opacity-70">Find the best deals across all your favorite stores in one place.</p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/hot-deals" className="hover:opacity-100 transition-opacity">Hot Deals</Link>
              <Link to="/categories" className="hover:opacity-100 transition-opacity">Categories</Link>
              <Link to="/stores" className="hover:opacity-100 transition-opacity">All Stores</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Features</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/magic-assistant" className="hover:opacity-100 transition-opacity">Magic Assistant</Link>
              <Link to="/dashboard" className="hover:opacity-100 transition-opacity">My Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-3">Trust</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>✔ Verified Deals</span>
              <span>✔ Trusted Stores</span>
              <span>✔ Price Comparison</span>
              <span>✔ No Hidden Costs</span>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10">
          <div className="container py-4 text-center text-sm opacity-50">
            © 2026 DealHunt. All rights reserved. We earn commissions from partner stores.
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

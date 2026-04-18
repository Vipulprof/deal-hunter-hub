import { useState } from "react";
import { motion } from "framer-motion";
import { User, Heart, Clock, Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"saved" | "recent" | "requests">("saved");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const savedDeals = products.slice(0, 4);
  const recentProducts = products.slice(4, 8);

  if (!loggedIn) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-10 px-4">
        {/* Decorative gradient blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-accent/40 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-card rounded-3xl p-7 sm:p-9 shadow-[var(--shadow-card-hover)]"
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow"
            >
              <Sparkles className="w-7 h-7 text-primary-foreground" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
              {isSignup ? "Join ShopOnGo 🚀" : "Welcome Back 👋"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5">
              {isSignup ? "Create an account to save deals & track requests" : "Sign in to access your personalized deals"}
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => setLoggedIn(true)}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 mb-4 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/40 transition-all text-sm font-semibold text-foreground"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setLoggedIn(true); }} className="space-y-3.5">
            {isSignup && (
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-foreground">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-foreground">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input type="email" placeholder="you@email.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-foreground">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-card/60 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 gradient-primary text-primary-foreground font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm shadow-glow"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            {isSignup ? "Already have an account?" : "New to ShopOnGo?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold hover:underline">
              {isSignup ? "Sign In" : "Create one"}
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* User Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
          <User className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-2xl">Welcome, User!</h1>
          <p className="text-sm text-muted-foreground">Manage your deals and requests</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8 w-fit">
        {[
          { key: "saved", label: "Saved Deals", icon: <Heart className="w-4 h-4" /> },
          { key: "recent", label: "Recently Viewed", icon: <Clock className="w-4 h-4" /> },
          { key: "requests", label: "My Requests", icon: <Sparkles className="w-4 h-4" /> },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "saved" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedDeals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
      {tab === "recent" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
      {tab === "requests" && (
        <div className="bg-card rounded-xl p-8 text-center border border-border/50">
          <Sparkles className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-heading font-semibold mb-2">No requests yet</h3>
          <p className="text-sm text-muted-foreground mb-4">Try our Magic Assistant to get personalized deal recommendations</p>
          <Link
            to="/magic-assistant"
            className="inline-flex px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl text-sm hover:scale-105 transition-transform"
          >
            Try Magic Assistant ✨
          </Link>
        </div>
      )}
    </div>
  );
}

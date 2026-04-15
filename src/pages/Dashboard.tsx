import { useState } from "react";
import { motion } from "framer-motion";
import { User, Heart, Clock, Sparkles, LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
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
      <div className="container py-8 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-card)] border border-border/50"
        >
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <LogIn className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-heading font-bold text-2xl">{isSignup ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignup ? "Sign up to save deals and track requests" : "Sign in to access your dashboard"}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setLoggedIn(true); }} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" placeholder="you@email.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:scale-[1.02] transition-transform text-sm">
              {isSignup ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
              {isSignup ? "Sign In" : "Sign Up"}
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

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, CheckCircle } from "lucide-react";

export default function MagicAssistant() {
  const [form, setForm] = useState({ productType: "", budget: "", requirements: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-8 max-w-2xl">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center mx-auto mb-4"
        >
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <h1 className="font-heading font-bold text-3xl mb-2">Magic Assistant ✨</h1>
        <p className="text-muted-foreground">Tell us what you're looking for and we'll find the best deal for you.</p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-card)] border border-border/50 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">What product are you looking for?</label>
              <input
                value={form.productType}
                onChange={(e) => setForm(f => ({ ...f, productType: e.target.value }))}
                placeholder="e.g., Wireless noise-cancelling headphones"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Budget (₹)</label>
              <input
                value={form.budget}
                onChange={(e) => setForm(f => ({ ...f, budget: e.target.value }))}
                placeholder="e.g., 5000-10000"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Any specific requirements?</label>
              <textarea
                value={form.requirements}
                onChange={(e) => setForm(f => ({ ...f, requirements: e.target.value }))}
                placeholder="e.g., Must have good bass, comfortable for long hours..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Request
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-8 sm:p-12 shadow-[var(--shadow-card)] border border-border/50 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            </motion.div>
            <h2 className="font-heading font-bold text-2xl mb-2">Request Submitted! 🎉</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Our team will review your request and find the best deals matching your requirements.
              You'll receive suggestions within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ productType: "", budget: "", requirements: "" }); }}
              className="px-6 py-3 bg-muted text-foreground font-medium rounded-xl hover:bg-muted/80 transition-colors text-sm"
            >
              Submit Another Request
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

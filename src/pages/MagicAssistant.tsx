import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Send, CheckCircle, Upload, SkipForward,
  ShoppingBag, Smartphone, Laptop, Footprints, Watch, Shirt,
  ImageIcon, Mail, Phone, ArrowRight, MessageCircle, Shield, Star
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type Message = {
  id: string;
  sender: "bot" | "user";
  content: string;
  type?: "text" | "options" | "budget" | "image-upload" | "contact" | "summary" | "success";
  options?: { label: string; icon?: React.ReactNode; value: string }[];
  budgetOptions?: string[];
  summary?: { product: string; budget: string; requirements: string; contact: string };
};

const PRODUCT_OPTIONS = [
  { label: "Smartphone", icon: <Smartphone className="w-4 h-4" />, value: "smartphone" },
  { label: "Laptop", icon: <Laptop className="w-4 h-4" />, value: "laptop" },
  { label: "Shoes", icon: <Footprints className="w-4 h-4" />, value: "shoes" },
  { label: "Watch", icon: <Watch className="w-4 h-4" />, value: "watch" },
  { label: "Clothing", icon: <Shirt className="w-4 h-4" />, value: "clothing" },
  { label: "Other", icon: <ShoppingBag className="w-4 h-4" />, value: "other" },
];

const BUDGET_OPTIONS = ["Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹15,000", "₹15,000 - ₹30,000", "₹30,000+"];

const REQUIREMENT_OPTIONS = [
  { label: "Best Camera", value: "camera" },
  { label: "Long Battery", value: "battery" },
  { label: "Gaming", value: "gaming" },
  { label: "Brand Specific", value: "brand" },
  { label: "Lightweight", value: "lightweight" },
  { label: "No Preference", value: "none" },
];

const uid = () => Math.random().toString(36).slice(2, 9);

export default function MagicAssistant() {
  const [step, setStep] = useState(0); // 0=start, 1=product, 2=budget, 3=requirements, 4=image, 5=contact, 6=summary, 7=success
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [contactType, setContactType] = useState<"email" | "whatsapp" | null>(null);
  const [userData, setUserData] = useState({ product: "", budget: "", requirements: "", contact: "" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalSteps = 5;
  const progressPercent = Math.min((step / totalSteps) * 100, 100);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 100);
  }, []);

  const addBotMessage = useCallback((msg: Omit<Message, "id" | "sender">, delay = 800) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { ...msg, id: uid(), sender: "bot" }]);
    }, delay);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setMessages(prev => [...prev, { id: uid(), sender: "user", content }]);
  }, []);

  // Start flow
  const handleStart = () => {
    setStep(1);
    addBotMessage({
      content: "What are you looking for today? 🛍️",
      type: "options",
      options: PRODUCT_OPTIONS,
    }, 600);
  };

  // Step 1: Product selection
  const handleProductSelect = (value: string, label: string) => {
    addUserMessage(label);
    setUserData(prev => ({ ...prev, product: label }));
    setStep(2);
    addBotMessage({
      content: `Great choice! What's your budget for ${label.toLowerCase()}? 💰`,
      type: "budget",
      budgetOptions: BUDGET_OPTIONS,
    });
  };

  // Step 2: Budget
  const handleBudgetSelect = (budget: string) => {
    addUserMessage(budget);
    setUserData(prev => ({ ...prev, budget }));
    setStep(3);
    addBotMessage({
      content: "Any specific requirements or preferences? 🎯",
      type: "options",
      options: REQUIREMENT_OPTIONS.map(o => ({ ...o, icon: undefined })),
    });
  };

  // Step 3: Requirements
  const handleRequirementSelect = (value: string, label: string) => {
    addUserMessage(label);
    setUserData(prev => ({ ...prev, requirements: label }));
    setStep(4);
    addBotMessage({
      content: "Do you have a reference image of the product? 📸 (optional)",
      type: "image-upload",
    });
  };

  // Step 4: Image
  const handleImageSkip = () => {
    addUserMessage("Skipped image upload");
    setStep(5);
    addBotMessage({
      content: "Almost done! Where should we send your best deals? 📩",
      type: "contact",
    });
  };

  const handleImageUpload = () => {
    addUserMessage("📷 Image uploaded");
    setStep(5);
    addBotMessage({
      content: "Nice! Where should we send your best deals? 📩",
      type: "contact",
    });
  };

  // Step 5: Contact
  const handleContactSubmit = () => {
    if (!textInput.trim()) return;
    const contactInfo = `${contactType === "email" ? "📧" : "📱"} ${textInput}`;
    addUserMessage(contactInfo);
    setUserData(prev => ({ ...prev, contact: textInput }));
    setTextInput("");
    setContactType(null);
    setStep(6);

    const finalData = { ...userData, contact: textInput };
    addBotMessage({
      content: "Here's a summary of your request:",
      type: "summary",
      summary: finalData,
    });
  };

  // Step 6: Confirm
  const handleConfirm = () => {
    setStep(7);
    addBotMessage({ content: "", type: "success" }, 500);
  };

  useEffect(scrollToBottom, [messages, typing, scrollToBottom]);

  const lastBotMsg = messages.filter(m => m.sender === "bot").at(-1);

  return (
    <div className="container py-4 sm:py-6 max-w-2xl flex flex-col" style={{ height: "calc(100vh - 80px)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shrink-0">">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-lg leading-tight">Magic Assistant</h1>
          <p className="text-xs text-muted-foreground">Your personal shopping guide</p>
        </div>
        {step > 0 && step <= totalSteps && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground font-medium">Step {Math.min(step, totalSteps)}/{totalSteps}</span>
            <Progress value={progressPercent} className="w-20 h-1.5" />
          </div>
        )}
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-2xl bg-muted/30 border border-border/40 p-4 space-y-3 scrollbar-thin">
        {/* Welcome screen */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center h-full text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-2xl <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-5">">
              <MessageCircle className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="font-heading font-bold text-2xl mb-2">
              Hi 👋 I'm your Shopping Assistant!
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-muted-foreground text-sm mb-1 max-w-sm">
              I'll help you find the best product deals across multiple platforms.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-muted-foreground text-xs mb-6 max-w-xs">
              Just answer a few quick questions and I'll find the perfect match for you.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-primary" /> Trusted Platforms</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-primary" /> Best Deals</span>
            </motion.div>
            <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl flex items-center gap-2 text-sm shadow-lg"
            >
              Start Now <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" ? (
                <div className="max-w-[85%] space-y-2">
                  <div className="bg-card border border-border/50 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                    {msg.content && <p className="text-sm">{msg.content}</p>}

                    {/* Product / requirement options */}
                    {msg.type === "options" && msg.options && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.options.map(opt => (
                          <button key={opt.value} onClick={() => step === 1 ? handleProductSelect(opt.value, opt.label) : handleRequirementSelect(opt.value, opt.label)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium border border-border/50"
                          >
                            {opt.icon} {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Budget options */}
                    {msg.type === "budget" && msg.budgetOptions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.budgetOptions.map(b => (
                          <button key={b} onClick={() => handleBudgetSelect(b)}
                            className="px-3 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium border border-border/50"
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Image upload */}
                    {msg.type === "image-upload" && (
                      <div className="flex gap-2 mt-3">
                        <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium border border-border/50 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" /> Upload Image
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                        <button onClick={handleImageSkip} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-accent transition-colors text-xs font-medium border border-border/50">
                          <SkipForward className="w-3.5 h-3.5" /> Skip
                        </button>
                      </div>
                    )}

                    {/* Contact */}
                    {msg.type === "contact" && !contactType && (
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => setContactType("email")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium border border-border/50">
                          <Mail className="w-3.5 h-3.5" /> Email
                        </button>
                        <button onClick={() => setContactType("whatsapp")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-medium border border-border/50">
                          <Phone className="w-3.5 h-3.5" /> WhatsApp
                        </button>
                      </div>
                    )}

                    {/* Summary */}
                    {msg.type === "summary" && msg.summary && (
                      <div className="mt-3 space-y-2 text-xs">
                        <div className="bg-muted/50 rounded-xl p-3 space-y-1.5 border border-border/30">
                          <div className="flex justify-between"><span className="text-muted-foreground">Product</span><span className="font-medium">{msg.summary.product}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Budget</span><span className="font-medium">{msg.summary.budget}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Preference</span><span className="font-medium">{msg.summary.requirements}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="font-medium">{msg.summary.contact}</span></div>
                        </div>
                        <button onClick={handleConfirm} className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform">
                          <CheckCircle className="w-3.5 h-3.5" /> Confirm & Find Deals
                        </button>
                      </div>
                    )}

                    {/* Success */}
                    {msg.type === "success" && (
                      <div className="text-center py-4">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                          <CheckCircle className="w-14 h-14 <CheckCircle className="w-14 h-14 text-success mx-auto mb-3" />" />
                        </motion.div>
                        <h3 className="font-heading font-bold text-lg mb-1">We're finding the best deals for you 🎯</h3>
                        <p className="text-xs text-muted-foreground mb-4">You'll receive personalized deals within 24 hours.</p>
                        <div className="flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> No Spam</span>
                          <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Best Prices</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {msg.type === "contact" && (
                    <p className="text-[10px] text-muted-foreground px-2 flex items-center gap-1"><Shield className="w-3 h-3" /> We'll only use this to send your requested deals. No spam.</p>
                  )}
                </div>
              ) : (
                <div className="max-w-[75%] bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2.5 shadow-sm">
                  <p className="text-sm">{msg.content}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-card border border-border/50 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">Assistant is typing</span>
                <span className="flex gap-0.5">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom input bar for contact step */}
      <AnimatePresence>
        {contactType && step === 5 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-3 flex gap-2">
            <input
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleContactSubmit()}
              placeholder={contactType === "email" ? "Enter your email address" : "Enter your WhatsApp number"}
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              type={contactType === "email" ? "email" : "tel"}
            />
            <button onClick={handleContactSubmit} className="px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

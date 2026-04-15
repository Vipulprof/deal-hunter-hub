import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RedirectLoader({ storeName, onComplete }: { storeName: string; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-card flex flex-col items-center justify-center gap-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
          <span className="text-2xl">🛒</span>
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">Redirecting to {storeName}…</h3>
        <p className="text-sm text-muted-foreground">Finding the best deal for you</p>
      </motion.div>
      <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <p className="text-xs text-muted-foreground">✔ Verified Deal • ✔ Trusted Store</p>
    </div>
  );
}

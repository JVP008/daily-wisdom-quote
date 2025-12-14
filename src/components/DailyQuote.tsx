import { motion } from "framer-motion";
import { getDailyQuote } from "@/data/quotes";
import { Sparkles } from "lucide-react";

export function DailyQuote() {
  const quote = getDailyQuote();
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center px-8 py-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Sparkles className="h-6 w-6 text-primary animate-pulse-slow" />
      </motion.div>
      
      <motion.blockquote
        className="max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <p className="font-serif text-2xl leading-relaxed text-quote italic mb-6">
          "{quote.text}"
        </p>
        <footer className="flex flex-col items-center gap-1">
          <cite className="text-quote-author font-medium not-italic">
            — {quote.author}
          </cite>
          {quote.source && (
            <span className="text-sm text-muted-foreground">
              {quote.source}
            </span>
          )}
        </footer>
      </motion.blockquote>
      
      <motion.p
        className="mt-12 text-xs uppercase tracking-widest text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        Today's Reflection
      </motion.p>
    </motion.div>
  );
}

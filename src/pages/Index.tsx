import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DailyQuote } from "@/components/DailyQuote";
import { MeditationTimer } from "@/components/MeditationTimer";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"quote" | "meditation">("quote");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-12 pb-4 text-center">
        <motion.h1
          className="font-serif text-xl text-foreground tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Daily Philosophy
        </motion.h1>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative z-10 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === "quote" ? (
            <motion.div
              key="quote"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DailyQuote />
            </motion.div>
          ) : (
            <motion.div
              key="meditation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MeditationTimer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

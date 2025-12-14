import { motion } from "framer-motion";
import { BookOpen, Timer } from "lucide-react";

interface NavigationProps {
  activeTab: "quote" | "meditation";
  onTabChange: (tab: "quote" | "meditation") => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 pb-safe">
      <div className="flex justify-center p-6">
        <div className="flex bg-card/80 backdrop-blur-lg rounded-full p-1.5 border border-border/50">
          <NavButton
            icon={<BookOpen className="h-5 w-5" />}
            label="Quote"
            isActive={activeTab === "quote"}
            onClick={() => onTabChange("quote")}
          />
          <NavButton
            icon={<Timer className="h-5 w-5" />}
            label="Meditate"
            isActive={activeTab === "meditation"}
            onClick={() => onTabChange("meditation")}
          />
        </div>
      </div>
    </nav>
  );
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ icon, label, isActive, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 px-6 py-3 rounded-full transition-colors"
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span
        className={`relative z-10 transition-colors ${
          isActive ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        {icon}
      </span>
      <span
        className={`relative z-10 text-sm font-medium transition-colors ${
          isActive ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

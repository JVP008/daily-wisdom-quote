import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const DURATION_OPTIONS = [
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
];

export function MeditationTimer() {
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[1]);
  const [timeLeft, setTimeLeft] = useState(selectedDuration.seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const progress = 1 - timeLeft / selectedDuration.seconds;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = useCallback(() => {
    if (!hasStarted) setHasStarted(true);
    setIsRunning((prev) => !prev);
  }, [hasStarted]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(selectedDuration.seconds);
    setHasStarted(false);
  }, [selectedDuration.seconds]);

  const handleDurationChange = (duration: typeof DURATION_OPTIONS[0]) => {
    setSelectedDuration(duration);
    setTimeLeft(duration.seconds);
    setIsRunning(false);
    setHasStarted(false);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center px-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Duration selector */}
      <div className="flex gap-3 mb-12">
        {DURATION_OPTIONS.map((option) => (
          <button
            key={option.seconds}
            onClick={() => handleDurationChange(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedDuration.seconds === option.seconds
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="relative mb-12">
        {/* Breathing animation background */}
        <AnimatePresence>
          {isRunning && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-64 h-64 rounded-full bg-primary/10 animate-breathe" />
            </motion.div>
          )}
        </AnimatePresence>

        <svg width="280" height="280" className="transform -rotate-90 relative z-10">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <motion.circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              filter: isRunning ? "drop-shadow(0 0 12px hsl(var(--timer-glow) / 0.5))" : "none",
            }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <motion.span
            className="font-serif text-5xl text-foreground tabular-nums"
            key={timeLeft}
            initial={{ scale: 1.05, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(timeLeft)}
          </motion.span>
          {isRunning && (
            <motion.span
              className="text-sm text-muted-foreground mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              breathe deeply
            </motion.span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button
          variant="meditation"
          size="lg"
          onClick={handlePlayPause}
          className="w-16 h-16 rounded-full"
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-1" />
          )}
        </Button>
        
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={handleReset}
              className="w-16 h-16 rounded-full text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>

      <motion.p
        className="mt-12 text-xs uppercase tracking-widest text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Meditation
      </motion.p>
    </motion.div>
  );
}

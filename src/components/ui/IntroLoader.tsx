import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

type IntroLoaderProps = {
  onComplete: () => void;
};

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete'>('loading');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Target duration ~2-2.5 seconds total. 
    // We'll spend ~1800ms on the progress bar, and then hold the final text for ~800ms.
    const duration = prefersReducedMotion ? 300 : 1800;
    const intervalTime = duration / 100;
    
    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setPhase('complete');
        
        // Hold the final text "ENTER THE EXPERIENCE" so it is clearly visible
        setTimeout(() => {
          onComplete();
        }, prefersReducedMotion ? 300 : 1000);
      }
      setProgress(currentProgress);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, prefersReducedMotion]);

  let statusMessage = "INITIALIZING";
  if (progress > 50) statusMessage = "BUILDING EXPERIENCE";

  return (
    <motion.div
      key="intro-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -30 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center text-light-text overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center w-full max-w-sm px-6">
        
        <AnimatePresence mode="wait">
          {phase === 'loading' ? (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center w-full"
            >
              {/* Minimal Loading Pill */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-8 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#B600A8] to-[#BE4C00]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              <div className="flex justify-between items-end w-full px-1">
                <span className="font-light text-xs sm:text-sm uppercase tracking-widest opacity-60">
                  {statusMessage}
                </span>
                <span className="font-medium text-sm sm:text-base tracking-wider tabular-nums">
                  {progress}%
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="hero-heading font-bold uppercase tracking-wide leading-none text-2xl sm:text-3xl md:text-4xl text-center">
                ENTER THE EXPERIENCE
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
}

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useMotionValue, animate, useTransform } from 'framer-motion';
import type { AnimationPlaybackControls } from 'framer-motion';
import { portfolio } from '../../data/portfolio';

// Extract titles from expertise to use in Marquee
const expertiseTitles = portfolio.expertise.map(e => e.title.toUpperCase());

// Duplicate to ensure we have enough content to scroll infinitely
const ROW_1 = [
  ...expertiseTitles,
  "CREATIVE DEVELOPER",
  "UI ENGINEERING",
  ...expertiseTitles,
  "CREATIVE DEVELOPER",
  "UI ENGINEERING"
];

const ROW_2 = [
  "BUILDING DIGITAL EXPERIENCES",
  "PROBLEM SOLVING",
  ...expertiseTitles.reverse(),
  "BUILDING DIGITAL EXPERIENCES",
  "PROBLEM SOLVING",
  ...expertiseTitles.reverse()
];

type MarqueeRowProps = {
  items: string[];
  direction?: number;
};

const MarqueeRow = ({ items, direction = 1 }: MarqueeRowProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(direction === 1 ? 0 : -50);
  const xPercent = useTransform(x, (val) => `${val}%`);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const handleItemInteract = (item: string | null, type: 'toggle' | 'set') => {
    if (type === 'toggle') {
      setActiveItem(prev => prev === item ? null : item);
    } else {
      setActiveItem(item);
    }
  };

  const isPaused = activeItem !== null;

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    // Only create the animation once
    if (!controlsRef.current) {
      const startVal = direction === 1 ? 0 : -50;
      const endVal = direction === 1 ? -50 : 0;
      
      controlsRef.current = animate(x, [startVal, endVal], {
        repeat: Infinity,
        ease: "linear",
        duration: 40,
      });
    }
    
    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [x, direction, prefersReducedMotion]);

  useEffect(() => {
    if (controlsRef.current) {
      if (isPaused) {
        controlsRef.current.pause();
      } else {
        controlsRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div className="flex w-full overflow-hidden whitespace-nowrap py-3 md:py-4 border-y border-[rgba(215,226,234,0.03)]">
      <motion.div
        className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12"
        style={prefersReducedMotion ? {} : { x: xPercent }}
      >
        {items.map((item, idx) => {
          // Use a unique key by combining index and item to satisfy React, 
          // but logically the 'activeItem' matches by string value.
          const isActive = activeItem === item;
          const isFaded = activeItem !== null && !isActive;

          return (
            <div key={`${item}-${idx}`} className="flex items-center gap-8 md:gap-12">
              <button
                onClick={() => handleItemInteract(item, 'toggle')}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') handleItemInteract(item, 'set');
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === 'mouse') handleItemInteract(null, 'set');
                }}
                onFocus={(e) => {
                  try {
                    if (e.target.matches(':focus-visible')) {
                      handleItemInteract(item, 'set');
                    }
                  } catch (err) {
                    // Fallback if matches is not supported
                    handleItemInteract(item, 'set');
                  }
                }}
                onBlur={() => handleItemInteract(null, 'set')}
                aria-pressed={isActive}
                aria-label={isActive ? `Unselect ${item}` : `Select ${item}`}
                className={`font-bold text-xl md:text-3xl lg:text-4xl uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-8 focus-visible:ring-offset-background rounded-sm ${
                  isActive ? 'opacity-100 text-white scale-105' : 
                  isFaded ? 'opacity-30' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {item}
              </button>
              <span className="text-white opacity-20 text-sm md:text-xl" aria-hidden="true">✦</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function Marquee() {
  return (
    <section className="relative w-full flex flex-col py-16 overflow-hidden bg-background">
      {/* Subtle edge fades for the marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none w-full" />
      
      {/* Container slightly rotated for a dynamic feel */}
      <div className="flex flex-col gap-1 transform -rotate-2 scale-105 my-8">
        <MarqueeRow items={ROW_1} direction={1} />
        <MarqueeRow items={ROW_2} direction={-1} />
      </div>
    </section>
  );
}

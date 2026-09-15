import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  className?: string;
};

export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  direction = 'up', 
  once = true,
  className = '' 
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  let initialX = 0;
  let initialY = 0;

  if (direction === 'up') initialY = 30;
  if (direction === 'down') initialY = -30;
  if (direction === 'left') initialX = 30;
  if (direction === 'right') initialX = -30;

  const initial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: initialX, y: initialY };
  const animate = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "50px", amount: 0 }}
      transition={{ 
        delay, 
        duration, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

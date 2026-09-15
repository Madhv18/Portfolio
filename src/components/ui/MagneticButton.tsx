import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type MagneticButtonProps = {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
};

export default function MagneticButton({ 
  children, 
  padding = 150, 
  strength = 3,
  className = ''
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReducedMotion) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    if (distance < padding) {
      setIsActive(true);
      setPosition({ x: distanceX / strength, y: distanceY / strength });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        animate={{ x: position.x, y: position.y }}
        transition={{
          type: "spring",
          stiffness: isActive ? 150 : 100,
          damping: 15,
          mass: 0.1
        }}
        style={{ willChange: 'transform' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

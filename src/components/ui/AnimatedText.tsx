import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center gap-[0.25em]`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <motion.span key={i} style={{ opacity }} className="inline-block">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

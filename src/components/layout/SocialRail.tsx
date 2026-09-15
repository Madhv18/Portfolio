import { portfolio } from '../../data/portfolio';
import { Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export default function SocialRail() {
  const { identity } = portfolio;
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={prefersReducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="hidden lg:flex absolute left-8 xl:left-16 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20 pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-6">
        {identity.github && (
          <motion.a 
            variants={prefersReducedMotion ? {} : itemVariants}
            href={identity.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white hover:-translate-y-1 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </motion.a>
        )}
        
        {identity.linkedin && (
          <motion.a 
            variants={prefersReducedMotion ? {} : itemVariants}
            href={identity.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white hover:-translate-y-1 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </motion.a>
        )}
        
        {identity.email && (
          <motion.a 
            variants={prefersReducedMotion ? {} : itemVariants}
            href={`mailto:${identity.email}`} 
            className="text-white/50 hover:text-white hover:-translate-y-1 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            aria-label={`Send email to ${identity.email}`}
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        )}
      </div>
      
      {/* Vertical connecting line */}
      <motion.div 
        variants={prefersReducedMotion ? {} : {
          hidden: { height: 0 },
          visible: { height: 96, transition: { duration: 0.8, delay: 0.3 } }
        }}
        className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent mt-2" 
        aria-hidden="true"
      />
    </motion.div>
  );
}

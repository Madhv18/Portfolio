import { motion, useReducedMotion } from 'framer-motion';

export default function AvatarPlaceholder() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto md:max-w-full flex items-center justify-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-white/5 rounded-full blur-[100px]" />
      
      {/* Orbital Technical Lines */}
      <motion.div 
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border border-white/5 rounded-full"
      />
      
      <motion.div 
        animate={prefersReducedMotion ? {} : { rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border border-white/[0.03] rounded-full border-dashed"
      />

      {/* The Container with Developer Photo */}
      <div className="relative w-[70%] h-[70%] rounded-full bg-gradient-to-b from-white/10 to-transparent flex items-center justify-center border border-white/10 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)] overflow-hidden">
        
        {/* Subtle Inner Glow */}
        <div className="absolute top-0 w-3/4 h-1/2 bg-white/10 blur-[30px] rounded-full z-10 pointer-events-none" />
        
        <img 
          src="/images/expertise-avatar.png" 
          alt="Developer Character" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Floating technical indicators */}
      <div className="absolute top-10 left-10 hidden lg:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
        <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">System Ready</span>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { portfolio } from '../../data/portfolio';
import FadeIn from '../ui/FadeIn';
import AvatarPlaceholder from '../ui/AvatarPlaceholder';
import { Layout, Layers, Cpu, MonitorSmartphone, Database, Cloud, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  "01": <Layout className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />,
  "02": <Layers className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />,
  "03": <Cpu className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />,
  "04": <MonitorSmartphone className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />,
  "05": <Database className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />,
  "06": <Cloud className="w-5 h-5 text-white/50 group-hover:text-white transition-colors duration-500" />,
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Expertise() {
  const { expertise } = portfolio;
  const prefersReducedMotion = useReducedMotion();

  // Mobile Carousel State
  const [[page, direction], setPage] = useState([0, 0]);
  const numItems = expertise.length;
  const activeIndex = ((page % numItems) + numItems) % numItems;
  const activeItem = expertise[activeIndex];

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < numItems) {
      setPage([newPage, newDirection]);
    }
  };


  useEffect(() => {
    // Only apply keyboard navigation if the mobile layout is visible
    // A simple way is to just listen if window width is mobile, but it's fine globally 
    // since desktop doesn't use the page state currently.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      
      // We should only paginate if window width < 1024px (lg breakpoint in Tailwind)
      if (window.innerWidth >= 1024) return;

      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, numItems]);

  const variants = {
    enter: (direction: number) => {
      if (prefersReducedMotion) return { opacity: 0 };
      return {
        x: direction > 0 ? "20%" : "-20%",
        opacity: 0,
        scale: 0.98,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      if (prefersReducedMotion) return { opacity: 0 };
      return {
        zIndex: 0,
        x: direction < 0 ? "20%" : "-20%",
        opacity: 0,
        scale: 0.98,
      };
    }
  };

  return (
    <section id="expertise" className="relative w-full bg-background py-24 md:py-32 px-6 md:px-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        
        {/* ================================================== */}
        {/* DESKTOP LAYOUT (unchanged)                           */}
        {/* ================================================== */}
        <div className="hidden lg:flex w-full flex-row gap-24">
          
          {/* LEFT SIDE: Visual & Heading */}
          <div className="flex flex-col w-2/5 shrink-0 z-10">
            <FadeIn direction="up">
              <h2 className="uppercase tracking-[0.25em] text-sm font-medium text-light-text opacity-50 mb-4">
                Capabilities
              </h2>
              <h3 className="font-bold text-6xl text-light-text tracking-tight uppercase mb-10">
                Expertise
              </h3>
              <p className="text-white/50 text-lg max-w-md leading-relaxed font-light mb-24">
                A comprehensive technical foundation focused on building scalable, performant, and intelligent digital experiences.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="up" className="relative w-full flex items-center justify-center">
              <AvatarPlaceholder />
            </FadeIn>
          </div>

          {/* RIGHT SIDE: 2-Column Grid */}
          <div className="flex flex-col w-3/5">
            <div className="grid grid-cols-2 gap-x-12 gap-y-12">
              {expertise.map((item, index) => (
                <FadeIn 
                  key={item.id} 
                  delay={0.1 + (index * 0.1)} 
                  direction="up" 
                  className="group relative flex flex-col pt-8"
                >
                  {/* Thin top divider */}
                  <div className="absolute top-0 left-0 w-full h-px bg-white/10 group-hover:bg-white/30 transition-colors duration-500" />
                  
                  <div className="flex items-center justify-between mb-6">
                    {iconMap[item.id]}
                    <span 
                      className="font-mono text-2xl text-white/20 font-light group-hover:text-white/50 transition-colors duration-500"
                      aria-hidden="true"
                    >
                      {item.id}
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-medium text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500 ease-out">
                    {item.title}
                  </h4>
                  
                  <p className="text-base text-white/50 leading-relaxed font-light mb-6 flex-grow">
                    {item.description}
                  </p>
                  
                  {/* Technology Tags */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border border-white/10 text-white/40 bg-white/5 group-hover:border-white/20 group-hover:text-white/60 transition-colors duration-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* MOBILE LAYOUT                                      */}
        {/* ================================================== */}
        <div className="flex lg:hidden w-full flex-col">
          
          <FadeIn direction="up">
            <h2 className="uppercase tracking-[0.25em] text-xs font-medium text-light-text opacity-50 mb-4">
              Capabilities
            </h2>
            <h3 className="font-bold text-4xl text-light-text tracking-tight uppercase mb-6">
              Expertise
            </h3>
            <p className="text-white/50 text-base leading-relaxed font-light mb-12">
              A comprehensive technical foundation focused on building scalable, performant, and intelligent digital experiences.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} direction="up" className="relative w-full flex items-center justify-center mb-12">
            <AvatarPlaceholder />
          </FadeIn>

          {/* Carousel Area */}
          <div className="relative w-full flex flex-col min-h-[350px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 }
                }}
                drag={prefersReducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute top-0 left-0 w-full flex flex-col border border-white/10 rounded-2xl p-6 bg-[#0A0A0A] shadow-xl touch-pan-y"
              >
                <div className="flex items-center justify-between mb-6">
                  {iconMap[activeItem.id]}
                  <span className="font-mono text-xl text-white/20 font-light" aria-hidden="true">
                    {activeItem.id}
                  </span>
                </div>
                
                <h4 className="text-xl font-medium text-white tracking-tight mb-4">
                  {activeItem.title}
                </h4>
                
                <p className="text-sm text-white/50 leading-relaxed font-light mb-8">
                  {activeItem.description}
                </p>
                
                {/* Technology Tags */}
                {activeItem.technologies && activeItem.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {activeItem.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full border border-white/10 text-white/40 bg-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => paginate(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous expertise"
              className="p-3 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-all disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs tracking-widest text-white/50">
              {String(activeIndex + 1).padStart(2, '0')} / {String(numItems).padStart(2, '0')}
            </span>
            <button
              onClick={() => paginate(1)}
              disabled={activeIndex === numItems - 1}
              aria-label="Next expertise"
              className="p-3 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-all disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-[10px] uppercase tracking-widest text-white/30 mt-4 font-mono">
            Swipe to explore
          </p>

        </div>
      </div>
    </section>
  );
}

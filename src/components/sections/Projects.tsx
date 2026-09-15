import { useState, useEffect } from 'react';
import { portfolio } from '../../data/portfolio';
import { ExternalLink, Code, ArrowRight, ArrowLeft } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Projects() {
  const [[page, direction], setPage] = useState([0, 0]);
  const prefersReducedMotion = useReducedMotion();
  const numProjects = portfolio.projects.length;

  const activeIndex = ((page % numProjects) + numProjects) % numProjects;
  const project = portfolio.projects[activeIndex];

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < numProjects) {
      setPage([newPage, newDirection]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }
      
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, numProjects]); // Need page to correctly compute next state in paginate

  const variants = {
    enter: (direction: number) => {
      if (prefersReducedMotion) return { opacity: 0 };
      return {
        x: direction > 0 ? "50%" : "-50%",
        opacity: 0,
        scale: 0.97,
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
        x: direction < 0 ? "50%" : "-50%",
        opacity: 0,
        scale: 0.97,
      };
    }
  };

  return (
    <section id="projects" className="relative w-full bg-background py-24 md:py-32 px-6 md:px-10 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="uppercase tracking-[0.25em] text-xs md:text-sm font-medium text-light-text opacity-50">
                Selected Work
              </h2>
              <h3 className="font-bold text-4xl md:text-6xl text-light-text tracking-tight uppercase">
                Projects
              </h3>
            </div>
            
            {/* Desktop Navigation Controls */}
            <div className="hidden md:flex items-center gap-6">
              <span className="font-mono text-sm tracking-widest text-white/50">
                {String(activeIndex + 1).padStart(2, '0')} / {String(numProjects).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(-1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                  className="p-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  disabled={activeIndex === numProjects - 1}
                  aria-label="Next project"
                  className="p-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all disabled:opacity-20 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Project Showcase Container */}
        <div className="relative w-full aspect-auto md:aspect-[16/9] min-h-[650px] md:min-h-[500px] flex items-center justify-center">
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
              className="absolute w-full h-full flex items-center cursor-grab active:cursor-grabbing"
            >
              {/* Card Layout */}
              <div className="w-full h-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.05)] rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-16 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                
                {/* Subtle Highlights */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.01] blur-[100px] rounded-full pointer-events-none" />

                <div className="flex flex-col z-10">
                  <div className="flex items-center gap-4 mb-4 md:mb-10">
                    <span className="font-mono text-sm md:text-base text-white/30">
                      {project.id}
                    </span>
                    <span className="h-px w-8 bg-white/10" />
                    <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-semibold text-white/50">
                      {project.category}
                    </span>
                  </div>
                  
                  <h4 className="text-3xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-4 md:mb-10 max-w-4xl">
                    {project.title}
                  </h4>
                  
                  <p className="text-base sm:text-lg md:text-2xl text-white/50 leading-relaxed font-light max-w-3xl">
                    {project.description}
                  </p>
                </div>
                
                {/* Footer Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10 z-10 mt-6 sm:mt-12 md:mt-0 pt-6 sm:pt-8 md:pt-0 border-t border-[rgba(255,255,255,0.03)] md:border-none">
                  
                  <div className="flex flex-wrap gap-2 md:gap-3 max-w-2xl">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium text-white/70 tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Links */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex flex-wrap gap-4 md:gap-6 shrink-0">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onPointerDown={(e) => e.stopPropagation()} // Prevent drag conflict
                          className={`flex items-center gap-2 px-6 py-3 md:py-4 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] group ${
                            project.id === "02"
                              ? "bg-white text-black hover:bg-white/80"
                              : "border border-white/20 text-white hover:bg-white hover:text-black"
                          }`}
                          aria-label={`View GitHub repository: ${project.title}`}
                        >
                          <Code className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="uppercase tracking-widest text-xs">Code</span>
                        </a>
                      )}
                      
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onPointerDown={(e) => e.stopPropagation()} // Prevent drag conflict
                          className="flex items-center gap-2 px-6 py-3 md:py-4 rounded-full bg-white text-black font-medium hover:bg-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] group"
                          aria-label={`View live project: ${project.title}`}
                        >
                          <span className="uppercase tracking-widest text-xs">Live Site</span>
                          <ExternalLink className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-between mt-8 pt-8 border-t border-[rgba(255,255,255,0.05)]">
          <span className="font-mono text-xs tracking-widest text-white/50">
            {String(activeIndex + 1).padStart(2, '0')} / {String(numProjects).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="p-3 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-all disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              disabled={activeIndex === numProjects - 1}
              aria-label="Next project"
              className="p-3 rounded-full border border-white/10 text-white/70 hover:bg-white/5 transition-all disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

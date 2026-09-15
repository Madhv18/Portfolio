import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  // Prevent background scrolling while mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      window.history.pushState(null, '', href);
    }, 100);
  };

  return (
    <FadeIn delay={0} direction="down" duration={0.8} className="w-full relative z-50">
      <nav className="flex items-center justify-end md:justify-center px-6 pt-6 md:px-10 md:pt-8 w-full">
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex w-full items-center justify-between">
          {links.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href}
                className="text-light-text font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-light-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-white p-1 rounded-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Full-Height Mobile Navigation Overlay */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-0 w-full h-[100dvh] bg-[#0C0C0C]/98 backdrop-blur-md z-[100] flex flex-col justify-between px-6 pt-6 pb-12 md:hidden"
            >
              {/* Overlay Top Bar with Close Button */}
              <div className="flex items-center justify-end w-full">
                <button 
                  className="text-light-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] focus-visible:ring-white p-1 rounded-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-expanded="true"
                  aria-controls="mobile-navigation-menu"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Centered Navigation Links */}
              <nav className="flex flex-col items-center justify-center my-auto">
                <ul className="flex flex-col items-center gap-8 text-center">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-light-text text-2xl sm:text-3xl font-medium uppercase tracking-widest hover:text-white hover:opacity-80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C] focus-visible:ring-white rounded-sm py-2 px-4 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Subtle Brand Indicator */}
              <div className="text-center">
                <span className="text-xs uppercase tracking-widest text-light-text/40">
                  Madhv Darji · Software Developer
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </FadeIn>
  );
}

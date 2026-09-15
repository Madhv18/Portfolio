import { portfolio } from '../../data/portfolio';

export default function Footer() {
  const { identity } = portfolio;
  
  return (
    <footer className="w-full bg-background border-t border-white/10 pt-16 pb-8 px-6 md:px-10">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
        
        {/* Left Side: Identity & Links */}
        <div className="flex flex-col items-start gap-8">
          
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold uppercase tracking-widest text-light-text">
              {identity.name}
            </span>
            <span className="text-white/50 text-sm md:text-base font-light tracking-wide mt-1">
              {identity.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {identity.github && (
              <a 
                href={identity.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors uppercase"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
            )}
            {identity.linkedin && (
              <a 
                href={identity.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors uppercase"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
            )}
            {identity.email && (
              <a 
                href={`mailto:${identity.email}`} 
                className="text-sm font-medium tracking-wide text-white/70 hover:text-white transition-colors uppercase"
                aria-label={`Send email to ${identity.email}`}
              >
                Email
              </a>
            )}
          </div>
          
        </div>

        {/* Right Side: Copyright */}
        <div className="flex flex-col items-start md:items-end">
          <p className="font-mono text-xs text-white/30 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} {identity.name}
          </p>
        </div>

      </div>
    </footer>
  );
}

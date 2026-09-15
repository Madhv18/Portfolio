import { portfolio } from '../../data/portfolio';
import FadeIn from '../ui/FadeIn';
import MagneticButton from '../ui/MagneticButton';
import Button from '../ui/Button';
import HeroAvatarMagnet from '../ui/HeroAvatarMagnet';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-between overflow-x-clip px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 pt-[100px] z-10 -mt-[88px] sm:-mt-[96px]">
      
      {/* Spacer to push content down on desktop/tablet */}
      <div className="hidden sm:block sm:flex-1" />

      {/* Developer Avatar (Original Jack-style portrait, Cursor-Responsive) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-[80px] translate-y-0 sm:top-auto sm:bottom-0 pointer-events-none sm:pointer-events-auto"
      >
        <FadeIn delay={0.6} duration={0.8} direction="up" className="w-full flex justify-center">
          <HeroAvatarMagnet padding={450} strength={3}>
            <img 
              src="/images/hero-portrait.png" 
              alt="Madhv Darji - Software Developer" 
              className="w-full h-auto object-contain pointer-events-none drop-shadow-2xl" 
            />
          </HeroAvatarMagnet>
        </FadeIn>
      </div>

      {/* Left-Aligned Two-Line Heading & Mobile Supporting Text */}
      <div className="relative z-20 w-full overflow-hidden mt-[281px] sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} direction="up" duration={0.8}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-left text-[clamp(3rem,12vw,14rem)] md:text-[clamp(3.5rem,5.5vw,5.5rem)]">
            <span className="block">HI, I'M</span>
            <span className="block">MADHV</span>
          </h1>
        </FadeIn>

        {/* Supporting text directly below heading on mobile */}
        <FadeIn delay={0.35} direction="up" className="sm:hidden mt-4">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            {portfolio.hero.supportingText}
          </p>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-30 flex justify-between items-end w-full mt-auto">
        <FadeIn delay={0.35} direction="up" className="hidden sm:block">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
            {portfolio.hero.supportingText}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} direction="up" className="ml-auto">
          <MagneticButton>
            <Button 
              variant="contact" 
              href={`mailto:${portfolio.identity.email}`}
              aria-label="Contact Madhv Darji"
              title={`Email: ${portfolio.identity.email}`}
            >
              Contact Me
            </Button>
          </MagneticButton>
        </FadeIn>
      </div>
    </section>
  );
}

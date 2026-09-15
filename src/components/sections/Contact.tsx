import { portfolio } from '../../data/portfolio';
import FadeIn from '../ui/FadeIn';
import MagneticButton from '../ui/MagneticButton';
import SocialRail from '../layout/SocialRail';
import { Mail } from 'lucide-react';

export default function Contact() {
  const { identity } = portfolio;

  return (
    <section id="contact" className="w-full bg-background py-32 md:py-48 px-6 md:px-10 relative overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* Contact Social Rail on Left Side */}
      <SocialRail />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl aspect-square bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative z-50 pointer-events-auto">
        
        <FadeIn direction="up">
          <h2 className="uppercase tracking-[0.25em] text-xs md:text-sm font-medium text-light-text opacity-50 mb-6">
            Get In Touch
          </h2>
          
          <h3 className="font-bold text-5xl md:text-7xl lg:text-8xl text-light-text tracking-tight uppercase mb-8 md:mb-12 leading-none">
            Let's Work<br/>Together
          </h3>
          
          <p className="text-white/50 text-base md:text-lg max-w-md mx-auto leading-relaxed font-light mb-16 md:mb-24">
            I’m open to freelance projects, internships, full-time opportunities, and meaningful collaborations. If you’re building something ambitious or looking for a developer to join your team, I’d love to connect.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.2} className="relative z-50">
          <MagneticButton padding={100} strength={5}>
            <a 
              href={`mailto:${identity.email}`}
              className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 md:px-14 md:py-8 bg-white text-background rounded-full font-medium text-lg md:text-xl transition-transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              aria-label={`Send email to ${identity.email}`}
            >
              <span className="font-medium tracking-wide">Start a Conversation</span>
              <Mail className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </MagneticButton>
        </FadeIn>
        
      </div>
    </section>
  );
}

import AnimatedText from '../ui/AnimatedText';
import FadeIn from '../ui/FadeIn';

export default function About() {
  const finalAbout = "I’m a software developer focused on building modern, responsive web applications and full-stack platforms. I combine clean engineering with thoughtful UI to create digital products that are reliable, scalable, and built around real user needs.";

  return (
    <section id="about" className="relative w-full flex items-center justify-center py-20 md:py-32 px-6 md:px-10 overflow-hidden bg-background">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        
        <FadeIn direction="up">
          <h2 className="uppercase tracking-[0.25em] text-xs md:text-sm font-medium text-light-text opacity-50 mb-10 md:mb-14">
            About Me
          </h2>
        </FadeIn>
        
        <div className="font-medium text-[clamp(1.4rem,3.5vw,3rem)] leading-snug tracking-tight text-light-text max-w-4xl">
          <AnimatedText text={finalAbout} />
        </div>
        
        <FadeIn delay={0.3} direction="up" className="mt-16 md:mt-24">
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </FadeIn>

      </div>
    </section>
  );
}

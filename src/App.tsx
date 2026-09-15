import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageContainer from './components/layout/PageContainer';
import Hero from './components/sections/Hero';
import IntroLoader from './components/ui/IntroLoader';
import Marquee from './components/sections/Marquee';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Expertise from './components/sections/Expertise';
import Contact from './components/sections/Contact';
import GlowCursor from './components/ui/GlowCursor';

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    if (!isIntroComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isIntroComplete]);

  return (
    <>
      <AnimatePresence>
        {!isIntroComplete && (
          <IntroLoader onComplete={() => setIsIntroComplete(true)} />
        )}
      </AnimatePresence>

      <GlowCursor
        color="#67E8F9"
        secondaryColor="#A78BFA"
        trailLength={20}
        trailWidth={5}
        trailTaper={0.85}
        followSpeed={0.22}
        glowIntensity={1.3}
        glowSpread={0.85}
        hotspot={0.5}
        brightness={1.1}
        opacity={0.7}
        pulseSpeed={0.6}
        noiseStrength={0}
        idleFade
        idleTimeout={500}
        fadeDuration={500}
        blendMode="screen"
        maxDevicePixelRatio={1.0}
        enabled={isIntroComplete}
      >
        <PageContainer className="bg-background text-light-text flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Expertise />
            <Contact />
          </main>
          <Footer />
        </PageContainer>
      </GlowCursor>
    </>
  );
}

import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { Benefits } from '../sections/Benefits';
import { FAQ } from '../sections/FAQ';
import { FinalCTA } from '../sections/FinalCTA';
import { Footer } from '../sections/Footer';
import { Founder } from '../sections/Founder';
import { Hero } from '../sections/Hero';
import { Perks } from '../sections/Perks';
import { Problem } from '../sections/Problem';

export function LandingPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;
      const navbarHeight = window.innerWidth >= 768 ? 96 : 72;
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - navbarHeight,
        behavior: 'smooth',
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-[72px] md:pt-[96px]">
        <Hero />
        <Problem />
        <Benefits />
        <Perks />
        <FAQ />
        <Founder />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

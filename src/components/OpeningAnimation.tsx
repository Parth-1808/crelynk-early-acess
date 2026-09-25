import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logoSrc from '../assets/Untitled design (1)-Photoroom.png';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [canSkip, setCanSkip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsWrapperRef = useRef<HTMLDivElement>(null);
  
  // Animated references
  const logoCardRef = useRef<HTMLDivElement>(null);
  const earlyAccessBadgeRef = useRef<HTMLDivElement>(null);
  
  const sticker1Ref = useRef<HTMLDivElement>(null);
  const sticker2Ref = useRef<HTMLDivElement>(null);
  const sticker3Ref = useRef<HTMLDivElement>(null);
  
  const taglineRef = useRef<HTMLDivElement>(null);

  // Curtain references
  const cyanCurtainRef = useRef<HTMLDivElement>(null);
  const limeCurtainRef = useRef<HTMLDivElement>(null);
  const mainCurtainRef = useRef<HTMLDivElement>(null);

  // Timeline reference to kill on unmount/skip
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const handleSkip = () => {
    if (tlRef.current) {
      tlRef.current.kill();
    }
    
    // Snappy, energetic wipe on skip
    gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    })
    .to([logoCardRef.current, sticker1Ref.current, sticker2Ref.current, sticker3Ref.current, taglineRef.current], {
      scale: 0.85,
      opacity: 0,
      duration: 0.18,
      ease: 'power2.in'
    })
    .to(mainCurtainRef.current, {
      y: '-105%',
      duration: 0.45,
      ease: 'power3.inOut'
    }, 0.08)
    .to(limeCurtainRef.current, {
      y: '-105%',
      duration: 0.45,
      ease: 'power3.inOut'
    }, 0.12)
    .to(cyanCurtainRef.current, {
      y: '-105%',
      duration: 0.45,
      ease: 'power3.inOut'
    }, 0.16)
    .fromTo(document.querySelector('section'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      0.12
    );
  };

  useEffect(() => {
    // Accessibility check: prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: onComplete
      });
      return;
    }

    // Show skip button after 0.4s so it's quickly accessible during a longer animation
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 400);

    // Initial states: scale from 0.85/0.8 is much smoother and less jarring than 0 or 0.5
    gsap.set(logoCardRef.current, { scale: 0.85, rotate: -4, opacity: 0 });
    gsap.set(earlyAccessBadgeRef.current, { scale: 0.8, rotate: 15, opacity: 0 });
    
    gsap.set([sticker1Ref.current, sticker2Ref.current, sticker3Ref.current], {
      scale: 0.8,
      opacity: 0,
      rotate: 0,
      transformOrigin: '50% 50%'
    });

    const taglineWords = taglineRef.current?.querySelectorAll('.stamp-word');
    if (taglineWords) {
      gsap.set(taglineWords, { scale: 1.25, opacity: 0 });
    }

    // Set curtains initial state: all active covering screen
    gsap.set([cyanCurtainRef.current, limeCurtainRef.current, mainCurtainRef.current], {
      y: '0%'
    });

    // Create master timeline
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tlRef.current = tl;

    // --- STAGE 1: Logo Card Springy Pop (0.0s - 0.9s) ---
    tl.to(logoCardRef.current, {
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'back.out(1.2)' // Smooth, deliberate entry
    });

    // Pop early access badge (0.4s)
    tl.to(earlyAccessBadgeRef.current, {
      scale: 1,
      rotate: -3,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(1.3)'
    }, 0.4);

    // --- STAGE 2: Stickers Staggered Burst (0.7s - 1.8s) ---
    const stickers = [sticker1Ref.current, sticker2Ref.current, sticker3Ref.current];
    const stickerRotations = [-8, 6, -6];
    
    stickers.forEach((sticker, index) => {
      const popTime = 0.7 + index * 0.35; // Distinct spacing for a majestic rhythm
      tl.to(sticker, {
        scale: 1,
        opacity: 1,
        rotate: stickerRotations[index],
        duration: 0.75,
        ease: 'back.out(1.3)'
      }, popTime);
    });

    // --- STAGE 3: Tagline Word Stamp (1.8s - 2.5s) ---
    if (taglineWords) {
      taglineWords.forEach((word, idx) => {
        const stampTime = 1.8 + idx * 0.18; // Elegant pace for high legibility
        tl.to(word, {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out'
        }, stampTime);
      });
    }

    // --- STAGE 4: Visual Settle (2.5s - 3.2s) ---
    tl.to({}, { duration: 0.8 }); // Hold composition to let user take in the branding

    // --- STAGE 5: Staggered Curtain Wipe Reveal (3.2s - 4.3s) ---
    // Curtains slide up out of viewport. Main is top, Lime middle, Cyan bottom.
    // Slower curtain sweep (1.1s) using expo.inOut for a luxurious fluid feeling.
    tl.to(mainCurtainRef.current, {
      y: '-105%',
      duration: 1.1,
      ease: 'expo.inOut'
    }, 3.2);

    tl.to(limeCurtainRef.current, {
      y: '-105%',
      duration: 1.1,
      ease: 'expo.inOut'
    }, 3.35); // 150ms offset

    tl.to(cyanCurtainRef.current, {
      y: '-105%',
      duration: 1.1,
      ease: 'expo.inOut'
    }, 3.5); // 300ms offset

    // Slide up hero section of page to meet the reveal
    const heroSection = document.querySelector('section');
    if (heroSection) {
      tl.fromTo(heroSection, 
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
        3.3
      );
    }

    // Cleanup timers
    return () => {
      clearTimeout(skipTimer);
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] select-none overflow-hidden pointer-events-none"
    >
      {/* Cyan Curtain (Bottom Layer) */}
      <div
        ref={cyanCurtainRef}
        className="absolute inset-0 bg-[#00D9FF] z-[10] border-b-8 border-[#111]"
      />

      {/* Lime Curtain (Middle Layer) */}
      <div
        ref={limeCurtainRef}
        className="absolute inset-0 bg-[#C6FF00] z-[20] border-b-8 border-[#111]"
      />

      {/* Main Curtain (Top Layer with dot pattern, content container) */}
      <div
        ref={mainCurtainRef}
        className="absolute inset-0 bg-[#F7F7F2] z-[30] flex flex-col items-center justify-center border-b-8 border-[#111] pointer-events-auto"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23111111" fill-opacity="0.04" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E')`
        }}
      >
        {/* --- TRANSLUCENT DYNAMIC BLURRED THEMATIC SPRAY BACKGROUND (OPTIMIZED) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Corner Ambient Glow Blends */}
          <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#C6FF00]/15 blur-[90px] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#7B61FF]/15 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#FF2D78]/15 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#00D9FF]/15 blur-[90px] pointer-events-none" />

          {/* Spray blobs using pure CSS gradients and opacity instead of CPU-bound mix-blend modes */}
          <div 
            className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#C6FF00]/6 blur-[70px] opacity-80"
            style={{ animation: 'sprayDriftA 25s ease-in-out infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute top-[15%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#7B61FF]/6 blur-[80px] opacity-75"
            style={{ animation: 'sprayDriftB 30s ease-in-out infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute bottom-[20%] left-[25%] w-[45%] h-[45%] rounded-full bg-[#FF6B2C]/5 blur-[80px] opacity-70"
            style={{ animation: 'sprayDriftC 22s ease-in-out infinite', willChange: 'transform' }}
          />
          <div 
            className="absolute bottom-[15%] right-[20%] w-[40%] h-[40%] rounded-full bg-[#00D9FF]/5 blur-[80px] opacity-65"
            style={{ animation: 'sprayDriftD 35s ease-in-out infinite', willChange: 'transform' }}
          />

          {/* Fine spray speckle paint mist overlay */}
          <div className="absolute inset-0 opacity-[0.15]" style={{
            backgroundImage: `
              radial-gradient(circle, rgba(198, 255, 0, 0.3) 1px, transparent 1.5px),
              radial-gradient(circle, rgba(123, 97, 255, 0.2) 1px, transparent 1.5px),
              radial-gradient(circle, rgba(255, 107, 44, 0.2) 1px, transparent 1.5px),
              radial-gradient(circle, rgba(0, 200, 232, 0.2) 1px, transparent 1.5px)
            `,
            backgroundSize: '36px 36px, 50px 50px, 44px 44px, 56px 56px',
            backgroundPosition: '0 0, 15px 20px, 8px 30px, 22px 10px'
          }} />
        </div>

        {/* Container holding elements - expanded to h-[450px] for spacing */}
        <div 
          ref={elementsWrapperRef} 
          className="relative flex flex-col items-center justify-center max-w-2xl w-full h-[450px] px-6 z-10"
        >
          {/* --- STAGE 2: NEOBRUTALIST LOGO CARD WITH BRAND ICON --- */}
          <div
            ref={logoCardRef}
            className="relative z-20 bg-surface border-4 border-[#111] shadow-[8px_8px_0px_#111] px-6 py-4 sm:px-10 sm:py-5 flex items-center justify-center gap-3 sm:gap-4 shrink-0"
          >
            {/* Logo brand icon image exactly matching the navigation bar */}
            <img
              src={logoSrc}
              alt="Crelynk Logo"
              className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain shrink-0 select-none pointer-events-none"
            />

            {/* Logo Title (CRELYNK style matching layout) */}
            <span className="font-heading font-black text-3xl sm:text-5xl tracking-tight uppercase text-[#111] flex items-center select-none pointer-events-none">
              CRE
              <span className="text-[#C6FF00] text-stroke-2 text-fill-transparent">LYNK</span>
            </span>

            {/* Stenciled Rotated EARLY ACCESS badge stapled on logo card */}
            <div
              ref={earlyAccessBadgeRef}
              className="absolute -top-6 -right-6 bg-[#C6FF00] border-2 border-[#111] px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#111] uppercase tracking-wider shadow-[3px_3px_0px_#111] z-30 shrink-0"
            >
              Early Access
            </div>
          </div>

          {/* --- STAGE 3: POP-ART NEOBRUTALIST STICKERS --- */}
          {/* Sticker 1: India (Left side) */}
          <div
            ref={sticker1Ref}
            className="absolute -left-6 sm:left-0 top-14 z-10 bg-[#00D9FF] border-3 border-[#111] shadow-[4px_4px_0px_#111] px-4 py-2 font-heading font-bold text-xs uppercase text-[#111]"
          >
            BUILT FOR INDIA 🇮🇳
          </div>

          {/* Sticker 2: Escrow First (Bottom Right side - raised to avoid tagline overlap) */}
          <div
            ref={sticker2Ref}
            className="absolute -right-6 sm:right-0 bottom-28 z-10 bg-[#FF6B2C] border-3 border-[#111] shadow-[4px_4px_0px_#111] px-4 py-2 font-heading font-bold text-xs uppercase text-white"
          >
            ESCROW FIRST 💸
          </div>

          {/* Sticker 3: AI Matched (Top Right side) */}
          <div
            ref={sticker3Ref}
            className="absolute right-0 sm:right-6 top-4 z-10 bg-[#FF2D78] border-3 border-[#111] shadow-[4px_4px_0px_#111] px-4 py-2 font-heading font-bold text-xs uppercase text-white"
          >
            ⚡ AI MATCHED
          </div>

          {/* --- STAGE 4: TAGLINE STAMP WORD-BY-WORD --- */}
          <div
            ref={taglineRef}
            className="absolute bottom-2 flex flex-wrap justify-center items-center gap-y-3.5 gap-x-2.5 px-4 select-none pointer-events-none w-full"
          >
            {/* LYNK */}
            <span className="stamp-word inline-block font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase px-3.5 py-1.5 bg-[#C6FF00] border-3 border-[#111] rotate-[-2deg] shadow-[3px_3px_0px_#111] text-[#111] tracking-tight">
              LYNK
            </span>
            {/* BETWEEN */}
            <span className="stamp-word inline-block font-mono font-black text-sm sm:text-base md:text-lg uppercase tracking-widest text-[#111] mx-0.5">
              BETWEEN
            </span>
            {/* CREATORS */}
            <span className="stamp-word inline-block font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase px-3.5 py-1.5 bg-[#FF2D78] border-3 border-[#111] rotate-[3deg] shadow-[3px_3px_0px_#111] text-white tracking-tight">
              CREATORS
            </span>
            {/* AND */}
            <span className="stamp-word inline-block font-mono font-black text-sm sm:text-base md:text-lg uppercase tracking-widest text-[#111] mx-0.5">
              &
            </span>
            {/* BRANDS */}
            <span className="stamp-word inline-block font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase px-3.5 py-1.5 bg-[#FF6B2C] border-3 border-[#111] rotate-[-3deg] shadow-[3px_3px_0px_#111] text-white tracking-tight">
              BRANDS
            </span>
          </div>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        disabled={!canSkip}
        className={`absolute bottom-8 right-8 bg-[#C6FF00] hover:bg-[#b5e600] text-[#111] font-mono font-bold uppercase tracking-wider text-xs border-3 border-[#111] shadow-[4px_4px_0px_#111] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#111] transition-all px-5 py-2.5 rounded-none z-[100] pointer-events-auto ${
          canSkip ? 'opacity-100 scale-100 cursor-pointer' : 'opacity-0 scale-95 cursor-default'
        }`}
      >
        Skip Opening ➔
      </button>
    </div>
  );
}

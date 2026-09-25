import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button, Sticker } from '../components/ui';
import { SectionCartoons } from '../components/section-illustrations';
import { useWaitlistStats } from '../hooks/useWaitlistStats';

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };
    const rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, inView, duration]);

  return value;
}

export function Perks() {
  const {
    claimed_spots,
    total_spots,
    brand_spots_claimed,
    brand_total_spots,
    startup_spots_claimed,
    startup_total_spots,
  } = useWaitlistStats();

  const creatorProgressPct = total_spots > 0 ? Math.min((claimed_spots / total_spots) * 100, 100) : 0;
  const startupProgressPct = startup_total_spots > 0 ? Math.min((startup_spots_claimed / startup_total_spots) * 100, 100) : 0;
  const brandProgressPct = brand_total_spots > 0 ? Math.min((brand_spots_claimed / brand_total_spots) * 100, 100) : 0;

  const startupRemaining = Math.max(0, startup_total_spots - startup_spots_claimed);
  const brandRemaining = Math.max(0, brand_total_spots - brand_spots_claimed);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const creatorDisplay = useCountUp(claimed_spots, isInView);
  const startupDisplay = useCountUp(startup_spots_claimed, isInView, 1400);
  const brandDisplay = useCountUp(brand_spots_claimed, isInView, 1600);

  const perks = [
    'Free premium/growth access for first launch phase',
    'Founding badge & early profile visibility',
    'First wave onboarding',
    'Direct founder access & product feedback loop',
    'Ambassador eligibility',
  ];

  const startupPerks = [
    'AI-matched creators for your product niche',
    'Escrow protection on every campaign',
    'Founder onboarding + product demo session',
    'Early dashboard access before public launch',
  ];

  const brandPerks = [
    'Verified D2C-specialist creator matches',
    'Escrow-first payment on all collabs',
    'Dedicated founder onboarding call',
    'Campaign tracking before platform goes live',
  ];

  return (
    <section ref={sectionRef} className="py-24 px-4 md:px-8 bg-surface border-b-2 border-primary relative overflow-hidden">
      <SectionCartoons preset="perks" />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-12">

        {/* Creator perks card */}
        <div className="w-full bg-surface border-4 border-primary shadow-[8px_8px_0px_#111] p-8 md:p-12 relative">
          <Sticker className="absolute -top-6 -right-6 bg-lime text-primary scale-125" angle={12}>
            Limited Spots
          </Sticker>
          <Sticker className="absolute -bottom-6 -left-6 bg-orange text-primary scale-110" angle={-8}>
            Pre-launch only
          </Sticker>

          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-tight leading-[1.1] text-center">
            FOUNDING ACCESS COMES WITH PERKS
          </h2>

          <div className="bg-primary text-surface font-mono text-sm uppercase tracking-widest font-bold px-4 py-2 text-center mb-8 inline-block rotate-[-1deg] shadow-[4px_4px_0px_#FF2D78]">
            First wave gets launch-priority treatment
          </div>

          {/* Animated creator spots bar */}
          <div className="mb-10">
            <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">
              Founding spots: {creatorDisplay} / {total_spots} claimed
            </div>
            <div className="relative h-14 overflow-hidden border-2 border-primary bg-elevated shadow-[4px_4px_0px_#111]">
              <motion.div
                className="absolute inset-y-0 left-0 bg-lime"
                initial={{ width: '0%' }}
                animate={isInView ? { width: `${creatorProgressPct}%` } : { width: '0%' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-0 flex items-center justify-center font-heading text-lg md:text-xl font-black uppercase tracking-[0.16em] text-primary">
                Founding spots: {creatorDisplay} / {total_spots} claimed
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 w-full">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 bg-elevated border-2 border-primary p-4 shadow-[2px_2px_0px_#111] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#111] transition-all"
              >
                <div className="w-4 h-4 bg-cyan border-2 border-primary rounded-full shrink-0 mt-1" />
                <span className="font-body font-bold text-lg leading-tight">{p}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-purple/10 border-2 border-primary border-dashed p-6 mb-12">
            <h4 className="font-heading font-black text-xl uppercase tracking-tight mb-2 flex items-center gap-2">
              <span className="text-purple">*</span> Ambassador Upside
            </h4>
            <p className="font-body font-medium text-secondary">
              Selected founding ambassadors may unlock special long-term upside, community rewards, referral earnings, and strategic recognition.
              <br /><br />
              <span className="text-xs uppercase font-mono bg-surface px-1 border border-primary">*Subject to eligibility and program terms.</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button href="type-selector" variant="primary" className="text-lg py-4 px-8 scale-110" analytics="perks_cta">
              GET EARLY ACCESS NOW
            </Button>
          </div>
        </div>

        {/* Bottom two cards: Startups + Brands */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 50 Startup spots — cyan accent */}
          <div className="bg-primary text-surface border-4 border-primary shadow-[8px_8px_0px_#111] p-6 relative flex flex-col">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,224,255,0.1)_0%,transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />

            <Sticker className="absolute -top-5 -right-5 bg-cyan text-primary" angle={8}>
              50 Spots
            </Sticker>

            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-3 inline-flex border border-surface/20 bg-surface/8 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-surface/70 self-start">
                Founding Startup Access
              </div>

              <h3 className="font-heading font-black text-3xl md:text-4xl mb-3 uppercase tracking-tight leading-[1.1]">
                50 STARTUP<br />FOUNDING SPOTS
              </h3>

              <p className="font-body text-sm font-medium text-surface/65 mb-5 leading-relaxed">
                SaaS, apps, and early-stage tech startups only. AI-matched creators, escrow-protected campaigns, founder-level onboarding.
              </p>

              {/* Startup progress bar */}
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-surface/55">{startupDisplay} / {startup_total_spots} secured</span>
                  <span className="text-cyan">{startupRemaining} left</span>
                </div>
                <div className="relative h-8 overflow-hidden border-2 border-surface/20 bg-surface/8 shadow-[3px_3px_0px_rgba(0,0,0,0.5)]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-cyan"
                    initial={{ width: '0%' }}
                    animate={isInView ? { width: `${Math.max(startupProgressPct, 2)}%` } : { width: '0%' }}
                    transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>
              </div>

              {/* Startup perks */}
              <div className="space-y-2 mb-6 flex-1">
                {startupPerks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2 text-surface/80">
                    <div className="w-3 h-3 bg-cyan border border-primary rounded-full shrink-0 mt-1" />
                    <span className="font-body text-sm font-medium leading-snug">{perk}</span>
                  </div>
                ))}
              </div>

              <Button
                href="form"
                formType="startup"
                variant="cyan"
                analytics="startup_spots_cta"
                className="w-full justify-center mt-auto"
              >
                SECURE YOUR SPOT
              </Button>
            </div>
          </div>

          {/* 25 Brand spots — magenta accent */}
          <div className="bg-primary text-surface border-4 border-primary shadow-[8px_8px_0px_#111] p-6 relative flex flex-col">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,45,120,0.1)_0%,transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />

            <Sticker className="absolute -top-5 -left-5 bg-magenta text-surface" angle={-8}>
              25 Spots
            </Sticker>

            <div className="relative z-10 flex flex-col flex-1">
              <div className="mb-3 inline-flex border border-surface/20 bg-surface/8 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-surface/70 self-start">
                Founding Brand Access
              </div>

              <h3 className="font-heading font-black text-3xl md:text-4xl mb-3 uppercase tracking-tight leading-[1.1]">
                25 BRAND<br />FOUNDING SPOTS
              </h3>

              <p className="font-body text-sm font-medium text-surface/65 mb-5 leading-relaxed">
                D2C brands, FMCG, and agencies only. Verified creator matches, escrow-first collabs, and a dedicated onboarding call with the founder.
              </p>

              {/* Brand progress bar */}
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                  <span className="text-surface/55">{brandDisplay} / {brand_total_spots} secured</span>
                  <span className="text-magenta">{brandRemaining} left</span>
                </div>
                <div className="relative h-8 overflow-hidden border-2 border-surface/20 bg-surface/8 shadow-[3px_3px_0px_rgba(0,0,0,0.5)]">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-magenta"
                    initial={{ width: '0%' }}
                    animate={isInView ? { width: `${Math.max(brandProgressPct, 2)}%` } : { width: '0%' }}
                    transition={{ duration: 1.8, ease: 'easeOut', delay: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>
              </div>

              {/* Brand perks */}
              <div className="space-y-2 mb-6 flex-1">
                {brandPerks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2 text-surface/80">
                    <div className="w-3 h-3 bg-magenta border border-primary rounded-full shrink-0 mt-1" />
                    <span className="font-body text-sm font-medium leading-snug">{perk}</span>
                  </div>
                ))}
              </div>

              <Button
                href="form"
                formType="brand"
                variant="magenta"
                analytics="brand_spots_cta"
                className="w-full justify-center mt-auto"
              >
                SECURE YOUR SPOT
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Rocket, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { FormTrigger } from '../components/form-panel';
import { BubbleBackgroundDemo } from '../components/animate-ui/components/backgrounds/bubble';
import { AIMatchEngine } from '../sections/AIMatchEngine';
import { Alternatives } from '../sections/Alternatives';
import { FinalCTA } from '../sections/FinalCTA';
import { Footer } from '../sections/Footer';
import { WhatWereBuilding } from '../sections/WhatWereBuilding';
import { WhyCrelynk } from '../sections/WhyCrelynk';

const tracks = [
  {
    label: 'Brands',
    title: 'For D2C and growth teams',
    copy:
      'Use AI to shortlist creators, run escrow-protected collabs, and track results without juggling agencies, DMs, and spreadsheets.',
    formType: 'brand' as const,
    cta: 'Join As Brand',
    tone: 'bg-cyan text-primary',
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    label: 'Startups',
    title: 'Startup sub-track',
    copy:
      'Launch creator marketing with lean budgets using revenue-share or fixed campaigns. Get the startup-specific onboarding and matching flow.',
    formType: 'startup' as const,
    cta: 'Join As Startup',
    tone: 'bg-orange text-primary',
    icon: <Rocket className="h-6 w-6" />,
  },
];

function BrandsStartupsSection() {
  return (
    <section
      id="brands-startups"
      className="relative overflow-hidden border-b-2 border-primary bg-elevated px-4 py-24 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-20" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
            Brand Access Tracks
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-primary md:text-5xl">
            Brands + Startups
          </h2>
          <p className="mt-4 font-body text-lg font-medium text-secondary">
            Two entry paths, same platform core. Pick the track that matches your growth stage.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {tracks.map((track) => (
            <div
              key={track.label}
              className={`border-2 border-primary p-7 shadow-hard ${track.tone}`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 border-2 border-primary bg-surface px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-[2px_2px_0px_#111]">
                  {track.icon}
                  {track.label}
                </div>
              </div>
              <h3 className="font-heading text-3xl font-black uppercase tracking-tight">
                {track.title}
              </h3>
              <p className="mt-4 font-body text-base font-semibold leading-relaxed">
                {track.copy}
              </p>
              <FormTrigger
                formType={track.formType}
                className="mt-6 inline-flex items-center justify-center border-2 border-primary bg-surface px-5 py-3 font-heading text-sm font-black uppercase tracking-wide text-primary shadow-hard transition-all hover:-translate-y-0.5 hover:shadow-hard-hover"
              >
                {track.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </FormTrigger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampaignConsoleMockup() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Briefing & Specs',
      desc: 'Target parameters & niche configured',
      activeStatus: 'Configuring...',
      finalStatus: 'Configured',
      pendingStatus: 'Waiting',
      accentColor: 'border-purple text-purple bg-purple/5',
      badgeColor: 'text-purple bg-purple/10 border-purple/20',
    },
    {
      num: '02',
      title: 'AI-Matched Shortlist',
      desc: '14 verified creators matched',
      activeStatus: 'Matching...',
      finalStatus: 'Ready (14)',
      pendingStatus: 'Waiting',
      accentColor: 'border-cyan text-cyan bg-cyan/5',
      badgeColor: 'text-cyan bg-cyan/10 border-cyan/20',
    },
    {
      num: '03',
      title: 'Escrow Protection',
      desc: 'Payment terms secured in escrow',
      activeStatus: 'Securing...',
      finalStatus: 'Secured',
      pendingStatus: 'Waiting',
      accentColor: 'border-orange text-orange bg-orange/5',
      badgeColor: 'text-orange bg-orange/10 border-orange/20',
    },
    {
      num: '04',
      title: 'Campaign Execution',
      desc: 'Content scheduler & attribution active',
      activeStatus: 'Activating...',
      finalStatus: 'Active',
      pendingStatus: 'Waiting',
      accentColor: 'border-lime text-lime bg-lime/5',
      badgeColor: 'text-lime bg-lime/10 border-lime/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.55 }}
      className="relative"
    >
      {/* Glowing Backlight */}
      <div className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-r from-purple via-cyan to-lime opacity-15 blur-xl" />
      
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="relative border-2 border-primary bg-surface/90 shadow-hard p-5 md:p-6 rounded-[24px] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary/70">
              Campaign Console
            </span>
          </div>
          <div className="rounded-full bg-lime/10 px-2.5 py-0.5 font-mono text-[8px] font-bold text-lime uppercase tracking-wide border border-lime/30 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-lime animate-ping shrink-0" />
            Live Monitor
          </div>
        </div>
        
        <div className="space-y-3.5 text-left">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            const isPending = idx > activeStep;

            return (
              <motion.div
                key={step.num}
                initial={false}
                animate={{
                  scale: isActive ? 1.02 : 1,
                  opacity: isPending ? 0.45 : 1,
                  borderColor: isActive ? '#111111' : 'rgba(17,17,17,0.08)',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                }}
                transition={{ duration: 0.35 }}
                className={`flex items-start gap-3 border p-3 rounded-xl transition-all shadow-sm ${
                  isActive ? 'border-primary shadow-md' : 'border-primary/5'
                }`}
              >
                {/* Number Circle */}
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 text-[10px] font-bold border transition-colors ${
                    isCompleted
                      ? 'bg-lime/20 border-lime text-lime'
                      : isActive
                        ? `${step.accentColor} border-2`
                        : 'bg-elevated/40 border-primary/20 text-primary/50'
                  }`}
                >
                  {isCompleted ? '✓' : step.num}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`font-heading text-xs font-bold uppercase transition-colors ${
                    isActive ? 'text-primary' : 'text-primary/80'
                  }`}>
                    {step.title}
                  </div>
                  <div className="font-body text-[11px] font-medium text-secondary mt-0.5">
                    {step.desc}
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded shrink-0 border transition-all ${
                    isCompleted
                      ? 'text-lime bg-lime/10 border-lime/20'
                      : isActive
                        ? `${step.badgeColor} animate-pulse`
                        : 'text-secondary/40 bg-elevated border-primary/5'
                  }`}
                >
                  {isCompleted ? step.finalStatus : isActive ? step.activeStatus : step.pendingStatus}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BrandsPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-[72px] md:pt-[96px]">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b-2 border-primary bg-surface py-20 px-4 md:px-8 lg:py-28">
          {/* Realistic Background Image with Parallax look */}
          <div
            className="absolute inset-0 bg-cover bg-center select-none pointer-events-none"
            style={{
              backgroundImage: 'url(/brand_hero_bg.png)',
            }}
          />
          {/* Dark Premium Overlays */}
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/50 to-purple-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-background" />

          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading, description, and CTAs */}
              <div className="lg:col-span-7 text-left">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-surface/10 bg-surface/8 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-surface/70 backdrop-blur-xl mb-6"
                >
                  <Sparkles className="w-3.5 h-3.5 text-lime" /> CreLynk For Growth Teams
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-surface leading-[0.95]"
                >
                  Build Better <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple via-cyan to-lime">
                    Brand Collabs
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 max-w-xl font-body text-base md:text-lg font-semibold leading-relaxed text-surface/75"
                >
                  This page is focused on brands and startups: how CreLynk handles briefing, matching, payments, and campaign execution in one unified stack.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <FormTrigger
                    formType="brand"
                    className="inline-flex items-center gap-2 border-2 border-primary bg-[#7b61ff] text-surface px-8 py-4 font-heading font-black uppercase text-sm shadow-hard hover:-translate-y-0.5 hover:shadow-hard-hover transition-all"
                  >
                    Join as Brand <ArrowRight className="w-4 h-4" />
                  </FormTrigger>
                  <FormTrigger
                    formType="startup"
                    className="inline-flex items-center gap-2 border-2 border-primary bg-[#ff6b2c] text-primary px-8 py-4 font-heading font-black uppercase text-sm shadow-hard hover:-translate-y-0.5 hover:shadow-hard-hover transition-all"
                  >
                    Join as Startup <Rocket className="w-4 h-4" />
                  </FormTrigger>
                </motion.div>
              </div>

              {/* Right Column: Interactive Glassmorphic Console Mockup */}
              <div className="lg:col-span-5">
                <CampaignConsoleMockup />
              </div>

            </div>
          </div>
        </section>
        <WhatWereBuilding />
        <AIMatchEngine />
        <WhyCrelynk />
        <BrandsStartupsSection />
        <Alternatives />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

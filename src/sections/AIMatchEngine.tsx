import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bot, CircleDollarSign, MapPin, Sparkles, Target, Star, Zap, Asterisk, Flame } from 'lucide-react';
import { Sticker } from '../components/ui';

const processSteps = [
  {
    title: 'Post Campaign',
    label: 'Launch Brief',
    copy: 'Post your campaign, budget range, audience, and delivery format. CreLynk turns it into match-ready signals.',
    stat: '86% faster shortlisting',
    orb: 'bg-violet-500/20',
    icon: <Star className="h-5 w-5 text-amber-300" />,
  },
  {
    title: 'AI Matches Creators',
    label: 'Score & Rank',
    copy: 'The engine ranks creators by location, engagement, views/reel, audience fit, and price.',
    stat: '94% match accuracy',
    orb: 'bg-cyan-400/20',
    icon: <Zap className="h-5 w-5 text-cyan-300" />,
  },
  {
    title: 'Content Goes Live',
    label: 'Activate Story',
    copy: 'Creators deliver content with clear scope, and the platform captures performance instantly.',
    stat: '20% faster campaign launch',
    orb: 'bg-amber-400/20',
    icon: <Sparkles className="h-5 w-5 text-violet-300" />,
  },
  {
    title: 'Track & Grow',
    label: 'Measure ROI',
    copy: 'Every completed collab feeds the model so future matches become smarter.',
    stat: 'Smarter each deal',
    orb: 'bg-lime-400/20',
    icon: <CircleDollarSign className="h-5 w-5 text-lime-300" />,
  },
];

const businessTypes = [
  'D2C fashion',
  'Health & wellness',
  'Food brands',
  'Travel experiences',
  'Local retail',
  'Events & activations',
  'Beauty launches',
  'Creator-led drops',
];

const suggestions = [
  {
    name: 'Priya S.',
    niche: 'Streetwear',
    followers: '34K',
    location: 'Chandigarh',
    match: '94% Match',
    score: 94,
  },
  {
    name: 'Aryan K.',
    niche: 'Lifestyle',
    followers: '28K',
    location: 'Delhi',
    match: '91% Match',
    score: 91,
  },
  {
    name: 'Meera T.',
    niche: 'Beauty',
    followers: '41K',
    location: 'Mumbai',
    match: '88% Match',
    score: 88,
  },
];

const filterPills = [
  'Ranked by conversion fit - not just followers',
  'Auto-notified via WhatsApp the moment they match',
  'Negotiation window opens on acceptance',
];

const FloatingShape = ({ delay = 0, className, children }: { delay?: number; className?: string; children: React.ReactNode }) => (
  <motion.div
    className={`absolute pointer-events-none z-0 ${className}`}
    animate={{ y: [0, -18, 0], rotate: [0, 7, -7, 0], scale: [1, 1.05, 1] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

const FloatingBlob = FloatingShape;


export function AIMatchEngine() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  const active = processSteps[activeStep];

  return (
    <section id="ai-match-engine" className="relative overflow-hidden border-b-2 border-primary bg-[#090a12] px-4 py-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(148,0,211,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute left-8 top-20 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-36 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 bottom-12 h-48 w-48 rounded-full bg-lime-400/15 blur-3xl" />

      <FloatingShape className="left-[6%] top-[10%] text-violet-400" delay={0.5}>
        <Star className="h-16 w-16 drop-shadow-[3px_3px_0px_#000]" fill="currentColor" strokeWidth={2} stroke="#000" />
      </FloatingShape>
      <FloatingShape className="right-[10%] top-[18%] text-cyan-300" delay={1}>
        <Zap className="h-20 w-20 drop-shadow-[3px_3px_0px_#000]" fill="currentColor" strokeWidth={2} stroke="#000" />
      </FloatingShape>
      <FloatingShape className="bottom-[12%] left-[12%] text-lime-300" delay={1.5}>
        <Asterisk className="h-16 w-16 drop-shadow-[3px_3px_0px_#000]" color="#000" strokeWidth={4} />
      </FloatingShape>
      <FloatingShape className="bottom-[20%] right-[14%] text-pink-400" delay={2}>
        <Flame className="h-14 w-14 drop-shadow-[3px_3px_0px_#000]" fill="currentColor" strokeWidth={2} stroke="#000" />
      </FloatingShape>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Sticker className="mb-6 bg-surface text-primary" angle={-4}>
            Match Engine Preview
          </Sticker>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
            The right creator. Matched before you even search.
          </h2>
          <p className="mt-4 max-w-3xl font-body text-lg font-semibold leading-relaxed text-slate-300 md:text-xl">
            Most platforms make you search through hundreds of profiles. CreLynk does the thinking for you.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-[#222] bg-[#111111] p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
              <p className="font-body text-base leading-relaxed text-slate-300">
                The moment a brand posts a collab, our AI engine ranks creators by location match, engagement rate, views per reel, audience fit, and price — then notifies the top matches directly on WhatsApp.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#222] bg-[#111111] p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
              <p className="font-body text-base leading-relaxed text-slate-300">
                Creators don&apos;t apply. They are selected, invited, and notified — so your launch happens faster and with less friction.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-6">
            <div className="rounded-[24px] border border-[#222] bg-[#0b0d16] p-6 shadow-[0_0_90px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                {processSteps.map((step, index) => {
                  const selected = index === activeStep;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`relative min-w-[10rem] rounded-full border px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                        selected
                          ? 'border-amber-400 bg-white/10 text-white shadow-[0_0_0_1px_rgba(193,123,43,0.18)]'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <span className="block text-[10px] font-mono uppercase tracking-[0.28em] text-slate-400">
                        {step.label}
                      </span>
                      <span className="mt-1 block text-lg font-black uppercase tracking-tight leading-tight">
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#222] bg-[#11131d] p-8">
                <div className={`absolute -right-16 top-16 h-48 w-48 rounded-full blur-3xl ${active.orb}`} />
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-amber-400 via-cyan-400 to-lime-400 opacity-60" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10"
                  >
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                      {active.icon}
                    </div>
                    <div className="mb-3 text-sm uppercase tracking-[0.28em] text-slate-400">Process step</div>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                      {active.title}
                    </h3>
                    <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-slate-300">
                      {active.copy}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_10px_rgba(255,255,255,0.08)]">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      {active.stat}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {processSteps.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Go to step ${index + 1}`}
                        onClick={() => setActiveStep(index)}
                        className={`h-3 w-3 rounded-full transition-colors ${
                          index === activeStep ? 'bg-amber-400' : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPaused((prev) => !prev)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.28em] text-slate-200 transition hover:bg-white/10"
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {filterPills.map((pill, index) => (
              <div key={pill} className={`rounded-full border border-[#222] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] shadow-[3px_3px_0_rgba(0,0,0,0.18)] ${index % 2 === 0 ? 'bg-[#11161e] text-amber-300' : 'bg-[#0f1626] text-white'}`}>
                {pill}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex w-full max-w-3xl items-center justify-center rounded-[1.5rem] border border-[#222] bg-[#0b0f19] px-6 py-5 text-center font-heading text-lg font-black uppercase tracking-tight text-white shadow-[0_0_40px_rgba(0,0,0,0.15)]">
              The more collabs completed on CreLynk, the smarter your matches get. Every completed deal makes the next one better.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, TrendingUp, Megaphone, ArrowRight, ArrowDown, CheckCircle2, Store, Users, BarChart3, Zap } from 'lucide-react';
import { FormTrigger } from '../components/form-panel';

const processSteps = [
  {
    id: 1,
    label: 'Post Your Campaign',
    tagline: 'Tell us what you need',
    description:
      'Describe your local business, set your budget, pick your city, and define what kind of creator content you want — reels, stories, walk-in reviews, or event coverage.',
    accent: '#C6FF00',
    accentBg: 'rgba(198,255,0,0.12)',
    icon: <Megaphone className="w-6 h-6" />,
    image: '/images/localites/post-campaign.png',
    stats: [
      { label: 'Setup Time', value: '< 5 min' },
      { label: 'Campaign Types', value: '8+' },
    ],
  },
  {
    id: 2,
    label: 'AI Matches Creators',
    tagline: 'Smart. Local. Verified.',
    description:
      'Our AI engine scans verified creators near your location — matching by niche, engagement rate, audience demographics, and past campaign performance. No cold DMs.',
    accent: '#7B61FF',
    accentBg: 'rgba(123,97,255,0.12)',
    icon: <Sparkles className="w-6 h-6" />,
    image: '/images/localites/ai-match.png',
    stats: [
      { label: 'Match Accuracy', value: '94%' },
      { label: 'Avg. Response', value: '< 2 hrs' },
    ],
  },
  {
    id: 3,
    label: 'Content Goes Live',
    tagline: 'Creators do what they do best',
    description:
      'Matched creators visit your location, experience your product or service, and produce authentic content — Instagram reels, stories, Google reviews, and UGC assets you own.',
    accent: '#FF6B2C',
    accentBg: 'rgba(255,107,44,0.12)',
    icon: <Users className="w-6 h-6" />,
    image: '/images/localites/content-creation.png',
    stats: [
      { label: 'Content Types', value: '5+' },
      { label: 'Avg. Reach', value: '25K+' },
    ],
  },
  {
    id: 4,
    label: 'Track & Grow',
    tagline: 'Real results, real growth',
    description:
      'See exactly how your campaigns perform — foot traffic, social reach, new followers, and ROI. Repeat what works. Scale across locations. CreLynk tracks everything.',
    accent: '#00D9FF',
    accentBg: 'rgba(0,217,255,0.12)',
    icon: <TrendingUp className="w-6 h-6" />,
    image: '/images/localites/results-growth.png',
    stats: [
      { label: 'Avg. ROI', value: '4.2x' },
      { label: 'Repeat Rate', value: '78%' },
    ],
  },
];

const marketingHighlights = [
  {
    icon: <MapPin className="w-5 h-5" />,
    title: 'City-First Targeting',
    copy: 'Reach audiences in your exact neighborhood, not random followers 1000 miles away.',
    accent: '#C6FF00',
  },
  {
    icon: <Store className="w-5 h-5" />,
    title: 'Built for Local',
    copy: 'Cafes, gyms, salons, restaurants, retail, real estate — designed for walk-in businesses.',
    accent: '#7B61FF',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Zero Risk Start',
    copy: 'No upfront fees for founding members. Pay only when content delivers results.',
    accent: '#FF6B2C',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Full Transparency',
    copy: 'Every view, click, and walk-in tracked. No guessing — just data-driven growth.',
    accent: '#00D9FF',
  },
];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  return (
    <span className="font-heading text-3xl md:text-4xl font-black text-primary tabular-nums">
      {value}{suffix}
    </span>
  );
}

export function LocalitesProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 15s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const currentStep = processSteps[activeStep];

  return (
    <>
      {/* ── Process Flow Section ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-primary bg-primary px-4 py-24 md:px-8 md:py-32">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-[0.04] mix-blend-screen" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 20% 50%, ${currentStep.accentBg}, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(123,97,255,0.08), transparent 60%)`,
            transition: 'background 0.8s ease',
          }}
        />
        {/* Animated accent orbs */}
        <motion.div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            background: currentStep.accent,
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 25, -15, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '5%', right: '10%', background: '#7B61FF' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-flex items-center gap-2 border border-surface/15 bg-surface/5 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-surface/50 mb-6 backdrop-blur-sm">
              <MapPin className="w-3 h-3" /> How It Works
            </span>
            <h2 className="mt-6 font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-surface leading-[0.95]">
              From Sign-Up To{' '}
              <span
                className="relative inline-block"
                style={{
                  background: `linear-gradient(135deg, #C6FF00 0%, #00D9FF 50%, #7B61FF 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                City-Wide Buzz
              </span>
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-surface/50 max-w-2xl mx-auto font-medium">
              4 simple steps. No cold DMs. No agency fees. Just real creators making real content for your local business.
            </p>
          </motion.div>

          {/* Step navigation pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {processSteps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 font-heading text-xs md:text-sm font-bold uppercase tracking-wide transition-all border-2 ${
                  activeStep === index
                    ? 'border-surface/40 bg-surface/10 text-surface shadow-[0_0_20px_rgba(255,255,255,0.08)]'
                    : 'border-surface/10 bg-surface/[0.03] text-surface/40 hover:text-surface/70 hover:border-surface/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 border-2 font-mono text-[10px] md:text-xs font-black"
                  style={{
                    borderColor: activeStep === index ? step.accent : 'rgba(255,255,255,0.15)',
                    color: activeStep === index ? step.accent : 'rgba(255,255,255,0.35)',
                    backgroundColor: activeStep === index ? `${step.accent}15` : 'transparent',
                  }}
                >
                  {step.id}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
                {activeStep === index && (
                  <motion.div
                    layoutId="activeStepIndicator"
                    className="absolute -bottom-0.5 left-2 right-2 h-[3px]"
                    style={{ backgroundColor: step.accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Main content area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Left: Content */}
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 border-2 shadow-[3px_3px_0px_rgba(255,255,255,0.08)]"
                    style={{ borderColor: currentStep.accent, color: currentStep.accent, backgroundColor: currentStep.accentBg }}
                  >
                    {currentStep.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-surface/35">
                      Step {currentStep.id} of {processSteps.length}
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight text-surface">
                      {currentStep.label}
                    </h3>
                  </div>
                </div>

                <p
                  className="font-heading text-base md:text-lg font-bold uppercase tracking-wide mb-4"
                  style={{ color: currentStep.accent }}
                >
                  {currentStep.tagline}
                </p>

                <p className="font-body text-base md:text-lg text-surface/65 font-medium leading-relaxed mb-8">
                  {currentStep.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-8">
                  {currentStep.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex-1 border-2 border-surface/10 bg-surface/[0.04] px-4 py-4 backdrop-blur-sm"
                    >
                      <div className="font-heading text-2xl md:text-3xl font-black" style={{ color: currentStep.accent }}>
                        {stat.value}
                      </div>
                      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-surface/40 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {processSteps.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 rounded-full cursor-pointer"
                      animate={{
                        width: i === activeStep ? 32 : 8,
                        backgroundColor: i === activeStep ? currentStep.accent : 'rgba(255,255,255,0.15)',
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleStepClick(i)}
                    />
                  ))}
                  <span className="ml-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-surface/30">
                    {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                  </span>
                </div>
              </div>

              {/* Right: Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative overflow-hidden border-2 border-surface/15 bg-surface/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                  {/* Accent glow behind image */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${currentStep.accent}, transparent 70%)`,
                    }}
                  />
                  <motion.img
                    key={currentStep.image}
                    src={currentStep.image}
                    alt={currentStep.label}
                    className="relative z-10 w-full aspect-[4/3] object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Bottom overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-primary/90 to-transparent px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentStep.accent }}
                      />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-surface/70">
                        {currentStep.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating step number */}
                <motion.div
                  className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-14 h-14 md:w-16 md:h-16 border-3 flex items-center justify-center font-heading text-2xl md:text-3xl font-black z-30 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
                  style={{
                    borderColor: currentStep.accent,
                    backgroundColor: currentStep.accent,
                    color: '#111',
                  }}
                  animate={{ rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {currentStep.id}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Marketing Highlights ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-primary bg-surface px-4 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(198,255,0,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(0,217,255,0.08),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary mb-4">
              Why Localites Choose CreLynk
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-primary">
              Built Different For{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Local</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-lime/40 -z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {marketingHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative border-2 border-primary bg-surface p-6 shadow-hard hover:-translate-y-1 hover:shadow-hard-hover transition-all"
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: highlight.accent }}
                />
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center border-2 border-primary shadow-[2px_2px_0px_#111]"
                  style={{ backgroundColor: highlight.accent }}
                >
                  {highlight.icon}
                </div>
                <h3 className="font-heading text-lg font-black uppercase tracking-tight text-primary mb-2">
                  {highlight.title}
                </h3>
                <p className="font-body text-sm font-medium text-secondary leading-relaxed">
                  {highlight.copy}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <FormTrigger
              formType="localite"
              analytics="localites_process_cta"
              className="inline-flex items-center gap-2 border-2 border-primary bg-lime px-8 py-4 font-heading font-black uppercase text-base text-primary shadow-hard hover:-translate-y-0.5 hover:shadow-hard-hover transition-all"
            >
              Join As Localite <ArrowRight className="w-5 h-5" />
            </FormTrigger>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              <CheckCircle2 className="w-4 h-4 text-lime" />
              Free for founding members
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Social Proof Ticker ──────────────────────────────────────────── */}
      <div className="overflow-hidden border-b-2 border-primary py-3 bg-elevated">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...Array(2)].flatMap((_, setIdx) => [
            <span key={`${setIdx}-1`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ CAFES
            </span>,
            <span key={`${setIdx}-2`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ GYMS
            </span>,
            <span key={`${setIdx}-3`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ SALONS
            </span>,
            <span key={`${setIdx}-4`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ RESTAURANTS
            </span>,
            <span key={`${setIdx}-5`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ STREETWEAR
            </span>,
            <span key={`${setIdx}-6`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ REAL ESTATE
            </span>,
            <span key={`${setIdx}-7`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ CO-WORKING
            </span>,
            <span key={`${setIdx}-8`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ EVENTS
            </span>,
            <span key={`${setIdx}-9`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ RETAIL
            </span>,
            <span key={`${setIdx}-10`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/50 shrink-0">
              ★ HYPERLOCAL
            </span>,
          ])}
        </motion.div>
      </div>
    </>
  );
}

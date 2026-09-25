import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Camera,
  DollarSign,
  Eye,
  Shield,
  Star,
  Target,
  Award,
} from 'lucide-react';
import { FormTrigger } from '../components/form-panel';

/* ─── Process Steps ───────────────────────────────────────────────────────── */

const creatorSteps = [
  {
    id: 1,
    label: 'Discover Collabs',
    tagline: 'Your feed, your niche, your city',
    description:
      'Browse curated brand campaigns that match your niche, follower range, and city. No more cold DMs or chasing brands — the right opportunities come to you.',
    accent: '#C6FF00',
    accentDark: '#9ACC00',
    accentBg: 'rgba(198,255,0,0.10)',
    icon: <Eye className="w-6 h-6" />,
    image: '/images/creators/discover-collabs.png',
    stats: [
      { label: 'Avg. Matches/Week', value: '12+' },
      { label: 'Niche Fit Rate', value: '93%' },
    ],
  },
  {
    id: 2,
    label: 'Pitch & Get Picked',
    tagline: 'Show your value, win the brief',
    description:
      'Send quick pitches with your creative ideas. Brands see your profile, engagement data, and past work — then pick the best fit. Fast, transparent, no gatekeepers.',
    accent: '#7B61FF',
    accentDark: '#6B51EF',
    accentBg: 'rgba(123,97,255,0.10)',
    icon: <Target className="w-6 h-6" />,
    image: '/images/creators/pitch-brands.png',
    stats: [
      { label: 'Avg. Response', value: '< 4 hrs' },
      { label: 'Win Rate', value: '38%' },
    ],
  },
  {
    id: 3,
    label: 'Create & Deliver',
    tagline: 'Do what you do best',
    description:
      'Visit locations, shoot content, deliver reels, stories, and UGC — all tracked inside CreLynk. Brands approve deliverables in one place. No back-and-forth chaos.',
    accent: '#FF6B2C',
    accentDark: '#E55B1C',
    accentBg: 'rgba(255,107,44,0.10)',
    icon: <Camera className="w-6 h-6" />,
    image: '/images/ambassadors/creator-05.jpg',
    stats: [
      { label: 'Content Types', value: '6+' },
      { label: 'Approval Time', value: '< 24h' },
    ],
  },
  {
    id: 4,
    label: 'Get Paid Safely',
    tagline: 'Escrow-backed. Always.',
    description:
      'Payments are locked in escrow before you start creating. Once the brand approves, funds release instantly. No chasing invoices. No ghosting. Your work = your money.',
    accent: '#00D9FF',
    accentDark: '#00B8D9',
    accentBg: 'rgba(0,217,255,0.10)',
    icon: <DollarSign className="w-6 h-6" />,
    image: '/images/redesign/creator_magic.png',
    stats: [
      { label: 'Payout Speed', value: '< 48h' },
      { label: 'Payment Safety', value: '100%' },
    ],
  },
];

/* ─── Reputation Perks ────────────────────────────────────────────────────── */

const reputationPerks = [
  {
    icon: <Star className="w-5 h-5" />,
    title: 'Reputation Score',
    copy: 'Every completed collab builds your public reputation. Better scores = higher-paying brand matches.',
    accent: '#C6FF00',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Payment Protection',
    copy: 'Escrow locks funds before you start. Deliver content, get paid — no exceptions, no delays.',
    accent: '#7B61FF',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'AI-Powered Matching',
    copy: 'Our engine learns what works for you — niche, style, engagement — and surfaces better fits over time.',
    accent: '#FF6B2C',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Founding Member Badge',
    copy: 'Join before launch and get a permanent founding badge, early-access perks, and priority in the algorithm.',
    accent: '#00D9FF',
  },
];

/* ─── Animated Number Ticker ──────────────────────────────────────────────── */

function StatNumber({ value }: { value: string }) {
  return (
    <span className="font-heading text-2xl md:text-3xl font-black tabular-nums">
      {value}
    </span>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

export function CreatorsProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % creatorSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInView]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const step = creatorSteps[activeStep];

  return (
    <>
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-primary bg-surface px-4 py-20 md:px-8 md:py-28">
        {/* Layered gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_20%,rgba(198,255,0,0.14),transparent_55%),radial-gradient(ellipse_60%_55%_at_85%_75%,rgba(123,97,255,0.12),transparent_50%),radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(0,217,255,0.06),transparent_60%)]" />
        {/* Texture */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-[0.03] mix-blend-multiply" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 border-2 border-primary/15 bg-lime/10 px-3 py-1.5 mb-6">
                <Sparkles className="w-3 h-3 text-lime" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/60">
                  CreLynk For Creators
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-primary leading-[0.92]">
                Create,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Collab</span>
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-4 bg-lime/35 -z-0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
                ,
                <br />
                <span
                  className="relative inline-block mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #C6FF00 0%, #7B61FF 60%, #00D9FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Get Paid
                </span>
              </h1>

              <p className="mt-6 font-body text-lg md:text-xl font-medium text-secondary leading-relaxed max-w-lg">
                Stop chasing brands. Stop negotiating over DMs. CreLynk matches you with the right collabs, protects your payments, and builds your reputation — automatically.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <FormTrigger
                  formType="creator"
                  analytics="creators_hero_cta"
                  className="inline-flex items-center gap-2 border-2 border-primary bg-lime px-7 py-4 font-heading font-black uppercase text-base text-primary shadow-hard hover:-translate-y-0.5 hover:shadow-hard-hover transition-all"
                >
                  Join As Creator <ArrowRight className="w-5 h-5" />
                </FormTrigger>
                <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-lime" />
                  Free forever for creators
                </div>
              </div>

              {/* Quick stats */}
              <div className="mt-10 flex gap-6">
                {[
                  { label: 'Active Brands', value: '120+' },
                  { label: 'Avg. Payout', value: '₹8K' },
                  { label: 'Match Rate', value: '93%' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-heading text-2xl md:text-3xl font-black text-primary">{s.value}</div>
                    <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-secondary/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative h-[400px] sm:h-[460px] lg:h-[520px] overflow-hidden border-2 border-primary/15 bg-elevated/50">
                {/* Accent glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(198,255,0,0.12),transparent_70%)]" />

                {/* Image 1 — large */}
                <motion.div
                  className="absolute left-3 top-4 w-[58%] h-[48%] overflow-hidden border border-primary/15 bg-surface/50 shadow-[0_12px_28px_rgba(17,17,17,0.12)]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src="/images/ambassadors/creator-01.jpg"
                    alt="Creator shooting content"
                    className="w-full h-full object-cover brightness-[0.95] saturate-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 border border-primary/25 bg-surface/75 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary/65 backdrop-blur-sm">
                    filming reels
                  </div>
                </motion.div>

                {/* Image 2 */}
                <motion.div
                  className="absolute right-2 top-[18%] w-[44%] h-[42%] overflow-hidden border border-primary/15 bg-surface/50 shadow-[0_12px_28px_rgba(17,17,17,0.12)]"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <img
                    src="/images/ambassadors/creator-06.jpg"
                    alt="Creator at brand event"
                    className="w-full h-full object-cover brightness-[0.93] saturate-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 border border-primary/25 bg-surface/75 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary/65 backdrop-blur-sm">
                    brand collab
                  </div>
                </motion.div>

                {/* Image 3 — bottom */}
                <motion.div
                  className="absolute bottom-4 left-[12%] w-[65%] h-[36%] overflow-hidden border border-primary/15 bg-surface/50 shadow-[0_12px_28px_rgba(17,17,17,0.12)]"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <img
                    src="/images/ambassadors/creator-08.jpg"
                    alt="Creator studio setup"
                    className="w-full h-full object-cover brightness-[0.92] saturate-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 border border-primary/25 bg-surface/75 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary/65 backdrop-blur-sm">
                    studio shots
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute top-3 right-3 z-20 bg-lime border-2 border-primary px-2.5 py-1 font-heading text-[10px] font-black uppercase shadow-[3px_3px_0px_#111]"
                  animate={{ rotate: [0, -2, 2, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Creator-First
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Process Flow Section ──────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-b-2 border-primary bg-primary px-4 py-24 md:px-8 md:py-32"
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-[0.03] mix-blend-screen" />
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse 55% 50% at 25% 50%, ${step.accentBg}, transparent 65%), radial-gradient(ellipse 45% 55% at 75% 35%, rgba(123,97,255,0.06), transparent 55%)`,
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-[110px] opacity-[0.18]"
          animate={{ x: [0, 25, -15, 0], y: [0, -15, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '8%', left: '3%', background: step.accent }}
        />
        <motion.div
          className="pointer-events-none absolute w-[350px] h-[350px] rounded-full blur-[90px] opacity-[0.12]"
          animate={{ x: [0, -20, 12, 0], y: [0, 18, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '8%', right: '8%', background: '#7B61FF' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="inline-flex items-center gap-2 border border-surface/12 bg-surface/5 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-surface/45 mb-5 backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> Your Creator Journey
            </span>
            <h2 className="mt-5 font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-surface leading-[0.95]">
              From Scroll To{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #C6FF00 0%, #7B61FF 50%, #00D9FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Payday
              </span>
            </h2>
            <p className="mt-5 font-body text-base md:text-lg text-surface/45 max-w-2xl mx-auto font-medium">
              4 steps. No gatekeepers. No unpaid work. Just you, the right brands, and protected payments.
            </p>
          </motion.div>

          {/* Step navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {creatorSteps.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => handleStepClick(i)}
                className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 font-heading text-xs md:text-sm font-bold uppercase tracking-wide transition-all border-2 ${
                  activeStep === i
                    ? 'border-surface/35 bg-surface/10 text-surface shadow-[0_0_18px_rgba(255,255,255,0.06)]'
                    : 'border-surface/8 bg-surface/[0.02] text-surface/35 hover:text-surface/65 hover:border-surface/18'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 border-2 font-mono text-[10px] md:text-xs font-black transition-colors"
                  style={{
                    borderColor: activeStep === i ? s.accent : 'rgba(255,255,255,0.12)',
                    color: activeStep === i ? s.accent : 'rgba(255,255,255,0.30)',
                    backgroundColor: activeStep === i ? `${s.accent}15` : 'transparent',
                  }}
                >
                  {s.id}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
                {activeStep === i && (
                  <motion.div
                    layoutId="creatorActiveStep"
                    className="absolute -bottom-0.5 left-2 right-2 h-[3px]"
                    style={{ backgroundColor: s.accent }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Main content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Left: Content */}
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 border-2 shadow-[3px_3px_0px_rgba(255,255,255,0.06)]"
                    style={{
                      borderColor: step.accent,
                      color: step.accent,
                      backgroundColor: step.accentBg,
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-surface/30">
                      Step {step.id} of {creatorSteps.length}
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl font-black uppercase tracking-tight text-surface">
                      {step.label}
                    </h3>
                  </div>
                </div>

                <p
                  className="font-heading text-base md:text-lg font-bold uppercase tracking-wide mb-4"
                  style={{ color: step.accent }}
                >
                  {step.tagline}
                </p>

                <p className="font-body text-base md:text-lg text-surface/60 font-medium leading-relaxed mb-8">
                  {step.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-8">
                  {step.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex-1 border-2 border-surface/10 bg-surface/[0.03] px-4 py-4 backdrop-blur-sm"
                    >
                      <div
                        className="font-heading text-2xl md:text-3xl font-black"
                        style={{ color: step.accent }}
                      >
                        {stat.value}
                      </div>
                      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-surface/35 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {creatorSteps.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 rounded-full cursor-pointer"
                      animate={{
                        width: i === activeStep ? 32 : 8,
                        backgroundColor:
                          i === activeStep ? step.accent : 'rgba(255,255,255,0.12)',
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleStepClick(i)}
                    />
                  ))}
                  <span className="ml-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-surface/25">
                    {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                  </span>
                </div>
              </div>

              {/* Right: Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative overflow-hidden border-2 border-surface/12 bg-surface/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                  {/* Accent glow */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${step.accent}, transparent 70%)`,
                    }}
                  />
                  <motion.img
                    key={step.image}
                    src={step.image}
                    alt={step.label}
                    className="relative z-10 w-full aspect-[4/3] object-cover"
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.55 }}
                  />
                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-primary/85 to-transparent px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: step.accent }}
                      />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-surface/65">
                        {step.tagline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating step number */}
                <motion.div
                  className="absolute -top-4 -right-4 md:-top-5 md:-right-5 w-14 h-14 md:w-16 md:h-16 border-3 flex items-center justify-center font-heading text-2xl md:text-3xl font-black z-30 shadow-[4px_4px_0px_rgba(0,0,0,0.25)]"
                  style={{
                    borderColor: step.accent,
                    backgroundColor: step.accent,
                    color: '#111',
                  }}
                  animate={{ rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {step.id}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Reputation & Perks Grid ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-primary bg-surface px-4 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(198,255,0,0.07),transparent_45%),radial-gradient(circle_at_75%_65%,rgba(123,97,255,0.07),transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary mb-4">
              Why Creators Choose CreLynk
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-primary">
              Your Work,{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Protected</span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-purple/30 -z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.55 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reputationPerks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative border-2 border-primary bg-surface p-6 shadow-hard hover:-translate-y-1 hover:shadow-hard-hover transition-all"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: perk.accent }}
                />
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center border-2 border-primary shadow-[2px_2px_0px_#111]"
                  style={{ backgroundColor: perk.accent }}
                >
                  {perk.icon}
                </div>
                <h3 className="font-heading text-lg font-black uppercase tracking-tight text-primary mb-2">
                  {perk.title}
                </h3>
                <p className="font-body text-sm font-medium text-secondary leading-relaxed">
                  {perk.copy}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <FormTrigger
              formType="creator"
              analytics="creators_process_cta"
              className="inline-flex items-center gap-2 border-2 border-primary bg-lime px-8 py-4 font-heading font-black uppercase text-base text-primary shadow-hard hover:-translate-y-0.5 hover:shadow-hard-hover transition-all"
            >
              Join As Creator <ArrowRight className="w-5 h-5" />
            </FormTrigger>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
              <CheckCircle2 className="w-4 h-4 text-lime" />
              Founding member spots filling fast
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Creator Ticker ────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-b-2 border-primary py-3 bg-lime">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...Array(2)].flatMap((_, si) => [
            <span key={`${si}-1`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ REELS</span>,
            <span key={`${si}-2`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ STORIES</span>,
            <span key={`${si}-3`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ UGC</span>,
            <span key={`${si}-4`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ REVIEWS</span>,
            <span key={`${si}-5`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ VLOGS</span>,
            <span key={`${si}-6`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ PHOTOGRAPHY</span>,
            <span key={`${si}-7`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ LIVE EVENTS</span>,
            <span key={`${si}-8`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ UNBOXING</span>,
            <span key={`${si}-9`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ TUTORIALS</span>,
            <span key={`${si}-10`} className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary/60 shrink-0">★ BRAND DEALS</span>,
          ])}
        </motion.div>
      </div>
    </>
  );
}

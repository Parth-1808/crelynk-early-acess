import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, MapPin, ShieldCheck, Sparkles, Store } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { FormTrigger } from '../components/form-panel';
import { LocalitesProcess } from '../sections/LocalitesProcess';
import { Footer } from '../sections/Footer';
import { LocaliteMode } from '../sections/LocaliteMode';

const localitePoints = [
  {
    title: 'Hyperlocal campaigns',
    copy:
      'Run creator collaborations designed for neighborhood reach, city-level buzz, and store-level outcomes.',
    icon: <MapPin className="h-6 w-6" />,
    tone: 'bg-cyan text-primary',
  },
  {
    title: 'Business-first setup',
    copy:
      'Built for cafes, gyms, salons, retail, events, and modern property launches that need repeatable marketing.',
    icon: <Store className="h-6 w-6" />,
    tone: 'bg-lime text-primary',
  },
  {
    title: 'Trust + protection',
    copy:
      'Structured collab flow and payout protection help local businesses avoid the risk of informal DM-only deals.',
    icon: <ShieldCheck className="h-6 w-6" />,
    tone: 'bg-orange text-primary',
  },
];

function LocaliteHighlights() {
  return (
    <section className="relative overflow-hidden border-b-2 border-primary bg-elevated px-4 py-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook-dark.png')] opacity-[0.08]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
            Localite Playbook
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-primary md:text-5xl">
            Local Growth, Creator Powered
          </h2>
          <p className="mt-4 font-body text-lg font-medium text-secondary">
            A focused track for local businesses that want measurable creator-led growth without enterprise complexity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {localitePoints.map((point) => (
            <div key={point.title} className={`border-2 border-primary p-6 shadow-hard ${point.tone}`}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-primary bg-surface text-primary shadow-[3px_3px_0px_#111]">
                {point.icon}
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight">
                {point.title}
              </h3>
              <p className="mt-3 font-body text-base font-semibold leading-relaxed opacity-90">
                {point.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <FormTrigger
            formType="localite"
            className="inline-flex items-center justify-center border-2 border-primary bg-surface px-7 py-3 font-heading text-base font-black uppercase tracking-wide text-primary shadow-hard transition-all hover:-translate-y-0.5 hover:shadow-hard-hover"
          >
            Join As Localite
            <ArrowRight className="ml-2 h-5 w-5" />
          </FormTrigger>
        </div>
      </div>
    </section>
  );
}

function LocaliteMatchMockup() {
  const [scanStep, setScanStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const matches = [
    {
      name: "Neha R.",
      niche: "Food & Cafe Blogger",
      dist: "0.8 km",
      reach: "12.4K Reach",
      status: "Collab Active",
      avatarInitials: "NR"
    },
    {
      name: "Aman S.",
      niche: "Lifestyle Vlogger",
      dist: "1.2 km",
      reach: "8.5K Reach",
      status: "Collab Active",
      avatarInitials: "AS"
    },
    {
      name: "Karan D.",
      niche: "Fitness & Gym Guide",
      dist: "1.9 km",
      reach: "22.1K Reach",
      status: "Reviewing Brief",
      avatarInitials: "KD"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.55 }}
      className="relative"
    >
      {/* Glowing Backlight */}
      <div className="absolute -inset-1.5 rounded-[24px] bg-gradient-to-r from-cyan via-lime to-emerald opacity-15 blur-xl" />
      
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="relative border-2 border-primary bg-surface/90 shadow-hard p-5 md:p-6 rounded-[24px] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan border border-cyan/40 animate-pulse flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary/70">
              Hyperlocal Matcher
            </span>
          </div>
          <div className="rounded-full bg-cyan/10 px-2.5 py-0.5 font-mono text-[8px] font-bold text-cyan uppercase tracking-wide border border-cyan/35 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-cyan animate-ping shrink-0" />
            Scanning Area
          </div>
        </div>

        {/* Center Business Panel */}
        <div className="border border-primary/10 bg-elevated/50 p-3.5 rounded-2xl mb-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan/10 border border-cyan/20 text-cyan shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <div className="font-heading text-xs font-bold text-primary uppercase leading-tight">
                  Aroma Cafe & Bakery
                </div>
                <div className="font-mono text-[9px] font-bold text-secondary uppercase mt-0.5 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-cyan" /> Delhi, Vasant Vihar
                </div>
              </div>
            </div>
            <div className="rounded-full bg-[#111] px-2.5 py-0.5 font-mono text-[8px] font-bold text-surface uppercase shrink-0">
              Target Pin
            </div>
          </div>
        </div>

        {/* Nearby Scan Visualizer */}
        <div className="relative h-28 border border-primary/6 bg-[#0c0c0c] rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
          {/* Radar Circles */}
          <div className="absolute w-20 h-20 rounded-full border border-cyan/15 animate-ping opacity-35" />
          <div className="absolute w-36 h-36 rounded-full border border-cyan/10" />
          <div className="absolute w-52 h-52 rounded-full border border-cyan/5" />
          
          {/* Scanning Line */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute origin-center w-full h-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, rgba(0,217,255,0.08) 0deg, transparent 90deg, transparent 360deg)'
            }}
          />

          {/* Business Core Pin */}
          <div className="relative z-10 w-9 h-9 rounded-full bg-cyan/20 border-2 border-cyan shadow-[0_0_15px_rgba(0,217,255,0.5)] flex items-center justify-center">
            <Store className="w-4 h-4 text-cyan" />
          </div>

          {/* Surrounding Avatars popping on scan */}
          <motion.div 
            animate={{ scale: scanStep === 1 ? [1, 1.2, 1] : 1, opacity: scanStep >= 1 ? 1 : 0.4 }}
            className="absolute top-4 left-10 w-8 h-8 rounded-full bg-purple/10 border-2 border-purple text-purple font-heading text-[10px] font-black flex items-center justify-center shadow-lg"
          >
            NR
          </motion.div>
          <motion.div 
            animate={{ scale: scanStep === 2 ? [1, 1.2, 1] : 1, opacity: scanStep >= 2 ? 1 : 0.4 }}
            className="absolute bottom-5 right-12 w-8 h-8 rounded-full bg-cyan/10 border-2 border-cyan text-cyan font-heading text-[10px] font-black flex items-center justify-center shadow-lg"
          >
            AS
          </motion.div>
          <motion.div 
            animate={{ scale: scanStep === 3 ? [1, 1.2, 1] : 1, opacity: scanStep >= 3 ? 1 : 0.4 }}
            className="absolute top-7 right-8 w-8 h-8 rounded-full bg-orange/10 border-2 border-orange text-orange font-heading text-[10px] font-black flex items-center justify-center shadow-lg"
          >
            KD
          </motion.div>
        </div>

        {/* Matches List */}
        <div className="space-y-2.5 text-left">
          {matches.map((m, idx) => {
            const isDiscovered = scanStep >= idx + 1;
            return (
              <motion.div
                key={m.name}
                initial={false}
                animate={{
                  opacity: isDiscovered ? 1 : 0.25,
                  y: isDiscovered ? 0 : 4,
                  backgroundColor: isDiscovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between border border-primary/5 p-2.5 rounded-xl bg-surface/60 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] text-[9px] font-black text-surface flex items-center justify-center">
                    {m.avatarInitials}
                  </div>
                  <div>
                    <div className="font-heading text-[11px] font-black text-primary uppercase leading-tight">
                      {m.name}
                    </div>
                    <div className="font-body text-[9px] text-secondary font-semibold">
                      {m.niche} • <span className="font-mono text-cyan">{m.dist}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold text-primary/70">{m.reach}</span>
                  <div className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${
                    m.status.includes('Active')
                      ? 'text-lime bg-lime/10 border-lime/20'
                      : 'text-orange bg-orange/10 border-orange/20'
                  }`}>
                    {m.status}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function LocalitesPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-[72px] md:pt-[96px]">
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b-2 border-primary bg-surface py-20 px-4 md:px-8 lg:py-28">
          {/* Realistic Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center select-none pointer-events-none"
            style={{
              backgroundImage: 'url(/localite_hero_bg.png)',
            }}
          />
          {/* Dark Premium Overlays */}
          <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/50 to-emerald-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_50%)]" />
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
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                    className="inline-flex shrink-0"
                  >
                    <Compass className="w-3.5 h-3.5 text-cyan" />
                  </motion.span> CreLynk For Localites
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-heading text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-surface leading-[0.95]"
                >
                  Turn Local Reach <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-lime to-emerald">
                    Into Real Collabs
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 max-w-xl font-body text-base md:text-lg font-semibold leading-relaxed text-surface/75"
                >
                  This page is focused on local businesses and city-first campaigns, built to help you run creator-led growth with a clear execution flow.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <FormTrigger
                    formType="localite"
                    className="inline-flex items-center gap-2 border-2 border-primary bg-lime text-primary px-8 py-4 font-heading font-black uppercase text-sm shadow-hard hover:-translate-y-0.5 hover:shadow-hard-hover transition-all"
                  >
                    Claim Local Pilot Spot <ArrowRight className="w-4 h-4" />
                  </FormTrigger>
                </motion.div>
              </div>

              {/* Right Column: Radar Scanning Simulator */}
              <div className="lg:col-span-5">
                <LocaliteMatchMockup />
              </div>

            </div>
          </div>
        </section>
        <LocaliteMode />
        <LocaliteHighlights />
        <LocalitesProcess />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

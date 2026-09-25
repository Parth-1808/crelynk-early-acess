import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Percent, ShieldCheck, Calendar } from 'lucide-react';
import { Sticker } from '../components/ui';
import { useFormPanel } from '../components/form-panel';

function LaunchingSoonCard() {
  return (
    <div className="relative overflow-hidden mb-8 w-full max-w-xl border-2 border-primary bg-surface shadow-hard p-5 sm:p-6">
      {/* Graffiti Texture Background & Ambient Spray Accents */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] opacity-[0.12] pointer-events-none mix-blend-multiply" />
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-lime/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime border border-primary"></span>
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              LAUNCH STATUS: ACTIVE
            </span>
          </div>

          <h3 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-primary mt-1">
            LAUNCHING SOON
          </h3>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-secondary">
            Get Ready • App Store & Play Store
          </p>
        </div>

        <div className="inline-flex border-2 border-primary bg-lime px-4 py-2 font-heading font-black text-sm uppercase tracking-wide text-primary shadow-[3px_3px_0px_#111] rotate-[-2deg] shrink-0">
          ⚡ GET READY
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { openTypeSelector } = useFormPanel();

  return (
    <section className="relative min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-96px)] flex flex-col lg:flex-row items-center justify-center px-4 md:px-8 py-12 lg:py-0 overflow-hidden border-b-2 border-primary bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-lime/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-primary/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-primary/10 rounded-full animate-[spin_45s_linear_infinite_reverse] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Side */}
        <div className="flex flex-col items-start pt-8 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest border border-primary px-2 py-1 bg-surface shadow-[2px_2px_0px_#111]">
              Pre-Launch - VIP Early Access Open
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 uppercase"
          >
            The direct creator-brand collabs app
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-body font-medium text-secondary mb-8 max-w-xl leading-relaxed"
          >
            CreLynk finds your match, handles your money, and runs your calendar - so you close collabs, not spreadsheets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="w-full"
          >
            <LaunchingSoonCard />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start gap-4 w-full sm:w-auto mb-8"
          >
            <motion.button
              onClick={openTypeSelector}
              whileHover={{ x: -2, y: -2, transition: { duration: 0.12 } }}
              whileTap={{ x: 1, y: 1 }}
              data-analytics="hero_cta_main"
              className="inline-flex items-center justify-center border-2 border-primary px-8 py-4 font-heading font-bold text-lg uppercase bg-lime text-primary shadow-hard hover:shadow-hard-hover active:shadow-hard-active whitespace-nowrap transition-shadow"
            >
              PRE-REGISTER FOR APP
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 text-[11px] font-mono font-bold text-secondary uppercase tracking-[0.22em]"
          >
            <span className="inline-flex items-center gap-2 border border-primary/30 bg-surface/70 px-3 py-2 shadow-[2px_2px_0px_#111]">
              <div className="w-1.5 h-1.5 bg-lime rounded-full" />
              Mobile App Launching Soon
            </span>
            <span className="inline-flex items-center gap-2 border border-primary/30 bg-surface/70 px-3 py-2 shadow-[2px_2px_0px_#111]">
              <div className="w-1.5 h-1.5 bg-cyan rounded-full" />
              Escrow-first app
            </span>
          </motion.div>
        </div>

        {/* Right Side - Hero Visual */}
        <div className="relative h-[520px] lg:h-[680px] w-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative isolate h-full w-full max-w-[560px]"
          >
            <div className="absolute left-[8%] top-[16%] h-36 w-36 rounded-full bg-magenta/18 blur-3xl" />
            <div className="absolute right-[10%] top-[18%] h-32 w-32 rounded-full bg-gold/16 blur-3xl" />
            <div className="absolute bottom-[10%] left-[18%] h-40 w-40 rounded-full bg-cyan/16 blur-3xl" />

            <motion.img
              src="/images/hero-genz-silhouette.png"
              alt="Stylized Gen Z creator silhouette with floating social proof icons"
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 h-[112%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
              style={{
                maskImage:
                  'radial-gradient(circle at center, rgba(0,0,0,1) 34%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.54) 68%, transparent 84%)',
                WebkitMaskImage:
                  'radial-gradient(circle at center, rgba(0,0,0,1) 34%, rgba(0,0,0,0.92) 52%, rgba(0,0,0,0.54) 68%, transparent 84%)',
              }}
            />

            <Sticker className="absolute left-5 top-5 bg-lime text-primary z-20" angle={-5}>
              First-Wave Creators
            </Sticker>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

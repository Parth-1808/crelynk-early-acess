import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell, Building2, Check, Compass, Lightbulb, Search, ShieldCheck, Smartphone, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { FormTrigger } from '../components/form-panel';
import { FinalCTA } from '../sections/FinalCTA';
import { Footer } from '../sections/Footer';
import { IdeasBoard } from '../sections/IdeasBoard';

const creatorFlow = [
  {
    title: 'Pitch faster',
    copy:
      'Share ideas, briefs, and campaign concepts quickly so opportunities move from draft to execution without waiting.',
    icon: <Lightbulb className="h-6 w-6" />,
    tone: 'bg-lime text-primary',
  },
  {
    title: 'Get paid safely',
    copy:
      'Escrow-backed workflow means payment terms are protected before content is delivered.',
    icon: <ShieldCheck className="h-6 w-6" />,
    tone: 'bg-cyan text-primary',
  },
  {
    title: 'Grow with proof',
    copy:
      'Your delivery quality, response speed, and completed collabs become a visible reputation that compounds.',
    icon: <TrendingUp className="h-6 w-6" />,
    tone: 'bg-purple text-surface',
  },
];

function CreatorOperatingFlow() {
  return (
    <section className="relative overflow-hidden border-b-2 border-primary bg-elevated px-4 py-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] opacity-10 mix-blend-multiply" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
            Creator Workflow
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black uppercase tracking-tight text-primary md:text-5xl">
            Built For Daily Creator Ops
          </h2>
          <p className="mt-4 font-body text-lg font-medium text-secondary">
            Not just a one-time marketplace login. CreLynk is designed for the way creators actually work every week.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {creatorFlow.map((step, index) => (
            <div key={step.title} className={`border-2 border-primary p-6 shadow-hard ${step.tone}`}>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-primary bg-surface text-primary shadow-[3px_3px_0px_#111]">
                {step.icon}
              </div>
              <div className="mb-4 inline-flex border border-primary bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                Step 0{index + 1}
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-base font-semibold leading-relaxed opacity-90">
                {step.copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <FormTrigger
            formType="creator"
            className="inline-flex items-center justify-center border-2 border-primary bg-lime px-7 py-3 font-heading text-base font-black uppercase tracking-wide text-primary shadow-hard transition-all hover:-translate-y-0.5 hover:shadow-hard-hover"
          >
            Join As Creator
            <ArrowRight className="ml-2 h-5 w-5" />
          </FormTrigger>
        </div>
      </div>
    </section>
  );
}

export function AutoMatchShowcase() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const stepsList = [
    {
      num: "01",
      title: "1. Brand Uploads",
      desc: "Aroma Cafe uploads Reels campaign brief on CreLynk, securing a ₹15,000 budget in escrow.",
      highlight: step === 0,
      color: "border-lime bg-lime/10"
    },
    {
      num: "02",
      title: "2. AI Matcher Scan",
      desc: "CreLynk AI instantly scans database & matches creators based on style and niche compatibility.",
      highlight: step === 1,
      color: "border-purple bg-purple/10"
    },
    {
      num: "03",
      title: "3. Push Notification",
      desc: "Creator receives WhatsApp & app matching invite instantly via push notification.",
      highlight: step === 2,
      color: "border-cyan bg-cyan/10"
    },
    {
      num: "04",
      title: "4. One-Tap Accept",
      desc: "Creator accepts, campaign starts instantly, and ₹15,000 is safely held in escrow.",
      highlight: step === 3,
      color: "border-lime bg-lime/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4 text-left">
      {/* Left side: Timeline list */}
      <div className="md:col-span-7 flex flex-col gap-2.5">
        {stepsList.map((s, idx) => (
          <motion.div
            key={idx}
            onClick={() => {
              setStep(idx);
              setIsPaused(true);
              const t = setTimeout(() => setIsPaused(false), 7000);
              return () => clearTimeout(t);
            }}
            whileHover={{ x: 4 }}
            className={`cursor-pointer border-2 p-3 transition-all duration-300 rounded-xl relative overflow-hidden flex gap-3 items-start select-none ${
              s.highlight 
                ? `${s.color} border-lime shadow-[3px_3px_0px_#C6FF00] scale-[1.02] text-white` 
                : "border-white/10 bg-black/35 hover:border-white/30 text-white/60"
            }`}
          >
            {s.highlight && (
              <motion.div 
                layoutId="activeBarAuto"
                className="absolute top-0 left-0 w-1.5 h-full bg-lime" 
              />
            )}
            <span className={`font-mono text-xs font-black uppercase py-0.5 px-1.5 border rounded ${
              s.highlight ? "bg-lime text-primary border-lime" : "border-white/15 text-white/50 bg-black/10"
            }`}>
              {s.num}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-black uppercase leading-snug ${s.highlight ? "text-lime" : "text-white/60"}`}>
                {s.title}
              </h4>
              <p className={`text-[10px] font-semibold mt-1 leading-normal ${s.highlight ? "text-white" : "text-white/40"}`}>
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right side: Mobile mockup */}
      <div className="md:col-span-5 flex justify-center">
        <div className="relative h-[430px] w-[215px] rounded-[38px] border-[5px] border-white bg-black p-1.5 shadow-[6px_6px_0px_#C6FF00] overflow-hidden">
          <div className="absolute top-2 left-1/2 h-4 w-18 -translate-x-1/2 rounded-full bg-black z-40 border border-white/20" />
          
          <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#FAF9F5] flex flex-col pt-4.5 text-primary font-body border border-primary/10">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/15 to-transparent z-30" style={{ transform: 'rotate(25deg) translateY(-25%) scale(1.5)' }} />
            
            <div className="px-3 py-0.5 flex justify-between items-center text-[8px] font-mono border-b border-primary/5 select-none relative z-20">
              <span className="font-bold">9:41</span>
              <div className="flex gap-1 items-center">
                <span className="w-2 h-1 border border-primary rounded-xs flex items-center p-0.25">
                  <span className="bg-primary h-full w-[80%] rounded-2xs" />
                </span>
                <span>5G</span>
              </div>
            </div>

            <div className="flex-1 p-2.5 overflow-hidden flex flex-col justify-between relative z-10 text-left">
              {step === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-2 bg-surface p-1 border border-primary rounded shadow-[1.5px_1.5px_0px_#111]">
                      <div className="h-6 w-6 rounded-full bg-orange border border-primary flex items-center justify-center text-[10px] font-bold text-surface shadow-[1px_1px_0px_#111]">☕</div>
                      <div>
                        <h4 className="text-[9px] font-black uppercase tracking-tight leading-none">Aroma Cafe</h4>
                        <p className="text-[7px] font-bold text-secondary mt-0.5 leading-none">Brand Client</p>
                      </div>
                    </div>

                    <div className="border border-primary bg-surface p-2.5 rounded-lg shadow-[2px_2px_0px_#111]">
                      <div className="text-[6.5px] font-mono uppercase text-secondary mb-0.5">Campaign Launch</div>
                      <div className="text-[10px] font-black text-primary leading-tight">Summer Reels: Iced Lattes</div>
                      
                      <div className="w-full bg-elevated h-1 rounded-full overflow-hidden mt-2.5 border border-primary/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="bg-lime h-full"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[6.5px] font-mono text-muted uppercase">Uploading Assets</span>
                        <span className="text-[6.5px] font-mono text-lime font-bold">100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border border-dashed border-primary bg-elevated/70 p-2 rounded-md">
                    <div>
                      <p className="text-[6.5px] font-bold text-secondary uppercase tracking-wider">Escrow Budget</p>
                      <p className="text-[10.5px] font-black text-primary">₹15,000</p>
                    </div>
                    <span className="text-[7px] bg-cyan px-1.5 py-0.5 border border-primary font-mono font-black uppercase text-primary shadow-[1px_1px_0px_#111]">SECURED</span>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col justify-center items-center relative"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(123,97,255,0.03)_100%)]" />
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                      animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                      className="absolute w-20 h-20 rounded-full border-2 border-purple/30 bg-purple/5"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.7], opacity: [0.9, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.7 }}
                      className="absolute w-20 h-20 rounded-full border-2 border-cyan/40 bg-cyan/5"
                    />
                  </div>

                  <div className="z-10 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-primary bg-purple flex items-center justify-center shadow-[3px_3px_0px_#111] mb-3 relative overflow-hidden">
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full scale-110"
                      />
                      <Sparkles className="h-6 w-6 text-surface animate-bounce" />
                    </div>
                    
                    <div className="bg-primary text-surface px-2.5 py-1 text-[8.5px] font-mono rounded font-bold uppercase tracking-widest shadow-[1.5px_1.5px_0px_#111] mb-2">
                      MATCHING...
                    </div>

                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [0.9, 1.05, 1], opacity: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                      className="border-2 border-primary bg-lime px-2.5 py-1 shadow-[2px_2px_0px_#111] text-[9.5px] font-black uppercase tracking-wide"
                    >
                      🚀 98% MATCH SCORE
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col justify-start pt-4"
                >
                  <div className="w-full text-center mb-6">
                    <p className="text-[28px] font-light text-primary leading-none tracking-tight font-heading">09:41</p>
                    <p className="text-[7.5px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">Monday, June 1</p>
                  </div>

                  <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
                    className="w-full border-2 border-primary bg-surface p-2.5 rounded-xl shadow-[3px_3px_0px_#111] flex items-start gap-2 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-lime border-b border-primary" />
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-lime border border-primary flex items-center justify-center shadow-[1px_1px_0px_#111]">
                      <Bell className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black uppercase text-primary">CreLynk Auto-Match</span>
                        <span className="text-[7px] text-muted font-mono">now</span>
                      </div>
                      <p className="text-[8.5px] font-black mt-0.5 text-primary leading-snug">☕ Aroma Cafe matching invite!</p>
                      <p className="text-[7.5px] text-secondary leading-snug">Accept invite to earn ₹15,000. Escrow funded by brand.</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div className="border border-primary bg-surface p-2.5 rounded-xl shadow-[2.5px_2.5px_0px_#111]">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[6.5px] bg-purple text-surface px-1.5 py-0.5 border border-primary font-mono font-black uppercase shadow-[1px_1px_0px_#111]">INVITE READY</span>
                      <span className="text-[7.5px] font-black text-lime">₹15,000 Locked</span>
                    </div>
                    <h4 className="text-[10px] font-black uppercase text-primary leading-tight">Aroma Cafe - Reels campaign</h4>
                    <p className="text-[7.5px] text-secondary mt-1 leading-normal">Create 2 short reels showcasing the signature vanilla iced latte at their local store.</p>
                  </div>

                  <div className="my-1.5 border border-dashed border-primary/20 bg-surface/50 p-1.5 rounded flex flex-col gap-1">
                    <div className="flex justify-between text-[7px] text-secondary">
                      <span>Campaign Budget:</span>
                      <span className="font-bold text-primary">₹15,000</span>
                    </div>
                    <div className="flex justify-between text-[7px] text-secondary">
                      <span>Service Fees:</span>
                      <span className="font-bold text-primary">₹0 (Free Plan)</span>
                    </div>
                    <div className="flex justify-between text-[7.5px] text-primary font-black bg-lime/25 border border-lime/30 p-1 rounded">
                      <span>Your Payout:</span>
                      <span>₹15,000</span>
                    </div>
                  </div>

                  <div className="relative mt-auto">
                    <motion.div 
                      initial={{ backgroundColor: "#FFFFFF", color: "#111111" }}
                      animate={{ backgroundColor: "#C6FF00", color: "#111111", scale: [1, 0.95, 1] }}
                      transition={{ delay: 1, duration: 0.6 }}
                      className="w-full py-2 border-2 border-primary rounded-lg font-heading text-[9.5px] font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-[2.5px_2.5px_0px_#111]"
                    >
                      Accept Invite
                      <Check className="h-3 w-3" />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 80, y: 40 }}
                      animate={{ opacity: [0, 1, 1, 0], x: [80, 40, 40, 80], y: [40, 10, 10, 40] }}
                      transition={{ delay: 0.5, duration: 1.2 }}
                      className="absolute pointer-events-none z-30"
                    >
                      👉
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6, type: "spring" }}
                      className="absolute inset-0 bg-cyan border-2 border-primary rounded-lg flex flex-col justify-center items-center text-center p-2 z-20 shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                    >
                      <div className="w-7 h-7 rounded-full bg-surface border border-primary flex items-center justify-center mb-1 shadow-[1.5px_1.5px_0px_#111]">
                        <Zap className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-primary leading-none">Collab Active!</span>
                      <span className="text-[7px] font-mono mt-0.5 text-primary/80">₹15,000 Secured In Escrow</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ManualExploreShowcase() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3400);
    return () => clearInterval(timer);
  }, [isPaused]);

  const stepsList = [
    {
      num: "01",
      title: "1. Explore Briefs",
      desc: "Browse a live feed of active, verified brand briefs with budget tags inside the campaign directory.",
      highlight: step === 0,
      color: "border-magenta bg-magenta/10"
    },
    {
      num: "02",
      title: "2. Inspect Requirements",
      desc: "Select a brief to view detailed creative guidelines, deliverable limits, and audio prompt rules.",
      highlight: step === 1,
      color: "border-purple bg-purple/10"
    },
    {
      num: "03",
      title: "3. Pitch Your Idea",
      desc: "Submit your custom creative concept pitch directly to the brand client with one click.",
      highlight: step === 2,
      color: "border-cyan bg-cyan/10"
    },
    {
      num: "04",
      title: "4. Escrow Secured",
      desc: "Brand approves the pitch and secures campaign funds in escrow. Collab begins!",
      highlight: step === 3,
      color: "border-lime bg-lime/10"
    }
  ];

  const campaigns = [
    { brand: 'Zomato', title: 'Monsoon Food Vlog', budget: '₹25,000', tag: 'Food', logo: '🛵', bg: 'bg-magenta text-surface font-bold' },
    { brand: 'OnePlus', title: 'Nord Unboxing Reel', budget: '₹40,000', tag: 'Tech', logo: '📱', bg: 'bg-cyan text-primary font-bold' },
    { brand: 'Cult.fit', title: 'WFH Workout Routine', budget: '₹18,000', tag: 'Fitness', logo: '🏋️', bg: 'bg-purple text-surface font-bold' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-4 text-left">
      {/* Left side: Timeline list */}
      <div className="md:col-span-7 flex flex-col gap-2.5">
        {stepsList.map((s, idx) => (
          <motion.div
            key={idx}
            onClick={() => {
              setStep(idx);
              setIsPaused(true);
              const t = setTimeout(() => setIsPaused(false), 7000);
              return () => clearTimeout(t);
            }}
            whileHover={{ x: 4 }}
            className={`cursor-pointer border-2 p-3 transition-all duration-300 rounded-xl relative overflow-hidden flex gap-3 items-start select-none ${
              s.highlight 
                ? `${s.color} border-magenta shadow-[3px_3px_0px_#FF2D78] scale-[1.02] text-white` 
                : "border-white/10 bg-black/35 hover:border-white/30 text-white/60"
            }`}
          >
            {s.highlight && (
              <motion.div 
                layoutId="activeBarManual"
                className="absolute top-0 left-0 w-1.5 h-full bg-magenta" 
              />
            )}
            <span className={`font-mono text-xs font-black uppercase py-0.5 px-1.5 border rounded ${
              s.highlight ? "bg-magenta text-white border-magenta" : "border-white/15 text-white/50 bg-black/10"
            }`}>
              {s.num}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className={`text-xs font-black uppercase leading-snug ${s.highlight ? "text-magenta" : "text-white/60"}`}>
                {s.title}
              </h4>
              <p className={`text-[10px] font-semibold mt-1 leading-normal ${s.highlight ? "text-white" : "text-white/40"}`}>
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right side: Mobile mockup */}
      <div className="md:col-span-5 flex justify-center">
        <div className="relative h-[430px] w-[215px] rounded-[38px] border-[5px] border-white bg-black p-1.5 shadow-[6px_6px_0px_#FF2D78] overflow-hidden">
          <div className="absolute top-2 left-1/2 h-4 w-18 -translate-x-1/2 rounded-full bg-black z-40 border border-white/20" />
          
          <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#FAF9F5] flex flex-col pt-4.5 text-primary font-body border border-primary/10">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/15 to-transparent z-30" style={{ transform: 'rotate(25deg) translateY(-25%) scale(1.5)' }} />
            
            <div className="px-3.5 py-0.5 flex justify-between items-center text-[8px] font-mono border-b border-primary/5 select-none relative z-20">
              <span className="font-bold">9:41</span>
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-1.5 border border-primary rounded-xs flex items-center p-0.25">
                  <span className="bg-primary h-full w-[80%] rounded-2xs" />
                </span>
                <span>5G</span>
              </div>
            </div>

            <div className="flex-1 p-2.5 overflow-hidden flex flex-col justify-between relative z-10 text-left">
              {step === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Search Bar */}
                  <div className="flex items-center gap-1 border-2 border-primary bg-surface px-2.5 py-1.5 mb-3.5 rounded shadow-[1px_1px_0px_#111]">
                    <Search className="h-2.5 w-2.5 text-muted" />
                    <span className="text-[7.5px] text-muted font-mono select-none">Search active briefs...</span>
                  </div>

                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[8.5px] font-black uppercase text-primary leading-none">Featured Briefs</span>
                    <span className="text-[6.5px] text-secondary font-mono bg-elevated border border-primary/5 px-1 rounded-sm">3 Active</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {campaigns.map((camp, idx) => (
                      <motion.div
                        key={camp.brand}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`border border-primary p-2.5 rounded-lg shadow-[2px_2px_0px_#111] bg-surface relative flex items-center justify-between ${idx === 0 ? "border-2 border-primary bg-elevated/40" : ""}`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-primary shadow-[0.5px_0.5px_0px_#111] ${camp.bg}`}>
                            {camp.logo}
                          </div>
                          <div>
                            <h5 className="text-[8.5px] font-black uppercase leading-none text-primary">{camp.brand}</h5>
                            <p className="text-[7px] text-secondary mt-0.5 leading-none font-semibold">{camp.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[7.5px] font-black text-primary leading-none">{camp.budget}</p>
                          <span className="text-[5px] px-1 bg-surface border border-primary font-mono uppercase rounded-3xs font-bold mt-0.5 inline-block">{camp.tag}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 mb-1.5 pb-1.5 border-b border-primary/10">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] border border-primary bg-magenta text-surface shadow-[0.5px_0.5px_0px_#111]">🛵</div>
                    <div>
                      <h5 className="text-[9px] font-black uppercase leading-none text-primary">Zomato India</h5>
                      <p className="text-[6.5px] font-bold text-secondary mt-0.5 leading-none">Verified Brand Client</p>
                    </div>
                  </div>

                  <div className="border border-primary bg-surface p-2.5 rounded-xl shadow-[2.5px_2.5px_0px_#111] mb-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[6.5px] bg-primary text-surface px-1.5 py-0.5 border border-primary font-mono font-black uppercase tracking-wide shadow-[0.5px_0.5px_0px_#111]">BRIEF DETAILS</span>
                      <h4 className="text-[10.5px] font-black uppercase text-primary mt-1.5 leading-tight">Monsoon Food Vlog</h4>
                      <p className="text-[7.5px] text-secondary mt-1.5 leading-normal">Visit any local street food stall during rains. Record close-up slow-motion clips of hot pakodas or samosas being fried. Share your favorite comfort food memory in the voiceover.</p>
                    </div>

                    <div className="mt-2.5 border-t border-dashed border-primary/20 pt-2 flex flex-col gap-1">
                      <div className="flex justify-between text-[7px] text-secondary">
                        <span>Deliverables:</span>
                        <span className="font-bold text-primary">1 Reel (30-45s)</span>
                      </div>
                      <div className="flex justify-between text-[7px] text-secondary">
                        <span>Audio Prompts:</span>
                        <span className="font-bold text-primary">Monsoon starts...</span>
                      </div>
                      <div className="flex justify-between text-[7px] text-secondary">
                        <span>Escrow verified:</span>
                        <span className="font-bold text-lime">₹25,000 funded</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div className="border border-primary bg-surface p-2 rounded-lg shadow-[1.5px_1.5px_0px_#111]">
                    <div className="text-[6.5px] font-mono uppercase text-secondary">Drafting Proposal</div>
                    <h4 className="text-[9.5px] font-black uppercase text-primary leading-tight">Monsoon Food Vlog</h4>
                  </div>

                  <div className="border border-primary bg-surface p-2 rounded-lg flex-1 my-2 flex flex-col shadow-[1.5px_1.5px_0px_#111]">
                    <span className="text-[6.5px] text-muted uppercase font-mono font-bold mb-0.5">Your Creative Pitch:</span>
                    <div className="flex-1 bg-elevated/40 p-1.5 rounded border border-primary/10 relative">
                      <p className="text-[8px] text-primary font-body leading-normal">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.5 }}
                        >
                          I will visit an iconic 40-year-old local street stall in Pune during the evening rain. I'll shoot crispy hot pakodas with tea, overlaying a voiceover talking about monsoon cravings in Pune...
                        </motion.span>
                        <motion.span 
                          animate={{ opacity: [1, 0, 1] }} 
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-1 h-3 bg-primary ml-0.5 align-middle" 
                        />
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-auto">
                    <motion.div 
                      initial={{ backgroundColor: "#FFFFFF", color: "#111111" }}
                      animate={{ backgroundColor: "#FF2D78", color: "#FFFFFF", scale: [1, 0.96, 1] }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="w-full py-2 border-2 border-primary rounded-lg font-heading text-[9.5px] font-black uppercase tracking-wider text-center flex items-center justify-center gap-1 shadow-[2.5px_2.5px_0px_#111]"
                    >
                      Submit Pitch Concept
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, x: 80, y: 40 }}
                      animate={{ opacity: [0, 1, 1, 0], x: [80, 40, 40, 80], y: [40, 10, 10, 40] }}
                      transition={{ delay: 0.8, duration: 1.2 }}
                      className="absolute pointer-events-none z-30"
                    >
                      👉
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col justify-center items-center text-center p-2 relative z-15"
                >
                  <div className="w-12 h-12 rounded-full bg-lime border-2 border-primary flex items-center justify-center mb-2.5 shadow-[2.5px_2.5px_0px_#111] drop-shadow-[0_0_10px_rgba(198,255,0,0.3)]">
                    <Check className="h-6 w-6 text-primary" />
                  </div>

                  <h4 className="text-[12px] font-black uppercase text-primary tracking-tight">Pitch Approved!</h4>
                  <p className="text-[8.5px] text-secondary font-semibold max-w-[180px] leading-relaxed mt-0.5 mb-3">
                    Zomato has approved your concept & locked your campaign funds.
                  </p>

                  <div className="border border-primary bg-surface p-2 rounded-lg shadow-[3px_3px_0px_#111] w-full text-left">
                    <div className="flex justify-between items-center pb-1 border-b border-dashed border-primary/10">
                      <span className="text-[6px] font-mono text-muted uppercase">Escrow Ref</span>
                      <span className="text-[7px] font-mono font-black text-primary">#CK-80429</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[7.5px] text-secondary font-bold">Secured Budget:</span>
                      <span className="text-[10px] font-black text-lime">₹25,000</span>
                    </div>
                  </div>

                  <p className="text-[7px] text-muted font-mono mt-3.5 italic">Next step: Upload draft for review.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorsMatchingModes() {
  return (
    <section 
      className="relative overflow-hidden border-b-2 border-primary bg-[#08080a] px-4 py-24 md:px-8"
      style={{
        backgroundImage: "url('/creator_showcase_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay mask to blend background and ensure text readability */}
      <div className="absolute inset-0 bg-[#09090b]/88 backdrop-blur-[1.5px] z-0" />

      {/* Drifting Dynamic Neon Blur Background Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 90, -70, 0],
            y: [0, -110, 70, 0],
            scale: [1, 1.25, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-cyan/35 blur-[90px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, -110, 90, 0],
            y: [0, 70, -90, 0],
            scale: [1, 0.85, 1.2, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-16 -right-16 w-96 h-96 rounded-full bg-purple/30 blur-[110px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, 70, -50, 0],
            y: [0, 80, -70, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/4 w-[320px] h-[320px] rounded-full bg-lime/25 blur-[100px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.08, 0.92, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[280px] h-[280px] rounded-full bg-magenta/25 blur-[85px] mix-blend-screen"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:14px_24px] z-1" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="inline-block border-2 border-white bg-cyan px-3 py-1 font-mono text-xs font-black uppercase tracking-wider text-primary shadow-[2px_2px_0px_#fff]">
            Feature Showcase
          </span>
          <h2 className="mt-6 font-heading text-4xl font-black uppercase tracking-tight text-white md:text-5xl drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
            Two Collab Modes. Zero Friction.
          </h2>
          <p className="mt-4 font-body text-lg font-medium text-white/70">
            Whether you want instant matches powered by our intelligent AI engine, or full creative freedom to explore and pitch, CreLynk works the way you do.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Card 1: Auto-Match Mode */}
          <div className="border-2 border-white/20 bg-black/45 backdrop-blur-xl p-8 shadow-[6px_6px_0px_#C6FF00] hover:shadow-[8px_8px_0px_#C6FF00] rounded-2xl hover:border-white/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 border-b-2 border-l-2 border-white/20 bg-lime px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-primary shadow-[1px_1px_0px_rgba(255,255,255,0.1)] z-20">
              AI Powered
            </div>
            
            <div className="mb-6 relative z-10">
              <div className="inline-flex h-12 w-12 items-center justify-center border-2 border-white bg-lime text-primary shadow-[3px_3px_0px_#fff] mb-6 rounded-lg">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white">
                01. Auto-Match Mode
              </h3>
              <p className="mt-3 font-body text-base font-semibold leading-relaxed text-white/80">
                Upload your creator profile once. When brands post campaigns matching your exact niche, budget, and metrics, our AI auto-calculates compatibility and triggers instant invitations with locked escrow funds. No application forms needed.
              </p>
              
              <ul className="mt-6 space-y-3 font-body text-sm font-semibold text-white/90">
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-lime border border-white/20 bg-black/40 text-[10px] font-black shadow-[1px_1px_0px_#C6FF00]">✓</span>
                  <span>Real-time matches based on content style</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-lime border border-white/20 bg-black/40 text-[10px] font-black shadow-[1px_1px_0px_#C6FF00]">✓</span>
                  <span>Instant push notifications via WhatsApp & App</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-lime border border-white/20 bg-black/40 text-[10px] font-black shadow-[1px_1px_0px_#C6FF00]">✓</span>
                  <span>1-Tap accept with verified escrow budgets</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/30 border border-white/10 p-5 mt-4 rounded-xl shadow-inner relative z-10">
              <AutoMatchShowcase />
            </div>

            <img 
              src="/creator_silhouette_female.png" 
              alt="Creator Silhouette" 
              className="absolute bottom-[-15px] right-[-25px] h-[220px] w-auto opacity-[0.38] pointer-events-none mix-blend-screen select-none z-0" 
            />
          </div>

          {/* Card 2: Manual Explore Mode */}
          <div className="border-2 border-white/20 bg-black/45 backdrop-blur-xl p-8 shadow-[6px_6px_0px_#FF2D78] hover:shadow-[8px_8px_0px_#FF2D78] rounded-2xl hover:border-white/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 border-b-2 border-l-2 border-white/20 bg-magenta px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-[1px_1px_0px_rgba(255,255,255,0.1)] z-20">
              Explore Mode
            </div>

            <div className="mb-6 relative z-10">
              <div className="inline-flex h-12 w-12 items-center justify-center border-2 border-white bg-magenta text-white shadow-[3px_3px_0px_#fff] mb-6 rounded-lg">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white">
                02. Manual Explore Mode
              </h3>
              <p className="mt-3 font-body text-base font-semibold leading-relaxed text-white/80">
                Prefer to hand-pick your next big collaboration? Browse through hundreds of verified brand briefs in our marketplace directory. Apply with your unique custom creative concept and lock down custom delivery timelines.
              </p>

              <ul className="mt-6 space-y-3 font-body text-sm font-semibold text-white/90">
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-magenta border border-white/20 bg-black/40 text-[10px] font-black shadow-[1px_1px_0px_#FF2D78]">✓</span>
                  <span>Browse campaign directory with verified budgets</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-magenta border border-white/20 bg-black/40 text-[10px] font-black shadow-[1px_1px_0px_#FF2D78]">✓</span>
                  <span>Pitch custom creative concept directions directly</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full flex items-center justify-center text-magenta border border-white/20 bg-black/40 text-[10px] font-black shadow-[1px_1px_0px_#FF2D78]">✓</span>
                  <span>Automated escrow security upon pitch approval</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/30 border border-white/10 p-5 mt-4 rounded-xl shadow-inner relative z-10">
              <ManualExploreShowcase />
            </div>

            <img 
              src="/creator_silhouette_male.png" 
              alt="Creator Silhouette" 
              className="absolute bottom-[-15px] left-[-25px] h-[220px] w-auto opacity-[0.38] pointer-events-none mix-blend-screen select-none z-0" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CreatorsPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-[72px] md:pt-[96px]">
        <section className="relative overflow-hidden border-b-2 border-primary bg-surface px-4 py-20 md:px-8 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(198,255,0,0.18),transparent_40%),radial-gradient(circle_at_80%_82%,rgba(123,97,255,0.15),transparent_38%)]" />
          <div className="relative z-10 mx-auto max-w-6xl text-center">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-secondary">
              CreLynk For Creators
            </p>
            <h1 className="mt-4 font-heading text-5xl font-black uppercase tracking-tight text-primary md:text-6xl lg:text-7xl">
              Create, Collab, Get Paid
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-body text-lg font-medium leading-relaxed text-secondary md:text-xl">
              This page is focused on creators: idea flow, matched opportunities, ambassador path, and founder-led community.
            </p>
          </div>
        </section>
        <CreatorsMatchingModes />
        <IdeasBoard />
        <CreatorOperatingFlow />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

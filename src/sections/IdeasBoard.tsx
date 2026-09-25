import { AnimatePresence, motion } from 'framer-motion';
import { CircleDot, HandCoins, Lightbulb, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormTrigger } from '../components/form-panel';
import { Sticker } from '../components/ui';

const flowSteps = [
  {
    title: 'Seed the concept',
    copy: 'Post your campaign idea, audience hook, and format in seconds. The board surfaces your concept to brands and co-creators who want to partner fast.',
    note: 'Ideas are shared publicly to inspire brands and creators. Keep it bold, clear, and niche-first.',
    icon: <Lightbulb className="h-6 w-6" />,
    gradient: 'from-violet-500 via-fuchsia-500 to-pink-500',
    orb: 'bg-fuchsia-500/30',
  },
  {
    title: 'Secure support',
    copy: 'Get selected by brands, co-creator teams, or micro-funding partners that want your voice and city context.',
    note: 'When the right people see your pitch, collaboration becomes a launch-ready project instead of a lonely idea.',
    icon: <HandCoins className="h-6 w-6" />,
    gradient: 'from-cyan-400 via-sky-500 to-indigo-600',
    orb: 'bg-cyan-400/25',
  },
  {
    title: 'Refine with AI',
    copy: 'CreLynk AI suggests improvements, hashtags, and format tweaks so your idea lands with the right audience and brand fit.',
    note: 'AI-backed idea refinements help you turn a rough thought into a marketable narrative that travels.',
    icon: <Sparkles className="h-6 w-6" />,
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    orb: 'bg-amber-400/28',
  },
  {
    title: 'Launch the story',
    copy: 'Move from idea to earned engagement with coaching prompts, creator support, and a front-facing pitch that brands can approve instantly.',
    note: 'The board is built to make your next campaign visible, clickable, and easy to pick up.',
    icon: <Zap className="h-6 w-6" />,
    gradient: 'from-lime-400 via-emerald-500 to-teal-500',
    orb: 'bg-lime-400/30',
  },
];

const highlightCards = [
  {
    title: 'Fast creator briefs',
    desc: 'Receive short, high-value briefs tailored to your city, niche, and preferred content formats.',
  },
  {
    title: 'Pay clarity',
    desc: 'Every idea includes budget expectations, timeline, and brand focus so you always know what’s on offer.',
  },
  {
    title: 'Social-first growth',
    desc: 'Create concepts designed to perform on reels, shorts, and local stories, not just feed posts.',
  },
  {
    title: 'Momentum that matters',
    desc: 'Ideas that compound into follow-up campaigns, audience activations, and repeat creators deals.',
  },
];

const categoryTiles = ['Travel creator', 'Foodie storyteller', 'Local lifestyle', 'Product reviewer', 'Event host', 'Brand collaborator', 'Creator duo', 'Short-form expert'];

export function IdeasBoard() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const active = flowSteps[activeStep];

  return (
    <section id="ideas-board" className="relative overflow-hidden border-b-2 border-primary bg-[#08090e] px-4 py-24 md:px-8">
      {/* Drifting Graffiti Spray Paint Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-purple/15 blur-[90px]" />
        <div className="absolute right-10 top-20 h-80 w-80 rounded-full bg-magenta/20 blur-[100px]" />
        <div className="absolute left-1/3 bottom-24 h-72 w-72 rounded-full bg-cyan/15 blur-[90px]" />
        <div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-lime/20 blur-[80px]" />
      </div>

      {/* Concrete texturing and subtle mesh overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-[0.08] mix-blend-overlay z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] z-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <Sticker className="bg-lime text-primary border-2 border-primary shadow-[2px_2px_0px_#000] font-black uppercase tracking-wider text-xs px-3 py-1" angle={-3}>
            🔥 Creator Journey
          </Sticker>
          <div className="max-w-4xl">
            <h2 className="font-heading text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-7xl">
              Idea-to-launch <span className="text-fill-transparent text-lime drop-shadow-[0_2px_12px_rgba(198,255,0,0.5)] font-extrabold" style={{ WebkitTextStroke: '1.5px #C6FF00' }}>flow</span> for creators.
            </h2>
            <p className="mt-4 font-body text-base font-semibold leading-relaxed text-slate-300 md:text-lg max-w-2xl mx-auto">
              A motion-first creator workflow with rotating steps, progress controls, and color-shifting visuals that keep your ideas moving.
            </p>
          </div>
        </div>

        {/* Outer neobrutalist grid wrapper */}
        <div className="mt-12 overflow-hidden rounded-[2.25rem] border-3 border-white/20 bg-black/45 backdrop-blur-md p-1.5 shadow-[8px_8px_0px_rgba(255,255,255,0.04)] relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0c0d14]/90 p-6 md:p-8">
            {/* Color-shifting active top highlight bar based on step */}
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${active.gradient} transition-all duration-500`} />
            
            <div className="relative z-10">
              {/* Sticker selection buttons */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-4 relative z-10">
                {flowSteps.map((step, index) => {
                  const selected = index === activeStep;
                  const rotations = ['rotate-[-1.5deg]', 'rotate-[1.8deg]', 'rotate-[-2deg]', 'rotate-[1.2deg]'];
                  const rotation = rotations[index % rotations.length];
                  
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`relative min-w-[10rem] px-5 py-3 text-left transition-all duration-300 transform hover:scale-105 border-2 ${rotation} ${
                        selected
                          ? 'border-white bg-lime text-primary shadow-[4px_4px_0px_#fff] scale-102 font-black'
                          : 'border-white/10 bg-black/40 text-white/70 hover:border-white/30 hover:bg-black/60 hover:text-white font-bold'
                      }`}
                    >
                      <span className={`block font-mono text-[9px] font-black uppercase tracking-[0.24em] ${selected ? 'text-primary/70' : 'text-white/45'}`}>
                        STEP 0{index + 1}
                      </span>
                      <span className="mt-1 block font-heading text-sm uppercase tracking-tight">
                        {step.title}
                      </span>
                      {selected && (
                        <div className="absolute top-[-6px] right-[-6px] bg-magenta text-white text-[8px] font-mono font-black uppercase px-1 py-0.5 border border-white rotate-6 shadow-[1.5px_1.5px_0px_#fff]">
                          ACTIVE
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Main content display blocks */}
              <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="relative overflow-hidden rounded-[1.75rem] border-2 border-white/10 bg-black/50 p-8 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.title}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.35 }}
                      className="relative"
                    >
                      <div className={`absolute -right-24 top-6 h-48 w-48 rounded-full blur-[70px] ${active.orb} transition-all duration-500 pointer-events-none`} />
                      
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border-2 border-white bg-lime text-primary shadow-[3px_3px_0px_#fff]">
                          {active.icon}
                        </div>
                        <div>
                          <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-white/50">CURRENT STEP</p>
                          <h3 className="mt-1 text-3xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">{active.title}</h3>
                        </div>
                      </div>
                      <p className="font-body text-base font-semibold leading-relaxed text-slate-200">{active.copy}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[1.75rem] border-2 border-white/10 bg-black/50 p-6 text-white/95 shadow-[4px_4px_0_rgba(255,255,255,0.02)]">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-white/40">Why it matters</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-semibold">{active.note}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5 text-sm shadow-[3px_3px_0_rgba(255,255,255,0.01)]">
                      <p className="font-heading font-black text-xs uppercase tracking-wider text-lime">Market-ready</p>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-white/70">Create ideas that brands can understand instantly.</p>
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5 text-sm shadow-[3px_3px_0_rgba(255,255,255,0.01)]">
                      <p className="font-heading font-black text-xs uppercase tracking-wider text-cyan">Visual impact</p>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-white/70">Own the story with clarity, hook, and execution plan.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress and control buttons */}
              <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row relative z-10">
                <div className="flex items-center gap-3 bg-black/45 px-3 py-2 rounded-full border border-white/10">
                  {flowSteps.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to step ${index + 1}`}
                      onClick={() => setActiveStep(index)}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-350 ${
                        index === activeStep 
                          ? 'bg-lime scale-110 shadow-[0_0_8px_#C6FF00]' 
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaused((value) => !value)}
                  className={`rounded-full border-2 border-white px-5 py-2 font-heading text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[2px_2px_0px_#fff] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#fff] ${
                    isPaused ? 'bg-magenta text-white' : 'bg-white text-primary'
                  }`}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-16 relative z-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {highlightCards.map((card, index) => {
              const colors = [
                { border: 'border-lime/30 hover:border-lime', shadow: 'hover:shadow-[6px_6px_0px_#C6FF00]', text: 'text-lime' },
                { border: 'border-cyan/30 hover:border-cyan', shadow: 'hover:shadow-[6px_6px_0px_#00D9FF]', text: 'text-cyan' },
                { border: 'border-purple/30 hover:border-purple', shadow: 'hover:shadow-[6px_6px_0px_#7B61FF]', text: 'text-purple' },
                { border: 'border-magenta/30 hover:border-magenta', shadow: 'hover:shadow-[6px_6px_0px_#FF2D78]', text: 'text-magenta' }
              ];
              const clr = colors[index % colors.length];
              
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.12, duration: 0.45 }}
                  whileHover={{ y: -3 }}
                  className={`rounded-[2rem] border-2 bg-black/45 backdrop-blur-sm p-6 text-white transition-all duration-300 shadow-hard ${clr.border} ${clr.shadow}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-white/40">Highlight</span>
                    <span className={`text-[10px] font-black uppercase ${clr.text}`}>★</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black uppercase tracking-tight text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 font-semibold">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Caution Tape Category Ticker */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border-3 border-white bg-lime px-4 py-6 text-primary shadow-[6px_6px_0px_rgba(255,255,255,0.1)] transform rotate-[-1.2deg] relative z-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20" />
          <p className="font-mono text-[8px] font-black uppercase tracking-[0.4em] text-primary/60 text-center mb-3">★ CREATOR CATEGORY TICKER ★</p>
          <div className="relative h-12 overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="flex min-w-[200%] items-center gap-6 whitespace-nowrap"
            >
              {[...categoryTiles, ...categoryTiles].map((label, index) => (
                <span
                  key={`${label}-${index}`}
                  className="inline-flex rounded-xl border-2 border-primary bg-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-primary shadow-[3px_3px_0px_#000] rotate-[0.5deg]"
                >
                  ⚡ {label}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { FormTrigger } from '../components/form-panel';

const localiteCategories = [
  'cafes',
  'gyms',
  'restaurants',
  'salons',
  'streetwear',
  'real estate',
  'co-working',
  'events',
];

export function LocaliteMode() {
  return (
    <section id="localite-mode" className="relative overflow-hidden border-b-2 border-primary bg-surface px-4 py-24 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-5 mix-blend-multiply" />
      <div className="pointer-events-none absolute -left-8 top-8 h-36 w-36 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-8 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
              // LOCALITE MODE
            </p>

            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-black leading-[1.08] tracking-tight text-primary normal-case md:text-5xl lg:text-6xl">
              Local businesses just entered the creator economy.
            </h2>

            <p className="mt-6 max-w-3xl font-body text-lg font-medium leading-relaxed text-secondary md:text-xl">
              Cafes, gyms, restaurants, fashion stores, salons, co-working spaces and modern property launches can now
              run creator-led campaigns on CreLynk.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5 md:gap-3">
              {localiteCategories.map((category, index) => (
                <motion.span
                  key={category}
                  className="inline-flex items-center border-2 border-primary/20 bg-surface px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80 shadow-[2px_2px_0px_rgba(17,17,17,0.13)]"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.16 }}
                >
                  {category}
                </motion.span>
              ))}
            </div>

            <div className="mt-9">
              <FormTrigger
                formType="localite"
                analytics="localite_mode_cta"
                className="inline-flex items-center justify-center border-2 border-primary bg-elevated px-6 py-3.5 font-heading text-base font-bold uppercase tracking-tight text-primary shadow-[0_8px_18px_rgba(17,17,17,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-[0_14px_26px_rgba(17,17,17,0.14),0_0_18px_rgba(17,17,17,0.10)]"
              >
                I&apos;m a Localite
              </FormTrigger>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[330px] overflow-hidden border-2 border-primary/20 bg-elevated/70 sm:h-[390px] lg:h-[450px]">
              <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-[0.035] mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(17,17,17,0.04)_0%,rgba(17,17,17,0.01)_50%,rgba(17,17,17,0.08)_100%)]" />

              <div className="absolute -left-4 top-6 h-[44%] w-[56%] overflow-hidden border border-primary/20 bg-surface/65 shadow-[0_14px_24px_rgba(17,17,17,0.10)] backdrop-blur-[1px]">
                <img
                  src="/localite_cafe_creator.png"
                  alt="Creator filming inside a cafe"
                  className="h-full w-full object-cover saturate-[1.06] contrast-[1.04] brightness-[0.95] opacity-[0.86]"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 border border-primary/30 bg-surface/70 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70">
                  cafe shots
                </div>
              </div>

              <div className="absolute right-2 top-[22%] h-[50%] w-[48%] overflow-hidden border border-primary/20 bg-surface/65 shadow-[0_14px_24px_rgba(17,17,17,0.10)] backdrop-blur-[1px]">
                <img
                  src="/localite_gym_creator.png"
                  alt="Gym mirror reel aesthetic"
                  className="h-full w-full object-cover saturate-[1.04] contrast-[1.02] brightness-[0.93] opacity-[0.84]"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 border border-primary/30 bg-surface/70 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70">
                  gym reels
                </div>
              </div>

              <div className="absolute bottom-5 left-[17%] h-[34%] w-[62%] overflow-hidden border border-primary/20 bg-surface/65 shadow-[0_14px_24px_rgba(17,17,17,0.10)] backdrop-blur-[1px]">
                <img
                  src="/localite_store_bg.png"
                  alt="Modern storefront textures with city atmosphere"
                  className="h-full w-full object-cover saturate-[1.03] contrast-[1.02] brightness-[0.92] opacity-[0.8]"
                  loading="lazy"
                />
                <div className="absolute bottom-2 left-2 border border-primary/30 bg-surface/70 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70">
                  city texture
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-secondary/85">
          Hyperlocal campaigns. Creator-powered reach.
        </p>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Sparkles, Building2, Rocket } from 'lucide-react';
import { Sticker } from '../components/ui';
import { SectionCartoons } from '../components/section-illustrations';

export function Benefits() {
  const [activeTab, setActiveTab] = useState(0);
  const benefits = [
    {
      title: "For Creators",
      icon: <Sparkles className="w-8 h-8 text-surface" />,
      image: "/images/cards/creator-sparkle.png",
      color: "bg-magenta text-surface border-magenta",
      lead: null,
      points: [
        "Founding profile visibility before public launch",
        "AI-matched to brands before you even have to apply",
        "Auto GST invoicing and income tracking from day one",
        "Direct access to founding team and product roadmap",
        "Revenue-share collab access for zero-cash brand deals",
        "AI Weekly Briefing: 3 content ideas + 2 brand matches every Monday"
      ]
    },
    {
      title: "For Startups",
      icon: <Rocket className="w-8 h-8 text-primary" />,
      image: "/images/cards/startup-rocket.png",
      color: "bg-lime text-primary border-lime",
      lead: "Post your first collab brief in under 10 minutes. AI writes it for you.",
      points: [
        "Revenue-share model: launch creator marketing with ₹0 upfront",
        "AI matches you to creators whose audience actually buys your product",
        "Full escrow, contracts, and compliance - no agency needed",
        "Pay ₹999/month instead of ₹30,000-₹3,00,000/month agency retainer"
      ]
    },
    {
      title: "For Brands",
      icon: <Building2 className="w-8 h-8 text-primary" />,
      image: "/images/cards/brand-building.png",
      color: "bg-cyan text-primary border-cyan",
      lead: "AI auto-ranks and notifies matched creators the moment you post",
      points: [
        "No fake followers - verified profiles + engagement scoring",
        "Full workflow: brief → match → negotiate → content verify → escrow release",
        "Analytics dashboard: see exactly which creators drive real results",
        "10-50x cheaper than agencies, with more control and transparency"
      ]
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-elevated border-b-2 border-primary relative overflow-hidden">
      <SectionCartoons preset="benefits" />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <Sticker className="bg-purple text-surface mb-6" angle={2}>
            Why Join Before Launch?
          </Sticker>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4 max-w-4xl uppercase tracking-tight leading-[1.1]">
            THE FOUNDING ADVANTAGE
          </h2>
        </div>

        <div className="w-full">
          {/* Laptop/Tablet View: Swiper Slider */}
          <div className="hidden md:block">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-12"
            >
              {benefits.map((b, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-2 border-primary shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-hover transition-all flex flex-col h-full bg-surface relative z-0"
                  >
                    <div className="absolute inset-0 z-[-1] bg-[url('/images/bg/halftone-dots.png')] bg-[length:200px] opacity-[0.06] pointer-events-none mix-blend-multiply" />

                    <div className={`p-6 border-b-2 border-primary ${b.color} flex items-center justify-between relative`}>
                      <div className="absolute inset-0 bg-[url('/images/bg/abstract-shapes.png')] bg-cover opacity-20 pointer-events-none mix-blend-overlay" />
                      <h3 className="font-heading font-black text-2xl uppercase tracking-tight relative z-10">
                        {b.title}
                      </h3>
                      <div className="p-2 border-2 border-primary bg-primary/10 backdrop-blur shadow-[2px_2px_0px_#111] relative z-10">
                        {b.icon}
                      </div>
                    </div>

                    <motion.img
                      src={b.image}
                      alt={`${b.title} illustration`}
                      className="w-full h-32 object-contain mx-auto my-4 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    />
                    <ul className="flex flex-col gap-6 p-6 md:p-8 font-body text-primary flex-1 relative z-10">
                      {b.lead ? (
                        <li className="border-2 border-primary bg-primary/5 px-4 py-4 text-lg font-black leading-snug shadow-[3px_3px_0px_#111] bg-surface relative overflow-hidden">
                          <div className="absolute inset-0 z-0 bg-[url('/images/bg/scribbles.png')] bg-cover opacity-10 pointer-events-none mix-blend-multiply" />
                          <span className="relative z-10">{b.lead}</span>
                        </li>
                      ) : null}
                      {b.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-4 text-lg font-medium relative z-10 bg-surface/40 p-2 border-2 border-transparent hover:border-primary/20 transition-all">
                          <div
                            className="mt-1.5 w-3 h-3 border-2 border-primary bg-surface shadow-[2px_2px_0px_#111] shrink-0"
                            style={{ transform: `rotate(${j % 2 === 0 ? 45 : 12}deg)` }}
                          />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile View: Tabbed Layout (View all in one frame) */}
          <div className="flex flex-col md:hidden w-full">
            {/* Tab Buttons */}
            <div className="grid grid-cols-3 border-2 border-primary bg-surface shadow-[4px_4px_0px_#111] mb-6">
              {benefits.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`py-3 font-heading font-black text-xs uppercase tracking-wider border-r-2 last:border-r-0 border-primary transition-colors ${
                    activeTab === idx
                      ? idx === 0
                        ? "bg-magenta text-surface"
                        : idx === 1
                        ? "bg-lime text-primary"
                        : "bg-cyan text-primary"
                      : "bg-surface text-primary hover:bg-elevated"
                  }`}
                >
                  {b.title.replace("For ", "")}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {benefits.map((b, i) => i === activeTab && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="border-2 border-primary shadow-hard flex flex-col bg-surface relative z-0"
                >
                  <div className="absolute inset-0 z-[-1] bg-[url('/images/bg/halftone-dots.png')] bg-[length:200px] opacity-[0.06] pointer-events-none mix-blend-multiply" />

                  <div className={`p-6 border-b-2 border-primary ${b.color} flex items-center justify-between relative`}>
                    <div className="absolute inset-0 bg-[url('/images/bg/abstract-shapes.png')] bg-cover opacity-20 pointer-events-none mix-blend-overlay" />
                    <h3 className="font-heading font-black text-2xl uppercase tracking-tight relative z-10">
                      {b.title}
                    </h3>
                    <div className="p-2 border-2 border-primary bg-primary/10 backdrop-blur shadow-[2px_2px_0px_#111] relative z-10">
                      {b.icon}
                    </div>
                  </div>

                  <motion.img
                    src={b.image}
                    alt={`${b.title} illustration`}
                    className="w-full h-28 object-contain mx-auto my-4 rounded-lg"
                  />
                  <ul className="flex flex-col gap-4 p-6 font-body text-primary relative z-10">
                    {b.lead ? (
                      <li className="border-2 border-primary bg-primary/5 px-4 py-3 text-base font-black leading-snug shadow-[3px_3px_0px_#111] bg-surface relative overflow-hidden">
                        <div className="absolute inset-0 z-0 bg-[url('/images/bg/scribbles.png')] bg-cover opacity-10 pointer-events-none mix-blend-multiply" />
                        <span className="relative z-10">{b.lead}</span>
                      </li>
                    ) : null}
                    {b.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm font-medium relative z-10 bg-surface/40 p-2 border-2 border-transparent">
                        <div
                          className="mt-1 w-2.5 h-2.5 border-2 border-primary bg-surface shadow-[1.5px_1.5px_0px_#111] shrink-0"
                          style={{ transform: `rotate(${j % 2 === 0 ? 45 : 12}deg)` }}
                        />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}

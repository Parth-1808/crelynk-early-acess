import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Ghost, CircleDollarSign, LineChart } from 'lucide-react';
import { Sticker } from '../components/ui';

export function Problem() {
  const [activeTab, setActiveTab] = useState(0);
  const problems = [
    {
      title: "For Creators",
      icon: <Ghost className="w-8 h-8 text-cyan" />,
      image: "/images/cards/creator-ghost.png",
      points: [
        "Ghosting after delivering content - no payment protection",
        "Undercharging by 40-60% because no one tells you your real market rate",
        "Calendar chaos across 5 platforms, missing brand deadlines",
        "No income record, no GST invoice, no help for your CA at tax time",
        "Tier 2 city creators ignored by every agency - treated as an afterthought"
      ],
      color: "border-cyan",
      bg: "bg-cyan/10"
    },
    {
      title: "For Startups",
      icon: <CircleDollarSign className="w-8 h-8 text-magenta" />,
      image: "/images/cards/startup-coin.png",
      points: [
        "Agencies charge ₹30K-3L/month for what a ₹999 plan should do",
        "Zero collab option when your marketing budget is ₹0",
        "Can't tell which creators actually convert vs just post",
        "No way to run revenue-share campaigns without legal chaos"
      ],
      color: "border-magenta",
      bg: "bg-magenta/10"
    },
    {
      title: "For Brands",
      icon: <LineChart className="w-8 h-8 text-lime" />,
      image: "/images/cards/brand-chart.png",
      points: [
        "500 applications per collab, 80% are fake or bot accounts",
        "Spending hours screening manually - 40 hours to find 5 real creators",
        "No visibility into which creator actually drove your sales",
        "Spreadsheet hell - contracts, approvals, payments all in different places",
        "Sponsored content compliance completely untracked"
      ],
      color: "border-lime",
      bg: "bg-lime/10"
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-surface border-b-2 border-primary relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        initial={{ scale: 1.08, x: 0, y: 0 }}
        animate={{
          scale: [1.08, 1.16, 1.08],
          x: [0, -28, 0],
          y: [0, 18, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      >
        <img
          src="/images/problem-collab-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[0.95] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,245,0.46)_0%,rgba(255,251,245,0.22)_28%,rgba(255,251,245,0.28)_72%,rgba(255,251,245,0.5)_100%)]" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,255,70,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,224,255,0.12),transparent_32%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-25 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <Sticker className="bg-orange text-primary mb-6" angle={-3}>
          The Problem
        </Sticker>

        <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4 max-w-4xl uppercase tracking-tight leading-[1.1]">
          The way creator collabs work today? <span className="text-red-500 underline decoration-primary decoration-4 underline-offset-8">Broken.</span>
        </h2>
        
        <p className="font-mono text-lg text-secondary mb-16 uppercase font-bold tracking-widest">
          For creators. For startups. For brands.
        </p>

        <div className="w-full mb-16">
          {/* Laptop/Tablet View: Swiper Slider */}
          <div className="hidden md:block">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
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
              {problems.map((p, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-surface border-2 border-primary shadow-hard p-8 flex flex-col items-start text-left relative overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-hover transition-all z-0 h-full"
                  >
                    <div className="absolute inset-0 z-[-1] bg-[url('/images/bg/scribbles.png')] bg-[length:150px] opacity-[0.05] pointer-events-none mix-blend-multiply" />
                    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl ${p.bg} group-hover:scale-150 transition-transform`} />

                    <div className="p-3 border-2 border-primary bg-surface shadow-[2px_2px_0px_#111] mb-6 inline-flex relative z-10">
                      {p.icon}
                    </div>

                    <motion.img
                      src={p.image}
                      alt={`${p.title} illustration`}
                      className="w-full h-32 object-contain mb-4 rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    />

                    <h3 className="font-heading font-black text-2xl uppercase tracking-tight mb-4 border-b-2 border-primary w-full pb-4 relative z-10">
                      {p.title}
                    </h3>

                    <ul className="flex flex-col gap-4 font-body text-primary font-medium relative z-10">
                      {p.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3 bg-surface/50 p-1">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                          <span>{point}</span>
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
              {problems.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`py-3 font-heading font-black text-xs uppercase tracking-wider border-r-2 last:border-r-0 border-primary transition-colors ${
                    activeTab === idx
                      ? idx === 0
                        ? "bg-cyan text-primary"
                        : idx === 1
                        ? "bg-magenta text-surface"
                        : "bg-lime text-primary"
                      : "bg-surface text-primary hover:bg-elevated"
                  }`}
                >
                  {p.title.replace("For ", "")}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {problems.map((p, i) => i === activeTab && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface border-2 border-primary shadow-hard p-6 flex flex-col items-start text-left relative overflow-hidden z-0"
                >
                  <div className="absolute inset-0 z-[-1] bg-[url('/images/bg/scribbles.png')] bg-[length:150px] opacity-[0.05] pointer-events-none mix-blend-multiply" />
                  <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl ${p.bg}`} />

                  <div className="p-3 border-2 border-primary bg-surface shadow-[2px_2px_0px_#111] mb-6 inline-flex relative z-10">
                    {p.icon}
                  </div>

                  <motion.img
                    src={p.image}
                    alt={`${p.title} illustration`}
                    className="w-full h-28 object-contain mb-4 rounded-lg"
                  />

                  <h3 className="font-heading font-black text-2xl uppercase tracking-tight mb-4 border-b-2 border-primary w-full pb-4 relative z-10">
                    {p.title}
                  </h3>

                  <ul className="flex flex-col gap-4 font-body text-primary font-medium relative z-10">
                    {p.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3 bg-surface/50 p-1 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-lime border-2 border-primary shadow-hard p-6 md:p-8 max-w-3xl transform rotate-1"
        >
          <h3 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-center">
            SO WE'RE BUILDING THE PLATFORM WE WISH ALREADY EXISTED.
          </h3>
        </motion.div>

      </div>
    </section>
  );
}

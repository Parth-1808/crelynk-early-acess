import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { SectionCartoons } from '../components/section-illustrations';

export function WhyCrelynk() {
  const moats = [
    {
      title: "Startup-friendly economics",
      desc: "₹999/month replaces a ₹30,000-₹3,00,000/month agency. Revenue-share collabs mean zero-cash startups can still run creator marketing and pay from results.",
      supporting: null,
      color: "bg-cyan text-primary"
    },
    {
      title: "India-native financial infrastructure",
      desc: "UPI escrow via Razorpay. Auto GST invoice after every collab. TDS summary at year-end. Download your income report and hand it directly to your CA.",
      supporting: "No other Indian platform does this.",
      color: "bg-orange text-primary"
    },
    {
      title: "Creator OS - not just a marketplace",
      desc: "Idea board, posting calendar, deal tracker, income dashboard, Instagram analytics - all in one place. Creators use CreLynk every day, not just when they want a brand deal.",
      supporting: "That daily habit is the moat.",
      color: "bg-purple text-surface"
    },
    {
      title: "AI that coaches both sides",
      desc: "AI reviews a creator's pitch before they send it and tells them what to improve. AI verifies content matches the brief before the brand even sees it.",
      supporting: "AI suggests fair prices so negotiations don't die before they start.",
      color: "bg-magenta text-surface"
    },
    {
      title: "Reputation graph",
      desc: "Delivery rate, content quality, response time, revision acceptance, completion history - all tracked, all permanent. Becomes your durable reputation score. Brands filter by it. Creators compete to maintain it.",
      supporting: "The CIBIL score of the creator economy.",
      color: "bg-lime text-primary"
    },
    {
      title: "Founder-led community",
      desc: "Early users directly influence product direction. Built with you, not for you.",
      supporting: null,
      color: "bg-surface text-primary"
    }
  ];

  return (
    <section id="why-crelynk" className="relative overflow-hidden py-24 px-4 md:px-8 bg-surface border-b-2 border-primary">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-5 pointer-events-none mix-blend-multiply" />
      <SectionCartoons preset="why" />
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16 max-w-3xl flex flex-col items-center">
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-tight leading-[1.1]">
            WHY <span className="text-lime text-stroke-2">CRELYNK</span> CAN WIN
          </h2>
          <p className="font-mono text-lg text-secondary font-bold uppercase tracking-widest">
            Not just a feature list. Real advantages.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-4xl">
          {moats.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 border-2 border-primary shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-hover transition-all flex flex-col md:flex-row items-start md:items-center gap-6 ${m.color} relative overflow-hidden z-0`}
            >
              <div className="absolute inset-0 z-[-1] bg-[url('/images/bg/abstract-shapes.png')] bg-[length:250px] opacity-[0.12] pointer-events-none mix-blend-overlay" />
              
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 border-2 border-primary bg-surface text-primary shadow-[2px_2px_0px_#111]">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-black text-2xl uppercase tracking-tight">
                    {m.title}
                  </h3>
                </div>
                <p className="font-body font-medium opacity-90 text-lg">
                  {m.desc}
                </p>
                {m.supporting ? (
                  <p className="mt-3 border-t border-primary/25 pt-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] opacity-90 bg-surface/20 p-2">
                    {m.supporting}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 relative z-10">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-primary bg-surface text-primary whitespace-nowrap shadow-[1px_1px_0px_#111]">
                  Why this matters
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-primary bg-surface text-primary whitespace-nowrap shadow-[1px_1px_0px_#111]">
                  Hard to copy ✓
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-16 w-full max-w-4xl">
          <div className="flex-1 text-center py-4 border-2 border-primary bg-surface shadow-hard font-heading font-black uppercase tracking-tight rotate-1 hover:rotate-0 transition-transform">
            Better for creators
          </div>
          <div className="flex-1 text-center py-4 border-2 border-primary bg-lime shadow-hard font-heading font-black uppercase tracking-tight -rotate-1 hover:rotate-0 transition-transform">
            Better for startups
          </div>
          <div className="flex-1 text-center py-4 border-2 border-primary bg-cyan shadow-hard font-heading font-black uppercase tracking-tight rotate-2 hover:rotate-0 transition-transform">
            Better for brands
          </div>
        </div>
      </div>
    </section>
  );
}

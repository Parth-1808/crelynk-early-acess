import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Sticker } from '../components/ui';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is CRELYNK?", a: "CreLynk is a pre-launch creator-brand collaboration platform built for India. We're not just a marketplace - we're a creator operating system. AI matches creators to brands, escrow protects every payment, and the platform handles your idea board, posting calendar, deal tracking, income dashboard, and auto-GST invoicing. Everything a creator needs to run their business professionally.", tag: "Basics", tone: "bg-surface", tagTone: "bg-lime text-primary", angle: -2, offset: 0 },
    { q: "When are you launching?", a: "August 15, 2026. Founding members get access before the public launch.", tag: "Launch", tone: "bg-cyan/15", tagTone: "bg-cyan text-primary", angle: 2, offset: 18 },
    { q: "Is early access free?", a: "Yes. Early access is completely free. Founding members get free premium/growth access during the first launch phase.", tag: "Access", tone: "bg-orange/15", tagTone: "bg-orange text-primary", angle: -3, offset: 10 },
    { q: "Can startups use it without agency fees?", a: "Absolutely. Post your first collab brief in under 10 minutes - AI writes it for you. Revenue-share collab format means zero-budget startups can launch creator marketing and pay from results, not upfront. No agency, no spreadsheets.", tag: "Startup", tone: "bg-purple/12", tagTone: "bg-purple text-surface", angle: 1.5, offset: 24 },
    { q: "Will CRELYNK support revenue-share creator collaborations?", a: "Yes - it's built in from launch. Brands can offer a percentage of revenue generated instead of a flat fee. Our platform handles the valuation, structure, and payment tracking. Ideal for seed-stage startups who need creator marketing before they have a cash budget.", tag: "Models", tone: "bg-lime/15", tagTone: "bg-lime text-primary", angle: -1.5, offset: 8 },
    { q: "Are ambassador equity or referral rewards guaranteed?", a: "Equity-linked participation and referral terms are illustrative. Final terms confirmed upon selection and formal agreement with each founding ambassador.", tag: "Upside", tone: "bg-magenta/12", tagTone: "bg-magenta text-surface", angle: 3, offset: 20 },
    { q: "Which platforms are supported?", a: "Instagram, YouTube, and TikTok at launch. Twitter/X, LinkedIn, and Pinterest coming post-launch. Creators can connect their Instagram via Meta API for automatic analytics pulling - no manual media kit needed.", tag: "Platforms", tone: "bg-surface", tagTone: "bg-cyan text-primary", angle: -2.5, offset: 14 },
    { q: "How does payment work?", a: "All payments go through UPI escrow via Razorpay. Brand pays into escrow when they accept a creator. Money is held securely. Once the creator delivers and the brand approves, payment releases automatically - creators get paid within minutes. Platform fee auto-deducted. GST invoice auto-generated. No chasing.", tag: "Payments", tone: "bg-lime/12", tagTone: "bg-lime text-primary", angle: 2.5, offset: 30 },
    { q: "What if a brand doesn't respond or ghosts?", a: "Money is held in escrow before the collab starts - brands can't ghost after payment. If a dispute occurs, CreLynk's resolution team steps in. Creators are protected from the moment a deal is accepted. Your Reputation Score also tracks brand reliability, so bad actors are visible to the whole platform.", tag: "Safety", tone: "bg-orange/12", tagTone: "bg-orange text-primary", angle: -1, offset: 12 },
    { q: "What niches work best on CreLynk?", a: "D2C brands (fashion, food, fitness, beauty, wellness) and seed-stage Indian startups are the primary brand users. Creator niches that perform best: lifestyle, fashion, fitness, food, tech, finance. Tier 2 creators in Punjab, Rajasthan, UP, and Maharashtra are especially underserved - and exactly who our AI prioritises.", tag: "Fit Check", tone: "bg-cyan/12", tagTone: "bg-cyan text-primary", angle: 1.8, offset: 26 }
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-elevated border-b-2 border-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-5 pointer-events-none mix-blend-multiply" />
      <div className="absolute left-[6%] top-[10%] h-28 w-28 rounded-full bg-magenta/12 blur-3xl pointer-events-none" />
      <div className="absolute right-[8%] top-[18%] h-24 w-24 rounded-full bg-cyan/12 blur-3xl pointer-events-none" />
      <div className="absolute left-[18%] bottom-[12%] h-32 w-32 rounded-full bg-lime/12 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <Sticker className="bg-lime text-primary mb-6" angle={2}>
          Got Questions?
        </Sticker>

        <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 uppercase tracking-tight leading-[1.1] text-center">
          FAQ
        </h2>

        <p className="mb-12 max-w-2xl text-center font-body text-lg font-medium text-secondary">
          Not a boring help center. More like pinned notes from the founder desk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start">
          {faqs.map((faq, i) => (
            <motion.div
              key={i} 
              layout
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              animate={{ rotate: openIndex === i ? 0 : faq.angle, y: openIndex === i ? 0 : faq.offset }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: i * 0.03 }}
              className={`relative overflow-hidden border-4 border-primary shadow-hard transition-all ${faq.tone} ${openIndex === i ? 'shadow-hard-hover' : ''}`}
            >
              <div className="absolute -right-3 -top-3 h-20 w-20 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
              <div className="absolute left-4 top-4 border border-primary bg-surface px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
                {String(i + 1).padStart(2, '0')}
              </div>

              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-5 p-6 pt-14 text-left"
              >
                <div className="flex-1">
                  <div className={`mb-4 inline-flex border-2 border-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] shadow-[2px_2px_0px_#111] ${faq.tagTone}`}>
                    {faq.tag}
                  </div>
                  <span className="block font-heading font-bold text-xl md:text-2xl uppercase tracking-tight pr-2 leading-tight">
                    {faq.q}
                  </span>
                </div>
                <span className={`p-2 border-2 border-primary shrink-0 transition-transform shadow-[2px_2px_0px_#111] ${openIndex === i ? 'bg-magenta text-surface rotate-90' : 'bg-surface text-primary'}`}>
                  {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-6 mb-6 border-t-2 border-primary border-dashed pt-5 font-body text-lg font-medium text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

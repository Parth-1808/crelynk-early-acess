import { motion } from 'framer-motion';
import { Bot, MessageSquare, ShieldCheck } from 'lucide-react';

export function WhatWereBuilding() {
  const steps = [
    {
      title: "Brand posts a collab brief in under 10 minutes",
      desc: "Quick setup. AI writes the full brief for you - just answer 5 questions. Clean structure, no spreadsheet chaos, no agency needed.",
      icon: <MessageSquare className="w-6 h-6" />,
      tone: "bg-surface text-primary",
    },
    {
      title: "AI matches and notifies the right creators instantly",
      desc: "No waiting for applications. CreLynk's AI ranks the top creators by fit - location, engagement, niche, audience quality - and notifies them directly on WhatsApp, email, and the app. Creators are matched before you even search.",
      icon: <Bot className="w-6 h-6" />,
      tone: "bg-lime text-primary",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Collab happens. Payment releases automatically on completion.",
      desc: "Creator delivers content. AI verifies it matches the brief. Brand approves. Escrow releases to creator in minutes - not days. GST invoice auto-generated. Reputation scores updated. Done.",
      tone: "bg-cyan text-primary",
    }
  ];

  return (
    <section id="what-were-building" className="py-24 px-4 md:px-8 bg-elevated border-b-2 border-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-10 pointer-events-none mix-blend-multiply" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest border-2 border-primary px-3 py-1 bg-surface shadow-hard mb-6 inline-flex rotate-2">
            The Vision
          </span>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-4 max-w-4xl uppercase tracking-tight leading-[1.1]">
            WHAT CRELYNK IS BUILDING
          </h2>
          <p className="font-body text-xl text-secondary max-w-2xl mt-4 font-medium">
            A smarter creator-brand collaboration ecosystem built for India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 border-2 border-primary shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-hover transition-all flex flex-col min-h-[250px] ${step.tone}`}
            >
              {i < steps.length - 1 ? (
                <div className="absolute top-1/2 -right-4 z-20 hidden h-0.5 w-8 bg-primary md:block" />
              ) : null}

              <div className="flex items-start justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-primary bg-surface text-primary shadow-[3px_3px_0px_#111]">
                    {step.icon}
                  </div>
                  <div className="font-heading text-5xl leading-none font-black opacity-30">
                    0{i + 1}
                  </div>
                </div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-1 border-2 border-primary bg-surface text-primary">
                  Step {i + 1}
                </div>
              </div>
              
              <div>
                <h3 className="font-heading font-black text-2xl uppercase tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-body font-medium opacity-90">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

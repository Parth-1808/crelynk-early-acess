import { Sparkles, ArrowRight } from 'lucide-react';
import { FormTrigger } from '../components/form-panel';
import { Sticker } from '../components/ui';

export function FinalCTA() {
  return (
    <section className="py-32 px-4 md:px-8 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] border-b-2 border-primary relative overflow-hidden bg-primary text-surface">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-5 pointer-events-none mix-blend-multiply" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-lime/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-magenta/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-surface/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 text-center">
        
        <Sticker className="bg-cyan text-primary mb-8" angle={-3}>
          The Next Era
        </Sticker>

        <h2 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 uppercase tracking-tight leading-[1.05] max-w-5xl">
          OF CREATOR-BRAND COLLABS <span className="text-lime text-stroke-2 block mt-2">STARTS HERE.</span>
        </h2>
        
        <p className="font-body text-xl text-surface/80 mb-16 max-w-2xl font-medium uppercase tracking-widest border-b-2 border-surface/20 pb-4">
          Join CreLynk before public launch. Be part of the founding wave - and let AI handle everything between the pitch and the payment.
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mb-16">
          <FormTrigger formType="creator" analytics="final_cta_creator" className="flex-1 bg-surface text-primary border-4 border-primary shadow-[8px_8px_0px_#C6FF00] p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#C6FF00] transition-all group relative overflow-hidden flex flex-col items-center text-center">
            <Sticker className="absolute -top-3 -right-3 bg-lime text-primary scale-90" angle={6}>Creator</Sticker>
            <div className="w-16 h-16 bg-lime border-4 border-primary rounded-full mb-6 flex items-center justify-center shadow-[4px_4px_0px_#111]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-4 group-hover:underline underline-offset-8 decoration-4 decoration-lime">
              I'M A CREATOR
            </h3>
            <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-secondary mt-auto">
              Join Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
          </FormTrigger>

          <FormTrigger formType="brand" analytics="final_cta_brand" className="flex-1 bg-lime text-primary border-4 border-primary shadow-[8px_8px_0px_#FF2D78] p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#FF2D78] transition-all group relative overflow-hidden flex flex-col items-center text-center">
            <Sticker className="absolute -top-3 -right-3 bg-magenta text-surface scale-90" angle={-6}>Brand / Startup</Sticker>
            <div className="w-16 h-16 bg-magenta border-4 border-primary rounded-none mb-6 flex items-center justify-center shadow-[4px_4px_0px_#111]">
              <Sparkles className="w-8 h-8 text-surface" />
            </div>
            <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-4 group-hover:underline underline-offset-8 decoration-4 decoration-magenta">
              I'M A BRAND
            </h3>
            <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest mt-auto">
              Get Early Access <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
          </FormTrigger>

          <FormTrigger formType="ambassador" analytics="final_cta_ambassador" className="flex-1 bg-purple text-surface border-4 border-primary shadow-[8px_8px_0px_#00D9FF] p-8 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#00D9FF] transition-all group relative overflow-hidden flex flex-col items-center text-center">
            <Sticker className="absolute -top-3 -right-3 bg-cyan text-primary scale-90" angle={4}>Ambassador</Sticker>
            <div className="w-16 h-16 bg-cyan border-4 border-primary rounded-[32px] rounded-br-none mb-6 flex items-center justify-center shadow-[4px_4px_0px_#111]">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-black text-3xl uppercase tracking-tight mb-4 group-hover:underline underline-offset-8 decoration-4 decoration-cyan">
              AMBASSADOR
            </h3>
            <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-surface/80 mt-auto">
              Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
          </FormTrigger>
        </div>



      </div>
    </section>
  );
}

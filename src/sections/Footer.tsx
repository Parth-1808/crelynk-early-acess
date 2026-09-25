import { ArrowRight, Mail, Copy } from 'lucide-react';
import logoSrc from '../assets/Untitled design (1)-Photoroom.png';
import { FormTrigger } from '../components/form-panel';

export function Footer() {
  return (
    <footer className="bg-surface border-t-2 border-primary pt-16 pb-24 md:pb-16 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 justify-between items-start">
        
        <div className="flex flex-col items-start w-full md:w-1/3">
          <div className="font-heading font-black text-5xl tracking-tight mb-4 flex items-center gap-5">
            <img src={logoSrc} alt="Crelynk Logo" className="h-20 w-20 md:h-28 md:w-28 object-contain " />
            <span>CRE<span className="text-lime text-stroke-2">LYNK</span></span>
          </div>
          <p className="font-mono text-sm uppercase tracking-wider text-secondary mb-6">
            The lynk between creators & brands
          </p>
          <div className="flex items-center gap-2">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=crelynk.in@gmail.com&su=Crelynk%20Founder%20Access" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-body font-bold hover:text-purple transition-colors">
              <Mail className="w-5 h-5" />
              crelynk.in@gmail.com
            </a>
            <button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await navigator.clipboard.writeText('crelynk.in@gmail.com');
                } catch (error) {
                  console.warn('Copy to clipboard failed.', error);
                }
              }}
              className="p-1 text-secondary opacity-40 hover:opacity-100 hover:text-primary transition-all active:scale-95 cursor-pointer"
              title="Copy to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg mb-2">Navigation</h4>
            <a href="/" className="hover:text-purple hover:underline underline-offset-4 decoration-2">Home</a>
            <a href="/brands" className="hover:text-purple hover:underline underline-offset-4 decoration-2">Brands</a>
            <a href="/creators" className="hover:text-purple hover:underline underline-offset-4 decoration-2">Creators</a>
            <a href="/localites" className="hover:text-purple hover:underline underline-offset-4 decoration-2">Localites</a>
            <a href="/profiles" className="hover:text-purple hover:underline underline-offset-4 decoration-2">Profiles</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-lg mb-2">Actions</h4>
            <FormTrigger formType="creator" className="flex items-center gap-1 hover:text-lime hover:underline underline-offset-4 decoration-2">
              Early Access <ArrowRight className="w-4 h-4" />
            </FormTrigger>
            <FormTrigger formType="ambassador" className="text-left hover:text-purple hover:underline underline-offset-4 decoration-2">Apply as Ambassador</FormTrigger>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=crelynk.in@gmail.com&su=Crelynk%20Founder%20Access" target="_blank" rel="noopener noreferrer" className="hover:text-cyan hover:underline underline-offset-4 decoration-2">Contact Founder</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-2 border-primary flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 flex-wrap">
          <p className="font-mono text-sm font-bold">© 2026 CRELYNK</p>
          <span className="hidden md:inline text-secondary font-bold">•</span>
          <a href="/privacy" className="font-mono text-sm font-bold text-secondary hover:text-purple hover:underline underline-offset-2">Privacy Policy</a>
          <span className="hidden md:inline text-secondary font-bold">•</span>
          <a href="/terms" className="font-mono text-sm font-bold text-secondary hover:text-purple hover:underline underline-offset-2">Terms of Service</a>
          <span className="hidden md:inline text-secondary font-bold">•</span>
          <a href="/data-deletion" className="font-mono text-sm font-bold text-secondary hover:text-purple hover:underline underline-offset-2">Data Deletion</a>
        </div>
        <div className="px-4 py-2 border-2 border-primary font-heading font-bold uppercase shadow-[2px_2px_0px_#111] rotate-[1deg] bg-surface">
          Made in India
        </div>
      </div>
    </footer>
  );
}

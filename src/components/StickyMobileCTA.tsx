import { ArrowRight } from 'lucide-react';
import { useFormPanel } from './form-panel';

export function StickyMobileCTA() {
  const { openTypeSelector } = useFormPanel();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface border-t-2 border-primary shadow-[0_-4px_0px_rgba(17,17,17,0.1)] p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="font-heading font-bold text-sm leading-tight flex flex-col">
          <span className="uppercase text-lime bg-primary text-center px-2 py-0.5 rounded-none mb-1 shadow-[2px_2px_0px_#C6FF00]">
            Founding
          </span>
          <span className="uppercase tracking-tight text-primary">
            Access Open
          </span>
        </div>

        <button
          type="button"
          onClick={openTypeSelector}
          className="inline-flex items-center justify-center bg-primary text-surface px-5 py-3 font-heading font-bold uppercase shadow-hard hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-hard-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-hard-active transition-all whitespace-nowrap text-sm"
        >
          GET EARLY ACCESS <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
      <div className="mt-3 flex justify-end">

      </div>
    </div>
  );
}

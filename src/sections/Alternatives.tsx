import { Check, X } from 'lucide-react';
import { Sticker } from '../components/ui';

type ComparisonValue = boolean | 'partial';

export function Alternatives() {
  const comparison = [
    { feature: "AI creator matching", crelynk: true, agencies: false, dms: false, tools: false },
    { feature: "UPI escrow + auto-release", crelynk: true, agencies: false, dms: false, tools: false },
    { feature: "GST invoice + TDS summary", crelynk: true, agencies: false, dms: false, tools: false },
    { feature: "Creator posting calendar", crelynk: true, agencies: false, dms: false, tools: false },
    { feature: "AI pitch coaching", crelynk: true, agencies: false, dms: false, tools: false },
    { feature: "Revenue-share collabs", crelynk: true, agencies: false, dms: false, tools: false },
    { feature: "Startup affordability", crelynk: true, agencies: false, dms: true, tools: true },
    { feature: "Indian market fit", crelynk: true, agencies: "partial", dms: true, tools: false },
  ];

  const renderCell = (value: ComparisonValue, large = false) => {
    if (value === 'partial') {
      return (
        <span className="inline-flex border-2 border-primary bg-surface px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-[2px_2px_0px_#111]">
          partial
        </span>
      );
    }

    if (value) {
      return large ? (
        <Check className="w-8 h-8 text-lime bg-primary mx-auto border-2 border-primary shadow-[2px_2px_0px_#111]" />
      ) : (
        <Check className="w-6 h-6 text-primary/50 mx-auto" />
      );
    }

    return <X className={`${large ? 'w-8 h-8' : 'w-6 h-6'} text-primary/30 mx-auto`} />;
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-elevated border-b-2 border-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-5 pointer-events-none mix-blend-multiply" />
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <Sticker className="bg-lime text-primary mb-6" angle={-2}>
          The Alternatives
        </Sticker>

        <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16 text-center max-w-4xl uppercase tracking-tight leading-[1.1]">
          WHY CRELYNK &gt; DMS, AGENCIES, AND RANDOM TOOLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16">
          <div className="bg-magenta text-surface border-4 border-primary p-6 font-heading font-black text-2xl uppercase tracking-tight shadow-hard rotate-1 text-center">
            BETTER THAN AGENCY COSTS
          </div>
          <div className="bg-orange text-primary border-4 border-primary p-6 font-heading font-black text-2xl uppercase tracking-tight shadow-hard -rotate-2 text-center">
            BETTER THAN DM CHAOS
          </div>
          <div className="bg-cyan text-primary border-4 border-primary p-6 font-heading font-black text-2xl uppercase tracking-tight shadow-hard rotate-2 text-center">
            BETTER THAN BORING TOOLS
          </div>
        </div>

        <div className="w-full bg-surface border-4 border-primary shadow-[8px_8px_0px_#111] overflow-x-auto relative">
          <Sticker className="absolute -top-4 -right-4 bg-purple text-surface z-10" angle={10}>
            One Platform
          </Sticker>
          
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-elevated border-b-4 border-primary font-heading font-black text-lg uppercase tracking-tight text-left">
                <th className="p-6 border-r-4 border-primary w-1/4">Feature</th>
                <th className="p-6 border-r-4 border-primary w-1/4 bg-lime/30 text-center">
                  <span className="text-lime text-stroke-2 text-3xl">CRELYNK</span>
                </th>
                <th className="p-6 border-r-4 border-primary w-1/6 text-center opacity-70">Agencies</th>
                <th className="p-6 border-r-4 border-primary w-1/6 text-center opacity-70">IG DMs</th>
                <th className="p-6 w-1/6 text-center opacity-70">Generic Tools</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-b-2 border-primary font-body font-bold text-lg hover:bg-elevated/50 transition-colors">
                  <td className="p-6 border-r-4 border-primary">{row.feature}</td>
                  <td className="p-6 border-r-4 border-primary bg-lime/10 text-center">
                    {renderCell(row.crelynk, true)}
                  </td>
                  <td className="p-6 border-r-4 border-primary text-center">
                    {renderCell(row.agencies)}
                  </td>
                  <td className="p-6 border-r-4 border-primary text-center">
                    {renderCell(row.dms)}
                  </td>
                  <td className="p-6 text-center">
                    {renderCell(row.tools)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 font-heading font-black text-3xl uppercase tracking-tight bg-primary text-lime px-8 py-4 rotate-1 shadow-[4px_4px_0px_#FF2D78]">
          One smart platform, without the bloat of a full traditional agency stack.
        </div>

      </div>
    </section>
  );
}

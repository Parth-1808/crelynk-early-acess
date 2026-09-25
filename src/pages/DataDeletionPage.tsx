import { Navbar } from '../components/Navbar';
import { Footer } from '../sections/Footer';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { ArrowLeft, Trash2, ShieldCheck, Mail, Smartphone, CheckCircle2, Clock } from 'lucide-react';
import { useEffect } from 'react';

const MetaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export function DataDeletionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,45,120,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(123,97,255,0.08),transparent_24%)]" />
      <Navbar />

      <main className="relative pt-[96px] md:pt-[120px] pb-24 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wide px-4 py-2 border-2 border-primary bg-surface shadow-hard hover:translate-y-0.5 hover:shadow-hard-active transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>

        {/* Header Header */}
        <div className="border-4 border-primary bg-surface p-6 md:p-10 mb-12 shadow-hard relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-magenta border-b-4 border-l-4 border-primary rotate-[15deg] translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-primary bg-magenta text-white font-mono text-xs font-bold uppercase mb-4 shadow-[2px_2px_0px_#111]">
              <Trash2 className="w-3.5 h-3.5" />
              Data Erasure Protocol
            </div>
            <h1 className="font-heading font-black text-3xl md:text-5xl tracking-tight mb-4">
              USER DATA DELETION <span className="text-purple">—</span> RULES &amp; INSTRUCTIONS
            </h1>
            <p className="font-body text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
              CreLynk is committed to user data privacy under the <strong>Digital Personal Data Protection Act, 2023 (DPDP)</strong> and <strong>Meta Developer Platform Policies</strong>.
            </p>
            <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap gap-4 font-mono text-xs font-bold text-secondary">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple" />
                META PLATFORM COMPLIANT
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-magenta" />
                72h ACKNOWLEDGEMENT GUARANTEE
              </span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">

          {/* Section 1: How to Request Data Deletion */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">1</span>
              How to Request Data Deletion
            </h2>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Option A */}
              <div className="border-2 border-primary bg-surface p-6 shadow-hard relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-xs uppercase px-3 py-1 bg-lime border-2 border-primary shadow-[2px_2px_0px_#111]">
                    Option A (Instant)
                  </span>
                  <Smartphone className="w-5 h-5 text-purple" />
                </div>
                <h3 className="font-heading font-black text-xl mb-3">In-App Self-Service</h3>
                <ol className="list-decimal pl-5 space-y-2 font-body text-sm text-secondary">
                  <li>Open the <strong>CreLynk App</strong>.</li>
                  <li>Go to <strong>Settings &gt; Privacy &amp; Security</strong>.</li>
                  <li>Tap <strong>Delete Account &amp; Erasure Request</strong>.</li>
                  <li>Confirm deletion with your registered OTP.</li>
                </ol>
              </div>

              {/* Option B */}
              <div className="border-2 border-primary bg-surface p-6 shadow-hard relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-xs uppercase px-3 py-1 bg-cyan border-2 border-primary shadow-[2px_2px_0px_#111]">
                    Option B (Facebook Callback)
                  </span>
                  <MetaIcon className="w-5 h-5 text-purple" />
                </div>
                <h3 className="font-heading font-black text-xl mb-3">Meta / Facebook Login Removal</h3>
                <p className="font-body text-sm text-secondary mb-3">
                  If you connected your Instagram account via Meta Facebook Login:
                </p>
                <ol className="list-decimal pl-5 space-y-2 font-body text-sm text-secondary">
                  <li>Go to your <strong>Facebook Profile &gt; Settings &amp; Privacy &gt; Settings</strong>.</li>
                  <li>Navigate to <strong>Apps and Websites</strong>.</li>
                  <li>Select <strong>CreLynk</strong> and click <strong>Remove</strong>.</li>
                  <li>Click <strong>View Removed Apps and Websites</strong> and request Facebook to inform CreLynk to delete your data.</li>
                </ol>
              </div>

              {/* Option C */}
              <div className="border-2 border-primary bg-surface p-6 shadow-hard relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-xs uppercase px-3 py-1 bg-purple text-white border-2 border-primary shadow-[2px_2px_0px_#111]">
                    Option C (Email)
                  </span>
                  <Mail className="w-5 h-5 text-magenta" />
                </div>
                <h3 className="font-heading font-black text-xl mb-3">DPO Email Request</h3>
                <p className="font-body text-sm text-secondary mb-2">
                  Send an email from your registered email address to:
                </p>
                <div className="p-4 border-2 border-primary bg-background font-mono text-sm font-bold">
                  dpo@crelynk.in
                </div>
                <p className="font-body text-xs text-secondary mt-2">
                  Subject Line: <strong>Data Erasure Request - [Your Username]</strong>
                </p>
              </div>

            </div>
          </section>

          {/* Section 2: Retention Schedule Table */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">2</span>
              Data Deletion Rules &amp; Retention Schedule
            </h2>

            <div className="border-2 border-primary overflow-x-auto shadow-hard">
              <table className="w-full font-body text-sm text-left border-collapse bg-surface">
                <thead>
                  <tr className="border-b-2 border-primary bg-elevated">
                    <th className="p-4 border-r-2 border-primary font-heading font-bold w-1/3">Data Category</th>
                    <th className="p-4 font-heading font-bold">Action &amp; Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary font-mono">Account Credentials &amp; Profile</td>
                    <td className="p-4">Permanently deleted within <strong>90 days</strong>.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary font-mono">Social Snapshots &amp; Metrics</td>
                    <td className="p-4">Immediately unlinked and queued for deletion within <strong>7 days</strong>.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary font-mono">Direct Chat Messages &amp; Polls</td>
                    <td className="p-4">Permanently deleted with your account.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary font-mono text-magenta">Financial &amp; Tax Records (PAN, Invoices, TDS)</td>
                    <td className="p-4 font-bold text-magenta">Retained for 8 years as mandated by the Indian Companies Act &amp; Income Tax Act (s.194-O).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary font-mono">Executed Contract Records &amp; Invoices</td>
                    <td className="p-4">Retained for <strong>8 years</strong> to satisfy legal reporting and dispute resolution requirements.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Verification */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-purple text-white text-sm font-bold shadow-[2px_2px_0px_#111]">3</span>
              Data Deletion Verification Status
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <p className="text-sm">
                You can verify the status of your deletion request at any time by reaching out to our Data Protection Officer:
              </p>
              <div className="p-4 border-2 border-primary bg-background font-mono text-sm space-y-1">
                <div className="font-heading font-bold text-xs text-secondary uppercase">Data Protection Officer (DPO)</div>
                <div className="font-bold text-purple">dpo@crelynk.in</div>
              </div>
              <div className="p-4 border-2 border-primary bg-elevated text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span><strong>Response Guarantee:</strong> Acknowledged within 72 hours; full compliance completed within 30 days.</span>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

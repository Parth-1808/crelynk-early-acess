import { Navbar } from '../components/Navbar';
import { Footer } from '../sections/Footer';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { ArrowLeft, Scale, ShieldAlert, DollarSign, Clock, FileCheck, Info } from 'lucide-react';
import { useEffect } from 'react';

export function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(198,255,0,0.08),transparent_24%)]" />
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
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan border-b-4 border-l-4 border-primary rotate-[-12deg] translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-primary bg-cyan font-mono text-xs font-bold uppercase mb-4 shadow-[2px_2px_0px_#111]">
              <Scale className="w-3.5 h-3.5" />
              Legal Agreement
            </div>
            <h1 className="font-heading font-black text-4xl md:text-5xl tracking-tight mb-4">
              CRELYNK <span className="text-lime">—</span> TERMS OF SERVICE
            </h1>
            <p className="font-body text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
              These Terms are a legally binding agreement between you and <strong>CreLynk</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;).
            </p>
            <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap gap-4 font-mono text-xs font-bold text-secondary">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-purple" />
                INDIAN CONTRACT ACT, 1872 COMPLIANT
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-lime" />
                RBI PAYMENT AGGREGATOR ESCROW
              </span>
            </div>
          </div>
        </div>

        {/* Preamble Callout */}
        <div className="border-2 border-primary bg-elevated p-6 mb-12 font-body text-base leading-relaxed relative shadow-hard">
          <div className="absolute -top-3 left-6 px-3 py-0.5 border-2 border-primary bg-magenta text-white font-heading font-black text-xs uppercase shadow-[2px_2px_0px_#111]">
            Important Notice
          </div>
          <p className="mt-2 font-semibold">
            By creating an account or using CreLynk, you agree to these Terms. If you do not agree, do not use CreLynk.
          </p>
          <p className="mt-3 text-sm text-secondary">
            <strong>Read Section 8 (Money), Section 11 (Disputes &amp; Refunds), and Section 12 (Limitation of Liability) carefully.</strong> They limit our liability, set out rules for deliverable approval, and describe how funds move.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">

          {/* Section 1 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">1</span>
              What CreLynk Is — and What It Is Not
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-4 font-body text-base leading-relaxed">
              <p>
                CreLynk is a marketplace platform connecting <strong>Creators</strong> (individuals or entities publishing digital content on social platforms) with <strong>Brands</strong> (businesses seeking influencer marketing), providing tools to negotiate, manage, and settle collaboration briefs.
              </p>
              <div className="p-4 border-2 border-primary bg-background">
                <h3 className="font-heading font-bold text-xs uppercase text-purple mb-2">Intermediary Status</h3>
                <p className="text-sm">
                  We operate as an <strong>intermediary</strong> under Section 79 of the Information Technology Act, 2000. When a Brand and Creator execute a brief on CreLynk, the resulting contract is directly <strong>between the Brand and the Creator</strong>. CreLynk is not a party to their agreement.
                </p>
              </div>
              <p className="font-bold text-sm uppercase tracking-wide text-secondary">CreLynk is explicitly NOT:</p>
              <ul className="list-none space-y-2 text-sm">
                {[
                  'A party to any collaboration contract between a Brand and a Creator',
                  'An employer, talent agent, manager, or broker for any Creator',
                  'A bank, NBFC, payment aggregator, or custodian holding your funds (see Section 8)',
                  'A guarantor of the quality, safety, or legality of any Creator deliverable',
                  'A guarantor of campaign ROI, reach, impressions, sales conversions, or engagement rates',
                  'An advertiser, producer, or publisher of any Creator post',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-magenta font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-2 border-primary bg-elevated text-sm">
                <strong>Independent Contractors:</strong> Nothing in these Terms creates an employment, partnership, joint venture, or agency relationship between you and CreLynk. Creators are independent contractors responsible for their own tax obligations, equipment, and statutory compliance.
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">2</span>
              Eligibility
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-3 font-body text-base leading-relaxed">
              <p>To register and use CreLynk, you must:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-secondary">
                <li>Be <strong>at least 18 years of age</strong></li>
                <li>Be legally competent to enter into a binding contract under the <strong>Indian Contract Act, 1872</strong></li>
                <li>Not be prohibited or sanctioned from receiving online services under Indian laws</li>
                <li>Not have had a previously terminated or banned CreLynk account</li>
              </ul>
              <p className="text-sm pt-2">
                If registering on behalf of a company or entity, you warrant that you hold full authority to bind that entity to these Terms.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-purple text-white text-sm font-bold shadow-[2px_2px_0px_#111]">3</span>
              Your Account &amp; Verification
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-4 font-body text-base leading-relaxed">
              <ul className="list-none space-y-3 text-sm">
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>One Account Rule:</strong> Strictly one account per individual or brand. Creating duplicate accounts to circumvent blocks or limits will result in an immediate permanent ban.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Account Security:</strong> You are solely responsible for keeping your login credentials secure. All activities performed under your account are deemed authorized by you.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Linking Public Social Profiles:</strong> Creators may link social profiles by providing public URLs. You warrant that you own or legally control any profile you link. Claiming profiles belonging to others constitutes fraud.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Payout Phone Verification:</strong> Payout destinations (Bank/UPI reference tokens) require mobile OTP verification before activation or modification to prevent payout hijacking.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-orange text-white text-sm font-bold shadow-[2px_2px_0px_#111]">4</span>
              How a Collaboration Works (Lifecycle)
            </h2>
            <div className="border-2 border-primary overflow-x-auto shadow-hard">
              <div className="p-6 bg-surface space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body">
                  <div className="p-4 border-2 border-primary bg-elevated">
                    <div className="font-heading font-bold text-xs text-purple uppercase mb-1">1. Brief &amp; Match</div>
                    <p className="text-sm">Brand creates a campaign brief with scope, deadline, and payment. CreLynk AI ranks suitable Creators.</p>
                  </div>
                  <div className="p-4 border-2 border-primary bg-elevated">
                    <div className="font-heading font-bold text-xs text-purple uppercase mb-1">2. Invite &amp; Acceptance</div>
                    <p className="text-sm">Brand sends invitation. Creator has 48 hours to accept. Upon acceptance, a contract is formed.</p>
                  </div>
                  <div className="p-4 border-2 border-primary bg-elevated">
                    <div className="font-heading font-bold text-xs text-purple uppercase mb-1">3. Escrow Funding</div>
                    <p className="text-sm">Brand deposits the agreed funds into our RBI-regulated partner escrow prior to work commencement.</p>
                  </div>
                  <div className="p-4 border-2 border-primary bg-elevated">
                    <div className="font-heading font-bold text-xs text-purple uppercase mb-1">4. Work &amp; Delivery</div>
                    <p className="text-sm">Creator produces and submits content links/proof before the deadline specified in the brief.</p>
                  </div>
                </div>

                <div className="p-4 border-2 border-primary bg-lime/20 relative">
                  <div className="flex items-center gap-2 font-heading font-bold text-sm text-primary mb-2">
                    <Clock className="w-4 h-4 text-purple" />
                    72-Hour Auto-Approval Rule (Critical)
                  </div>
                  <p className="font-body text-sm leading-relaxed">
                    Once a Creator submits a deliverable, the Brand has exactly <strong>72 hours</strong> to review and approve or reject with feedback. If the Brand fails to take action within 72 hours, <strong>the deliverable is automatically approved</strong> and escrow payout processing begins.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-magenta text-white text-sm font-bold shadow-[2px_2px_0px_#111]">5</span>
              Automated Matching &amp; Scores
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-3">
              <p>
                CreLynk uses algorithmic scoring (CreLynk Score, audience quality estimates, niche compatibility) to match Creators with Brands.
              </p>
              <p className="text-sm text-secondary">
                These scores are internal marketplace recommendation signals and do not constitute formal legal evaluations, performance guarantees, or credit scores. You may contact our team to correct inaccurate profile inputs that affect your match score.
              </p>
            </div>
          </section>

          {/* Section 6 & 7 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">6</span>
              IP Ownership &amp; ASCI Ad Disclosures
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <div>
                <h3 className="font-heading font-bold text-sm uppercase text-purple mb-1">Content &amp; IP Rights</h3>
                <p className="text-sm">
                  Creators retain original copyright in their content. Upon receipt of full payment, the Creator grants the Brand a <strong>12-month non-exclusive, worldwide license</strong> to repost and distribute the deliverable across the Brand&apos;s digital channels.
                </p>
              </div>

              <hr className="border-primary/10" />

              <div>
                <h3 className="font-heading font-bold text-sm uppercase text-magenta mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> ASCI Advertising Disclosures (Non-Negotiable)
                </h3>
                <p className="text-sm">
                  In accordance with the Advertising Standards Council of India (ASCI) guidelines and Consumer Protection Act (CCPA) Endorsement rules, <strong>all sponsored content must include clear disclosure labels</strong> (such as #Ad, #Sponsored, or #PaidPartnership) visibly placed. Video posts require explicit verbal or text disclosure within the first 10 seconds.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">7</span>
              Payments, Escrow, Platform Fees &amp; Taxes
            </h2>
            <div className="border-2 border-primary overflow-x-auto shadow-hard">
              <table className="w-full font-body text-sm text-left border-collapse bg-surface">
                <tbody>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated border-r-2 border-primary w-1/3">Escrow Partner</td>
                    <td className="p-4">Funds are handled via RBI-authorized Payment Aggregator partner nodes. CreLynk does not hold bank deposits directly.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated border-r-2 border-primary">Platform Fee</td>
                    <td className="p-4 font-bold text-purple">2% platform service fee deducted upon payout settlement.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated border-r-2 border-primary">TDS Withholding</td>
                    <td className="p-4">0.1% TDS withheld under Section 194-O of the Indian Income Tax Act where applicable. PAN collection is mandatory under tax rules.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-heading font-bold bg-elevated border-r-2 border-primary">Payout Settlement</td>
                    <td className="p-4 font-mono font-bold">7 to 14 business days directly to the Creator&apos;s verified bank/UPI account upon deliverable approval.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 9: Prohibited Actions */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-purple text-white text-sm font-bold shadow-[2px_2px_0px_#111]">8</span>
              Prohibited Conduct
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-sm space-y-2">
              <p className="font-bold text-magenta mb-2">You must NOT:</p>
              <ul className="list-disc pl-5 space-y-1 text-secondary">
                <li>Claim or link social handles you do not own</li>
                <li>Purchase fake followers, bot likes, or artificial engagement to inflate metrics</li>
                <li>Circumvent the platform to complete payments offline after matching on CreLynk</li>
                <li>Post hate speech, defamatory content, explicit material, or illegal promotions</li>
                <li>Attempt to scrape, reverse engineer, or exploit CreLynk APIs</li>
              </ul>
            </div>
          </section>

          {/* Section 10: Disputes & Cancellations */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-orange text-white text-sm font-bold shadow-[2px_2px_0px_#111]">9</span>
              Disputes, Refunds &amp; Cancellations
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <div>
                <h3 className="font-heading font-bold text-sm uppercase text-purple mb-1">Deliverable Rejection &amp; Disputes</h3>
                <p className="text-sm">
                  If a Brand rejects a deliverable within the 72-hour review window, they must provide specific revision feedback. If a Creator fails to deliver before the deadline, or if a disagreement persists, either party may flag a dispute.
                </p>
              </div>
              <div className="p-4 border-2 border-primary bg-elevated text-sm">
                <strong>Dispute Resolution Process:</strong> CreLynk support acts as an informal mediator by reviewing brief requirements and chat history. If the Creator failed to provide agreed work, escrow funds are refunded to the Brand. If the deliverable satisfied the brief, escrow funds are released to the Creator.
              </div>
            </div>
          </section>

          {/* Section 11: Liability & Indemnity */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-magenta text-white text-sm font-bold shadow-[2px_2px_0px_#111]">10</span>
              Limitation of Liability &amp; Indemnification
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-sm leading-relaxed space-y-4">
              <p>
                <strong>As is Service:</strong> CreLynk is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without express or implied warranties.
              </p>
              <p>
                <strong>Liability Cap:</strong> To the maximum extent permitted by Indian law, CreLynk&apos;s total aggregate liability for any claim arising out of these Terms or your use of the platform shall not exceed the platform fees retained by CreLynk for the specific collaboration in question, or ₹5,000 INR, whichever is lower.
              </p>
              <p className="text-secondary">
                <strong>Indemnification:</strong> You agree to indemnify and hold harmless CreLynk, its directors, employees, and agents from any third-party claims, damages, legal fees, or liabilities resulting from your breach of these Terms, copyright infringement, or failure to comply with ASCI/tax regulations.
              </p>
            </div>
          </section>

          {/* Section 12: Termination & Governing Law */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">11</span>
              Termination &amp; Governing Law
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <p className="text-sm">
                <strong>Account Termination:</strong> You may close your account at any time via Settings. CreLynk reserves the right to suspend or terminate accounts that violate platform integrity or applicable law.
              </p>
              <p className="text-sm">
                <strong>Governing Law &amp; Jurisdiction:</strong> These Terms are governed by and construed in accordance with the laws of India. Any legal dispute shall be subject to the exclusive jurisdiction of the courts located in India.
              </p>
            </div>
          </section>

          {/* Section 13: Contact */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">12</span>
              Contact Us
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed">
              <p className="mb-4 text-sm text-secondary">
                For questions, support, or grievance reporting regarding these Terms:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">General Support</div>
                  <div className="font-bold">support@crelynk.in</div>
                </div>
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">Grievance Officer</div>
                  <div className="font-bold">grievance@crelynk.in</div>
                </div>
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">DPO</div>
                  <div className="font-bold">dpo@crelynk.in</div>
                </div>
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

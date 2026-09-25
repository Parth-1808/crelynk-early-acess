import { Navbar } from '../components/Navbar';
import { Footer } from '../sections/Footer';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { ArrowLeft, Shield, Lock, FileText, Info } from 'lucide-react';
import { useEffect } from 'react';

export function PrivacyPage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,255,0,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(123,97,255,0.08),transparent_24%)]" />
      <Navbar />

      <main className="relative pt-[96px] md:pt-[120px] pb-24 px-4 md:px-8 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-heading font-bold text-sm uppercase tracking-wide px-4 py-2 border-2 border-primary bg-surface shadow-hard hover:translate-y-0.5 hover:shadow-hard-active transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>

        {/* Header Block */}
        <div className="border-4 border-primary bg-surface p-6 md:p-10 mb-12 shadow-hard relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime border-b-4 border-l-4 border-primary rotate-[15deg] translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-primary bg-lime font-mono text-xs font-bold uppercase mb-4 shadow-[2px_2px_0px_#111]">
              <Shield className="w-3.5 h-3.5" />
              Privacy Policy
            </div>
            <h1 className="font-heading font-black text-4xl md:text-5xl tracking-tight mb-4">
              CRELYNK <span className="text-purple">—</span> PRIVACY POLICY
            </h1>
            <p className="font-body text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
              This policy explains what personal data <strong>CreLynk</strong> (&quot;we&quot;, &quot;us&quot;) collects, why, how long we keep it, and what you can do about it.
            </p>
            <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap gap-4 font-mono text-xs font-bold text-secondary">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple" />
                DPDP ACT (2023) COMPLIANT
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan" />
                SECURE DATA ENCRYPTION
              </span>
            </div>
          </div>
        </div>

        {/* Preamble Callout */}
        <div className="border-2 border-primary bg-elevated p-6 mb-12 font-body text-base leading-relaxed relative">
          <div className="absolute -top-3 left-6 px-3 py-0.5 border-2 border-primary bg-cyan font-heading font-black text-xs uppercase shadow-[2px_2px_0px_#111]">
            Plain English Promise
          </div>
          <p className="mt-2">
            It is written to meet the <strong>Digital Personal Data Protection Act, 2023</strong> and the <strong>DPDP Rules, 2025</strong>. Under that law we are a <strong>Data Fiduciary</strong> and you are a <strong>Data Principal</strong>.
          </p>
          <p className="mt-3">
            We have tried to write this in plain English. Where we do something that might surprise you — like retrieving information from your public Instagram profile, or keeping a record of how our matching algorithm scored you — we have said so plainly rather than hiding it in a definition.
          </p>
        </div>

        {/* Policy Body Sections */}
        <div className="space-y-12">
          
          {/* Section 1: Quick Summary */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">1</span>
              Quick Summary
            </h2>
            <div className="border-2 border-primary overflow-x-auto shadow-hard">
              <table className="w-full font-body text-sm text-left border-collapse bg-surface">
                <tbody>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary w-1/3">We collect</td>
                    <td className="p-4">Account details, profile and rate information, public social profile data, collaboration and payment records, chat messages, device and usage data</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary">We do not collect</td>
                    <td className="p-4">Your Instagram password. Your full bank account number. Your card details.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary">We never sell your data</td>
                    <td className="p-4 font-bold text-magenta">Not to advertisers, not to data brokers, not to anyone.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary">Third-party ads</td>
                    <td className="p-4">We do not run third-party ad networks. Your chat messages are not used for advertising.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary">Automated decisions</td>
                    <td className="p-4">We score and rank you. Section 9 explains this and your rights.</td>
                  </tr>
                  <tr className="border-b-2 border-primary">
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary">You can</td>
                    <td className="p-4">Access, correct, delete, withdraw consent, nominate someone, and complain</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-heading font-bold bg-elevated/50 border-r-2 border-primary">Contact</td>
                    <td className="p-4">
                      <a href="mailto:crelynk.in@gmail.com" className="font-mono font-bold text-purple hover:underline">
                        crelynk.in@gmail.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Who we are */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">2</span>
              Who We Are
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-4">
              <h3 className="font-heading font-bold text-lg text-purple">CreLynk</h3>
              <p className="font-body text-secondary leading-relaxed">
                If you have questions about this policy or want to exercise your rights, please reach out to our privacy contacts:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-sm">
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">Data Protection Officer</div>
                  <div className="font-bold">crelynk.in@gmail.com</div>
                </div>
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">Grievance Officer</div>
                  <div className="font-bold">crelynk.in@gmail.com</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: What we collect, and why */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-purple text-white text-sm font-bold shadow-[2px_2px_0px_#111]">3</span>
              What We Collect, and Why
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg mb-3">3.1 You give us this</h3>
                <div className="border-2 border-primary overflow-x-auto shadow-hard">
                  <table className="w-full font-body text-sm text-left border-collapse bg-surface">
                    <thead>
                      <tr className="border-b-2 border-primary bg-elevated">
                        <th className="p-4 border-r-2 border-primary font-heading font-bold">Data Type</th>
                        <th className="p-4 border-r-2 border-primary font-heading font-bold">Purpose / Why</th>
                        <th className="p-4 font-heading font-bold">Legal Basis under DPDP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">Email & Password</td>
                        <td className="p-4 border-r-2 border-primary">Create and secure your account</td>
                        <td className="p-4">Contract</td>
                      </tr>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">Mobile Number</td>
                        <td className="p-4 border-r-2 border-primary">Verify identity before attaching a payout destination</td>
                        <td className="p-4">Legal obligation, fraud prevention</td>
                      </tr>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">Display Name, Handle, Bio, Avatar</td>
                        <td className="p-4 border-r-2 border-primary">Your public profile on CreLynk</td>
                        <td className="p-4">Contract</td>
                      </tr>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">City, State, Languages, Niches</td>
                        <td className="p-4 border-r-2 border-primary">Matching you to relevant collaborations</td>
                        <td className="p-4">Contract</td>
                      </tr>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">Your Rates</td>
                        <td className="p-4 border-r-2 border-primary">Showing Brands what you charge</td>
                        <td className="p-4">Contract</td>
                      </tr>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">Company Name, Industry, GSTIN, Website (Brands)</td>
                        <td className="p-4 border-r-2 border-primary">Brand profile and invoicing</td>
                        <td className="p-4">Contract, legal obligation</td>
                      </tr>
                      <tr className="border-b border-primary/20">
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">PAN</td>
                        <td className="p-4 border-r-2 border-primary">Tax withholding under s.194-O</td>
                        <td className="p-4 font-bold text-magenta">Legal obligation</td>
                      </tr>
                      <tr>
                        <td className="p-4 border-r-2 border-primary font-mono font-bold">Bank / UPI details</td>
                        <td className="p-4 border-r-2 border-primary">Paying you</td>
                        <td className="p-4">Contract — see Section 3.4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-3">3.2 Created as you use CreLynk</h3>
                <div className="border-2 border-primary bg-surface p-6 shadow-hard">
                  <ul className="list-none space-y-2 font-body text-base">
                    {[
                      'Collaboration records: briefs, invitations, acceptances, contracts, deadlines',
                      'Deliverables you submit, and approval or rejection decisions',
                      'Payment records: amounts, fees, tax withheld, status, timestamps',
                      'Chat messages, community posts, reactions, poll votes',
                      'XP, streaks, quest completions, leaderboard position',
                      'Referral codes and referral earnings',
                      'Notifications sent to you',
                      'Audit records of significant actions',
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-purple text-lg font-bold leading-none select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-3">3.3 Collected automatically</h3>
                <div className="border-2 border-primary bg-surface p-6 shadow-hard">
                  <ul className="list-none space-y-2 font-body text-base">
                    {[
                      'Device type, operating system, app version',
                      'IP address and approximate location derived from it',
                      'Session and usage data — screens opened, features used',
                      'Push notification token, where you enable notifications',
                      'Crash and error diagnostics',
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="text-cyan text-lg font-bold leading-none select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Box: Deliberately NOT stored */}
              <div className="border-2 border-primary bg-elevated/40 p-6 relative">
                <div className="absolute -top-3 left-6 px-3 py-0.5 border-2 border-primary bg-magenta text-white font-heading font-black text-xs uppercase shadow-[2px_2px_0px_#111]">
                  What We Deliberately DO NOT Store
                </div>
                <ul className="mt-2 list-none space-y-3 font-body text-base">
                  <li>
                    <strong>Your Instagram password:</strong> We never ask for it. There is no login flow.
                  </li>
                  <li>
                    <strong>Your full bank account number, IFSC, or UPI ID:</strong> These go directly to our RBI-authorised payment partner. We store only the partner's reference IDs.
                  </li>
                  <li>
                    <strong>Card or netbanking credentials:</strong> These are entered on the payment partner's interface, never ours.
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-primary/10 text-sm font-mono text-secondary">
                  * Your <strong>PAN</strong> is stored in encrypted form because tax law requires us to hold it.
                </div>
              </div>

            </div>
          </section>

          {/* Section 4: Public social profile data */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-orange text-white text-sm font-bold shadow-[2px_2px_0px_#111]">4</span>
              Public Social Profile Data — Read This
            </h2>
            
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg mb-2 text-purple">4.1 What happens</h3>
                <p className="font-body text-base leading-relaxed">
                  When a Creator <strong>pastes the URL of their public social profile</strong>, we retrieve publicly visible information from that profile using a third-party data processor (<strong>Apify Technologies s.r.o.</strong>, Czech Republic).
                </p>
                <p className="font-body text-base leading-relaxed mt-2 font-bold text-magenta">
                  We do NOT use OAuth, we do not log in as you, we do not access anything private, and we cannot post on your behalf.
                </p>
              </div>

              <hr className="border-primary/10" />

              <div>
                <h3 className="font-heading font-bold text-lg mb-2 text-purple">4.2 What we retrieve</h3>
                <p className="font-body text-base leading-relaxed">
                  <strong>From the public profile:</strong> follower and following counts, post count, display name, biography, profile picture, external link, business category, verified badge.
                </p>
                <p className="font-body text-base leading-relaxed mt-2">
                  <strong>From recent public posts (up to 30):</strong> like and comment counts, video play counts, captions and hashtags, post timestamps, and any location tag the post carries.
                </p>
              </div>

              <hr className="border-primary/10" />

              <div>
                <h3 className="font-heading font-bold text-lg mb-2 text-purple">4.3 What we derive from it</h3>
                <ul className="list-none space-y-2 font-body text-base">
                  {[
                    'Engagement rate — average likes plus comments, divided by followers',
                    'Average views, reel engagement rate, posting frequency',
                    'Best hours and days to post, computed in Indian Standard Time',
                    'Suggested content niches, from a keyword match over your bio and hashtags',
                    'An audience city estimate, derived from location tags on your posts',
                    'An audience quality signal, from the ratio of comments to likes',
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-orange text-lg font-bold leading-none select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-4 border-2 border-primary bg-background font-body text-sm space-y-2">
                  <div className="font-heading font-black text-xs text-orange flex items-center gap-1.5 uppercase">
                    <Info className="w-4 h-4" /> Two Honest Caveats
                  </div>
                  <p>
                    The audience city estimate reflects <strong>where you post from</strong>, which correlates with but is not the same as where your audience is.
                  </p>
                  <p>
                    The audience quality signal is a <strong>signal, not a verdict</strong> — a low score is a reason to look closer, not proof of anything.
                  </p>
                </div>
              </div>

              <hr className="border-primary/10" />

              <div>
                <h3 className="font-heading font-bold text-lg mb-2 text-purple">4.4 Your control</h3>
                <ul className="list-none space-y-2 font-body text-base">
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500 text-lg font-bold leading-none">•</span>
                    <span>This runs <strong>only when you paste a link.</strong> Linking a profile is optional; you can complete onboarding without it.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500 text-lg font-bold leading-none">•</span>
                    <span>You can <strong>unlink</strong> your profile at any time from Settings. We stop refreshing it immediately.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500 text-lg font-bold leading-none">•</span>
                    <span>You can ask us to <strong>delete</strong> imported data and derived metrics. Contact <a href="mailto:crelynk.in@gmail.com" className="font-bold text-purple hover:underline">crelynk.in@gmail.com</a>.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-green-500 text-lg font-bold leading-none">•</span>
                    <span>We <strong>refresh</strong> linked profiles periodically (currently weekly) so Brands are not shown stale figures. Unlinking stops this.</span>
                  </li>
                </ul>
              </div>

              <hr className="border-primary/10" />

              <div className="p-4 border-2 border-primary bg-elevated">
                <h3 className="font-heading font-black text-xs text-secondary uppercase mb-2">4.5 Third-party processors</h3>
                <p className="font-body text-sm leading-relaxed">
                  Retrieval is performed by Apify, which processes the profile URL and returns public data. Apify acts as our <strong>data processor</strong> under a data processing agreement. We retain the raw response so we can re-derive metrics without re-retrieving your profile.
                </p>
                <p className="font-body text-sm leading-relaxed mt-2 font-semibold">
                  Consideration for you: this data is public, and it is your own profile — but retrieving it involves a third-party processor outside India. If you are not comfortable with that, do not link a profile. Everything else on CreLynk works without it.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Chat, messages, and communities */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-magenta text-white text-sm font-bold shadow-[2px_2px_0px_#111]">5</span>
              Chat, Messages, and Communities
            </h2>
            
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-4 font-body text-base leading-relaxed">
              <p>
                <strong>Encryption:</strong> Messages are encrypted <strong>in transit</strong> and <strong>at rest on our servers</strong>. They are <strong>not</strong> end-to-end encrypted. This means we have the technical ability to read them.
              </p>
              <p>
                <strong>When we actually read them:</strong> Only where necessary to: investigate a report or safety concern, resolve a collaboration dispute you have raised, comply with a legal or court order, or detect fraud. <strong>We do not read messages to target advertising, and we do not sell message content.</strong>
              </p>
              <p>
                <strong>Automated screening:</strong> Messages pass through an automated check that flags likely personal information — for example a phone number or bank detail shared in plain text — to protect users from off-platform payment scams. This is automated; a human sees a message only under the circumstances above.
              </p>
              <p>
                <strong>Communities:</strong> Anything you post in a community is visible to every member of that room. Creator rooms and Brand rooms are separate and role-restricted. Treat community posts as <strong>public within that room</strong>.
              </p>
              <p>
                <strong>Contract chats are retained</strong> for the full record-keeping period below, even if you leave, because they are evidence in any dispute over that collaboration. You cannot leave a contract conversation.
              </p>
            </div>
          </section>

          {/* Section 6: How we use your data */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">6</span>
              How We Use Your Data
            </h2>
            <div className="border-2 border-primary overflow-x-auto shadow-hard">
              <table className="w-full font-body text-sm text-left border-collapse bg-surface">
                <thead>
                  <tr className="border-b-2 border-primary bg-elevated">
                    <th className="p-4 border-r-2 border-primary font-heading font-bold">Purpose / Operation</th>
                    <th className="p-4 font-heading font-bold">Legal Basis under DPDP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Create and run your account</td>
                    <td className="p-4">Performance of contract</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Match Creators to briefs</td>
                    <td className="p-4">Performance of contract</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Process collaborations and instruct payments</td>
                    <td className="p-4">Performance of contract</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Withhold and report tax</td>
                    <td className="p-4">Legal obligation</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Verify identity before payouts</td>
                    <td className="p-4">Legal obligation, fraud prevention</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Send transactional notifications</td>
                    <td className="p-4">Performance of contract</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Detect and prevent fraud and abuse</td>
                    <td className="p-4">Legitimate use</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Handle grievances</td>
                    <td className="p-4">Legal obligation</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-4 border-r-2 border-primary">Improve matching quality</td>
                    <td className="p-4">Consent — you may object, see Section 9</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-r-2 border-primary">Marketing emails about new features</td>
                    <td className="p-4 font-bold text-purple">Consent — opt-in, withdrawable</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 border-2 border-primary bg-elevated font-body text-sm text-secondary">
              <strong>Transactional messages are not marketing:</strong> Notice that a collaboration was funded, a deliverable is due, or a payout succeeded is part of the service. You cannot opt out of these while holding an active account, but you can control your preferred delivery channel in Settings.
            </div>
          </section>

          {/* Section 7: Who we share with */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">7</span>
              Who We Share With
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-4">
              <p className="font-body text-base">
                We <strong>do not sell</strong> your personal data. We share only as described below.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-bold text-sm text-purple uppercase mb-2">Other users, by design:</h4>
                  <ul className="list-none space-y-2 text-sm font-body">
                    <li className="flex gap-2 items-start">
                      <span className="text-purple font-bold">•</span>
                      <span>Brands you are matched with see your public profile, niches, city, rates, and imported audience figures. They see these only where a match exists.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-purple font-bold">•</span>
                      <span>Creators you collaborate with see the Brand's company profile.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-purple font-bold">•</span>
                      <span>Community members see what you post in that room.</span>
                    </li>
                  </ul>
                </div>

                <hr className="border-primary/10" />

                <div>
                  <h4 className="font-heading font-bold text-sm text-purple uppercase mb-2">Service providers (processors), under contract:</h4>
                  <div className="border-2 border-primary overflow-x-auto">
                    <table className="w-full font-body text-sm text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-primary bg-elevated">
                          <th className="p-3 border-r-2 border-primary font-heading font-bold">Provider</th>
                          <th className="p-3 border-r-2 border-primary font-heading font-bold">What they process</th>
                          <th className="p-3 font-heading font-bold">Where</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-primary/20">
                          <td className="p-3 border-r-2 border-primary font-mono font-bold">Supabase</td>
                          <td className="p-3 border-r-2 border-primary">Database, authentication, file storage</td>
                          <td className="p-3">Singapore (ap-southeast-1)</td>
                        </tr>
                        <tr className="border-b border-primary/20">
                          <td className="p-3 border-r-2 border-primary font-mono font-bold">Razorpay / RazorpayX</td>
                          <td className="p-3 border-r-2 border-primary">Payment collection, holding, and settlement</td>
                          <td className="p-3">India</td>
                        </tr>
                        <tr className="border-b border-primary/20">
                          <td className="p-3 border-r-2 border-primary font-mono font-bold">Apify</td>
                          <td className="p-3 border-r-2 border-primary">Public social profile retrieval</td>
                          <td className="p-3">European Union</td>
                        </tr>
                        <tr>
                          <td className="p-3 border-r-2 border-primary font-mono font-bold">Push & messaging</td>
                          <td className="p-3 border-r-2 border-primary">Delivery of notifications</td>
                          <td className="p-3">Varies</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr className="border-primary/10" />

                <div>
                  <h4 className="font-heading font-bold text-sm text-purple uppercase mb-1">Legal and safety:</h4>
                  <p className="text-sm text-secondary font-body">
                    We may share data with law enforcement, regulators, or courts where required by valid legal process; and where necessary to protect someone's safety or our legal rights.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-sm text-purple uppercase mb-1">Business transfer:</h4>
                  <p className="text-sm text-secondary font-body">
                    If CreLynk is acquired or merged, data may transfer as part of the business. You will be notified and your rights carry over.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Where your data lives */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-purple text-white text-sm font-bold shadow-[2px_2px_0px_#111]">8</span>
              Where Your Data Lives
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed">
              <p>
                Our primary database is hosted in <strong>Singapore</strong>. Some processors operate in the <strong>European Union</strong> and elsewhere.
              </p>
              <p className="mt-2">
                Transfers outside India are made under contractual safeguards with each processor and in accordance with the DPDP Act and any restrictions the Central Government notifies.
              </p>
            </div>
          </section>

          {/* Section 9: Automated decision-making and profiling */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-orange text-white text-sm font-bold shadow-[2px_2px_0px_#111]">9</span>
              Automated Decision-Making and Profiling
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard space-y-4 font-body text-base leading-relaxed">
              <p className="font-bold text-purple">
                We profile you. Here is exactly how:
              </p>
              <ul className="list-none space-y-2">
                <li className="flex gap-2 items-start">
                  <span className="text-orange font-bold">•</span>
                  <span><strong>Match ranking:</strong> When a Brand runs matching, we score Creators on niche, city, language, platform, price fit, and reputation, then rank them. Your rank affects whether a Brand sees you.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-orange font-bold">•</span>
                  <span><strong>CreLynk Score:</strong> A reliability signal built from your completion history.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-orange font-bold">•</span>
                  <span><strong>Audience quality signal:</strong> Derived from public engagement patterns (Section 4.3).</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-orange font-bold">•</span>
                  <span><strong>Match telemetry:</strong> We keep a permanent, append-only record of every match: the features used, the weighted score, the rank you were shown at, and what happened afterwards — invited, accepted, delivered, approved. This record is used to train and improve future versions of our matching system.</span>
                </li>
              </ul>
              
              <div className="p-4 border-2 border-primary bg-background">
                <p className="font-semibold mb-2">What this means for you:</p>
                <p className="text-sm">
                  These systems influence your visibility to Brands and therefore your earning opportunity. They are <strong>not</strong> used to make legal determinations about you, deny you access to the platform, or set your prices.
                </p>
              </div>

              <div>
                <p className="font-bold mb-2">Your rights here:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Ask what factors affected your ranking or score</li>
                  <li>Correct underlying data that is wrong — an incorrect city or niche changes your score, and we will re-run it</li>
                  <li>Object to purely automated decision-making and ask for human review</li>
                  <li>Ask us to exclude your data from matching-model training</li>
                </ul>
                <p className="mt-3 text-sm">
                  Write to <a href="mailto:crelynk.in@gmail.com" className="font-bold text-purple hover:underline">crelynk.in@gmail.com</a>. We will respond within <strong>30 days</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: How long we keep things */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-magenta text-white text-sm font-bold shadow-[2px_2px_0px_#111]">10</span>
              How Long We Keep Things
            </h2>
            <div className="border-2 border-primary overflow-x-auto shadow-hard">
              <table className="w-full font-body text-sm text-left border-collapse bg-surface">
                <thead>
                  <tr className="border-b-2 border-primary bg-elevated">
                    <th className="p-3 border-r-2 border-primary font-heading font-bold">Data Type</th>
                    <th className="p-3 font-heading font-bold">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Account and profile</td>
                    <td className="p-3">While your account is active</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">After account deletion</td>
                    <td className="p-3">Deleted or anonymised within <strong>90 days</strong>, except as listed below</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Collaboration and payment records</td>
                    <td className="p-3 font-bold text-magenta">8 years — required under the Companies Act and Income Tax Act</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Tax records including PAN and TDS</td>
                    <td className="p-3 font-bold text-magenta">8 years — legal obligation</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Contract chat messages</td>
                    <td className="p-3">8 years, as evidence for the associated collaboration</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Non-contract chat and DMs</td>
                    <td className="p-3">Deleted with your account</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Social snapshots and raw imports</td>
                    <td className="p-3">While linked; deleted on unlink or on request</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Match telemetry</td>
                    <td className="p-3">Retained in <strong>de-identified</strong> form for model improvement</td>
                  </tr>
                  <tr className="border-b border-primary/20">
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Audit logs</td>
                    <td className="p-3">8 years</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-r-2 border-primary font-mono font-bold">Device and usage analytics</td>
                    <td className="p-3">24 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 border-2 border-primary bg-elevated font-body text-sm">
              <strong>We cannot delete what the law requires us to keep.</strong> If you ask us to delete your account, we will delete everything we are permitted to delete and retain only the financial and tax records we are legally obliged to hold — nothing more.
            </div>
          </section>

          {/* Section 11: Your rights */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">11</span>
              Your Rights
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <p>Under the DPDP Act you have the right to:</p>
              <ul className="list-none space-y-2">
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Access:</strong> Get a summary of the personal data we hold about you and who we have shared it with.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Correct, complete, update:</strong> Fix data that is wrong or incomplete.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Erase:</strong> Have data deleted where we no longer need it and no law requires it.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Withdraw consent:</strong> For anything based on consent. Withdrawal is as easy as giving it, and applies going forward.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Nominate:</strong> Appoint someone to exercise your rights if you die or become incapacitated.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-purple font-bold">•</span>
                  <span><strong>Grieve:</strong> Complain to us, and escalate to the Data Protection Board of India.</span>
                </li>
              </ul>

              <div className="p-4 border-2 border-primary bg-background space-y-2 text-sm">
                <p>
                  <strong>To exercise any of these:</strong> Email <a href="mailto:crelynk.in@gmail.com" className="font-bold text-purple hover:underline">crelynk.in@gmail.com</a> from your registered email address, or use <strong>Settings → Privacy</strong> in the app.
                </p>
                <p>
                  <strong>Timeline:</strong> We acknowledge within <strong>72 hours</strong> and respond substantively within <strong>30 days</strong>. Free of charge. If we need longer, we will tell you why.
                </p>
                <p>
                  If you are unhappy with our response, escalate to our Grievance Officer, then to the <strong>Data Protection Board of India</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12: Security */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-cyan text-sm font-bold shadow-[2px_2px_0px_#111]">12</span>
              Security
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <p className="font-semibold text-purple">What we do to protect your data:</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-secondary">
                <li>Encryption in transit (TLS) and at rest</li>
                <li><strong>Row-level security (RLS) on every database table:</strong> The database itself enforces that you can only read your own data; this is not left to application code.</li>
                <li>Private storage buckets — deliverables are visible only to the participants of that collaboration, KYC documents only to you.</li>
                <li>PAN stored in encrypted format</li>
                <li>Payment credentials never stored on our systems</li>
                <li>Phone verification before a payout destination can be attached or changed</li>
                <li>Audit logging of significant actions</li>
                <li>Least-privilege access; staff access to production data is strictly restricted and logged</li>
              </ul>

              <div className="p-4 border-2 border-primary bg-elevated text-sm">
                <p className="font-bold text-magenta mb-1">No system is perfectly secure.</p>
                <p>
                  If a breach affects your personal data we will notify you and the Data Protection Board <strong>without delay and within 72 hours</strong> of becoming aware, telling you what happened, what data was involved, and what actions to take.
                </p>
              </div>

              <p className="text-sm">
                <strong>Your part:</strong> Use a strong unique password, keep your device secure, and never share your OTP with anyone — <strong>including anyone claiming to be from CreLynk. We will never ask for your OTP or password.</strong>
              </p>
            </div>
          </section>

          {/* Section 13: Children */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-purple text-white text-sm font-bold shadow-[2px_2px_0px_#111]">13</span>
              Children
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed">
              <p>
                CreLynk is for users <strong>18 and over</strong>. We do not knowingly process the data of children. If we discover an account belongs to someone under 18 we will suspend it and delete the personal data. Report suspected underage accounts to <a href="mailto:crelynk.in@gmail.com" className="font-bold text-purple hover:underline">crelynk.in@gmail.com</a>.
              </p>
            </div>
          </section>

          {/* Section 14: Cookies and similar technologies */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-orange text-white text-sm font-bold shadow-[2px_2px_0px_#111]">14</span>
              Cookies and Similar Technologies
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-3">
              <p>
                Our website uses cookies that are <strong>strictly necessary</strong> (session, security, preferences) and <strong>analytics</strong> cookies to understand usage. We do not use third-party advertising or cross-site tracking cookies.
              </p>
              <p>
                The mobile app does not use cookies but uses local device storage for your session and preferences, and a push token if you enable notifications.
              </p>
              <p className="text-sm text-secondary">
                You can clear local storage by logging out or uninstalling. Blocking necessary cookies will break sign-in.
              </p>
            </div>
          </section>

          {/* Section 15: Changes */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-magenta text-white text-sm font-bold shadow-[2px_2px_0px_#111]">15</span>
              Changes
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed">
              <p>
                We will update this policy as the product and the law change. For material changes we give <strong>at least 15 days&#39; notice</strong> by email and in-app. Where a change requires your consent under the DPDP Act, we will ask for it rather than assume it.
              </p>
            </div>
          </section>

          {/* Section 16: Contact and complaints */}
          <section className="scroll-mt-24">
            <h2 className="font-heading font-black text-2xl mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-none border-2 border-primary bg-lime text-sm font-bold shadow-[2px_2px_0px_#111]">16</span>
              Contact and Complaints
            </h2>
            <div className="border-2 border-primary bg-surface p-6 shadow-hard font-body text-base leading-relaxed space-y-4">
              <p>
                If we do not resolve your complaint, you may escalate to the <strong>Data Protection Board of India</strong> under the Digital Personal Data Protection Act, 2023.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">Data Protection Officer</div>
                  <div className="font-bold">crelynk.in@gmail.com</div>
                </div>
                <div className="p-4 border-2 border-primary bg-background">
                  <div className="font-heading font-bold text-xs text-secondary uppercase mb-1">Grievance Officer</div>
                  <div className="font-bold">crelynk.in@gmail.com</div>
                </div>
              </div>
              <p className="text-sm text-secondary pt-2">
                <strong>Post:</strong> CreLynk
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

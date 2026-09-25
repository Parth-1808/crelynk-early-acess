import { Button } from '../components/ui';
import { useWaitlistStats } from '../hooks/useWaitlistStats';
import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, Sparkles, Repeat, Percent, Clock3, Target, Handshake, Lock, HelpCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const benefitCards: Array<{
  icon: LucideIcon;
  title: string;
  subtitle: string;
  copy: string[];
}> = [
  {
    icon: Sparkles,
    title: 'Priority',
    subtitle: 'Opportunities',
    copy: ['First access to', 'top campaigns', 'and features.'],
  },
  {
    icon: Repeat,
    title: 'Referral Rev',
    subtitle: 'Share',
    copy: ['Every creator', 'you bring in.', '2 year term.'],
  },
  {
    icon: Percent,
    title: 'Zero Fees',
    subtitle: '6 Months',
    copy: ['You + every', 'brand you', 'vouch for.'],
  },
  {
    icon: Clock3,
    title: 'AI Weekly',
    subtitle: 'Briefing',
    copy: ['Every Monday.', 'Trends, opps,', 'tips. Always.'],
  },
  {
    icon: Target,
    title: 'Priority',
    subtitle: 'Matching',
    copy: ['You rank first', 'in every match', 'you qualify.'],
  },
  {
    icon: Handshake,
    title: 'Brand Vouching',
    subtitle: 'Power',
    copy: ['Your brands get', '0% commission.', 'Easy yes.'],
  },
];

const processSteps = [
  { label: 'APPLY', detail: '2 min' },
  { label: 'ONBOARD', detail: '5 creators + brands' },
  { label: 'UNLOCK', detail: '2yr upside' },
];

const dutyRows = [
  'Refer 5 real creators · within 3 months',
  '2 posts/month · your words, no scripts',
  'Complete 2 collabs · within 6 months',
  'Launch week · August 15 · 1 post/day',
  'No paid promos for competitors · 2yr',
  'Invite your current brand partners',
];

function useCountUp(target: number, isActive: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let frameId: number;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, target, duration]);

  return value;
}

const AvatarPlaceholder = ({ name }: { name: string }) => {
  const colors = [
    'bg-[#E2FF3B] text-black',
    'bg-[#FF2D78] text-white',
    'bg-[#00D9FF] text-black',
    'bg-[#FF9F00] text-black',
  ];
  const index = Math.abs(name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div className={`w-full h-full flex items-center justify-center font-heading font-black text-2xl ${colors[index]}`}>
      {initials}
    </div>
  );
};

export function Ambassador() {
  const { ambassador_applications_count: ambassadorApplicationsCount, ambassador_total_spots: ambassadorTotalSpots } = useWaitlistStats();
  
  const [approvedAmbassadors, setApprovedAmbassadors] = useState<any[]>([]);
  const [confirmedSpots, setConfirmedSpots] = useState(2);
  const [loadingAmbassadors, setLoadingAmbassadors] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCohort = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return approvedAmbassadors;
    return approvedAmbassadors.filter(amb => 
      amb.name?.toLowerCase().includes(query) ||
      amb.public_tagline?.toLowerCase().includes(query) ||
      amb.niche?.toLowerCase().includes(query) ||
      amb.handle?.toLowerCase().includes(query)
    );
  }, [approvedAmbassadors, searchQuery]);

  useEffect(() => {
    async function fetchCohort() {
      try {
        const { data, error } = await supabase
          .from('ambassador_applications')
          .select('name, photo_url, profile_picture_url, public_tagline, niche, handle, approved_at')
          .eq('status', 'approved')
          .eq('is_featured', true)
          .order('approved_at', { ascending: true })
          .limit(8);

        if (!error && data) {
          setApprovedAmbassadors(data);
        }

        const { count, error: countError } = await supabase
          .from('ambassador_applications')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'approved');

        if (!countError && count !== null) {
          setConfirmedSpots(count);
        }
      } catch (err) {
        console.warn('Error querying approved cohort:', err);
      } finally {
        setLoadingAmbassadors(false);
      }
    }

    if (supabase) {
      fetchCohort();
    }
  }, []);

  const totalSpots = ambassadorTotalSpots || 8;
  const remainingSpots = Math.max(0, totalSpots - confirmedSpots);

  const getInstaUsername = (urlOrHandle: string) => {
    if (!urlOrHandle) return '';
    if (urlOrHandle.startsWith('@')) return urlOrHandle;
    try {
      const match = urlOrHandle.match(/instagram\.com\/([a-zA-Z0-9._]+)/i);
      return match ? `@${match[1]}` : `@${urlOrHandle.replace(/[^a-zA-Z0-9._]/g, '')}`;
    } catch {
      return `@${urlOrHandle}`;
    }
  };

  const getInstaLink = (urlOrHandle: string) => {
    if (!urlOrHandle) return '#';
    if (urlOrHandle.startsWith('http')) return urlOrHandle;
    const clean = urlOrHandle.replace(/^@/, '');
    return `https://instagram.com/${clean}`;
  };

  const counterRef = useRef<HTMLDivElement | null>(null);
  const counterInView = useInView(counterRef, { once: true, amount: 0.4 });
  const totalCount = useCountUp(totalSpots, counterInView);
  const confirmedCount = useCountUp(confirmedSpots, counterInView);
  const remainingCount = useCountUp(remainingSpots, counterInView);

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.45 });

  const liveStats = useMemo(
    () => [
      { label: 'Ambassadors Confirmed', value: confirmedSpots },
      { label: 'Applications Received', value: ambassadorApplicationsCount },
      { label: 'Spots Remaining', value: remainingSpots },
    ],
    [confirmedSpots, ambassadorApplicationsCount, remainingSpots]
  );

  return (
    <section id="ambassador" className="relative overflow-hidden bg-[#FFFDEB] px-4 py-24 md:px-8 text-black border-b-[8px] border-black">
      {/* Brutalist Grid & Blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,45,120,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,217,255,0.18),transparent_35%)]" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Slanted Neobrutalist Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-block -rotate-1 border-4 border-black bg-[#FF2D78] px-6 py-3 text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-white shadow-[6px_6px_0_rgba(0,0,0,1)]">
            FOUNDING AMBASSADOR COHORT · {confirmedSpots} FILLED · {remainingSpots} OPEN
          </div>

          {/* Large Slanted Neobrutalist Headers */}
          <div className="mt-12 space-y-2">
            <h1 className="font-heading font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none italic text-black filter drop-shadow-[4px_4px_0_#E2FF3B]">
              BUILD WITH US.
            </h1>
            <h1 className="font-heading font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none italic text-[#FF2D78] filter drop-shadow-[4px_4px_0_#000]">
              NOT FOR US.
            </h1>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-black/85 font-mono border-2 border-black bg-white p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            {totalSpots} spots total. {confirmedSpots} already filled. This is a founder-led deal, not a promo.
          </p>

          {/* Sainu Sameer Featured Spotlight Card - Large Scale & Creative */}
          <div className="mt-16 max-w-4xl mx-auto border-4 border-black bg-white shadow-[12px_12px_0_rgba(0,0,0,1)] flex flex-col lg:flex-row items-stretch text-left hover:-translate-y-1 hover:shadow-[16px_16px_0_rgba(0,0,0,1)] transition-all overflow-hidden">
            
            {/* Left Column: Big Image Box with neobrutalist rotate */}
            <div className="w-full lg:w-2/5 min-h-[350px] relative border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-[#f4f0e8] shrink-0">
              <img
                src="/sainu-sameer.jpg"
                alt="Sainu Sameer"
                className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-500"
              />
              
              {/* Sticker 1: Spot number */}
              <div className="absolute top-4 left-4 -rotate-3 border-2 border-black bg-[#E2FF3B] text-black text-xs font-mono font-black px-3 py-1 uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                🏆 COHORT MEMBER #01
              </div>

              {/* Sticker 2: Verification */}
              <div className="absolute bottom-4 right-4 rotate-3 border-2 border-black bg-[#00D9FF] text-black text-[10px] font-mono font-black px-2.5 py-1 uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)]">
                ✓ VERIFIED FOUNDER PARTNER
              </div>
            </div>

            {/* Right Column: Creative Details & Speech Bubble Quote */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-[#FFFDEB]">
              <div>
                <span className="inline-block border-2 border-black bg-black text-[#E2FF3B] text-[10px] font-mono font-black uppercase px-3 py-1 tracking-widest shadow-[2.5px_2.5px_0_rgba(226,255,59,1)]">
                  FOUNDING COHORT FEATURE
                </span>
                
                <h4 className="text-4xl md:text-5xl font-heading font-black uppercase text-black mt-4 tracking-tighter leading-none italic filter drop-shadow-[1.5px_1.5px_0_#FFF]">
                  Sainu Sameer
                </h4>
                
                <p className="text-sm text-pink-500 font-mono font-black flex items-center gap-1.5 mt-2 hover:underline">
                  <InstagramIcon className="w-4 h-4 shrink-0" />
                  <a href="https://www.instagram.com/sain.u.___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">@sain.u.___</a>
                  <span className="text-[10px] text-slate-700 bg-white border border-black px-2 py-0.5 font-bold rounded ml-2">
                    Fashion & Lifestyle · 245k+ followers
                  </span>
                </p>
                
                {/* Neobrutalist Speech Bubble Quote */}
                <div className="relative mt-6 border-4 border-black bg-white p-5 shadow-[5px_5px_0_rgba(0,0,0,1)]">
                  <span className="absolute -left-3.5 top-6 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-black border-b-8 border-b-transparent hidden md:block"></span>
                  <span className="absolute -left-2.5 top-[25px] w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-white border-b-[6px] border-b-transparent hidden md:block z-10"></span>
                  <p className="text-sm md:text-base font-mono font-bold leading-relaxed text-slate-900 italic">
                    "Every creator is tired of middlemen taking huge cuts from collab deals. On CreLynk, we co-own the platform, allocate real early equity, and keep 100% of our collab value. This isn't a promo—it's a partnership."
                  </p>
                </div>
              </div>

              {/* Unlocked Cohort Benefits checklist */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-black/30 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-xs font-mono font-black text-black">
                  <span className="w-4 h-4 bg-[#E2FF3B] border border-black flex items-center justify-center text-[10px]">✓</span>
                  0% PLATFORM COMMISSION
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-black text-black">
                  <span className="w-4 h-4 bg-[#E2FF3B] border border-black flex items-center justify-center text-[10px]">✓</span>
                  EARLY EQUITY ALLOCATION
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-black text-black">
                  <span className="w-4 h-4 bg-[#E2FF3B] border border-black flex items-center justify-center text-[10px]">✓</span>
                  FAST-TRACKED VERIFICATION
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-black text-black">
                  <span className="w-4 h-4 bg-[#E2FF3B] border border-black flex items-center justify-center text-[10px]">✓</span>
                  FOUNDING COHORT BADGE
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Neobrutalist Stats Dashboard (Large scale) */}
        <motion.div
          ref={counterRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden border-4 border-black bg-[#E2FF3B] p-6 shadow-[12px_12px_0_rgba(0,0,0,1)]"
        >
          <div className="grid gap-6 md:grid-cols-3 text-center">
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-black">8 SPOTS TOTAL</p>
              <div className="mt-2 text-6xl md:text-7xl font-heading font-black uppercase tracking-tight text-black">{totalCount}</div>
            </div>
            <div className="border-4 border-black bg-[#00D9FF] p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-black">{confirmedSpots} CONFIRMED</p>
              <div className="mt-2 text-6xl md:text-7xl font-heading font-black uppercase tracking-tight text-black">{confirmedCount}</div>
            </div>
            <div className="border-4 border-black bg-[#FF2D78] p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] text-white transition-transform hover:-translate-y-1">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-white">{remainingSpots} REMAINING</p>
              <div className="mt-2 text-6xl md:text-7xl font-heading font-black uppercase tracking-tight text-white">{remainingCount}</div>
            </div>
          </div>
          <p className="mt-6 text-center font-mono text-xs font-black uppercase tracking-wider text-black">
            ✦ WHEN THEY'RE GONE, THE FOUNDING TERMS ARE GONE. NO EXCEPTIONS. ✦
          </p>
        </motion.div>

        {/* Meet the Founding Cohort (Large Card Grid center-stage) */}
        <div className="mt-24 border-4 border-black bg-white p-8 md:p-12 shadow-[12px_12px_0_rgba(0,0,0,1)]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block border-2 border-black bg-[#E2FF3B] text-black text-xs font-mono font-black uppercase px-3 py-1 tracking-widest shadow-[2px_2px_0_rgba(0,0,0,1)]">
              THE COHORT
            </span>
            <h2 className="font-heading font-black text-4xl md:text-6xl uppercase tracking-tighter text-black mt-6 leading-none">
              Meet the Founding Cohort
            </h2>
            <p className="mt-4 text-sm font-mono font-bold text-slate-700 leading-relaxed uppercase">
              The creators building this with us. Not hired. Not paid to post. Chosen.
            </p>

            {/* Neobrutalist Search Bar */}
            <div className="mt-8 relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search cohort (e.g. Comedy, Fashion, name)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-4 border-black bg-white px-5 py-3 text-xs font-mono font-black uppercase text-black placeholder:text-black/50 focus:outline-none focus:bg-[#FFFDEB] shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
              />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {searchQuery && filteredCohort.length === 0 ? (
              <div className="col-span-full border-4 border-black bg-white p-8 text-center shadow-[6px_6px_0_rgba(0,0,0,1)] max-w-sm mx-auto my-6">
                <p className="font-mono text-xs font-black uppercase text-pink-500">
                  No cohort members match "{searchQuery}"
                </p>
              </div>
            ) : (
              Array.from({ length: searchQuery ? filteredCohort.length : 8 }).map((_, i) => {
                const spot = filteredCohort[i] || null;
              if (spot) {
                const photo = spot.photo_url || spot.profile_picture_url;
                const hasPic = photo && !imageErrors[spot.name];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="w-full max-w-[260px] bg-white border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] hover:border-[#FF2D78] transition-all p-4"
                  >
                    {/* Image Box */}
                    <div className="w-full aspect-square border-4 border-black overflow-hidden relative bg-[#f4f0e8]">
                      {hasPic ? (
                        <img
                          src={photo}
                          alt={spot.name}
                          onError={() => setImageErrors(prev => ({ ...prev, [spot.name]: true }))}
                          className="w-full h-full object-cover object-top transition-all duration-300"
                        />
                      ) : (
                        <AvatarPlaceholder name={spot.name} />
                      )}
                      
                      {/* Corner Badge */}
                      <div className="absolute top-2 right-2 bg-[#E2FF3B] text-black border-2 border-black text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-wider shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        🏆 FOUNDING
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="mt-4 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="text-lg font-black uppercase text-black tracking-tight truncate" title={spot.name}>
                          {spot.name}
                        </h4>
                        <p className="text-xs text-slate-700 font-mono font-bold leading-tight mt-1 line-clamp-2" title={spot.public_tagline || spot.niche}>
                          {spot.public_tagline || spot.niche}
                        </p>
                      </div>
                      
                      <div className="pt-3 border-t border-dashed border-black/40 mt-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase bg-slate-100 border border-black/30 px-2 py-0.5 font-bold">
                          {spot.niche || 'Creator'}
                        </span>
                        <a
                          href={getInstaLink(spot.handle)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#FF2D78] font-mono hover:underline flex items-center gap-1 font-black"
                        >
                          <InstagramIcon className="w-4 h-4 shrink-0" />
                          <span className="truncate max-w-[100px]">{getInstaUsername(spot.handle)}</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              } else {
                return (
                  <div 
                    key={i} 
                    className="w-full max-w-[260px] aspect-[4/5] border-4 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center p-6 text-center text-slate-400"
                  >
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-slate-300 flex items-center justify-center bg-white shadow-[2px_2px_0_rgba(0,0,0,0.05)]">
                      <Lock className="w-6 h-6 text-slate-400" />
                    </div>
                    <h4 className="text-base font-black text-slate-400 mt-4 uppercase tracking-wider font-heading">
                      Spot Open
                    </h4>
                    <p className="text-xs text-slate-400 font-mono leading-none mt-1 uppercase font-bold">
                      Apply below
                    </p>
                  </div>
                );
              }
            })
          )}
        </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-24 border-4 border-black bg-white p-8 md:p-12 shadow-[12px_12px_0_rgba(0,0,0,1)]">
          <div className="text-center mb-12">
            <h3 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-black">
              THIS IS A FOUNDING DEAL.
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefitCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="relative overflow-hidden border-4 border-black bg-[#FFFDEB] p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(0,0,0,1)]"
                >
                  <div className="relative z-10 text-black">
                    <div className="flex h-14 w-14 items-center justify-center border-4 border-black bg-white text-black shadow-[3px_3px_0_rgba(0,0,0,1)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="mt-4 text-xs font-mono font-black uppercase tracking-wider text-slate-700">{card.title}</div>
                    <div className="mt-1 text-2xl font-black uppercase tracking-tight text-black">{card.subtitle}</div>
                    <div className="mt-4 space-y-1 text-sm font-mono font-bold leading-relaxed text-black/80">
                      {card.copy.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Process Block */}
        <div className="mt-24 border-4 border-black bg-white p-8 md:p-12 shadow-[12px_12px_0_rgba(0,0,0,1)]">
          <div className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
            <div ref={timelineRef}>
              <div className="mb-6 text-center font-mono text-xs font-black uppercase tracking-wider text-slate-700">
                ✦ HOW IT WORKS ✦
              </div>
              <div className="relative">
                <motion.svg
                  viewBox="0 0 860 120"
                  className="mx-auto h-28 w-full overflow-visible hidden md:block"
                >
                  <motion.path
                    d="M 60 60 L 280 60 L 500 60 L 720 60"
                    fill="none"
                    stroke="#000"
                    strokeWidth="4"
                    strokeDasharray="850"
                    strokeDashoffset={timelineInView ? 0 : 850}
                    transition={{ duration: 1.2 }}
                  />
                  {processSteps.map((step, index) => {
                    const position = 60 + 220 * index;
                    return (
                      <motion.circle
                        key={step.label}
                        cx={position}
                        cy={60}
                        r={20}
                        fill={timelineInView ? '#E2FF3B' : '#fff'}
                        stroke="#000"
                        strokeWidth="4"
                        initial={{ scale: 0.8 }}
                        animate={timelineInView ? { scale: 1 } : { scale: 0.8 }}
                        transition={{ delay: 0.6 + index * 0.12, duration: 0.5 }}
                      />
                    );
                  })}
                </motion.svg>
              </div>
              <div className="mt-4 grid gap-6 md:grid-cols-3">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.45 }}
                    className="border-4 border-black bg-[#E2FF3B] p-6 text-center shadow-[4px_4px_0_rgba(0,0,0,1)] hover:-translate-y-0.5"
                  >
                    <div className="font-mono text-xs font-black uppercase tracking-wider text-black">{step.label}</div>
                    <div className="mt-2 text-xl font-black uppercase tracking-tight text-black">{step.detail}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-4 border-black bg-[#FFF7EB] p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] flex flex-col justify-center">
              <div className="text-xs font-mono font-black uppercase tracking-wider text-slate-700">YOUR BRAND VOUCHING POWER</div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-black mt-2">Every brand you personally onboard → pays ZERO commission for 6 months.</h3>
              <p className="mt-4 text-sm font-mono font-medium leading-relaxed text-black/80">
                That makes you the most valuable person in the room when you introduce them to CreLynk.
              </p>
              <p className="mt-4 italic text-sm font-mono font-black text-[#FF2D78]">“I'm on CreLynk. Let's move our next deal there.” — That's your pitch. They'll say yes.</p>
            </div>
          </div>
        </div>

        {/* Duties rows */}
        <div className="mt-24 border-4 border-black bg-white p-8 md:p-12 shadow-[12px_12px_0_rgba(0,0,0,1)]">
          <div className="mb-8 text-center">
            <h3 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-black">
              WHAT THIS ACTUALLY LOOKS LIKE.
            </h3>
          </div>
          <div className="grid gap-4">
            {dutyRows.map((row, index) => (
              <motion.div
                key={row}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className={`flex items-center gap-4 border-4 border-black bg-white p-5 text-sm font-mono font-black text-black shadow-[4px_4px_0_rgba(0,0,0,1)] ${
                  index === 3 ? 'bg-[#FFF0D8]' : ''
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center border-2 border-black text-xs bg-[#E2FF3B]">✓</span>
                <span className="font-mono uppercase tracking-wider">{String(index + 1).padStart(2, '0')}</span>
                <span className="flex-1 uppercase">{row}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-xs font-black uppercase tracking-widest text-slate-700">
            ✦ IF ANY OF THESE FEEL HEAVY, THIS ISN'T THE RIGHT FIT. THAT'S OKAY. ✦
          </p>
        </div>

        {/* Cohort Stats Footer */}
        <div className="mt-24 border-4 border-black bg-white p-8 md:p-10 shadow-[12px_12px_0_rgba(0,0,0,1)]">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-black uppercase text-black border-2 border-black bg-[#E2FF3B] px-3 py-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#FF2D78] animate-pulse" />
                LIVE UPDATES
              </div>
              <p className="mt-3 text-sm font-mono font-black uppercase tracking-wider text-slate-700">Cohort Stats</p>
            </div>
            <div className="grid w-full gap-4 text-center md:grid-cols-3 md:w-auto">
              {liveStats.map((stat) => (
                <div key={stat.label} className="border-4 border-black bg-[#FFFDEB] p-5 shadow-[4px_4px_0_rgba(0,0,0,1)]">
                  <div className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-700">{stat.label}</div>
                  <div className="mt-2 text-3xl font-black uppercase tracking-tight text-black">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Apply CTA Section */}
        <div className="mt-20 flex flex-col items-center">
          <div className="relative overflow-hidden border-4 border-black bg-[#E2FF3B] shadow-[8px_8px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] transition-all">
            <Button
              href="form"
              formType="ambassador"
              variant="primary"
              className="relative inline-flex items-center justify-center bg-transparent px-10 py-5 text-lg font-heading font-black uppercase tracking-[0.24em] text-black shadow-none border-none hover:bg-transparent"
            >
              APPLY AS FOUNDING AMBASSADOR →
            </Button>
          </div>
          <p className="mt-6 font-mono text-xs font-black uppercase text-slate-700">
            8 spots. No extensions. No exceptions.
          </p>
        </div>

      </div>
    </section>
  );
}

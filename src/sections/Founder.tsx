import { useEffect, useState, useRef, useCallback } from 'react';
import { Mail } from 'lucide-react';
import { Button, Sticker } from '../components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const founders = [
  {
    name: "Parth Bachhav",
    role: "Founder, CEO & CTO",
    roleShort: "CEO & Tech",
    image: "/images/founders/parth.jpg",
    insta: "https://www.instagram.com/l__parthhh?igsh=N2RzcXh5YmMwYW91",
    color: "#00D9FF",
    stickerBg: "bg-cyan",
    stickerTextColor: "text-primary",
    wittyThought: "If it takes > 2 clicks, I'm rewriting the code. 💻⚡",
    angle: -3,
    imageStyle: { transform: 'scale(1.25)', transformOrigin: 'top center' },
  },
  {
    name: "Tushita Ahlawat",
    role: "Co-Founder & Chief Marketing Officer",
    roleShort: "CMO & Strategy",
    image: "/images/founders/tushita.jpg",
    insta: "https://www.instagram.com/tushitaafterhours?igsh=ZDl3b2YxOTgybGRy",
    color: "#FF2D78",
    stickerBg: "bg-magenta",
    stickerTextColor: "text-surface",
    wittyThought: "If brand strategy makes no noise, it's just a PDF. 📣✨",
    angle: 2,
  },
  {
    name: "Aryan Patil",
    role: "Co-Founder & Chief Data & Strategy Officer",
    roleShort: "Data & Growth",
    image: "/images/founders/aryan.jpg",
    insta: "https://www.instagram.com/aryanpatil_1433?igsh=cW1iNGVyNDdsODB3",
    color: "#C6FF00",
    stickerBg: "bg-lime",
    stickerTextColor: "text-primary",
    wittyThought: "Trust in God, for everything else bring data. 📊🔮",
    angle: -2,
  },
  {
    name: "Apurva Rajput",
    role: "Co-Founder – Community, Campus & User Success",
    roleShort: "User Success & Community",
    image: "/images/founders/apurva.jpg",
    insta: "https://www.instagram.com/apurvaneedsanap?igsh=MWx6NjA0cm56YXh5aQ==",
    color: "#7B61FF",
    stickerBg: "bg-purple",
    stickerTextColor: "text-surface",
    wittyThought: "Your feedback is our next feature release! 💬🔥",
    angle: 3,
  }
];

function FounderCard({ founder, isActive, isMobileView }: { founder: typeof founders[0]; isActive: boolean; isMobileView: boolean }) {
  return (
    <div
      className="bg-surface text-primary border-2 border-primary p-4 relative group flex flex-col justify-between shadow-[4px_4px_0px_#111] w-full"
    >
      {/* Desktop: Floating Witty Thought Bubble on Hover */}
      {!isMobileView && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1.5 transition-all duration-300 pointer-events-none z-30 flex flex-col items-center whitespace-nowrap">
          <div
            className="text-primary font-heading font-bold text-[11px] uppercase px-3 py-1.5 border-2 border-primary shadow-[2px_2px_0px_#111]"
            style={{ backgroundColor: founder.color }}
          >
            {founder.wittyThought}
          </div>
          <div
            className="w-2.5 h-2.5 border-r-2 border-b-2 border-primary rotate-45 -mt-1.5"
            style={{ backgroundColor: founder.color }}
          />
        </div>
      )}

      {/* Mobile: Auto-showing Thought Bubble when active */}
      {isMobileView && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: -4, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center whitespace-nowrap pointer-events-none"
            >
              <div
                className="text-primary font-heading font-bold text-[11px] uppercase px-3 py-1.5 border-2 border-primary shadow-[2px_2px_0px_#111]"
                style={{ backgroundColor: founder.color }}
              >
                {founder.wittyThought}
              </div>
              <div
                className="w-2.5 h-2.5 border-r-2 border-b-2 border-primary rotate-45 -mt-1.5"
                style={{ backgroundColor: founder.color }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div>
        {/* Image wrapper */}
        <div className="relative overflow-hidden aspect-[4/5] border-2 border-primary bg-primary mb-4">
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <Sticker className={cn(founder.stickerBg, founder.stickerTextColor, "text-[11px] tracking-wider py-1 px-2.5")} angle={founder.angle}>
              {founder.roleShort}
            </Sticker>
          </div>
          <img
            src={founder.image}
            alt={founder.name}
            className="w-full h-full object-cover object-top"
            style={founder.imageStyle}
          />
        </div>

        {/* Header info */}
        <div className="flex flex-col gap-1 mb-2">
          <span className="font-heading font-black text-xl uppercase tracking-tight text-primary leading-tight">
            {founder.name}
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary leading-none">
            {founder.role}
          </span>
        </div>
      </div>

      {/* Social Icons Action Bar */}
      <div className="flex items-center gap-2.5 pt-3 border-t border-primary/15 mt-2">
        <a
          href={founder.insta}
          target="_blank"
          rel="noopener noreferrer"
          title={`${founder.name}'s Instagram`}
          aria-label={`${founder.name}'s Instagram`}
          className="p-2.5 border-2 border-primary bg-surface hover:bg-magenta text-primary hover:text-surface shadow-[2px_2px_0px_#111] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-colors">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        <div className="relative group/linkedin">
          <button
            type="button"
            className="p-2.5 border-2 border-primary bg-surface/50 text-primary/40 cursor-not-allowed shadow-[2px_2px_0px_#111] transition-all"
            aria-label={`${founder.name}'s LinkedIn (Coming Soon)`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>

          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/linkedin:flex flex-col items-center whitespace-nowrap z-30 pointer-events-none">
            <div className="bg-primary text-lime font-mono text-[10px] font-bold uppercase px-2 py-1 border border-primary shadow-[2px_2px_0px_#C6FF00]">
              Coming Soon ⚡
            </div>
            <div className="w-2 h-2 bg-primary rotate-45 -mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Founder() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect mobile viewport (< 1024px)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobileView(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobileView(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-slide on mobile
  const scrollToIndex = useCallback((idx: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (!cards[idx]) return;
    const card = cards[idx] as HTMLElement;
    const scrollLeft = card.offsetLeft - container.offsetLeft - (container.clientWidth / 2 - card.clientWidth / 2);
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!isMobileView) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % founders.length;
        scrollToIndex(next);
        return next;
      });
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobileView, scrollToIndex]);

  // Sync activeIndex with manual scroll
  useEffect(() => {
    if (!isMobileView || !scrollRef.current) return;
    const container = scrollRef.current;

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      // Reset auto-slide timer on manual interaction
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        // Detect which card is most visible
        const cards = Array.from(container.children) as HTMLElement[];
        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        let closestIdx = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
          const cardCenter = card.offsetLeft - container.offsetLeft + card.clientWidth / 2;
          const dist = Math.abs(containerCenter - cardCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        });
        setActiveIndex(closestIdx);

        // Restart auto-slide
        timerRef.current = setInterval(() => {
          setActiveIndex((prev) => {
            const next = (prev + 1) % founders.length;
            scrollToIndex(next);
            return next;
          });
        }, 3500);
      }, 200);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isMobileView, scrollToIndex]);

  return (
    <section id="founder" className="py-24 px-4 md:px-8 bg-primary text-surface relative overflow-hidden border-b-2 border-primary">
      {/* Background Texture Patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-repeat opacity-[0.06] pointer-events-none mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graffiti.png')] bg-repeat opacity-[0.04] pointer-events-none mix-blend-overlay z-0" />

      {/* Dynamic Ambient Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 50, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-cyan/15 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -60, 40, 0], y: [0, 50, -40, 0], scale: [1, 0.9, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-magenta/15 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 40, -40, 0], y: [0, 60, -50, 0], scale: [1, 1.2, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-lime/12 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 30, 0], y: [0, -50, 40, 0], scale: [0.95, 1.15, 0.9, 0.95] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-purple/10 rounded-full blur-[90px]"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

        {/* Top Block: Founder's Note / Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl flex flex-col items-start w-full"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Sticker className="bg-lime text-primary" angle={-3}>Founder's Note</Sticker>
            <Sticker className="bg-cyan text-primary" angle={4}>Community First</Sticker>
          </div>

          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.1] mb-6 text-surface">
            BUILDING CRELYNK WITH THE <span className="text-lime">COMMUNITY</span>, NOT ABOVE IT.
          </h2>

          <div className="font-body text-base md:text-lg text-surface/85 font-medium leading-relaxed space-y-4 mb-8">
            <p>
              Creator-brand collaboration today is fragmented and chaotic. Creators get ghosted, underpaid, and have no financial records to show their CA. Startups pay agencies ₹3 lakh a month for what should cost ₹999. Brands spend 40 hours finding 5 real creators in a sea of fake accounts.
            </p>
            <p>
              CreLynk fixes all of it - with escrow that pays creators instantly, AI that matches without the search, and an income dashboard that auto-generates your GST invoices. Built for Indian creators in tier 1 and tier 2 cities. Built with the first users, not in isolation.
            </p>
            <p>If you believe this should exist, join now and shape it with us.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.instagram.com/crelynk.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="founder_instagram"
              className="inline-flex items-center justify-center gap-3 bg-magenta text-surface border-2 border-primary shadow-[4px_4px_0px_#C6FF00] hover:shadow-[6px_6px_0px_#C6FF00] px-6 py-3.5 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-lime"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              <span className="font-heading font-bold uppercase text-sm">Instagram</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=crelynk.in@gmail.com&su=Crelynk%20Founder%20Access"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="founder_email"
              className="inline-flex items-center justify-center gap-3 bg-surface border-2 border-primary shadow-[4px_4px_0px_#FF2D78] hover:shadow-[6px_6px_0px_#FF2D78] px-6 py-3.5 transition-all duration-200"
            >
              <Mail className="w-5 h-5 text-cyan" />
              <span className="font-heading font-bold uppercase text-sm text-primary">Email me</span>
            </motion.a>
            <Button href="type-selector" variant="primary" className="text-base py-3.5 px-6">
              JOIN EARLY ACCESS
            </Button>
          </div>
        </motion.div>

        {/* Bottom Block: Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full overflow-visible"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-lime animate-ping" />
            <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight text-surface">
              Meet the Team
            </h2>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 snap-x snap-mandatory scroll-smooth pb-6 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none pt-14"
          >
            {founders.map((founder, index) => (
              <div key={index} className="snap-center shrink-0 w-[290px] sm:w-[320px] lg:w-auto lg:max-w-none">
                <FounderCard
                  founder={founder}
                  isActive={isMobileView && activeIndex === index}
                  isMobileView={isMobileView}
                />
              </div>
            ))}
          </div>

          {/* Mobile Dot Indicators */}
          {isMobileView && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {founders.map((founder, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to ${founder.name}`}
                  onClick={() => {
                    setActiveIndex(i);
                    scrollToIndex(i);
                  }}
                  className="w-2.5 h-2.5 border border-surface/60 transition-all duration-300"
                  style={{
                    backgroundColor: activeIndex === i ? founder.color : 'transparent',
                    transform: activeIndex === i ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}

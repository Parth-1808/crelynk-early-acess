import { motion } from 'framer-motion';
import { FormTrigger } from './form-panel';
import type { CSSProperties } from 'react';

type CartoonVariant = 'chat' | 'plane' | 'spark' | 'phone' | 'ticket' | 'rocket';
type CartoonPreset = 'why' | 'benefits' | 'perks';

type CartoonItem = {
  variant: CartoonVariant;
  className: string;
  tone: string;
  rotate: number;
  floatY: number;
  duration: number;
  style?: CSSProperties;
};

function CartoonGlyph({ variant }: { variant: CartoonVariant }) {
  if (variant === 'chat') {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true" className="h-11 w-11 fill-none stroke-current stroke-[3]">
        <path d="M15 16h42a7 7 0 0 1 7 7v21a7 7 0 0 1-7 7H36L22 60v-9H15a7 7 0 0 1-7-7V23a7 7 0 0 1 7-7Z" />
        <circle cx="25" cy="34" r="2.5" className="fill-current stroke-none" />
        <circle cx="36" cy="34" r="2.5" className="fill-current stroke-none" />
        <circle cx="47" cy="34" r="2.5" className="fill-current stroke-none" />
      </svg>
    );
  }

  if (variant === 'plane') {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true" className="h-11 w-11 fill-current">
        <path d="M63 11 11 32c-2.8 1.2-2.6 5.2.3 6L28 43l5 16.7c.9 2.9 4.9 3.2 6.3.5L63 11Zm-28.2 33.5-2.5-8.1 18.5-14.7-16 22.8Z" />
      </svg>
    );
  }

  if (variant === 'spark') {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true" className="h-11 w-11 fill-current">
        <path d="m36 7 7.7 15.6L61 30l-17.3 7.4L36 53l-7.7-15.6L11 30l17.3-7.4L36 7Z" />
        <path d="M57 50.5 61 59l8.5 4-8.5 4-4 8.5-4-8.5-8.5-4 8.5-4 4-8.5Z" transform="translate(-9 -8)" />
      </svg>
    );
  }

  if (variant === 'phone') {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true" className="h-11 w-11 fill-none stroke-current stroke-[3]">
        <rect x="21" y="8" width="30" height="56" rx="8" />
        <rect x="27" y="16" width="18" height="30" rx="3" fill="currentColor" opacity="0.12" />
        <path d="M32 54h8" />
        <path d="m25 28 7 7 15-14" />
      </svg>
    );
  }

  if (variant === 'ticket') {
    return (
      <svg viewBox="0 0 72 72" aria-hidden="true" className="h-11 w-11 fill-none stroke-current stroke-[3]">
        <path d="M12 24a6 6 0 0 0 6-6h36a6 6 0 0 0 6 6v9a6 6 0 0 0 0 12v9a6 6 0 0 0-6 6H18a6 6 0 0 0-6-6v-9a6 6 0 0 0 0-12v-9Z" />
        <path d="m29 28 5.5 11 12-15" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 72" aria-hidden="true" className="h-11 w-11 fill-none stroke-current stroke-[3]">
      <path d="M37 10c9 0 16 7.4 16 16.6 0 2.6-.6 5-1.8 7.1l10.2 15.2-12.3-1.6L39.8 58 31 47.4H23c-7.7 0-14-6.3-14-14.1C9 20.1 21.6 10 37 10Z" />
      <path d="M35.5 25 30 36h8l-1.5 11L48 31h-8.3l3.8-6Z" className="fill-current stroke-none" />
    </svg>
  );
}

const cartoonPresets: Record<CartoonPreset, CartoonItem[]> = {
  why: [
    {
      variant: 'chat',
      className: 'left-4 top-10 hidden h-20 w-20 md:flex lg:left-10',
      tone: 'bg-lime text-primary',
      rotate: -10,
      floatY: 10,
      duration: 6.4,
    },
    {
      variant: 'plane',
      className: 'right-6 top-20 hidden h-24 w-24 lg:flex',
      tone: 'bg-cyan text-primary',
      rotate: 8,
      floatY: 12,
      duration: 7.2,
    },
    {
      variant: 'spark',
      className: 'bottom-8 left-10 hidden h-16 w-16 md:flex',
      tone: 'bg-orange text-primary',
      rotate: 12,
      floatY: 8,
      duration: 5.8,
    },
  ],
  benefits: [
    {
      variant: 'rocket',
      className: 'left-6 top-12 hidden h-24 w-24 md:flex',
      tone: 'bg-magenta text-surface',
      rotate: -12,
      floatY: 14,
      duration: 6.7,
    },
    {
      variant: 'spark',
      className: 'right-5 top-16 hidden h-16 w-16 md:flex',
      tone: 'bg-lime text-primary',
      rotate: 8,
      floatY: 10,
      duration: 5.6,
    },
    {
      variant: 'ticket',
      className: 'right-14 bottom-10 hidden h-20 w-20 lg:flex',
      tone: 'bg-cyan text-primary',
      rotate: -8,
      floatY: 11,
      duration: 7.4,
    },
  ],
  perks: [
    {
      variant: 'phone',
      className: 'left-4 top-12 hidden h-20 w-20 md:flex',
      tone: 'bg-cyan text-primary',
      rotate: -7,
      floatY: 9,
      duration: 6.1,
    },
    {
      variant: 'ticket',
      className: 'right-6 top-8 hidden h-20 w-20 md:flex',
      tone: 'bg-lime text-primary',
      rotate: 9,
      floatY: 8,
      duration: 5.9,
    },
    {
      variant: 'spark',
      className: 'left-10 bottom-8 hidden h-16 w-16 lg:flex',
      tone: 'bg-magenta text-surface',
      rotate: -10,
      floatY: 10,
      duration: 6.8,
    },
  ],
};

export function SectionCartoons({ preset }: { preset: CartoonPreset }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {cartoonPresets[preset].map((item, index) => (
        <motion.div
          key={`${preset}-${item.variant}-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          animate={{
            y: [0, -item.floatY, 0],
            rotate: [item.rotate, item.rotate + 4, item.rotate],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.25,
          }}
          className={`absolute ${item.className}`}
          style={item.style}
        >
          <div className={`flex h-full w-full items-center justify-center rounded-[22px] border-2 border-primary shadow-hard ${item.tone}`}>
            <CartoonGlyph variant={item.variant} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

type AmbassadorCard = {
  src: string;
  alt: string;
  imageClass: string;
};

const ambassadorCards: AmbassadorCard[] = [
  {
    src: '/images/ambassadors/ambassador-01.png',
    alt: 'Gen Z influencer taking a selfie silhouette',
    imageClass: 'scale-[1.08]',
  },
  {
    src: '/images/ambassadors/ambassador-02.png',
    alt: 'Confident woman holding a drink in silhouette',
    imageClass: 'scale-[1.06]',
  },
  {
    src: '/images/ambassadors/ambassador-03.png',
    alt: 'Fitness creator in action silhouette',
    imageClass: 'scale-[1.08]',
  },
  {
    src: '/images/ambassadors/ambassador-04.png',
    alt: 'Gen Z vlogger with camera and peace sign silhouette',
    imageClass: 'scale-[1.04]',
  },
  {
    src: '/images/ambassadors/ambassador-05.png',
    alt: 'Trendy woman posing for a selfie silhouette',
    imageClass: 'scale-[1.08]',
  },
];

export function GenZSilhouetteGallery() {
  return (
    <div className="w-full">
      <div className="mb-4 inline-flex items-center gap-2 border-2 border-primary bg-surface px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] shadow-hard">
        5 Founding Ambassador Looks
      </div>
      <div className="mb-8 inline-flex max-w-2xl items-center justify-center border-2 border-primary bg-lime px-4 py-3 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary shadow-hard">
        Eligibility: 20K+ followers on any platform or 50K+ subscribers on YouTube
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-5 md:gap-x-4 md:gap-y-10">
        {ambassadorCards.map((card, index) => (
          <motion.div
            key={`pose-${index}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex min-h-[250px] items-end justify-center md:min-h-[360px]"
          >
            <FormTrigger
              formType="ambassador"
              aria-label="Apply as founding ambassador"
              className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-surface text-2xl font-black text-primary shadow-[3px_3px_0px_#111] transition-transform hover:-translate-y-0.5 hover:bg-lime md:right-3 md:top-3"
            >
              +
            </FormTrigger>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.2 + index * 0.12, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex h-full w-full items-end justify-center"
            >
              <img
                src={card.src}
                alt={card.alt}
                loading="lazy"
                className={`h-[250px] w-auto max-w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-105 md:h-[360px] ${card.imageClass}`}
                style={{ mixBlendMode: 'multiply' }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Camera, Check, Coins, Info, Loader2, Rocket, ShieldCheck, TrendingUp, Wrench, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { hasSupabaseConfig, supabase } from '../lib/supabase';
import { useWaitlistStats } from '../hooks/useWaitlistStats';

// ── Community links ── replace these with your actual group URLs ──────────────
const COMMUNITY_LINKS = {
  creator: 'https://chat.whatsapp.com/GVTSh0zIUlD5ptLXBADMui',
  brand: 'https://chat.whatsapp.com/FumETztiS0C5OaqzR4SjaZ',
  startup: 'https://chat.whatsapp.com/CxmJdQcwSSfEqDD7ovaEpX',
  localite: 'https://chat.whatsapp.com/FumETztiS0C5OaqzR4SjaZ',
};
// ─────────────────────────────────────────────────────────────────────────────

async function compressAndResizeImage(file: File, maxW = 400, maxH = 400): Promise<File> {
  return new Promise((resolve) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      resolve(file);
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxW) {
          height = Math.round((height * maxW) / width);
          width = maxW;
        }
      } else {
        if (height > maxH) {
          width = Math.round((width * maxH) / height);
          height = maxH;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        "image/webp",
        0.82
      );
    };
    img.onerror = () => {
      resolve(file);
    };
  });
}

async function uploadProfilePic(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase not configured');
  
  let fileToUpload = file;
  try {
    fileToUpload = await compressAndResizeImage(file);
  } catch (err) {
    console.warn('[Crelynk] Client-side image compression failed, uploading original:', err);
  }

  const ext = fileToUpload.name.split('.').pop() ?? 'webp';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from('profile-pictures')
    .upload(path, fileToUpload, { contentType: fileToUpload.type, upsert: false });
  if (error || !data) {
    console.error('[Crelynk] Profile pic upload failed:', error);
    throw new Error(error?.message ?? 'Upload failed — check that the "profile-pictures" storage bucket exists and is public.');
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from('profile-pictures').getPublicUrl(data.path);
  return publicUrl;
}

const MAX_AMBASSADOR_PHOTO_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

function getAmbassadorPhotoValidationError(file: File | null): string | null {
  if (!file) {
    return 'Photo is required. Please upload one to continue.';
  }

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return 'Only JPG or PNG images are supported.';
  }

  if (file.size > MAX_AMBASSADOR_PHOTO_SIZE_BYTES) {
    return 'Image is too large. Max size is 5MB.';
  }

  return null;
}

async function uploadAmbassadorPhoto(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase not configured');
  
  let fileToUpload = file;
  try {
    fileToUpload = await compressAndResizeImage(file);
  } catch (err) {
    console.warn('[Crelynk] Client-side image compression failed, uploading original:', err);
  }

  const ext = fileToUpload.name.split('.').pop() ?? 'webp';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage
    .from('ambassador-photos')
    .upload(path, fileToUpload, { contentType: fileToUpload.type, upsert: false });

  if (error || !data) {
    console.error('[Crelynk] Ambassador photo upload failed:', error);
    throw new Error(error?.message ?? 'Upload failed — check that the "ambassador-photos" storage bucket exists and is public.');
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('ambassador-photos').getPublicUrl(data.path);
  return publicUrl;
}

export type FormType = 'creator' | 'brand' | 'startup' | 'ambassador' | 'localite';

type SpotTags = Partial<Record<FormType, string>>;

const USER_TYPES: {
  type: FormType;
  label: string;
  sub: string;
  desc: string;
  bg: string;
  text: string;
  borderClass: string;
  tag: string;
  tagBg: string;
  rotateHover: number;
}[] = [
  {
    type: 'creator',
    label: 'I AM A CREATOR',
    sub: 'Content creators & influencers',
    desc: 'AI-matched brands, escrow pay, full collab calendar — no spreadsheets.',
    bg: 'bg-lime',
    text: 'text-primary',
    borderClass: 'border-primary',
    tag: '10,000 SPOTS',
    tagBg: 'bg-primary text-lime',
    rotateHover: 1,
  },
  {
    type: 'brand',
    label: 'I AM A BRAND',
    sub: 'D2C, FMCG & agencies',
    desc: 'Verified creator matches, escrow-first collabs, dedicated founder onboarding.',
    bg: 'bg-magenta',
    text: 'text-surface',
    borderClass: 'border-surface/30',
    tag: '25 SPOTS ONLY',
    tagBg: 'bg-surface/15 text-surface border border-surface/30',
    rotateHover: -1,
  },
  {
    type: 'startup',
    label: 'I AM A STARTUP',
    sub: 'SaaS, apps & early-stage tech',
    desc: 'AI-matched creators, escrow protection, revenue share or fixed-pay campaigns.',
    bg: 'bg-cyan',
    text: 'text-primary',
    borderClass: 'border-primary',
    tag: '50 SPOTS ONLY',
    tagBg: 'bg-primary text-cyan',
    rotateHover: 1,
  },
  {
    type: 'localite',
    label: "I'M A LOCALITE",
    sub: 'For cafes, gyms, restaurants, stores, salons, events, and modern local businesses.',
    desc: 'Launch creator-led campaigns built for hyperlocal growth and city-scale awareness.',
    bg: 'bg-surface',
    text: 'text-primary',
    borderClass: 'border-primary',
    tag: 'LOCALITE PILOT',
    tagBg: 'bg-elevated text-primary border border-primary',
    rotateHover: -1,
  },
];

function UserTypeOverlay({
  onClose,
  spotTags,
}: {
  onClose: () => void;
  spotTags: SpotTags;
}) {
  const { openForm } = useFormPanel();

  const handleSelect = (type: FormType) => {
    openForm(type);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[100] overflow-y-auto flex justify-center items-start p-4 md:p-8"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-primary/75 backdrop-blur-md pointer-events-none" />

      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-20 w-10 h-10 flex items-center justify-center border-2 border-surface/30 text-surface hover:bg-surface/10 transition-colors bg-primary/20 backdrop-blur-sm"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <motion.div
        initial={{ scale: 0.88, y: 28 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 28 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative z-10 w-full max-w-5xl my-auto py-6 md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-surface/55">
            select your vibe →
          </span>
          <h2 className="font-heading font-black text-4xl md:text-6xl uppercase text-surface mt-2 tracking-tight leading-none">
            WHO ARE YOU?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {USER_TYPES.map(({ type, label, sub, desc, bg, text, borderClass, tag, tagBg, rotateHover }, i) => (
            <motion.button
              key={type}
              initial={{ opacity: 0, y: 36, rotate: i % 2 === 0 ? -3 : 3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.14 + i * 0.09, type: 'spring', stiffness: 340, damping: 26 }}
              whileHover={{
                scale: 1.04,
                rotate: rotateHover,
                y: -6,
                transition: { type: 'spring', stiffness: 500, damping: 22 },
              }}
              whileTap={{ scale: 0.97, rotate: 0 }}
              onClick={() => handleSelect(type)}
              className={`${bg} ${text} border-4 ${borderClass} shadow-[8px_8px_0px_rgba(0,0,0,0.85)] p-6 md:p-7 text-left flex flex-col gap-4 cursor-pointer hover:shadow-[14px_14px_0px_rgba(0,0,0,0.85)] transition-shadow`}
            >
              <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.28em] px-2.5 py-1 self-start ${tagBg}`}>
                {spotTags[type] ?? tag}
              </span>

              <div>
                <h3 className="font-heading font-black text-2xl md:text-3xl uppercase leading-tight">
                  {label}
                </h3>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] mt-1.5 opacity-65">
                  {sub}
                </p>
              </div>

              <p className="font-body text-sm font-medium leading-snug opacity-80 flex-1">
                {desc}
              </p>

              <div className="flex items-center gap-2 font-heading font-black text-sm uppercase tracking-wide mt-auto">
                CLAIM MY SPOT
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

type FormPanelContextValue = {
  closeForm: () => void;
  openForm: (type?: FormType) => void;
  openTypeSelector: () => void;
};

const FormPanelContext = createContext<FormPanelContextValue | null>(null);

const creatorNiches = [
  'Fashion',
  'Food & Lifestyle',
  'Fitness',
  'Tech & Gaming',
  'Beauty',
  'Travel',
  'Finance',
  'Comedy',
  'Other',
];

const creatorFormats = [
  'Paid per post',
  'Revenue share',
  'Barter',
  'Long-term ambassador',
  'Open to all',
];

const ambassadorPlatformOptions = ['Instagram', 'YouTube', 'Both'];

const ambassadorNiches = [
  'Fashion & Style',
  'Food & Lifestyle',
  'Fitness & Health',
  'Tech & Gaming',
  'Beauty & Skincare',
  'Travel',
  'Finance',
  'Comedy & Entertainment',
  'Other',
];

const brandDiscoveryPaths = [
  'Instagram DMs manually',
  'Through an agency',
  'Personal network',
  'Other platforms like Winkl or Plixxo',
  'We do not yet',
];

const brandSwitchReasons = [
  'Lower cost',
  'Better creator matching',
  'Escrow payment protection',
  'Structured workflow',
  'Revenue share option',
];

const localiteCategories = [
  'Cafe',
  'Gym',
  'Restaurant',
  'Salon',
  'Fashion Store',
  'Real Estate / Property',
  'Co-working Space',
  'Hotel',
  'Event Space',
  'Other',
];

const localiteGoals = [
  'Footfall',
  'Brand Awareness',
  'Launch Hype',
  'UGC Content',
  'Influencer Visits',
  'Reels Campaign',
  'Local Reach',
  'Property Promotion',
];

const localiteCampaignFormats = [
  'In-store reels',
  'Creator visits',
  'City challenge format',
  'Product launch day',
  'UGC testimonial clips',
  'Hyperlocal giveaway',
];

const fieldLabelClass = 'mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-surface/72';
const fieldBaseClass =
  'w-full border-2 border-surface/18 bg-[#181818] px-4 py-3 font-body text-base font-semibold text-surface outline-none transition-colors placeholder:text-surface/35 focus:border-lime';
const helperClass = 'mt-2 font-body text-xs font-medium text-surface/60';
const instagramReservedSegments = new Set(['p', 'reel', 'reels', 'stories', 'explore', 'accounts', 'tv']);

function parseUrlFromInput(value: string): URL | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(withProtocol);
  } catch {
    return null;
  }
}

function normalizeInstagramProfileUrl(raw: string): string | null {
  const parsed = parseUrlFromInput(raw);
  if (!parsed) return null;

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  if (host !== 'instagram.com' && host !== 'm.instagram.com') return null;

  const firstPath = parsed.pathname.split('/').filter(Boolean)[0] ?? '';
  const username = firstPath.replace(/^@+/, '').trim();
  if (!username || instagramReservedSegments.has(username.toLowerCase())) return null;

  return `https://www.instagram.com/${username}/`;
}

function normalizeYouTubeChannelUrl(raw: string): string | null {
  const parsed = parseUrlFromInput(raw);
  if (!parsed) return null;

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  if (host !== 'youtube.com' && host !== 'm.youtube.com' && host !== 'music.youtube.com') return null;

  const segments = parsed.pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const first = segments[0];
  if (first.startsWith('@') && first.length > 1) {
    return `https://www.youtube.com/${first}/`;
  }

  if ((first === 'channel' || first === 'c' || first === 'user') && segments[1]) {
    return `https://www.youtube.com/${first}/${segments[1]}/`;
  }

  return null;
}

const MAX_PROFILE_PIC_SIZE_BYTES = 6 * 1024 * 1024;
const REQUIRED_PROFILE_PIC_ERROR = 'Profile picture is required. Please upload one to continue.';

function getProfilePictureValidationError(file: File | null): string | null {
  if (!file) {
    return REQUIRED_PROFILE_PIC_ERROR;
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return 'Only JPG, PNG, or WEBP images are supported.';
  }

  if (file.size > MAX_PROFILE_PIC_SIZE_BYTES) {
    return 'Image is too large. Max size is 6MB.';
  }

  return null;
}

function useProfilePicture() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onFileSelect = (nextFile: File) => {
    setFile(nextFile);
    setPreviewUrl((previousPreview) => {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
      }
      return URL.createObjectURL(nextFile);
    });
  };

  return { file, previewUrl, onFileSelect };
}

async function insertWithMissingColumnFallback(
  table: string,
  payload: Record<string, unknown>,
  maxAttempts = 12,
) {
  if (!supabase) {
    return { message: 'Supabase not configured' } as const;
  }

  const insertPayload = { ...payload };
  let lastError: { message: string } | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const { error } = await supabase.from(table).insert([insertPayload]);
    if (!error) return null;

    lastError = error;
    const missingColumnMatch = error.message.match(
      /column ["']?([a-zA-Z0-9_.]+)["']?(?: of relation ["']?[a-zA-Z0-9_]+["']?)? does not exist/i,
    ) ?? error.message.match(
      /could not find the ["']?([a-zA-Z0-9_]+)["']? column/i,
    );

    if (!missingColumnMatch) break;

    const missingColumn = (missingColumnMatch[1]?.split('.').pop() ?? '').trim();
    if (!missingColumn) break;
    delete insertPayload[missingColumn];
  }

  return lastError;
}

export function useFormPanel() {
  const context = useContext(FormPanelContext);

  if (!context) {
    throw new Error('useFormPanel must be used within FormPanelProvider');
  }

  return context;
}

export function FormTrigger({
  analytics,
  children,
  className,
  formType = 'creator',
  onClick,
  type,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { analytics?: string; formType?: FormType }) {
  const { openForm } = useFormPanel();

  return (
    <button
      {...props}
      type={type ?? 'button'}
      className={className}
      data-analytics={analytics}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          openForm(formType);
        }
      }}
    >
      {children}
    </button>
  );
}

export function FormPanelProvider({
  children,
  initialFormType = null,
}: {
  children: ReactNode;
  initialFormType?: FormType | null;
}) {
  const [activeForm, setActiveForm] = useState<FormType | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const {
    claimed_spots,
    total_spots,
    brand_spots_claimed,
    brand_total_spots,
    startup_spots_claimed,
    startup_total_spots,
  } = useWaitlistStats();

  const spotTags: SpotTags = useMemo(
    () => ({
      creator: `${Math.max(total_spots - claimed_spots, 0)} SPOTS LEFT`,
      brand: `${Math.max(brand_total_spots - brand_spots_claimed, 0)} SPOTS LEFT`,
      startup: `${Math.max(startup_total_spots - startup_spots_claimed, 0)} SPOTS LEFT`,
      localite: 'FOUNDING PILOT',
    }),
    [brand_spots_claimed, brand_total_spots, claimed_spots, startup_spots_claimed, startup_total_spots, total_spots],
  );

  useEffect(() => {
    if (!initialFormType) return;
    setActiveForm(initialFormType);
  }, [initialFormType]);

  useEffect(() => {
    if (!activeForm) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveForm(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [activeForm]);

  useEffect(() => {
    if (!showTypeSelector) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowTypeSelector(false);
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showTypeSelector]);

  const value = useMemo(
    () => ({
      closeForm: () => setActiveForm(null),
      openForm: (type: FormType = 'creator') => setActiveForm(type),
      openTypeSelector: () => setShowTypeSelector(true),
    }),
    []
  );

  return (
    <FormPanelContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {showTypeSelector && (
          <UserTypeOverlay onClose={() => setShowTypeSelector(false)} spotTags={spotTags} />
        )}
      </AnimatePresence>
      <FormPanel activeForm={activeForm} closeForm={value.closeForm} />
    </FormPanelContext.Provider>
  );
}

function FormPanel({ activeForm, closeForm }: { activeForm: FormType | null; closeForm: () => void }) {
  const config = getFormPanelConfig(activeForm);

  return (
    <AnimatePresence>
      {activeForm ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-primary/82 backdrop-blur-md"
          onClick={closeForm}
        >
          <div className="flex h-full w-full justify-end">
            <motion.aside
              key={activeForm}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="relative h-full w-full border-l-2 border-surface/15 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.28),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,217,255,0.18),transparent_28%),linear-gradient(180deg,#121212_0%,#0c0c0c_100%)] text-surface sm:max-w-[640px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-30" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4 border-b border-surface/12 px-5 py-5 sm:px-7">
                  <div>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="mb-4 flex flex-row items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-surface/60 transition-colors hover:text-surface"
                    >
                      <ArrowLeft className="h-4 w-4" /> Go Back
                    </button>
                    <div className="mb-3 inline-flex border border-surface/20 bg-surface/8 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-surface/80">
                      {config.label}
                    </div>
                    <h2 className="font-heading text-3xl font-black uppercase tracking-tight text-surface sm:text-4xl">
                      {config.heading}
                    </h2>
                    <p className="mt-3 max-w-lg font-body text-base font-medium leading-relaxed text-surface/72">
                      {config.subheading}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Close form panel"
                    onClick={closeForm}
                    className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-surface/18 bg-surface/8 text-surface shadow-[3px_3px_0px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5 hover:border-lime hover:bg-surface/12"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
                  {activeForm === 'brand' ? <BrandForm /> : null}
                  {activeForm === 'startup' ? <StartupForm /> : null}
                  {activeForm === 'creator' ? <CreatorForm /> : null}
                  {activeForm === 'localite' ? <LocaliteForm /> : null}
                  {activeForm === 'ambassador' ? <AmbassadorForm /> : null}
                </div>
              </div>
            </motion.aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CreatorForm() {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [followers, setFollowers] = useState('');
  const [niches, setNiches] = useState<string[]>([]);
  const [painPoint, setPainPoint] = useState('');
  const [formats, setFormats] = useState<string[]>([]);
  const [ambassadorInterest, setAmbassadorInterest] = useState('');
  const [instagramProfileLink, setInstagramProfileLink] = useState('');
  const [youtubeChannelLink, setYouTubeChannelLink] = useState('');
  const [email, setEmail] = useState('');
  const { file: profilePicFile, previewUrl: profilePicPreview, onFileSelect: handleProfilePicture } = useProfilePicture();
  const [showOnProfiles, setShowOnProfiles] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const hasValidSelections = niches.length > 0 && formats.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    if (!hasValidSelections) return;

    const profilePicError = getProfilePictureValidationError(profilePicFile);
    if (profilePicError) {
      setErrorMsg(profilePicError);
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setErrorMsg('Waitlist backend is not configured yet. Add your Supabase URL and anon key first.');
      return;
    }

    const normalizedInstagramProfileLink = normalizeInstagramProfileUrl(instagramProfileLink);
    if (!normalizedInstagramProfileLink) {
      setErrorMsg('Enter a valid Instagram profile URL. Example: https://www.instagram.com/yourusername/');
      return;
    }

    const hasYouTubeInput = Boolean(youtubeChannelLink.trim());
    const normalizedYouTubeChannelLink = hasYouTubeInput ? normalizeYouTubeChannelUrl(youtubeChannelLink) : null;
    if (hasYouTubeInput && !normalizedYouTubeChannelLink) {
      setErrorMsg(
        'Enter a valid YouTube channel URL. Use /@handle, /channel/, /c/, or /user/ links.',
      );
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    let profilePictureUrl = '';
    if (profilePicFile) {
      try {
        profilePictureUrl = await uploadProfilePic(profilePicFile);
      } catch (uploadErr) {
        setIsLoading(false);
        setErrorMsg(`Photo upload failed: ${(uploadErr as Error).message}`);
        return;
      }
    }

    const creatorLeadPayload: Record<string, unknown> = {
      name,
      platform,
      followers,
      niches,
      pain_point: painPoint,
      formats,
      ambassador_interest: ambassadorInterest,
      handle: normalizedInstagramProfileLink,
      email,
      profile_picture_url: profilePictureUrl,
      show_on_profiles: showOnProfiles,
      coupon_code: couponCode.toUpperCase().trim() || null,
    };

    if (normalizedYouTubeChannelLink) {
      creatorLeadPayload.youtube_link = normalizedYouTubeChannelLink;
    }

    const error = await insertWithMissingColumnFallback('creator_leads', creatorLeadPayload);

    setIsLoading(false);

    if (error) {
      setErrorMsg(`Failed: ${error.message}`);
      console.error('Supabase Error:', error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        heading="You are in."
        body="We will reach out before August 15."
        communityLink={COMMUNITY_LINKS.creator}
      />
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMsg ? <div className="p-3 text-sm font-bold text-magenta bg-magenta/10 border-2 border-magenta">{errorMsg}</div> : null}
      <ProfilePictureUpload
        previewUrl={profilePicPreview}
        onFileSelect={handleProfilePicture}
        required
        error={attemptedSubmit && !profilePicFile ? REQUIRED_PROFILE_PIC_ERROR : undefined}
      />
      <TextField label="Your name" placeholder="Your name" value={name} onChange={setName} />

      <SelectField
        label="Your primary platform"
        options={['Instagram', 'YouTube', 'Both', 'Other']}
        value={platform}
        onChange={setPlatform}
      />

      <SelectField
        label="Your follower count"
        options={['Under 5K', '5K-20K', '20K-50K', '50K-100K', '100K+']}
        value={followers}
        onChange={setFollowers}
      />

      <ChipField
        label="Your content niche"
        options={creatorNiches}
        selected={niches}
        onToggle={(value) => setNiches(toggleValue(niches, value))}
        showError={attemptedSubmit && niches.length === 0}
      />

      <SelectField
        label="Biggest pain point right now"
        options={[
          'Getting ghosted',
          'Delayed payments',
          'Finding brands',
          'No way to pitch properly',
          'All of the above',
        ]}
        value={painPoint}
        onChange={setPainPoint}
      />

      <ChipField
        label="What collab format interests you"
        options={creatorFormats}
        selected={formats}
        onToggle={(value) => setFormats(toggleValue(formats, value))}
        showError={attemptedSubmit && formats.length === 0}
      />

      <SelectField
        label="Interested in founding ambassador track"
        options={['Yes tell me more', 'Maybe', 'No just early access']}
        value={ambassadorInterest}
        onChange={setAmbassadorInterest}
      />

      <UrlField
        label="Instagram profile link"
        placeholder="https://www.instagram.com/yourusername/"
        value={instagramProfileLink}
        onChange={setInstagramProfileLink}
        helperText="Required. Use your Instagram profile URL, not a post or reel link."
      />

      <UrlField
        label="YouTube channel link (optional)"
        placeholder="https://www.youtube.com/@yourchannel"
        value={youtubeChannelLink}
        onChange={setYouTubeChannelLink}
        required={false}
        helperText="Optional. Accepted: /@handle, /channel/, /c/, or /user/ links."
      />

      <EmailField label="Your email" placeholder="you@example.com" value={email} onChange={setEmail} />

      <CheckboxField
        label="Show my profile on the CreLynk community page"
        checked={showOnProfiles}
        onChange={setShowOnProfiles}
      />

      <CouponField value={couponCode} onChange={setCouponCode} />

      <SubmitButton isLoading={isLoading}>Claim My Founding Spot</SubmitButton>
    </form>
  );
}

function LocaliteForm() {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [phone, setPhone] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const { file: profilePicFile, previewUrl: profilePicPreview, onFileSelect: handleProfilePicture } = useProfilePicture();
  const [showOnProfiles, setShowOnProfiles] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const clearFieldError = (key: string) => {
    setErrors((previousErrors) => {
      if (!previousErrors[key]) return previousErrors;
      const nextErrors = { ...previousErrors };
      delete nextErrors[key];
      return nextErrors;
    });
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    const profilePicError = getProfilePictureValidationError(profilePicFile);
    if (profilePicError) nextErrors.profilePic = profilePicError;
    
    if (!businessName.trim()) nextErrors.businessName = 'Store/Business name is required.';
    if (!ownerName.trim()) nextErrors.ownerName = 'Owner name is required.';
    
    if (!mapsLink.trim()) {
      nextErrors.mapsLink = 'Google Maps location link is required.';
    } else if (!parseUrlFromInput(mapsLink)) {
      nextErrors.mapsLink = 'Enter a valid URL.';
    }
    
    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    }
    
    if (!budget) nextErrors.budget = 'Select a monthly marketing budget.';
    if (!timeline) nextErrors.timeline = 'Select a starting timeline.';
    if (!painPoint) nextErrors.painPoint = 'Select the biggest challenge you face.';

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setErrorMsg('Please resolve the required fields below.');
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setErrorMsg('Waitlist backend is not configured yet. Add your Supabase URL and anon key first.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    let profilePictureUrl = '';
    if (profilePicFile) {
      try {
        profilePictureUrl = await uploadProfilePic(profilePicFile);
      } catch (uploadErr) {
        setIsLoading(false);
        setErrorMsg(`Photo upload failed: ${(uploadErr as Error).message}`);
        return;
      }
    }

    const payload: Record<string, unknown> = {
      business_name: businessName.trim(),
      owner_name: ownerName.trim(),
      business_category: 'Other', // Database schema fallback
      city: 'Delhi NCR', // Database schema fallback
      google_maps_link: mapsLink.trim(),
      instagram_handle: instagramHandle.trim() || null,
      monthly_budget: budget,
      start_timeline: timeline,
      phone_number: phone.trim(),
      email: `${phone.trim()}@crelynk-localite.com`, // Database schema fallback
      whatsapp_number: phone.trim(), // Database schema fallback
      details: `Biggest challenge: ${painPoint}`, // Map challenge to details
      profile_picture_url: profilePictureUrl || null,
      show_on_profiles: showOnProfiles,
      coupon_code: couponCode.toUpperCase().trim() || null,
    };

    const insertError = await insertWithMissingColumnFallback('localite_leads', payload);

    setIsLoading(false);

    if (insertError) {
      setErrorMsg(`Failed: ${insertError.message}`);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessState
        heading="Your store just joined the waitlist."
        body="Our team will reach out before public launch."
        communityLink={COMMUNITY_LINKS.localite}
      />
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errorMsg ? <div className="border-2 border-magenta bg-magenta/10 p-3 text-sm font-bold text-magenta">{errorMsg}</div> : null}

      <div className="space-y-5">
        <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-surface">Store Info</h3>
        
        {/* Store Image Upload */}
        <ProfilePictureUpload
          previewUrl={profilePicPreview}
          onFileSelect={(file) => {
            handleProfilePicture(file);
            clearFieldError('profilePic');
            setErrorMsg('');
          }}
          required
          error={errors.profilePic}
        />

        {/* Community Checkbox */}
        <CheckboxField
          label="Feature my store on the CreLynk community page"
          checked={showOnProfiles}
          onChange={setShowOnProfiles}
          required={false}
        />

        {/* Store Name */}
        <FloatingInputField
          label="Store / Business Name"
          value={businessName}
          onChange={(value) => {
            setBusinessName(value);
            clearFieldError('businessName');
          }}
          error={errors.businessName}
        />

        {/* Owner Name */}
        <FloatingInputField
          label="Owner Name"
          value={ownerName}
          onChange={(value) => {
            setOwnerName(value);
            clearFieldError('ownerName');
          }}
          error={errors.ownerName}
        />

        {/* Google Maps Location */}
        <FloatingInputField
          label="Google Maps Location Link"
          placeholder="https://maps.google.com/..."
          value={mapsLink}
          onChange={(value) => {
            setMapsLink(value);
            clearFieldError('mapsLink');
          }}
          error={errors.mapsLink}
          inputMode="url"
        />

        {/* Instagram Handle (Optional) */}
        <FloatingInputField
          label="Instagram Handle (optional)"
          placeholder="@yourstore"
          value={instagramHandle}
          onChange={setInstagramHandle}
          required={false}
        />

        {/* Phone Number */}
        <FloatingInputField
          label="Phone Number"
          value={phone}
          onChange={(value) => {
            setPhone(value);
            clearFieldError('phone');
          }}
          error={errors.phone}
          inputMode="tel"
        />

        <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-surface pt-4">Marketing Intent</h3>

        {/* Monthly Budget */}
        <FloatingSelectField
          label="Monthly Marketing Budget"
          value={budget}
          onChange={(value) => {
            setBudget(value);
            clearFieldError('budget');
          }}
          options={['Under Rs 10K', 'Rs 10K - Rs 50K', 'Rs 50K - Rs 2L', 'Rs 2L+', 'Need guidance']}
          error={errors.budget}
        />

        {/* Start Timeline */}
        <FloatingSelectField
          label="When do you want to start?"
          value={timeline}
          onChange={(value) => {
            setTimeline(value);
            clearFieldError('timeline');
          }}
          options={['Immediately', 'Within 2 weeks', 'Within 1 month', 'Exploring right now']}
          error={errors.timeline}
        />

        {/* Relatable Problem / Challenge dropdown */}
        <FloatingSelectField
          label="What is your biggest creator marketing challenge?"
          value={painPoint}
          onChange={(value) => {
            setPainPoint(value);
            clearFieldError('painPoint');
          }}
          options={[
            'Creators visit/get free food but never post',
            'Hard to find creators in my local area/city',
            'No way to track if posts bring actual footfall',
            'Too busy running the store to manage DMs/collabs',
            'Don\'t know what to pay local creators',
            'Never worked with creators before'
          ]}
          error={errors.painPoint}
        />

        <CouponField value={couponCode} onChange={setCouponCode} variant="floating" />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full inline-flex items-center justify-center border-2 border-primary bg-lime px-5 py-3.5 font-heading text-base font-black uppercase tracking-tight text-primary shadow-[5px_5px_0px_rgba(0,0,0,0.42)] transition-all',
            isLoading ? 'cursor-not-allowed opacity-70' : 'hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_rgba(0,0,0,0.42)]',
          )}
        >
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
          Request Founding Access
        </button>
      </div>
    </form>
  );
}

function AmbassadorForm() {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [handle, setHandle] = useState('');
  const [followers, setFollowers] = useState('');
  const [niche, setNiche] = useState('');
  const [engagement, setEngagement] = useState('');
  const [brandCollabs, setBrandCollabs] = useState('');
  const [why, setWhy] = useState('');
  const [creatorReferrals, setCreatorReferrals] = useState('');
  const [community, setCommunity] = useState('');
  const [competitorTerms, setCompetitorTerms] = useState('');
  const [email, setEmail] = useState('');
  const [meetsCondition, setMeetsCondition] = useState(false);
  const { file: profilePicFile, previewUrl: profilePicPreview, onFileSelect: handleProfilePicture } = useProfilePicture();
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [publicTagline, setPublicTagline] = useState('');
  const [consentPublicFeature, setConsentPublicFeature] = useState(false);

  const hasValidSelections = Boolean(platform && niche);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    if (!hasValidSelections) return;

    const profilePicError = getAmbassadorPhotoValidationError(profilePicFile);
    if (profilePicError) {
      setErrorMsg(profilePicError);
      return;
    }

    if (!publicTagline.trim()) {
      setErrorMsg('Public tagline is required.');
      return;
    }

    if (publicTagline.length > 60) {
      setErrorMsg('Public tagline must be 60 characters or less.');
      return;
    }

    if (!consentPublicFeature) {
      setErrorMsg('You must consent to the public feature to submit the application.');
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setErrorMsg('Waitlist backend is not configured yet. Add your Supabase URL and anon key first.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    let photoUrl = '';
    if (profilePicFile) {
      try {
        photoUrl = await uploadAmbassadorPhoto(profilePicFile);
      } catch (uploadErr) {
        setIsLoading(false);
        setErrorMsg(`Photo upload failed: ${(uploadErr as Error).message}`);
        return;
      }
    }

    const error = await insertWithMissingColumnFallback('ambassador_applications', {
      name,
      platform,
      handle,
      followers,
      niche,
      engagement,
      brand_collabs: brandCollabs,
      why,
      creator_referrals: creatorReferrals,
      community,
      competitor_terms: competitorTerms,
      email,
      profile_picture_url: photoUrl,
      photo_url: photoUrl,
      public_tagline: publicTagline.trim(),
      consent_public_feature: consentPublicFeature,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(`Failed: ${error.message}`);
      console.error('Supabase Error:', error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        heading="Application received."
        body="We are reviewing all applications personally. If shortlisted you will hear from the founder directly within 7 days. Only 5 spots exist. Thank you for wanting to build this with us."
        communityLink={COMMUNITY_LINKS.creator}
      />
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMsg ? <div className="p-3 text-sm font-bold text-magenta bg-magenta/10 border-2 border-magenta">{errorMsg}</div> : null}
      <ProfilePictureUpload
        previewUrl={profilePicPreview}
        onFileSelect={handleProfilePicture}
        required
        error={attemptedSubmit && !profilePicFile ? REQUIRED_PROFILE_PIC_ERROR : undefined}
      />
      <TextField label="Your name" placeholder="Your name" value={name} onChange={setName} />

      <SingleChipField
        label="Your primary platform"
        options={ambassadorPlatformOptions}
        selected={platform}
        onSelect={setPlatform}
        showError={attemptedSubmit && !platform}
      />

      <TextField
        label="Your handle or channel link"
        placeholder="@yourmainhandle"
        value={handle}
        onChange={setHandle}
        helperText="Your main account where you post most"
      />

      <SelectField
        label="Your follower or subscriber count"
        options={['20K-50K', '50K-100K', '100K-500K', '500K+']}
        value={followers}
        onChange={setFollowers}
      />

      <SingleChipField
        label="Your content niche"
        options={ambassadorNiches}
        selected={niche}
        onSelect={setNiche}
        showError={attemptedSubmit && !niche}
      />

      <SelectField
        label="Your average engagement rate"
        options={['Under 2%', '2-4%', '4-7%', '7%+']}
        value={engagement}
        onChange={setEngagement}
        helperText="Likes plus comments divided by followers"
      />

      <SelectField
        label="Have you done brand collabs before"
        options={['Yes regularly', 'A few times', 'Once or twice', 'Never but ready']}
        value={brandCollabs}
        onChange={setBrandCollabs}
      />

      <TextareaField
        label="Why do you want to be a founding ambassador"
        placeholder="Be honest. What excites you about this? What do you bring? 3 to 5 lines is enough."
        value={why}
        onChange={setWhy}
      />

      <SelectField
        label="How many creators can you genuinely refer in the first 3 months"
        options={['5-10', '10-20', '20-50', '50+']}
        value={creatorReferrals}
        onChange={setCreatorReferrals}
      />

      <SelectField
        label="Do you currently manage any creator community"
        options={[
          'Yes I run a WhatsApp or Telegram group',
          'Yes I manage a Discord',
          'No but I can start one',
          'No',
        ]}
        value={community}
        onChange={setCommunity}
      />

      <SelectField
        label="Are you okay with not promoting competing platforms during the 2 year term"
        options={['Yes completely fine', 'I need to understand more before agreeing']}
        value={competitorTerms}
        onChange={setCompetitorTerms}
      />

      <EmailField label="Your email" placeholder="you@example.com" value={email} onChange={setEmail} />

      <TextField
        label="Public Tagline (60 chars limit)"
        placeholder="e.g. Skincare · Mumbai · 47k followers"
        value={publicTagline}
        onChange={(val) => {
          if (val.length <= 60) setPublicTagline(val);
        }}
        helperText={`${publicTagline.length}/60 characters. This tagline will show on the public cohort board if approved.`}
        required
      />

      <CheckboxField
        label="I have 20K+ Followers on Instagram OR 50K+ Subscribers on YouTube"
        checked={meetsCondition}
        onChange={setMeetsCondition}
        required
      />

      <CheckboxField
        label="I agree CreLynk can publicly display my name, photo, and tagline on this page and future marketing materials if I'm selected as a Founding Ambassador."
        checked={consentPublicFeature}
        onChange={setConsentPublicFeature}
        required
      />

      <SubmitButton isLoading={isLoading}>Submit My Application - 5 Spots Only</SubmitButton>
    </form>
  );
}

function StartupForm() {
  const [name, setName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [stage, setStage] = useState('');
  const [useCase, setUseCase] = useState('');
  const [budget, setBudget] = useState('');
  const [challenge, setChallenge] = useState('');
  const [timeline, setTimeline] = useState('');
  const [collabType, setCollabType] = useState('');
  const [email, setEmail] = useState('');
  const { file: profilePicFile, previewUrl: profilePicPreview, onFileSelect: handleProfilePicture } = useProfilePicture();
  const [showOnProfiles, setShowOnProfiles] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    const profilePicError = getProfilePictureValidationError(profilePicFile);
    if (profilePicError) {
      setErrorMsg(profilePicError);
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setErrorMsg('Waitlist backend is not configured yet. Add your Supabase URL and anon key first.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    let profilePictureUrl = '';
    if (profilePicFile) {
      try {
        profilePictureUrl = await uploadProfilePic(profilePicFile);
      } catch (uploadErr) {
        setIsLoading(false);
        setErrorMsg(`Photo upload failed: ${(uploadErr as Error).message}`);
        return;
      }
    }

    const error = await insertWithMissingColumnFallback('startup_leads', {
      name,
      product_category: productCategory,
      stage,
      use_case: useCase,
      monthly_budget: budget,
      challenge,
      timeline,
      collab_type: collabType,
      email,
      profile_picture_url: profilePictureUrl,
      show_on_profiles: showOnProfiles,
      coupon_code: couponCode.toUpperCase().trim() || null,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(`Failed: ${error.message}`);
      console.error('Supabase Error:', error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        heading="You are in."
        body="We will reach out before August 15 with your early access details."
        communityLink={COMMUNITY_LINKS.startup}
      />
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMsg ? <div className="p-3 text-sm font-bold text-magenta bg-magenta/10 border-2 border-magenta">{errorMsg}</div> : null}
      <ProfilePictureUpload
        previewUrl={profilePicPreview}
        onFileSelect={handleProfilePicture}
        required
        error={attemptedSubmit && !profilePicFile ? REQUIRED_PROFILE_PIC_ERROR : undefined}
      />
      <TextField label="Startup or product name" placeholder="Your startup name" value={name} onChange={setName} />

      <SelectField
        label="Product category"
        options={['SaaS', 'Mobile App', 'B2B Tool', 'Edtech', 'Fintech', 'E-commerce Tech', 'Other']}
        value={productCategory}
        onChange={setProductCategory}
      />

      <SelectField
        label="Current stage"
        options={['Pre-launch / Idea', 'Beta / MVP', 'Live and growing', 'Scaling']}
        value={stage}
        onChange={setStage}
      />

      <SelectField
        label="How do you plan to use creators"
        options={['Product launch buzz', 'User acquisition', 'Brand awareness', 'Content / UGC for social', 'All of the above']}
        value={useCase}
        onChange={setUseCase}
      />

      <SelectField
        label="Monthly budget for creator collabs"
        options={['Just exploring', 'Under Rs10K', 'Rs10K-Rs50K', 'Rs50K-Rs2L', 'Rs2L+']}
        value={budget}
        onChange={setBudget}
      />

      <SelectField
        label="Biggest challenge with creator marketing right now"
        options={[
          "Can't find relevant creators",
          'Budget constraints',
          'No way to track ROI',
          'Legal or contract hassle',
          'All of the above',
        ]}
        value={challenge}
        onChange={setChallenge}
      />

      <SelectField
        label="How soon do you want to run your first collab"
        options={['Immediately at launch', 'Within 1 to 3 months', 'Just exploring for now']}
        value={timeline}
        onChange={setTimeline}
      />

      <SingleChipField
        label="What collab model do you prefer"
        options={['Direct collab (fixed pay per post)', 'Revenue share collab', 'Open to both']}
        selected={collabType}
        onSelect={setCollabType}
        showError={false}
        helperText="Direct = you pay a fixed fee. Revenue share = creator earns a % of sales they drive."
      />

      <EmailField label="Your work email" placeholder="you@startup.com" value={email} onChange={setEmail} />

      <CheckboxField
        label="Show my profile on the CreLynk community page"
        checked={showOnProfiles}
        onChange={setShowOnProfiles}
      />

      <CouponField value={couponCode} onChange={setCouponCode} />

      <SubmitButton isLoading={isLoading}>Claim My Founding Startup Spot</SubmitButton>
    </form>
  );
}

function BrandForm() {
  const [name, setName] = useState('');
  const [brandType, setBrandType] = useState('');
  const [industry, setIndustry] = useState('');
  const [budget, setBudget] = useState('');
  const [discoveryPaths, setDiscoveryPaths] = useState<string[]>([]);
  const [frustration, setFrustration] = useState('');
  const [switchReasons, setSwitchReasons] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [email, setEmail] = useState('');
  const { file: profilePicFile, previewUrl: profilePicPreview, onFileSelect: handleProfilePicture } = useProfilePicture();
  const [showOnProfiles, setShowOnProfiles] = useState(true);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const hasValidSelections = discoveryPaths.length > 0 && switchReasons.length > 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    if (!hasValidSelections) return;

    const profilePicError = getProfilePictureValidationError(profilePicFile);
    if (profilePicError) {
      setErrorMsg(profilePicError);
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setErrorMsg('Waitlist backend is not configured yet. Add your Supabase URL and anon key first.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    let profilePictureUrl = '';
    if (profilePicFile) {
      try {
        profilePictureUrl = await uploadProfilePic(profilePicFile);
      } catch (uploadErr) {
        setIsLoading(false);
        setErrorMsg(`Photo upload failed: ${(uploadErr as Error).message}`);
        return;
      }
    }

    const error = await insertWithMissingColumnFallback('brand_leads', {
      name,
      brand_type: brandType,
      industry,
      budget,
      discovery_paths: discoveryPaths,
      frustration,
      switch_reasons: switchReasons,
      timeline,
      email,
      profile_picture_url: profilePictureUrl,
      show_on_profiles: showOnProfiles,
      coupon_code: couponCode.toUpperCase().trim() || null,
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(`Failed: ${error.message}`);
      console.error('Supabase Error:', error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <SuccessState
        heading="Got it."
        body="We will be in touch before August 15 with your early access details."
        communityLink={COMMUNITY_LINKS.brand}
      />
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMsg ? <div className="p-3 text-sm font-bold text-magenta bg-magenta/10 border-2 border-magenta">{errorMsg}</div> : null}
      <ProfilePictureUpload
        previewUrl={profilePicPreview}
        onFileSelect={handleProfilePicture}
        required
        error={attemptedSubmit && !profilePicFile ? REQUIRED_PROFILE_PIC_ERROR : undefined}
      />
      <TextField label="Brand or startup name" placeholder="Brand or startup name" value={name} onChange={setName} />

      <SelectField
        label="Type of brand"
        options={['D2C Product Brand', 'FMCG / CPG Brand', 'Retail Brand', 'Agency', 'Other']}
        value={brandType}
        onChange={setBrandType}
      />

      <SelectField
        label="Your industry"
        options={['Fashion', 'Food & Beverage', 'Beauty & Skincare', 'Fitness & Wellness', 'Tech & Apps', 'Finance', 'Other']}
        value={industry}
        onChange={setIndustry}
      />

      <SelectField
        label="Monthly budget for creator collabs"
        options={['Just exploring', 'Under Rs10K', 'Rs10K-Rs50K', 'Rs50K-Rs2L', 'Rs2L+']}
        value={budget}
        onChange={setBudget}
      />

      <ChipField
        label="How do you currently find creators"
        options={brandDiscoveryPaths}
        selected={discoveryPaths}
        onToggle={(value) => setDiscoveryPaths(toggleValue(discoveryPaths, value))}
        showError={attemptedSubmit && discoveryPaths.length === 0}
      />

      <SelectField
        label="Biggest frustration right now"
        options={[
          'Too expensive via agencies',
          'Hard to find right creators',
          'No payment protection',
          'Too time consuming',
          'No tracking or reporting',
        ]}
        value={frustration}
        onChange={setFrustration}
      />

      <ChipField
        label="What would make you switch to CreLynk"
        options={brandSwitchReasons}
        selected={switchReasons}
        onToggle={(value) => setSwitchReasons(toggleValue(switchReasons, value))}
        showError={attemptedSubmit && switchReasons.length === 0}
      />

      <SelectField
        label="How soon do you want to run your first collab"
        options={['Immediately at launch', 'Within 1 to 3 months', 'Just exploring for now']}
        value={timeline}
        onChange={setTimeline}
      />

      <EmailField label="Your email" placeholder="you@brand.com" value={email} onChange={setEmail} />

      <CheckboxField
        label="Show my profile on the CreLynk community page"
        checked={showOnProfiles}
        onChange={setShowOnProfiles}
      />

      <CouponField value={couponCode} onChange={setCouponCode} />

      <SubmitButton isLoading={isLoading}>Get Founding Brand Access</SubmitButton>
    </form>
  );
}

function ProfilePictureUpload({
  previewUrl,
  onFileSelect,
  required = true,
  error,
}: {
  previewUrl: string;
  onFileSelect: (file: File) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <span className={fieldLabelClass}>Profile picture {required ? '(required)' : '(optional)'}</span>
      <label className="mt-1 flex items-center gap-4 cursor-pointer group">
        <div
          className={cn(
            'relative border-2 bg-[#181818] overflow-hidden shrink-0 group-hover:border-lime transition-colors',
            error ? 'border-magenta' : 'border-surface/18',
          )}
          style={{ width: 64, height: 64 }}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-surface/30">
              <Camera className="w-6 h-6" />
            </div>
          )}
        </div>
        <div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-surface/60 group-hover:text-lime transition-colors">
            {previewUrl ? 'Change photo' : 'Upload photo'}
          </div>
          <p className="font-body text-xs mt-1">
            {previewUrl ? (
              <span className="text-lime/80">✓ Photo ready — saves on submit</span>
            ) : (
              <span className={error ? 'text-magenta/85' : 'text-surface/40'}>
                {error ?? 'Shown on the community profiles page'}
              </span>
            )}
          </p>
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
          }}
        />
      </label>
      {error ? <p className="mt-1.5 font-body text-xs font-semibold text-magenta">{error}</p> : null}
    </div>
  );
}

const VALID_COUPONS = new Set([
  'CRELYNK',
  'CRELYNK50',
  'EARLYACCESS',
  'WELCOME',
  'VIP',
  'COUPON'
]);

function CouponField({
  value,
  onChange,
  variant = 'default',
}: {
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'floating';
}) {
  const [tempCode, setTempCode] = useState(value);
  const [isUnlocked, setIsUnlocked] = useState(!!value);
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showBenefits, setShowBenefits] = useState(false);

  // Sync state if value changes externally
  useEffect(() => {
    setTempCode(value);
    setIsUnlocked(!!value);
  }, [value]);

  const validateCode = async (codeVal: string): Promise<{ valid: boolean; error?: string }> => {
    const cleanCode = codeVal.trim().toUpperCase();
    if (!cleanCode) {
      return { valid: false, error: 'Please enter a coupon code.' };
    }

    // 1. Check static list first
    if (VALID_COUPONS.has(cleanCode)) {
      return { valid: true };
    }

    // 2. Query Supabase
    if (!supabase) {
      return { valid: false, error: 'Invalid coupon code.' };
    }

    try {
      const { data, error } = await supabase
        .from('ambassador_applications')
        .select('id')
        .eq('status', 'approved')
        .eq('referral_code', cleanCode)
        .maybeSingle();

      if (error) {
        console.error('Error validating coupon:', error);
        return { valid: false, error: 'Error validating code. Please try again.' };
      }

      if (data) {
        return { valid: true };
      } else {
        return { valid: false, error: 'Invalid coupon code.' };
      }
    } catch (err) {
      console.error(err);
      return { valid: false, error: 'Network error. Please try again.' };
    }
  };

  const handleCheck = async () => {
    setChecking(true);
    setErrorMsg('');
    
    const result = await validateCode(tempCode);
    if (result.valid) {
      setIsUnlocked(true);
      setErrorMsg('');
      onChange(tempCode.trim().toUpperCase());
    } else {
      setIsUnlocked(false);
      setErrorMsg(result.error || 'Invalid coupon code.');
      onChange('');
    }
    setChecking(false);
  };

  const handleTextChange = (val: string) => {
    setTempCode(val);
    if (isUnlocked) {
      setIsUnlocked(false);
      onChange('');
    }
    if (errorMsg) {
      setErrorMsg('');
    }
  };

  return (
    <>
      {variant === 'floating' ? (
        <label className="block">
          <div className="flex items-end gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder=" "
                value={tempCode}
                onChange={(event) => handleTextChange(event.target.value)}
                className={cn(
                  'peer w-full border-2 bg-[#181818] px-4 pb-2.5 pt-6 font-body text-base font-semibold text-surface outline-none transition-all duration-200 placeholder:text-transparent focus:border-lime focus:shadow-[0_0_0_3px_rgba(198,255,0,0.14)]',
                  isUnlocked ? 'border-lime' : 'border-surface/18',
                )}
              />
              <span className="pointer-events-none absolute left-4 top-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-surface/58 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-surface/42 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-lime">
                Enter Coupon Code (Optional)
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheck}
              disabled={checking}
              className={cn(
                'border-2 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer h-[54px] flex items-center justify-center min-w-[80px]',
                isUnlocked
                  ? 'border-lime bg-lime text-primary shadow-[3px_3px_0px_rgba(0,0,0,0.42)]'
                  : 'border-surface/18 bg-[#181818] text-surface/85 hover:border-cyan hover:bg-surface/10'
              )}
            >
              {checking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Check'
              )}
            </button>
          </div>
          <div className="overflow-hidden">
            <AnimatePresence>
              {isUnlocked && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-lime flex items-center gap-1.5"
                >
                  <span>🎉 Congrats! Coupon benefits unlocked</span>
                  <button
                    type="button"
                    onClick={() => setShowBenefits(true)}
                    className="p-1 hover:text-cyan hover:bg-surface/5 transition-colors cursor-pointer rounded flex items-center justify-center"
                    title="View Benefits"
                  >
                    <Info className="w-3.5 h-3.5 text-lime" />
                  </button>
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-magenta flex items-center gap-1.5"
                >
                  ❌ {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </label>
      ) : (
        <label className="block">
          <span className={fieldLabelClass}>Enter Coupon Code (Optional)</span>
          <div className="flex gap-3">
            <input
              type="text"
              className={cn(
                'flex-1 border-2 bg-[#181818] px-4 py-3 font-body text-base font-semibold text-surface outline-none transition-all placeholder:text-surface/35 focus:border-lime',
                isUnlocked ? 'border-lime' : 'border-surface/18'
              )}
              value={tempCode}
              placeholder="e.g. CRELYNK"
              onChange={(event) => handleTextChange(event.target.value)}
            />
            <button
              type="button"
              onClick={handleCheck}
              disabled={checking}
              className={cn(
                'border-2 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center min-w-[80px]',
                isUnlocked
                  ? 'border-lime bg-lime text-primary shadow-[3px_3px_0px_rgba(0,0,0,0.42)]'
                  : 'border-surface/18 bg-[#181818] text-surface/85 hover:border-cyan hover:bg-surface/10'
              )}
            >
              {checking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Check'
              )}
            </button>
          </div>
          <div className="overflow-hidden">
            <AnimatePresence>
              {isUnlocked && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-lime flex items-center gap-1.5"
                >
                  <span>🎉 Congrats! Coupon benefits unlocked</span>
                  <button
                    type="button"
                    onClick={() => setShowBenefits(true)}
                    className="p-1 hover:text-cyan hover:bg-surface/5 transition-colors cursor-pointer rounded flex items-center justify-center"
                    title="View Benefits"
                  >
                    <Info className="w-3.5 h-3.5 text-lime" />
                  </button>
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, height: 0, y: -4 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -4 }}
                  className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-magenta flex items-center gap-1.5"
                >
                  ❌ {errorMsg}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </label>
      )}

      {/* Benefits Modal popup */}
      {showBenefits && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowBenefits(false)}
          />

          <div className="relative bg-[#0d0f1a] border-2 border-lime w-full max-w-xl p-6 rounded-2xl shadow-[4px_4px_0px_rgba(198,255,0,0.3)] z-10 text-surface space-y-6 font-sans">
            <div className="flex items-center justify-between border-b border-surface/18 pb-4">
              <h3 className="font-mono text-xs font-black uppercase tracking-[0.25em] text-lime">
                Founding Cohort Benefits
              </h3>
              <button 
                type="button" 
                onClick={() => setShowBenefits(false)}
                className="p-1 hover:bg-surface/10 rounded-lg transition-colors cursor-pointer text-surface/72 hover:text-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-semibold leading-relaxed">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white uppercase tracking-tight">You're in the Founding Cohort.</p>
                <p className="text-surface/72">You didn't just join a waitlist — you got vouched for. Here's what that's worth:</p>
              </div>

              <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
                {/* 1. Commission */}
                <div className="flex gap-4 bg-[#141624]/60 border border-[#23273e] p-4 rounded-xl hover:border-lime/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(198,255,0,0.15)]">
                    <Coins className="w-6 h-6 text-lime" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      0% platform commission for 6 months
                    </h4>
                    <p className="text-[11px] text-surface/64 font-medium leading-relaxed">
                      Every rupee you earn on your first collabs, you keep. No cuts. No fine print.
                    </p>
                  </div>
                </div>

                {/* 2. CL Kit Pro */}
                <div className="flex gap-4 bg-[#141624]/60 border border-[#23273e] p-4 rounded-xl hover:border-cyan/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,217,255,0.15)]">
                    <Wrench className="w-6 h-6 text-cyan" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      Free access to CL·Kit Pro — 90 days
                    </h4>
                    <p className="text-[11px] text-surface/64 font-medium leading-relaxed">
                      Caption Forge, Pitch Coach, AI Rate Suggester, Trender. ₹599/mo value, on us.
                    </p>
                  </div>
                </div>

                {/* 3. Verification */}
                <div className="flex gap-4 bg-[#141624]/60 border border-[#23273e] p-4 rounded-xl hover:border-magenta/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-magenta/10 border border-magenta/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(255,45,120,0.15)]">
                    <Rocket className="w-6 h-6 text-magenta" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      Fast-tracked verification + Founding Spotlight feature
                    </h4>
                    <p className="text-[11px] text-surface/64 font-medium leading-relaxed">
                      Skip the standard KYC queue — get verified same-day, not in the usual 48-72hr batch. Plus, you're one of the first creators featured in CreLynk's launch spotlight.
                    </p>
                  </div>
                </div>

                {/* 4. Badge */}
                <div className="flex gap-4 bg-[#141624]/60 border border-[#23273e] p-4 rounded-xl hover:border-amber-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                    <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                      Founding Cohort badge — forever
                    </h4>
                    <p className="text-[11px] text-surface/64 font-medium leading-relaxed">
                      Shows on your profile. Every brand sees it. It doesn't expire. It doesn't get diluted.
                    </p>
                  </div>
                </div>

                {/* 5. Ambassador */}
                <div className="flex gap-4 bg-[#141624]/40 border border-lime/20 p-4 rounded-xl border-dashed hover:border-lime/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(198,255,0,0.15)]">
                    <TrendingUp className="w-6 h-6 text-lime" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lime text-xs uppercase tracking-wider">
                      Be our ambassador!
                    </h4>
                    <p className="text-[11px] text-surface/85 font-medium leading-relaxed">
                      if u are also a creator be our ambassador and earn as your reffered users do collab deals , visit ambassadors page and lets make the safer collab economy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-surface/18 flex justify-end">
              <button
                type="button"
                onClick={() => setShowBenefits(false)}
                className="border-2 border-lime bg-lime text-primary font-mono text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-[3px_3px_0px_rgba(0,0,0,0.85)] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TextField({
  helperText,
  inputMode,
  label,
  onChange,
  placeholder,
  required = true,
  value,
}: {
  helperText?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  value: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <input
        required={required}
        type="text"
        inputMode={inputMode}
        className={fieldBaseClass}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText ? <p className={helperClass}>{helperText}</p> : null}
    </label>
  );
}

function EmailField({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <input
        required
        type="email"
        className={fieldBaseClass}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function UrlField({
  helperText,
  label,
  onChange,
  placeholder,
  required = true,
  value,
}: {
  helperText?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  value: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <input
        required={required}
        type="url"
        inputMode="url"
        className={fieldBaseClass}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {helperText ? <p className={helperClass}>{helperText}</p> : null}
    </label>
  );
}

function FloatingInputField({
  error,
  inputMode,
  label,
  onChange,
  required = true,
  value,
}: {
  error?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  label: string;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}) {
  return (
    <label className="block">
      <div className="relative">
        <input
          required={required}
          type="text"
          inputMode={inputMode}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'peer w-full border-2 bg-[#181818] px-4 pb-2.5 pt-6 font-body text-base font-semibold text-surface outline-none transition-all duration-200 placeholder:text-transparent focus:border-lime focus:shadow-[0_0_0_3px_rgba(198,255,0,0.14)]',
            error ? 'border-magenta' : 'border-surface/18',
          )}
        />
        <span className="pointer-events-none absolute left-4 top-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-surface/58 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-surface/42 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-lime">
          {label}
        </span>
      </div>
      {error ? <p className="mt-1.5 font-body text-xs font-semibold text-magenta">{error}</p> : null}
    </label>
  );
}

function FloatingSelectField({
  error,
  label,
  onChange,
  options,
  required = true,
  value,
}: {
  error?: string;
  label: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  value: string;
}) {
  return (
    <label className="block">
      <div className="relative">
        <select
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'w-full appearance-none border-2 bg-[#181818] px-4 pb-2.5 pt-6 font-body text-base font-semibold text-surface outline-none transition-all duration-200 focus:border-lime focus:shadow-[0_0_0_3px_rgba(198,255,0,0.14)]',
            error ? 'border-magenta' : 'border-surface/18',
          )}
        >
          <option value="" disabled>
            Select one
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          className={cn(
            'pointer-events-none absolute left-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-200',
            value ? 'top-2.5 text-lime' : 'top-1/2 -translate-y-1/2 text-surface/42',
          )}
        >
          {label}
        </span>
      </div>
      {error ? <p className="mt-1.5 font-body text-xs font-semibold text-magenta">{error}</p> : null}
    </label>
  );
}

function FloatingTextareaField({
  error,
  label,
  minRows = 6,
  onChange,
  required = true,
  value,
}: {
  error?: string;
  label: string;
  minRows?: number;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}) {
  return (
    <label className="block">
      <div className="relative">
        <textarea
          required={required}
          rows={minRows}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            'peer min-h-[180px] w-full resize-y border-2 bg-[#181818] px-4 pb-3 pt-7 font-body text-base font-semibold text-surface outline-none transition-all duration-200 placeholder:text-transparent focus:border-lime focus:shadow-[0_0_0_3px_rgba(198,255,0,0.14)]',
            error ? 'border-magenta' : 'border-surface/18',
          )}
        />
        <span className="pointer-events-none absolute left-4 top-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-surface/58 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-surface/42 peer-focus:top-2.5 peer-focus:text-lime">
          {label}
        </span>
      </div>
      {error ? <p className="mt-1.5 font-body text-xs font-semibold text-magenta">{error}</p> : null}
    </label>
  );
}

function SelectField({
  helperText,
  label,
  onChange,
  options,
  value,
}: {
  helperText?: string;
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <select
        required
        className={cn(fieldBaseClass, 'appearance-none bg-[linear-gradient(180deg,#181818_0%,#131313_100%)]')}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {helperText ? <p className={helperClass}>{helperText}</p> : null}
    </label>
  );
}

function ChipField({
  label,
  onToggle,
  options,
  selected,
  showError,
}: {
  label: string;
  onToggle: (value: string) => void;
  options: string[];
  selected: string[];
  showError: boolean;
}) {
  return (
    <div>
      <div className={fieldLabelClass}>{label}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onToggle(option)}
              className={cn(
                'border-2 px-3 py-2 font-body text-sm font-bold transition-all',
                isActive
                  ? 'border-lime bg-lime text-primary shadow-[3px_3px_0px_rgba(0,0,0,0.42)]'
                  : 'border-surface/18 bg-surface/6 text-surface/85 hover:border-cyan hover:bg-surface/10'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showError ? <p className="mt-2 font-body text-xs font-semibold text-magenta">Select at least one option.</p> : null}
    </div>
  );
}

function SingleChipField({
  helperText,
  label,
  onSelect,
  options,
  selected,
  showError,
}: {
  helperText?: string;
  label: string;
  onSelect: (value: string) => void;
  options: string[];
  selected: string;
  showError: boolean;
}) {
  return (
    <div>
      <div className={fieldLabelClass}>{label}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isActive = selected === option;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(option)}
              className={cn(
                'border-2 px-3 py-2 font-body text-sm font-bold transition-all',
                isActive
                  ? 'border-lime bg-lime text-primary shadow-[3px_3px_0px_rgba(0,0,0,0.42)]'
                  : 'border-surface/18 bg-surface/6 text-surface/85 hover:border-cyan hover:bg-surface/10'
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {helperText ? <p className={helperClass}>{helperText}</p> : null}
      {showError ? <p className="mt-2 font-body text-xs font-semibold text-magenta">Select one option.</p> : null}
    </div>
  );
}

function TextareaField({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <textarea
        required
        rows={5}
        className={cn(fieldBaseClass, 'min-h-[140px] resize-y')}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function CheckboxField({
  label,
  onChange,
  required = false,
  checked,
}: {
  label: string;
  onChange: (checked: boolean) => void;
  required?: boolean;
  checked: boolean;
}) {
  return (
    <label className="flex items-start gap-4 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <input
          required={required}
          type="checkbox"
          className="peer appearance-none w-6 h-6 border-2 border-surface/18 bg-[#181818] checked:border-lime checked:bg-lime transition-colors outline-none cursor-pointer"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <Check className="absolute w-4 h-4 text-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
      </div>
      <span className="font-body text-base font-semibold leading-tight text-surface/85 group-hover:text-surface transition-colors pt-0.5">
        {label}
      </span>
    </label>
  );
}

function SubmitButton({ children, isLoading }: { children: ReactNode; isLoading?: boolean }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={cn(
        "inline-flex w-full items-center justify-center border-2 border-primary bg-lime px-6 py-4 font-heading text-lg font-black uppercase tracking-tight text-primary shadow-[6px_6px_0px_rgba(0,0,0,0.45)] transition-transform",
        isLoading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_rgba(0,0,0,0.45)]"
      )}
    >
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : null}
      {children}
    </button>
  );
}

function SuccessState({
  body,
  heading,
  communityLink,
}: {
  body: string;
  heading: string;
  communityLink?: string;
}) {
  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="w-full border-2 border-lime/55 bg-surface/6 p-8 text-center shadow-[8px_8px_0px_rgba(0,0,0,0.42)]">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-lime bg-lime text-primary shadow-[4px_4px_0px_rgba(0,0,0,0.42)]">
          <Check className="h-7 w-7" />
        </div>
        <div className="font-heading text-3xl font-black uppercase tracking-tight text-surface">{heading}</div>
        <p className="mx-auto mt-4 max-w-md font-body text-lg font-medium leading-relaxed text-surface/78">{body}</p>
        {communityLink ? (
          <div className="mt-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-surface/40 mb-4">
              While you wait — join the community
            </p>
            <a
              href={communityLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-lime bg-lime px-7 py-3 font-heading font-black uppercase text-sm text-primary shadow-[4px_4px_0px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.45)] transition-all"
            >
              Join CreLynk Community →
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function getFormPanelConfig(activeForm: FormType | null) {
  if (activeForm === 'brand') {
    return {
      heading: 'Join as a Brand',
      label: 'Brand Early Access — 25 Spots',
      subheading: 'Tell us about your brand in under 60 seconds.',
    };
  }

  if (activeForm === 'startup') {
    return {
      heading: 'Join as a Startup',
      label: 'Startup Early Access — 50 Spots',
      subheading: 'Tell us about your product in under 60 seconds.',
    };
  }

  if (activeForm === 'ambassador') {
    return {
      heading: 'Apply as Ambassador',
      label: 'Ambassador Track',
      subheading: '5 spots only. We read every application personally.',
    };
  }

  if (activeForm === 'localite') {
    return {
      heading: 'LOCALITE Early Access',
      label: 'Localite Founding Access',
      subheading: 'Launch creator-led campaigns for your local business.',
    };
  }

  return {
    heading: 'Join as a Creator',
    label: 'Creator Early Access',
    subheading: '60 seconds. No essays. Just tell us who you are.',
  };
}

function toggleValue(values: string[], nextValue: string) {
  return values.includes(nextValue) ? values.filter((value) => value !== nextValue) : [...values, nextValue];
}

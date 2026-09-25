import {
  type CSSProperties,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  MapPin,
  Lock,
  Menu,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { Footer } from '../sections/Footer';
import { FormTrigger } from '../components/form-panel';
import { Button } from '../components/ui';
import { hasSupabaseConfig, supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { useWaitlistStats } from '../hooks/useWaitlistStats';
import logoSrc from '../assets/Untitled design (1)-Photoroom.png';

type CreatorProfile = {
  name: string;
  followers: string;
  niches: string[];
  handle: string;
  platform: string;
  profile_picture_url: string;
  show_on_front?: boolean;
};

type BrandProfile = {
  name: string;
  brand_type: string;
  industry: string;
  profile_picture_url: string;
  show_on_front?: boolean;
};

type StartupProfile = {
  name: string;
  product_category: string;
  stage: string;
  collab_type: string;
  profile_picture_url: string;
  show_on_front?: boolean;
};

type LocaliteProfile = {
  business_name: string;
  owner_name: string;
  business_category: string;
  city: string;
  instagram_handle: string;
  growth_goal?: string;
  monthly_budget?: string;
  profile_picture_url: string;
  show_on_front?: boolean;
};

// ─── Column sets (single source of truth) ────────────────────────────────────

const CREATOR_COLS = 'name, followers, niches, handle, platform, profile_picture_url';
const BRAND_COLS = 'name, brand_type, industry, profile_picture_url';
const STARTUP_COLS = 'name, product_category, stage, collab_type, profile_picture_url';
const LOCALITE_COLS =
  'business_name, owner_name, business_category, city, instagram_handle, growth_goal, monthly_budget, profile_picture_url';

// ─── Safe fetch (3-level fallback for missing migrations) ─────────────────────

const FRONT_FEATURE_COLUMNS = ['show_on_front', 'featured_on_front', 'is_featured'] as const;
const warnedProfileFetchErrors = new Set<string>();
const SELECT_QUERY_CACHE: Record<string, string> = {};

function isPermissionDenied(error: SupabaseErrorLike) {
  const text = getErrorText(error).toLowerCase();
  return (
    text.includes('permission denied') ||
    text.includes('violates row-level security policy') ||
    text.includes('row-level security')
  );
}

function isFrontFeatured(row: Record<string, unknown>) {
  return FRONT_FEATURE_COLUMNS.some((column) => row[column] === true);
}

function warnProfileFetchErrorOnce(key: string, message: string) {
  if (warnedProfileFetchErrors.has(key)) return;
  warnedProfileFetchErrors.add(key);
  console.warn(message);
}

type SupabaseErrorLike = {
  details?: string | null;
  hint?: string | null;
  message: string;
};

function getErrorText(error: SupabaseErrorLike) {
  return [error.message, error.details, error.hint].filter(Boolean).join(' | ');
}

function extractMissingColumn(error: SupabaseErrorLike): string | null {
  const text = getErrorText(error);
  const patterns = [
    /column ["']?([a-zA-Z0-9_.]+)["']?(?: of relation ["']?[a-zA-Z0-9_]+["']?)? does not exist/i,
    /could not find the ["']?([a-zA-Z0-9_]+)["']? column/i,
    /column ["']?([a-zA-Z0-9_.]+)["']? .*schema cache/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].split('.').pop() ?? null;
    }
  }

  return null;
}

function isMissingCreatedAt(error: SupabaseErrorLike) {
  const text = getErrorText(error).toLowerCase();
  return text.includes('created_at') && (text.includes('does not exist') || text.includes('could not find'));
}

function mapProfileRows<T extends { show_on_front?: boolean }>(
  rows: Record<string, unknown>[] | null,
): T[] {
  return (rows ?? [])
    .filter((row) => row.show_on_profiles !== false)
    .map((row) => {
      const {
        show_on_profiles: _showOnProfiles,
        show_on_front: _showOnFront,
        featured_on_front: _featuredOnFront,
        is_featured: _isFeatured,
        ...rest
      } = row;
      return {
        ...(rest as T),
        show_on_front: isFrontFeatured(row),
      };
    });
}

async function safeFetch<T extends { show_on_front?: boolean }>(
  table: string,
  columns: string,
  limit = 60,
): Promise<T[]> {
  if (!hasSupabaseConfig || !supabase) return [];
  const sb = supabase;

  // 1. Check cache first to avoid repetitive dynamic probing queries
  const cachedSelect = SELECT_QUERY_CACHE[table];
  if (cachedSelect) {
    if (cachedSelect === 'PERMISSION_DENIED') return [];

    const runQuery = (orderByCreatedAt: boolean) => {
      let query = sb.from(table).select(cachedSelect);
      if (orderByCreatedAt) {
        query = query.order('created_at', { ascending: false });
      }
      return query.limit(limit);
    };

    let result = await runQuery(true);
    if (result.error && isMissingCreatedAt(result.error)) {
      result = await runQuery(false);
    }

    if (!result.error) {
      return mapProfileRows<T>(result.data as unknown as Record<string, unknown>[] | null);
    }
    // If the cached select statement fails (e.g. database schema changed), clear it and fallback to probing
    delete SELECT_QUERY_CACHE[table];
  }

  let baseColumns = columns
    .split(',')
    .map((column) => column.trim())
    .filter(Boolean);

  // Max 3 pruning attempts to avoid long load hangs under errors
  for (let pruneAttempt = 0; pruneAttempt < 3; pruneAttempt += 1) {
    const baseSelect = baseColumns.join(', ');
    if (!baseSelect) return [];

    const selectAttempts = [
      `${baseSelect}, show_on_profiles, show_on_front`,
      `${baseSelect}, show_on_profiles, featured_on_front`,
      `${baseSelect}, show_on_profiles, is_featured`,
      `${baseSelect}, show_on_profiles`,
      baseSelect,
    ];

    let prunedMissingColumn = false;

    for (const select of selectAttempts) {
      const runQuery = (orderByCreatedAt: boolean) => {
        let query = sb.from(table).select(select);
        if (orderByCreatedAt) {
          query = query.order('created_at', { ascending: false });
        }
        return query.limit(limit);
      };

      let result = await runQuery(true);
      if (result.error && isMissingCreatedAt(result.error)) {
        result = await runQuery(false);
      }

      if (result.error) {
        if (isPermissionDenied(result.error)) {
          warnProfileFetchErrorOnce(
            `${table}|permission-denied`,
            `[profiles] ${table} access denied: ${result.error.message}. Please check database RLS policies.`
          );
          SELECT_QUERY_CACHE[table] = 'PERMISSION_DENIED';
          return [];
        }

        const missingColumn = extractMissingColumn(result.error);
        if (missingColumn) {
          const nextColumns = baseColumns.filter((column) => column !== missingColumn);
          if (nextColumns.length !== baseColumns.length) {
            baseColumns = nextColumns;
            prunedMissingColumn = true;
            break;
          }
        }

        warnProfileFetchErrorOnce(
          `${table}|${select}|${result.error.message}`,
          `[profiles] ${table} fetch failed for "${select}": ${result.error.message}`,
        );
        continue;
      }

      // Success! Cache select string and return mapped rows
      SELECT_QUERY_CACHE[table] = select;
      return mapProfileRows<T>(result.data as unknown as Record<string, unknown>[] | null);
    }

    if (!prunedMissingColumn) break;
  }

  // Fallback to wildcard query
  const wildcardResult = await sb.from(table).select('*').limit(limit);
  if (!wildcardResult.error) {
    SELECT_QUERY_CACHE[table] = '*';
    return mapProfileRows<T>(wildcardResult.data as Record<string, unknown>[] | null);
  }

  if (isPermissionDenied(wildcardResult.error)) {
    SELECT_QUERY_CACHE[table] = 'PERMISSION_DENIED';
    return [];
  }

  warnProfileFetchErrorOnce(
    `${table}|wildcard|${wildcardResult.error.message}`,
    `[profiles] ${table} wildcard fetch fallback failed: ${wildcardResult.error.message}`,
  );
  return [];
}

// ─── Row → typed profile mappers ─────────────────────────────────────────────

// ─── Realtime-wired hook ──────────────────────────────────────────────────────

function useProfiles() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [startups, setStartups] = useState<StartupProfile[]>([]);
  const [localites, setLocalites] = useState<LocaliteProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ── Initial fetch ──────────────────────────────────────────────────────────
    let active = true;
    let syncInProgress = false;
    const loadProfiles = async () => {
      if (syncInProgress) return;
      syncInProgress = true;
      try {
        const [c, b, s, l] = await Promise.all([
          safeFetch<CreatorProfile>('creator_leads', CREATOR_COLS),
          safeFetch<BrandProfile>('brand_leads', BRAND_COLS),
          safeFetch<StartupProfile>('startup_leads', STARTUP_COLS),
          safeFetch<LocaliteProfile>('localite_leads', LOCALITE_COLS),
        ]);
        if (active) {
          setCreators(c);
          setBrands(b);
          setStartups(s);
          setLocalites(l);
          setLoading(false);
        }
      } finally {
        syncInProgress = false;
      }
    };

    void loadProfiles();

    if (!hasSupabaseConfig || !supabase) {
      return () => {
        active = false;
      };
    }
    const sb = supabase;
    const syncProfiles = () => {
      if (document.visibilityState === 'hidden') return;
      void loadProfiles();
    };
    const intervalId = window.setInterval(syncProfiles, 30000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        syncProfiles();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Realtime: refresh after inserts/updates/deletes (including backend toggle changes)
    const channel = sb
      .channel('crelynk-profiles-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'creator_leads' },
        syncProfiles,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'brand_leads' },
        syncProfiles,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'startup_leads' },
        syncProfiles,
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'localite_leads' },
        syncProfiles,
      )
      .subscribe();

    return () => {
      active = false;
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sb.removeChannel(channel);
    };
  }, []);

  return { creators, brands, startups, localites, loading };
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

// ─── Perks box ────────────────────────────────────────────────────────────────

const creatorPerks = [
  { icon: <Zap className="w-4 h-4" />, text: 'Zero commission for your first 6 months' },
  { icon: <Shield className="w-4 h-4" />, text: 'Direct escrow payments — no more ghosting' },
  { icon: <Star className="w-4 h-4" />, text: 'Founding Creator badge on your profile' },
  { icon: <TrendingUp className="w-4 h-4" />, text: 'AI-matched with top brands in your niche' },
  { icon: <Lock className="w-4 h-4" />, text: 'Your founding rate is locked forever' },
];

const brandPerks = [
  { icon: <Users className="w-4 h-4" />, text: 'Priority access to verified creator network' },
  { icon: <Shield className="w-4 h-4" />, text: 'Escrow payment protection on every deal' },
  { icon: <Sparkles className="w-4 h-4" />, text: 'AI-powered creator matching for your niche' },
  { icon: <Star className="w-4 h-4" />, text: 'Founding Partner badge + locked pricing' },
  { icon: <TrendingUp className="w-4 h-4" />, text: 'Real-time campaign performance analytics' },
];

const startupPerks = [
  { icon: <TrendingUp className="w-4 h-4" />, text: 'Revenue share collabs — pay only on results' },
  { icon: <Zap className="w-4 h-4" />, text: 'Zero upfront creator marketing cost' },
  { icon: <Shield className="w-4 h-4" />, text: 'Real-time sales attribution tracking' },
  { icon: <Lock className="w-4 h-4" />, text: 'Founding startup rate: locked forever' },
  { icon: <Star className="w-4 h-4" />, text: 'Pre-built revenue share deal templates' },
];

const localitePerks = [
  { icon: <MapPin className="w-4 h-4" />, text: 'Hyperlocal creator campaigns built for your city' },
  { icon: <Users className="w-4 h-4" />, text: 'Match with nearby creators who drive real footfall' },
  { icon: <Sparkles className="w-4 h-4" />, text: 'Launch founder-first offers before public rollout' },
  { icon: <TrendingUp className="w-4 h-4" />, text: 'Track awareness, visits, and local buzz in one place' },
  { icon: <Star className="w-4 h-4" />, text: 'Founding Localite visibility on the community page' },
];

type PerkItem = { icon: ReactNode; text: string };

function PerksBox({
  perks,
  accent,
  formType,
  ctaLabel,
}: {
  perks: PerkItem[];
  accent: string;
  formType: 'creator' | 'brand' | 'startup' | 'localite';
  ctaLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-8 mb-10 border-2 border-primary p-6 md:p-8 shadow-hard relative overflow-hidden"
      style={{ backgroundColor: accent }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/60 mb-3">
            Founding member perks
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="shrink-0 text-primary/70">{perk.icon}</span>
                <span className="font-body text-sm font-semibold text-primary leading-tight">
                  {perk.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <FormTrigger
          formType={formType}
          className="shrink-0 inline-flex items-center gap-2 border-2 border-primary bg-primary text-surface px-6 py-3 font-heading font-black uppercase text-sm shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)] transition-all"
        >
          {ctaLabel} <ArrowRight className="w-4 h-4" />
        </FormTrigger>
      </div>
    </motion.div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  label,
  count,
  accent,
  icon,
  description,
}: {
  label: string;
  count: number;
  accent: string;
  icon: ReactNode;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center w-10 h-10 border-2 border-primary shadow-hard shrink-0"
          style={{ backgroundColor: accent }}
        >
          <span className="text-primary">{icon}</span>
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight text-primary">
          {label}
        </h2>
      </div>
      <div className="flex items-center gap-3 pb-1">
        <div
          className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 border-2 border-primary shadow-[2px_2px_0px_#111]"
          style={{ backgroundColor: accent }}
        >
          {count} joined
        </div>
        <p className="font-body text-sm text-secondary font-medium hidden md:block">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── Creator card ─────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const INSTAGRAM_RESERVED_SEGMENTS = new Set(['p', 'reel', 'reels', 'stories', 'explore', 'accounts']);

function normalizeInstagramHandle(rawHandle: string | null | undefined): string | null {
  if (!rawHandle) return null;

  const raw = rawHandle.trim();
  if (!raw) return null;

  const maybeUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const parsed = new URL(maybeUrl);
    if (/instagram\.com$/i.test(parsed.hostname)) {
      const path = parsed.pathname.replace(/^\/+|\/+$/g, '');
      const firstSegment = path.split('/')[0] || '';
      if (INSTAGRAM_RESERVED_SEGMENTS.has(firstSegment.toLowerCase())) {
        return null;
      }
      if (firstSegment) {
        return firstSegment.toLowerCase();
      }
    }
    // If it's a URL but not an Instagram domain, do not try to coerce it.
    return null;
  } catch {
    // Not a URL; continue with plain-handle parsing.
  }

  const cleaned = raw
    .replace(/^@+/, '')
    .replace(/^\/+/, '')
    .split(/[/?#\s]/)[0]
    .trim()
    .toLowerCase();

  return cleaned || null;
}
const CreatorCard = memo(function CreatorCard({ creator }: { creator: CreatorProfile }) {
  const instagramHandle = normalizeInstagramHandle(creator.handle);
  const instagramUrl = instagramHandle ? `https://www.instagram.com/${instagramHandle}/` : null;
  const creatorNiches = asStringList((creator as { niches?: unknown }).niches);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group aspect-[2.35/1] overflow-hidden rounded-[20px] border border-primary/15 bg-[#e7ead8]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      style={{
        boxShadow:
          '9px 9px 18px rgba(24,34,18,0.2), -7px -7px 16px rgba(255,255,255,0.75), inset 1px 1px 0 rgba(255,255,255,0.55)',
      }}
    >
      <div className="grid h-full grid-cols-2">
        <div className="relative overflow-hidden border-r border-primary/15 bg-[#dbe2c7]">
          {creator.profile_picture_url ? (
            <img
              src={creator.profile_picture_url}
              alt={creator.name || 'Creator'}
              className={cn(
                "h-full w-full object-cover object-center transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-4xl font-black text-primary/45">
              {((creator.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('') || '?').toUpperCase()}
            </div>
          )}
          <div className="absolute inset-x-1.5 bottom-1.5 rounded-lg bg-white/55 px-1.5 py-1 text-center font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/75 backdrop-blur-sm">
            Founding Creator
          </div>
        </div>
        <div className="p-2.5 flex flex-col overflow-hidden">
          <div className="font-heading text-[13px] font-black uppercase tracking-tight text-primary truncate">
            {creator.name || 'Creator'}
          </div>
          {instagramHandle ? (
            <div className="mt-0.5 font-mono text-[9px] font-semibold text-primary/65 truncate">
              @{instagramHandle}
            </div>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-1.5 overflow-hidden max-h-[34px]">
            {creator.followers ? (
              <span className="rounded-lg border border-primary/20 bg-[#dbe2c7] px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {creator.followers}
              </span>
            ) : null}
            {creator.platform ? (
              <span className="rounded-lg border border-primary/20 bg-white/55 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {creator.platform}
              </span>
            ) : null}
          </div>
          {creatorNiches.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5 overflow-hidden max-h-[34px]">
              {creatorNiches.slice(0, 2).map((niche) => (
                <span
                  key={niche}
                  className="rounded-lg border border-primary/15 bg-white/50 px-2 py-1 font-body text-[8px] font-bold uppercase tracking-wide text-primary/70"
                >
                  {niche}
                </span>
              ))}
              {creatorNiches.length > 2 ? (
                <span className="rounded-lg border border-primary/15 bg-white/50 px-2 py-1 font-body text-[8px] font-bold uppercase tracking-wide text-primary/60">
                  +{creatorNiches.length - 2}
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto pt-1.5">
          <a
            href={instagramUrl ?? '#'}
            target={instagramUrl ? '_blank' : undefined}
            rel={instagramUrl ? 'noopener noreferrer' : undefined}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 border text-[7px] font-mono font-bold uppercase tracking-[0.14em] transition-colors',
              instagramUrl
                ? 'border-primary/20 bg-white/60 text-primary/80 hover:bg-white/90'
                : 'border-primary/15 bg-white/30 text-primary/40 pointer-events-none',
            )}
          >
            {instagramUrl ? (
              <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            ) : null}
            {instagramUrl ? 'View Insta' : 'No Insta'}
            {instagramUrl ? <ExternalLink className="w-2.5 h-2.5" /> : null}
          </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Brand card ───────────────────────────────────────────────────────────────

const BrandCard = memo(function BrandCard({ brand }: { brand: BrandProfile }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group aspect-[2.35/1] overflow-hidden rounded-[20px] border border-primary/15 bg-[#e3def1]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      style={{
        boxShadow:
          '9px 9px 18px rgba(34,26,55,0.18), -7px -7px 16px rgba(255,255,255,0.72), inset 1px 1px 0 rgba(255,255,255,0.55)',
      }}
    >
      <div className="grid h-full grid-cols-2">
        <div className="relative overflow-hidden border-r border-primary/15 bg-[#d7cfee]">
          {brand.profile_picture_url ? (
            <img
              src={brand.profile_picture_url}
              alt={brand.name || 'Brand'}
              className={cn(
                "h-full w-full object-cover object-center transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-4xl font-black text-primary/45">
              {((brand.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('') || '?').toUpperCase()}
            </div>
          )}
          <div className="absolute inset-x-1.5 bottom-1.5 rounded-lg bg-white/55 px-1.5 py-1 text-center font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/75 backdrop-blur-sm">
            Founding Brand
          </div>
        </div>
        <div className="p-2.5 flex flex-col overflow-hidden">
          <div className="font-heading text-[13px] font-black uppercase tracking-tight text-primary truncate">
            {brand.name || 'Brand'}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5 overflow-hidden max-h-[34px]">
            {brand.industry ? (
              <span className="rounded-lg border border-primary/20 bg-[#d7cfee] px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {brand.industry}
              </span>
            ) : null}
            {brand.brand_type ? (
              <span className="rounded-lg border border-primary/20 bg-white/55 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {brand.brand_type}
              </span>
            ) : null}
          </div>
          <div className="mt-auto pt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-primary/18 bg-white/55 px-2 py-1.5 self-start">
            <Sparkles className="w-3 h-3 text-primary/60" />
            <span className="font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/70">
              Partner Ready
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Startup card ─────────────────────────────────────────────────────────────

const StartupCard = memo(function StartupCard({ startup }: { startup: StartupProfile }) {
  const isRevenueShare =
    startup.collab_type?.toLowerCase().includes('revenue') ||
    startup.collab_type?.toLowerCase().includes('share');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group aspect-[2.35/1] overflow-hidden rounded-[20px] border border-primary/15 bg-[#efe1d7]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      style={{
        boxShadow:
          '9px 9px 18px rgba(55,33,20,0.18), -7px -7px 16px rgba(255,255,255,0.74), inset 1px 1px 0 rgba(255,255,255,0.55)',
      }}
    >
      <div className="grid h-full grid-cols-2">
        <div className="relative overflow-hidden border-r border-primary/15 bg-[#e9d4c5]">
          {startup.profile_picture_url ? (
            <img
              src={startup.profile_picture_url}
              alt={startup.name || 'Startup'}
              className={cn(
                "h-full w-full object-cover object-center transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-4xl font-black text-primary/45">
              {((startup.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('') || '?').toUpperCase()}
            </div>
          )}
          <div className="absolute inset-x-1.5 bottom-1.5 rounded-lg bg-white/55 px-1.5 py-1 text-center font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/75 backdrop-blur-sm">
            Founding Startup
          </div>
        </div>
        <div className="p-2.5 flex flex-col overflow-hidden">
          <div className="font-heading text-[13px] font-black uppercase tracking-tight text-primary truncate">
            {startup.name || 'Startup'}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5 overflow-hidden max-h-[34px]">
            {startup.product_category ? (
              <span className="rounded-lg border border-primary/20 bg-[#e9d4c5] px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {startup.product_category}
              </span>
            ) : null}
            {startup.stage ? (
              <span className="rounded-lg border border-primary/20 bg-white/55 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {startup.stage}
              </span>
            ) : null}
          </div>
          {isRevenueShare ? (
            <div className="mt-auto pt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-primary/18 bg-white/55 px-2 py-1.5 self-start">
              <TrendingUp className="w-3 h-3 text-primary/65" />
              <span className="font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/72">
                Revenue Share
              </span>
            </div>
          ) : (
            <div className="mt-auto pt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-primary/18 bg-white/55 px-2 py-1.5 self-start">
              <Rocket className="w-3 h-3 text-primary/60" />
              <span className="font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/70">
                Growth Ready
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

// ─── Placeholder card ─────────────────────────────────────────────────────────

const LocaliteCard = memo(function LocaliteCard({ localite }: { localite: LocaliteProfile }) {
  const businessName = localite.business_name || localite.owner_name || 'Localite Business';
  const ownerName = localite.owner_name || '';
  const locationQuery = localite.city
    ? `${businessName} ${localite.city}`
    : businessName;
  const locationUrl = localite.city
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationQuery)}`
    : null;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group aspect-[2.35/1] overflow-hidden rounded-[20px] border border-primary/15 bg-[#e2e7ea]"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.16 }}
      style={{
        boxShadow:
          '9px 9px 18px rgba(24,31,38,0.18), -7px -7px 16px rgba(255,255,255,0.75), inset 1px 1px 0 rgba(255,255,255,0.55)',
      }}
    >
      <div className="grid h-full grid-cols-2">
        <div className="relative overflow-hidden border-r border-primary/15 bg-[#d6dfe4]">
          {localite.profile_picture_url ? (
            <img
              src={localite.profile_picture_url}
              alt={businessName}
              className={cn(
                "h-full w-full object-cover object-center transition-opacity duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-4xl font-black text-primary/45">
              {((businessName || '?').split(' ').map((w) => w[0]).slice(0, 2).join('') || '?').toUpperCase()}
            </div>
          )}
          <div className="absolute inset-x-1.5 bottom-1.5 rounded-lg bg-white/55 px-1.5 py-1 text-center font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-primary/75 backdrop-blur-sm">
            Founding Localite
          </div>
        </div>
        <div className="p-2.5 flex flex-col overflow-hidden">
          <div className="font-heading text-[13px] font-black uppercase tracking-tight text-primary truncate">
            {businessName}
          </div>
          {ownerName ? (
            <div className="mt-0.5 font-mono text-[9px] font-semibold text-primary/65 truncate">
              by {ownerName}
            </div>
          ) : null}
          <div className="mt-2 flex flex-wrap gap-1.5 overflow-hidden max-h-[34px]">
            {localite.business_category ? (
              <span className="rounded-lg border border-primary/20 bg-[#d6dfe4] px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {localite.business_category}
              </span>
            ) : null}
            {localite.city ? (
              <span className="rounded-lg border border-primary/20 bg-white/55 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-primary/75">
                {localite.city}
              </span>
            ) : null}
          </div>
          {(localite.growth_goal || localite.monthly_budget) ? (
            <div className="mt-2 flex flex-wrap gap-1.5 overflow-hidden max-h-[34px]">
              {localite.growth_goal ? (
                <span className="rounded-lg border border-primary/15 bg-white/50 px-2 py-1 font-body text-[8px] font-bold uppercase tracking-wide text-primary/70">
                  {localite.growth_goal}
                </span>
              ) : null}
              {localite.monthly_budget ? (
                <span className="rounded-lg border border-primary/15 bg-white/50 px-2 py-1 font-body text-[8px] font-bold uppercase tracking-wide text-primary/60">
                  {localite.monthly_budget}
                </span>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto pt-1.5">
            <a
              href={locationUrl ?? '#'}
              target={locationUrl ? '_blank' : undefined}
              rel={locationUrl ? 'noopener noreferrer' : undefined}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 border text-[7px] font-mono font-bold uppercase tracking-[0.14em] transition-colors',
                locationUrl
                  ? 'border-primary/20 bg-white/60 text-primary/80 hover:bg-white/90'
                  : 'border-primary/15 bg-white/30 text-primary/40 pointer-events-none',
              )}
            >
              <MapPin className="w-3 h-3 shrink-0" />
              {locationUrl ? 'View Location' : 'No Location'}
              {locationUrl ? <ExternalLink className="w-2.5 h-2.5" /> : null}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

function PlaceholderCard({
  type,
  accent,
}: {
  type: 'creator' | 'brand' | 'startup' | 'localite';
  accent: string;
}) {
  const label =
    type === 'creator'
      ? 'Claim your creator spot'
      : type === 'brand'
        ? 'Join as a brand'
        : type === 'startup'
          ? 'Join as a startup'
          : 'Join as a localite';

  return (
    <motion.div
      variants={cardVariants}
      className="aspect-[2.35/1] overflow-hidden border-2 border-dashed border-primary/25 bg-surface/60"
    >
      <div className="h-1 w-full" style={{ backgroundColor: accent, opacity: 0.2 }} />
      <FormTrigger
        formType={type}
        className="h-[calc(100%-4px)] p-3.5 flex flex-col gap-2.5 text-left hover:bg-elevated transition-colors group"
      >
        <div className="flex items-start gap-2.5">
          <div
            className="border-2 border-dashed border-primary/20 overflow-hidden shrink-0 flex items-center justify-center"
            style={{ width: 44, height: 44, borderRadius: '50%' }}
          >
            <span className="font-heading font-black text-base text-primary/20">+</span>
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-secondary/50 group-hover:text-secondary transition-colors">
              {label}
            </div>
            <div className="flex items-center gap-1 mt-2 text-primary/30 group-hover:text-primary/60 transition-colors">
              <ArrowRight className="w-3 h-3" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] font-bold">
                Get early access
              </span>
            </div>
          </div>
        </div>
      </FormTrigger>
    </motion.div>
  );
}

// ─── Cards container ──────────────────────────────────────────────────────────

function CardsGrid({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
    >
      {children}
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCount({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const startVal = from.current;
    from.current = value;
    if (startVal === value) return;

    const duration = value === 0 ? 0 : 700;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{displayed}</>;
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

type FoundersParticle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  blur: number;
  opacity: number;
  kind?: 'ring' | 'diamond';
};

const FOUNDERS_BLOBS: Array<{ className: string; style: CSSProperties }> = [
  {
    className: 'founders-blob--lime',
    style: {
      left: '-10%',
      top: '-20%',
      width: '42vw',
      height: '42vw',
      maxWidth: '560px',
      maxHeight: '560px',
      animationDuration: '22s',
      animationDelay: '-5s',
    },
  },
  {
    className: 'founders-blob--lavender',
    style: {
      right: '-12%',
      top: '-8%',
      width: '38vw',
      height: '38vw',
      maxWidth: '520px',
      maxHeight: '520px',
      animationDuration: '26s',
      animationDelay: '-8s',
    },
  },
  {
    className: 'founders-blob--orange',
    style: {
      left: '28%',
      bottom: '-34%',
      width: '48vw',
      height: '48vw',
      maxWidth: '620px',
      maxHeight: '620px',
      animationDuration: '28s',
      animationDelay: '-15s',
    },
  },
  {
    className: 'founders-blob--sky',
    style: {
      right: '16%',
      bottom: '-24%',
      width: '36vw',
      height: '36vw',
      maxWidth: '470px',
      maxHeight: '470px',
      animationDuration: '24s',
      animationDelay: '-11s',
    },
  },
];

const FOUNDERS_PARTICLES: FoundersParticle[] = [
  { left: '10%', top: '22%', size: 10, delay: '-2s', duration: '20s', blur: 0, opacity: 0.32, kind: 'ring' },
  { left: '18%', top: '68%', size: 9, delay: '-11s', duration: '24s', blur: 0.4, opacity: 0.24 },
  { left: '26%', top: '41%', size: 6, delay: '-8s', duration: '22s', blur: 0.5, opacity: 0.2, kind: 'diamond' },
  { left: '38%', top: '76%', size: 12, delay: '-14s', duration: '28s', blur: 0, opacity: 0.24, kind: 'ring' },
  { left: '47%', top: '30%', size: 8, delay: '-5s', duration: '21s', blur: 0.3, opacity: 0.21 },
  { left: '56%', top: '63%', size: 5, delay: '-16s', duration: '27s', blur: 0.4, opacity: 0.24, kind: 'diamond' },
  { left: '64%', top: '24%', size: 11, delay: '-7s', duration: '23s', blur: 0, opacity: 0.2, kind: 'ring' },
  { left: '74%', top: '54%', size: 8, delay: '-12s', duration: '26s', blur: 0.4, opacity: 0.19 },
  { left: '82%', top: '72%', size: 6, delay: '-19s', duration: '30s', blur: 0.6, opacity: 0.18 },
  { left: '90%', top: '36%', size: 9, delay: '-10s', duration: '24s', blur: 0, opacity: 0.22, kind: 'ring' },
];

function ProfilesHero({
  creatorsCount,
  brandsCount,
  startupsCount,
  localitesCount,
}: {
  creatorsCount: number;
  brandsCount: number;
  startupsCount: number;
  localitesCount: number;
}) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const applyParallax = () => {
      frame = 0;
      hero.style.setProperty('--founders-parallax-x', `${(targetX * 20).toFixed(2)}px`);
      hero.style.setProperty('--founders-parallax-y', `${(targetY * 16).toFixed(2)}px`);
    };

    const queueParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(applyParallax);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, nx));
      targetY = Math.max(-1, Math.min(1, ny));
      queueParallax();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      queueParallax();
    };

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    return () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="founders-hero relative py-20 md:py-28 px-4 md:px-8 overflow-hidden border-b border-primary/15"
    >
      <div className="founders-base-layer" aria-hidden="true" />
      <div className="founders-parallax-mesh" aria-hidden="true">
        {FOUNDERS_BLOBS.map((blob, index) => (
          <span
            key={`${blob.className}-${index}`}
            className={cn('founders-blob', blob.className)}
            style={blob.style}
          />
        ))}
      </div>
      <div className="founders-soft-accents" aria-hidden="true">
        {FOUNDERS_PARTICLES.map((particle, index) => (
          <span
            key={`founders-particle-${index}`}
            className={cn(
              'founders-particle',
              particle.kind === 'ring' && 'founders-particle--ring',
              particle.kind === 'diamond' && 'founders-particle--diamond',
            )}
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              filter: `blur(${particle.blur}px)`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>
      <div className="founders-grain-overlay" aria-hidden="true" />
      {/* Soft center brightener so text stays legible over the spray */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 48%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 55%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/14 bg-white/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary/60 mb-6 shadow-[0_8px_24px_-18px_rgba(17,17,17,0.30)] backdrop-blur-xl"
        >
          <Sparkles className="w-3 h-3" /> Founding Community
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-primary leading-[0.92]"
        >
          Meet The{' '}
          <span className="relative inline-block founders-title-highlight">
            <span>Founders</span>
          </span>
          <br />
          Building This With Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 font-body text-base md:text-lg font-medium text-primary/60 max-w-xl mx-auto"
        >
          The first 500 creators, brands, startups, and localites who believed before launch.
          This is them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-stretch justify-center gap-3 md:gap-4"
        >
          {[
            { label: 'Creators', count: creatorsCount, accent: '#D8FF3E', icon: <Users className="w-4 h-4" /> },
            { label: 'Brands',   count: brandsCount,   accent: '#B9A7FF', icon: <Building2 className="w-4 h-4" /> },
            { label: 'Startups', count: startupsCount, accent: '#FFB36B', icon: <Rocket className="w-4 h-4" /> },
            { label: 'Localites', count: localitesCount, accent: '#CBD7E2', icon: <MapPin className="w-4 h-4" /> },
          ].map((stat) => (
            <div
              key={stat.label}
              className={cn(
                'group relative min-w-[118px] overflow-hidden rounded-[20px] border border-primary/10 bg-white/72 px-6 py-4 md:py-5',
                'shadow-[0_20px_38px_-26px_rgba(20,20,20,0.52)] backdrop-blur-xl',
              )}
              style={{ '--stat-accent': stat.accent } as CSSProperties}
            >
              <span
                className="pointer-events-none absolute inset-x-3 top-2 h-7 rounded-full blur-xl opacity-55"
                style={{ background: 'var(--stat-accent)' }}
                aria-hidden="true"
              />
              <span className="relative z-10 inline-flex text-primary/60">{stat.icon}</span>
              <div className="relative z-10 font-heading text-4xl font-black mt-1 text-primary">
                <AnimatedCount value={stat.count} />
              </div>
              <div className="relative z-10 font-mono text-[9px] font-bold uppercase tracking-wider mt-1 text-primary/60">
                {stat.label}
              </div>
              <span
                className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-primary/15"
                aria-hidden="true"
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary/40"
        >
          Scroll to see who&apos;s in
        </motion.div>
      </div>
    </section>
  );
}



// ─── Sections ──────────────────────────────────────────────────────────────────

const FRONT_VISIBLE_LIMIT = 6;

function normalizeSearchInput(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^https?:\/\/(www\.)?/g, '')
    .replace(/[^a-z0-9@._/\s-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeSearchInput(value: string) {
  const normalized = normalizeSearchInput(value);
  if (!normalized) return [];
  return normalized
    .split(' ')
    .map((token) => token.replace(/^@+/, ''))
    .filter(Boolean);
}

function toSearchTerms(value: string | undefined | null) {
  const normalized = normalizeSearchInput(value ?? '');
  if (!normalized) return [];

  const parts = normalized
    .split(/[./_/\s-]+/)
    .map((part) => part.replace(/^@+/, ''))
    .filter(Boolean);

  const joinedNoAt = normalized.replace(/@/g, '');
  const withoutLeadingAt = normalized.replace(/^@+/, '');
  return [normalized, joinedNoAt, withoutLeadingAt, ...parts].filter(Boolean);
}

function asStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? item : String(item ?? '')))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/[,\n|]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}



function pickFrontProfiles<T extends { show_on_front?: boolean }>(profiles: T[]) {
  const featured = profiles.filter((profile) => profile.show_on_front === true);
  if (featured.length >= FRONT_VISIBLE_LIMIT) {
    return featured.slice(0, FRONT_VISIBLE_LIMIT);
  }
  const rest = profiles.filter((profile) => profile.show_on_front !== true);
  return [...featured, ...rest].slice(0, FRONT_VISIBLE_LIMIT);
}

// ─── Debounce hook ────────────────────────────────────────────────────────────

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

function SearchBar({
  value,
  onChange,
  placeholder,
  totalCount,
  visibleCount,
  frontCount,
  accent,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  totalCount: number;
  visibleCount: number;
  frontCount: number;
  accent: string;
}) {
  const isSearching = value.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mt-6 mb-6 border-2 border-primary bg-surface shadow-hard p-3 md:p-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full border-2 border-primary/25 bg-elevated py-2 pl-9 pr-10 text-sm font-body font-semibold text-primary outline-none transition-colors placeholder:text-secondary/55 focus:border-primary"
            type="text"
          />
          {value.trim().length > 0 ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-md border border-primary/25 bg-surface text-secondary transition-colors hover:text-primary hover:border-primary/45"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : null}
        </label>
        <div
          className="inline-flex items-center border-2 border-primary px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] self-start"
          style={{ backgroundColor: accent, color: '#111' }}
        >
          {isSearching
            ? `${visibleCount} result${visibleCount === 1 ? '' : 's'}`
            : `Showing ${frontCount} of ${totalCount}`}
        </div>
      </div>
    </motion.div>
  );
}

function EmptySearchState({ query, accent }: { query: string; accent: string }) {
  return (
    <div className="border-2 border-dashed border-primary/35 bg-surface/70 px-4 py-6 text-center">
      <div className="font-heading text-lg font-black uppercase tracking-tight text-primary">
        No match yet
      </div>
      <p className="mt-2 font-body text-sm font-semibold text-secondary">
        Try another name, niche, or username for <span style={{ color: accent }}>&quot;{query}&quot;</span>.
      </p>
    </div>
  );
}

function CreatorsSection({ creators }: { creators: CreatorProfile[] }) {
  const [query, setQuery] = useState('');
  const handleQueryChange = useCallback((next: string) => setQuery(next), []);
  const debouncedQuery = useDebouncedValue(query, 200);
  const normalizedQuery = useMemo(() => normalizeSearchInput(debouncedQuery), [debouncedQuery]);
  const frontCreators = useMemo(() => pickFrontProfiles(creators), [creators]);

  // Precompute searchable terms for all creators
  const preparedCreators = useMemo(() => {
    return creators.map((creator) => {
      const normalizedHandle = normalizeInstagramHandle(creator.handle);
      const niches = asStringList((creator as { niches?: unknown }).niches);
      const rawFields = [
        creator.name,
        creator.handle,
        normalizedHandle ? `@${normalizedHandle}` : null,
        creator.platform,
        creator.followers,
        ...niches,
      ];
      const terms = rawFields.flatMap((field) => toSearchTerms(field));
      return { creator, searchTerms: terms };
    });
  }, [creators]);

  const visibleCreators = useMemo(() => {
    if (!normalizedQuery) return frontCreators;
    const tokens = tokenizeSearchInput(normalizedQuery);
    if (tokens.length === 0) return frontCreators;
    return preparedCreators
      .filter(({ searchTerms }) =>
        tokens.every((token) => searchTerms.some((term) => term.includes(token)))
      )
      .map(({ creator }) => creator);
  }, [preparedCreators, frontCreators, normalizedQuery]);

  const placeholders = normalizedQuery ? 0 : 1;

  return (
    <section id="creators" className="py-16 md:py-20 px-4 md:px-8 border-b-2 border-primary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Creators"
          count={creators.length}
          accent="#C6FF00"
          icon={<Users className="w-5 h-5" />}
          description="Content creators across niches building their brand on CreLynk"
        />
        <PerksBox
          perks={creatorPerks}
          accent="#C6FF00"
          formType="creator"
          ctaLabel="Join as Creator"
        />
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search creators by name, niche, or @username"
          totalCount={creators.length}
          visibleCount={visibleCreators.length}
          frontCount={frontCreators.length}
          accent="#C6FF00"
        />
        {normalizedQuery && visibleCreators.length === 0 ? (
          <EmptySearchState query={debouncedQuery} accent="#C6FF00" />
        ) : (
          <CardsGrid>
            {visibleCreators.map((creator, index) => (
              <CreatorCard key={`${creator.name}-${creator.handle}-${index}`} creator={creator} />
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <PlaceholderCard key={`ph-creator-${index}`} type="creator" accent="#C6FF00" />
            ))}
          </CardsGrid>
        )}
      </div>
    </section>
  );
}

function BrandsSection({ brands }: { brands: BrandProfile[] }) {
  const [query, setQuery] = useState('');
  const handleQueryChange = useCallback((next: string) => setQuery(next), []);
  const debouncedQuery = useDebouncedValue(query, 200);
  const normalizedQuery = useMemo(() => normalizeSearchInput(debouncedQuery), [debouncedQuery]);
  const frontBrands = useMemo(() => pickFrontProfiles(brands), [brands]);

  // Precompute searchable terms for all brands
  const preparedBrands = useMemo(() => {
    return brands.map((brand) => {
      const rawFields = [brand.name, brand.brand_type, brand.industry];
      const terms = rawFields.flatMap((field) => toSearchTerms(field));
      return { brand, searchTerms: terms };
    });
  }, [brands]);

  const visibleBrands = useMemo(() => {
    if (!normalizedQuery) return frontBrands;
    const tokens = tokenizeSearchInput(normalizedQuery);
    if (tokens.length === 0) return frontBrands;
    return preparedBrands
      .filter(({ searchTerms }) =>
        tokens.every((token) => searchTerms.some((term) => term.includes(token)))
      )
      .map(({ brand }) => brand);
  }, [preparedBrands, frontBrands, normalizedQuery]);

  const placeholders = normalizedQuery ? 0 : 1;

  return (
    <section id="brands" className="py-16 md:py-20 px-4 md:px-8 border-b-2 border-primary bg-elevated/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Brands"
          count={brands.length}
          accent="#7B61FF"
          icon={<Building2 className="w-5 h-5" />}
          description="Brands finding verified creators the smart way"
        />
        <PerksBox
          perks={brandPerks}
          accent="#7B61FF"
          formType="brand"
          ctaLabel="Join as Brand"
        />
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search brands by name, type, or industry"
          totalCount={brands.length}
          visibleCount={visibleBrands.length}
          frontCount={frontBrands.length}
          accent="#7B61FF"
        />
        {normalizedQuery && visibleBrands.length === 0 ? (
          <EmptySearchState query={debouncedQuery} accent="#7B61FF" />
        ) : (
          <CardsGrid>
            {visibleBrands.map((brand, index) => (
              <BrandCard key={`${brand.name}-${brand.industry}-${index}`} brand={brand} />
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <PlaceholderCard key={`ph-brand-${index}`} type="brand" accent="#7B61FF" />
            ))}
          </CardsGrid>
        )}
      </div>
    </section>
  );
}

function StartupsSection({ startups }: { startups: StartupProfile[] }) {
  const [query, setQuery] = useState('');
  const handleQueryChange = useCallback((next: string) => setQuery(next), []);
  const debouncedQuery = useDebouncedValue(query, 200);
  const normalizedQuery = useMemo(() => normalizeSearchInput(debouncedQuery), [debouncedQuery]);
  const frontStartups = useMemo(() => pickFrontProfiles(startups), [startups]);

  // Precompute searchable terms for all startups
  const preparedStartups = useMemo(() => {
    return startups.map((startup) => {
      const rawFields = [
        startup.name,
        startup.product_category,
        startup.stage,
        startup.collab_type,
      ];
      const terms = rawFields.flatMap((field) => toSearchTerms(field));
      return { startup, searchTerms: terms };
    });
  }, [startups]);

  const visibleStartups = useMemo(() => {
    if (!normalizedQuery) return frontStartups;
    const tokens = tokenizeSearchInput(normalizedQuery);
    if (tokens.length === 0) return frontStartups;
    return preparedStartups
      .filter(({ searchTerms }) =>
        tokens.every((token) => searchTerms.some((term) => term.includes(token)))
      )
      .map(({ startup }) => startup);
  }, [preparedStartups, frontStartups, normalizedQuery]);

  const placeholders = normalizedQuery ? 0 : 1;

  return (
    <section id="startups" className="py-16 md:py-20 px-4 md:px-8 border-b-2 border-primary">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Startups"
          count={startups.length}
          accent="#FF6B2C"
          icon={<Rocket className="w-5 h-5" />}
          description="Startups using creator-led growth and revenue share to scale"
        />

        {/* Revenue share callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mt-6 flex items-center gap-3 border-2 border-orange/40 bg-orange/8 px-4 py-3 self-start"
        >
          <TrendingUp className="w-5 h-5 text-orange shrink-0" />
          <p className="font-body text-sm font-semibold text-secondary">
            <span className="text-primary font-black">Revenue Share model:</span> Startups pay creators
            a % of sales they drive — zero upfront cost. CreLynk tracks every sale.
          </p>
        </motion.div>

        <PerksBox
          perks={startupPerks}
          accent="#FF6B2C"
          formType="startup"
          ctaLabel="Join as Startup"
        />
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search startups by name, category, stage, or collab type"
          totalCount={startups.length}
          visibleCount={visibleStartups.length}
          frontCount={frontStartups.length}
          accent="#FF6B2C"
        />
        {normalizedQuery && visibleStartups.length === 0 ? (
          <EmptySearchState query={debouncedQuery} accent="#FF6B2C" />
        ) : (
          <CardsGrid>
            {visibleStartups.map((startup, index) => (
              <StartupCard key={`${startup.name}-${startup.stage}-${index}`} startup={startup} />
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <PlaceholderCard key={`ph-startup-${index}`} type="startup" accent="#FF6B2C" />
            ))}
          </CardsGrid>
        )}
      </div>
    </section>
  );
}

function LocalitesSection({ localites }: { localites: LocaliteProfile[] }) {
  const [query, setQuery] = useState('');
  const handleQueryChange = useCallback((next: string) => setQuery(next), []);
  const debouncedQuery = useDebouncedValue(query, 200);
  const normalizedQuery = useMemo(() => normalizeSearchInput(debouncedQuery), [debouncedQuery]);
  const frontLocalites = useMemo(() => pickFrontProfiles(localites), [localites]);
  const defaultVisibleLocalites = useMemo(
    () => (frontLocalites.length > 0 ? frontLocalites : localites),
    [frontLocalites, localites],
  );

  // Precompute searchable terms for all localites
  const preparedLocalites = useMemo(() => {
    return localites.map((localite) => {
      const normalizedHandle = normalizeInstagramHandle(localite.instagram_handle);
      const rawFields = [
        localite.business_name,
        localite.owner_name,
        localite.business_category,
        localite.city,
        localite.instagram_handle,
        normalizedHandle ? `@${normalizedHandle}` : null,
        localite.growth_goal,
        localite.monthly_budget,
      ];
      const terms = rawFields.flatMap((field) => toSearchTerms(field));
      return { localite, searchTerms: terms };
    });
  }, [localites]);

  const visibleLocalites = useMemo(() => {
    if (!normalizedQuery) return defaultVisibleLocalites;
    const tokens = tokenizeSearchInput(normalizedQuery);
    if (tokens.length === 0) return defaultVisibleLocalites;
    return preparedLocalites
      .filter(({ searchTerms }) =>
        tokens.every((token) => searchTerms.some((term) => term.includes(token)))
      )
      .map(({ localite }) => localite);
  }, [preparedLocalites, defaultVisibleLocalites, normalizedQuery]);

  const placeholders = normalizedQuery ? 0 : 1;

  return (
    <section id="localites" className="py-16 md:py-20 px-4 md:px-8 border-b-2 border-primary bg-elevated/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Localites"
          count={localites.length}
          accent="#CBD7E2"
          icon={<MapPin className="w-5 h-5" />}
          description="Local businesses launching creator-led campaigns with city-first reach"
        />
        <PerksBox
          perks={localitePerks}
          accent="#CBD7E2"
          formType="localite"
          ctaLabel="Join as Localite"
        />
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          placeholder="Search localites by business, city, category, or owner"
          totalCount={localites.length}
          visibleCount={visibleLocalites.length}
          frontCount={defaultVisibleLocalites.length}
          accent="#CBD7E2"
        />
        {normalizedQuery && visibleLocalites.length === 0 ? (
          <EmptySearchState query={debouncedQuery} accent="#7C8A96" />
        ) : (
          <CardsGrid>
            {visibleLocalites.map((localite, index) => (
              <LocaliteCard
                key={`${localite.business_name}-${localite.city}-${localite.instagram_handle}-${index}`}
                localite={localite}
              />
            ))}
            {Array.from({ length: placeholders }).map((_, index) => (
              <PlaceholderCard key={`ph-localite-${index}`} type="localite" accent="#CBD7E2" />
            ))}
          </CardsGrid>
        )}
      </div>
    </section>
  );
}

// ─── Join CTA ─────────────────────────────────────────────────────────────────

function ProfilesCTA() {
  return (
    <section className="py-20 px-4 md:px-8 bg-primary text-surface">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-surface/40 mb-4">
            Get listed here
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tight text-surface">
            Your Name Could Be{' '}
            <span className="text-lime">
              Right Here
            </span>
          </h2>
          <p className="mt-4 font-body text-base text-surface/60 max-w-lg mx-auto">
            Join the founding community. Get listed on this page and unlock
            founding member benefits before we go live.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <FormTrigger
              formType="creator"
              className="inline-flex items-center gap-2 border-2 border-lime bg-lime px-8 py-4 font-heading font-black uppercase text-base text-primary shadow-[6px_6px_0px_rgba(198,255,0,0.25)] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_rgba(198,255,0,0.25)] transition-all"
            >
              I'm a Creator <ArrowRight className="w-4 h-4" />
            </FormTrigger>
            <FormTrigger
              formType="brand"
              className="inline-flex items-center gap-2 border-2 border-purple bg-purple/20 px-8 py-4 font-heading font-black uppercase text-base text-surface/80 shadow-[6px_6px_0px_rgba(123,97,255,0.2)] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_rgba(123,97,255,0.25)] transition-all"
            >
              I'm a Brand <Building2 className="w-4 h-4" />
            </FormTrigger>
            <FormTrigger
              formType="startup"
              className="inline-flex items-center gap-2 border-2 border-orange bg-orange/20 px-8 py-4 font-heading font-black uppercase text-base text-surface/80 shadow-[6px_6px_0px_rgba(255,107,44,0.2)] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_rgba(255,107,44,0.25)] transition-all"
            >
              I'm a Startup <Rocket className="w-4 h-4" />
            </FormTrigger>
            <FormTrigger
              formType="localite"
              className="inline-flex items-center gap-2 border-2 border-primary bg-surface/70 px-8 py-4 font-heading font-black uppercase text-base text-surface/90 shadow-[6px_6px_0px_rgba(17,17,17,0.2)] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_rgba(17,17,17,0.26)] transition-all"
            >
              I'm a Localite <MapPin className="w-4 h-4" />
            </FormTrigger>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Navbar (profiles-aware) ───────────────────────────────────────────────────

function ProfilesNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'HOME', href: '/' },
    { name: 'BRANDS', href: '/brands' },
    { name: 'CREATORS', href: '/creators' },
    { name: 'LOCALITES', href: '/localites' },
    { name: 'PROFILES', href: '/profiles', active: true },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 h-[72px] md:h-[96px] z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/90 backdrop-blur-md border-b border-primary/10 shadow-sm shadow-primary/5' 
          : 'bg-surface/40 backdrop-blur-sm border-b border-primary/5'
      }`}>
        <div className="flex items-center justify-between h-full w-full px-2 md:px-6 gap-4">
          <div className="flex items-center gap-1.5 md:gap-3 shrink-0 min-w-0">
            <a href="/" className="font-heading font-black text-lg sm:text-2xl md:text-3xl tracking-tight flex items-center gap-1.5 md:gap-4 hover:opacity-80 transition-opacity">
              <img
                src={logoSrc}
                alt="Crelynk Logo"
                className="h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain shrink-0"
                style={{ filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.45)) drop-shadow(2px 3px 5px rgba(0,0,0,0.35))' }}
              />
              <span className="shrink-0">CRE<span className="text-lime text-stroke-1 sm:text-stroke-2">LYNK</span></span>
            </a>
            <div className="flex flex-col shrink-0 pl-1">
              <span className="font-mono text-[5.5px] sm:text-[8px] md:text-[10px] font-bold text-secondary uppercase tracking-wider leading-none">The lynk between</span>
              <span className="font-mono text-[5.5px] sm:text-[8px] md:text-[10px] font-bold text-secondary uppercase tracking-wider leading-none">creators & brands</span>
            </div>
            <div className="flex bg-lime border border-primary px-1 sm:px-1.5 md:px-2 py-0.5 text-[6px] sm:text-[8px] md:text-[10px] font-heading font-bold uppercase rotate-[-3deg] shadow-[2px_2px_0px_#111] shrink-0 translate-y-0.5">
              Early Access
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden lg:flex items-center justify-end gap-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'font-heading font-bold text-sm uppercase tracking-wide pb-0.5 border-b-2 transition-all',
                    link.active
                      ? 'text-purple border-purple'
                      : 'text-primary/70 hover:text-purple border-transparent',
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <button
              className="lg:hidden p-2 hover:bg-elevated transition-colors border-2 border-transparent hover:border-primary"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col pt-6 px-6 pb-24 h-screen border-l-2 border-primary"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-heading font-black text-2xl tracking-tight">
                CRE<span className="text-lime text-stroke-1 sm:text-stroke-2">LYNK</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 border-2 border-primary bg-surface shadow-hard hover:translate-y-0.5 hover:shadow-hard-active transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'font-heading font-bold text-3xl uppercase tracking-tight transition-colors border-b-2 pb-4',
                    link.active 
                      ? 'text-purple border-purple' 
                      : 'hover:text-purple text-primary/70 border-primary/10',
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <Button href="form" formType="creator" onClick={() => setIsOpen(false)} className="w-full justify-center text-lg py-4">
              GET EARLY ACCESS <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export function ProfilesPage() {
  const { creators, brands, startups, localites, loading } = useProfiles();
  const { claimed_spots, brand_spots_claimed, startup_spots_claimed } = useWaitlistStats();
  const creatorsCount = Math.max(creators.length, claimed_spots);
  const brandsCount = Math.max(brands.length, brand_spots_claimed);
  const startupsCount = Math.max(startups.length, startup_spots_claimed);
  const localitesCount = localites.length;

  return (
    <div className="relative min-h-screen">
      <ProfilesNavbar />
      <main className="pt-[72px] md:pt-[96px]">
        <ProfilesHero
          creatorsCount={creatorsCount}
          brandsCount={brandsCount}
          startupsCount={startupsCount}
          localitesCount={localitesCount}
        />

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-flex items-center gap-3 font-mono text-sm font-bold uppercase tracking-wider text-secondary">
              <span className="w-4 h-4 border-2 border-primary border-t-lime animate-spin inline-block" />
              Loading community...
            </div>
          </div>
        ) : (
          <>
            <CreatorsSection creators={creators} />
            <BrandsSection brands={brands} />
            <StartupsSection startups={startups} />
            <LocalitesSection localites={localites} />
            <ProfilesCTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

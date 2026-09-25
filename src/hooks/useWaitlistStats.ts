import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';

type WaitlistStats = {
  claimed_spots: number;
  total_spots: number;
  ambassador_applications_count: number;
  ambassador_total_spots: number;
  brand_spots_claimed: number;
  brand_total_spots: number;
  startup_spots_claimed: number;
  startup_total_spots: number;
};

const DEFAULT_STATS: WaitlistStats = {
  claimed_spots: 347,
  total_spots: 500,
  ambassador_applications_count: 0,
  ambassador_total_spots: 5,
  brand_spots_claimed: 0,
  brand_total_spots: 25,
  startup_spots_claimed: 0,
  startup_total_spots: 50,
};

const WaitlistStatsContext = createContext<WaitlistStats>(DEFAULT_STATS);
let waitlistChannelCounter = 0;

function toNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function useWaitlistStatsState() {
  const [stats, setStats] = useState<WaitlistStats>(DEFAULT_STATS);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    const client = supabase;
    let isMounted = true;

    const mergeStats = (next: Partial<Record<keyof WaitlistStats, unknown>>) => {
      setStats((current) => {
        const merged: WaitlistStats = {
          claimed_spots: toNumber(next.claimed_spots, current.claimed_spots),
          total_spots: toNumber(next.total_spots, current.total_spots),
          ambassador_applications_count: toNumber(
            next.ambassador_applications_count,
            current.ambassador_applications_count
          ),
          ambassador_total_spots: toNumber(next.ambassador_total_spots, current.ambassador_total_spots),
          brand_spots_claimed: toNumber(next.brand_spots_claimed, current.brand_spots_claimed),
          brand_total_spots: toNumber(next.brand_total_spots, current.brand_total_spots),
          startup_spots_claimed: toNumber(next.startup_spots_claimed, current.startup_spots_claimed),
          startup_total_spots: toNumber(next.startup_total_spots, current.startup_total_spots),
        };

        const didChange = (
          merged.claimed_spots !== current.claimed_spots ||
          merged.total_spots !== current.total_spots ||
          merged.ambassador_applications_count !== current.ambassador_applications_count ||
          merged.ambassador_total_spots !== current.ambassador_total_spots ||
          merged.brand_spots_claimed !== current.brand_spots_claimed ||
          merged.brand_total_spots !== current.brand_total_spots ||
          merged.startup_spots_claimed !== current.startup_spots_claimed ||
          merged.startup_total_spots !== current.startup_total_spots
        );

        return didChange ? merged : current;
      });
    };

    const fetchStats = async () => {
      try {
        const { data, error } = await client.from('waitlist_stats').select('*').eq('id', 1).single();

        if (!error && data && isMounted) {
          mergeStats(data);
        }
      } catch (error) {
        console.warn('Failed to load waitlist stats.', error);
      }
    };

    fetchStats();

    const channelName = `public:waitlist_stats:${waitlistChannelCounter++}`;
    const channel = client.channel(channelName);

    channel.on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'waitlist_stats', filter: 'id=eq.1' },
      (payload) => {
        mergeStats((payload.new ?? {}) as Partial<Record<keyof WaitlistStats, unknown>>);
      }
    );

    channel.subscribe((status) => {
      if (status === 'CHANNEL_ERROR') {
        console.warn('Waitlist realtime subscription failed. Falling back to static stats.');
      }
    });

    return () => {
      isMounted = false;
      void client.removeChannel(channel);
    };
  }, []);

  return stats;
}

export function WaitlistStatsProvider({ children }: { children: ReactNode }) {
  const stats = useWaitlistStatsState();

  return createElement(WaitlistStatsContext.Provider, { value: stats }, children);
}

export function useWaitlistStats() {
  return useContext(WaitlistStatsContext);
}

import { Component, Suspense, lazy, type ErrorInfo, type ReactNode, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { FormPanelProvider } from './components/form-panel';
import { WaitlistStatsProvider } from './hooks/useWaitlistStats';
import { OpeningAnimation } from './components/OpeningAnimation';

const isDev = import.meta.env.DEV;

const LandingPage = lazy(() => import('./pages/LandingPage').then((module) => ({ default: module.LandingPage })));
const ProfilesPage = lazy(() => import('./pages/ProfilesPage').then((module) => ({ default: module.ProfilesPage })));
const BrandsPage = lazy(() => import('./pages/BrandsPage').then((module) => ({ default: module.BrandsPage })));
const CreatorsPage = lazy(() => import('./pages/CreatorsPage').then((module) => ({ default: module.CreatorsPage })));
const AmbassadorsPage = lazy(() => import('./pages/AmbassadorsPage').then((module) => ({ default: module.AmbassadorsPage })));
const LocalitesPage = lazy(() => import('./pages/LocalitesPage').then((module) => ({ default: module.LocalitesPage })));

const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((module) => ({ default: module.TermsPage })));
const DataDeletionPage = lazy(() => import('./pages/DataDeletionPage').then((module) => ({ default: module.DataDeletionPage })));

type ErrorBoundaryState = {
  error: Error | null;
  info: ErrorInfo | null;
};

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error,
      info: null,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render failed', error, info);
    this.setState({
      error,
      info,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-background p-6 text-primary">
          <h1 className="mb-4 font-heading text-3xl font-black uppercase">Render Error</h1>
          <p className="mb-4 max-w-3xl font-body text-lg font-medium">
            Something went wrong while loading the landing page. Refresh once after checking your frontend and Supabase configuration.
          </p>
          <div className="mb-4 border-2 border-primary bg-surface p-4 text-base font-semibold">
            {this.state.error.message}
          </div>
          {isDev ? (
            <pre className="overflow-auto border-2 border-primary bg-surface p-4 text-sm whitespace-pre-wrap">
              {this.state.info?.componentStack || 'No component stack available.'}
            </pre>
          ) : null}
        </div>
      );
    }

    return this.props.children;
  }
}

function RouteFallback() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="grid min-h-screen place-items-center bg-background px-4 py-16 text-primary md:px-8"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/20 bg-surface/95 shadow-soft">
        <Loader2 className="h-12 w-12 animate-spin text-primary" aria-label="Loading" />
      </div>
    </motion.div>
  );
}

const HAS_SEEN_OPENING_KEY = 'crelynk_has_seen_opening';

function App() {
  const [showOpening, setShowOpening] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem(HAS_SEEN_OPENING_KEY);
    }
    return true;
  });

  const handleOpeningComplete = () => {
    sessionStorage.setItem(HAS_SEEN_OPENING_KEY, 'true');
    setShowOpening(false);
  };

  useEffect(() => {
    if (showOpening) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOpening]);

  const pathname = window.location.pathname.toLowerCase();
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname || '/';

  let page = <LandingPage />;
  if (normalizedPath === '/profiles') {
    page = <ProfilesPage />;
  } else if (normalizedPath === '/brands') {
    page = <BrandsPage />;
  } else if (normalizedPath === '/creators') {
    page = <CreatorsPage />;
  } else if (normalizedPath === '/ambassadors' || normalizedPath === '/ambassador') {
    page = <AmbassadorsPage />;
  } else if (normalizedPath === '/localites' || normalizedPath === '/localite') {
    page = <LocalitesPage />;
  } else if (normalizedPath === '/privacy' || normalizedPath === '/privacy-policy') {
    page = <PrivacyPage />;
  } else if (normalizedPath === '/terms' || normalizedPath === '/terms-of-service') {
    page = <TermsPage />;
  } else if (normalizedPath === '/data-deletion' || normalizedPath === '/data-deletion-instructions' || normalizedPath === '/deletion') {
    page = <DataDeletionPage />;
  }

  return (
    <AppErrorBoundary>
      <WaitlistStatsProvider>
        <FormPanelProvider>
          <Suspense fallback={<RouteFallback />}>
            {page}
          </Suspense>
          {showOpening && <OpeningAnimation onComplete={handleOpeningComplete} />}
        </FormPanelProvider>
      </WaitlistStatsProvider>
    </AppErrorBoundary>
  );
}

export default App;

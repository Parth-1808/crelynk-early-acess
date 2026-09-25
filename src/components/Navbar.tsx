import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui';
import logoSrc from '../assets/Untitled design (1)-Photoroom.png';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = window.location.pathname.toLowerCase();
  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const currentPath = normalizedPath || '/';

  const links = [
    { name: 'HOME', href: '/' },
    { name: 'BRANDS', href: '/brands' },
    { name: 'CREATORS', href: '/creators' },
    { name: 'AMBASSADORS', href: '/ambassadors' },
    { name: 'LOCALITES', href: '/localites' },
    { name: "PROFILES", href: "/profiles" },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/localites') {
      return currentPath === '/localites' || currentPath === '/localite';
    }

    if (href === '/ambassadors') {
      return currentPath === '/ambassadors' || currentPath === '/ambassador';
    }

    return currentPath === href;
  };

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

          <div className="ml-auto mr-4 lg:mr-12 flex items-center gap-4">
            <div className="hidden lg:flex items-center justify-end gap-8">
              {links.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`font-heading font-bold text-sm transition-colors uppercase tracking-wide pb-0.5 border-b-2 ${
                    isActiveLink(link.href) 
                      ? 'text-purple border-purple' 
                      : 'text-primary/70 hover:text-purple border-transparent'
                  }`}
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

      {/* Mobile Menu */}
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
                  className={`font-heading font-bold text-3xl uppercase tracking-tight transition-colors border-b-2 pb-4 ${
                    isActiveLink(link.href) ? 'text-purple border-purple' : 'hover:text-purple text-primary/70 border-primary/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <Button href="type-selector" onClick={() => setIsOpen(false)} className="w-full justify-center text-lg py-4">
              GET EARLY ACCESS <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Navbar } from '../components/Navbar';
import { Footer } from '../sections/Footer';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { Ambassador } from '../sections/Ambassador';

export function AmbassadorsPage() {
  return (
    <div className="relative min-h-screen bg-[#fff7e8] text-[#111]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,45,120,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(0,217,255,0.12),transparent_24%)]" />
      <Navbar />
      <main className="relative pt-[72px] md:pt-[96px]">
        <Ambassador />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import ScrollExpandMedia from '@/components/blocks/scroll-expansion-hero';
import Services from '@/components/sections/Services';
import Packages from '@/components/sections/Packages';
import Music from '@/components/sections/Music';
import WhyBook from '@/components/sections/WhyBook';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import BookingCalendar from '@/components/sections/BookingCalendar';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

/* ─────────────────────────  EDIT HERO  ───────────────────────── */
const HERO = {
  videoSrc:    'https://base44.app/api/apps/6964abb7f5eb650a639257de/files/mp/public/6964abb7f5eb650a639257de/7c1f79c58_Flying_drone_from_image_to_202605091023.mp4',
  bgImageSrc:  '/hero-bg.png',
};
/* ──────────────────────────────────────────────────────────────── */

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* === Cinematic scroll-expansion hero === */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={HERO.videoSrc}
        bgImageSrc={HERO.bgImageSrc}
      >
        {/* Empty children — sections live below the hero */}
        <></>
      </ScrollExpandMedia>

      {/* === All sections live BELOW the hero, revealed after expansion === */}
      <Services />
      <Packages />
      <Music />
      <WhyBook />
      <Gallery />
      <Testimonials />
      <BookingCalendar />
      <FAQ />
      <Footer />
    </main>
  );
}

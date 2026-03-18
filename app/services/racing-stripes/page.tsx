'use client';

import Link from 'next/link';
import RacingStripesScene from '@/components/scenes/RacingStripesScene';

export default function RacingStripesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <section className="container mx-auto px-6 py-8">
        <RacingStripesScene />
        <div className="mt-12 max-w-xl">
          <nav className="text-xs uppercase tracking-widest text-[#C8A96E] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="hover:underline">Services</Link>
          </nav>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wide text-white mb-4">
            RACING STRIPES
          </h1>
          <p className="text-[#888] text-sm leading-relaxed uppercase tracking-wider">
            Expertly applied racing stripes to instantly transform your vehicle with a bold, unique look.
          </p>
        </div>
      </section>
    </main>
  );
}

'use client';

import Link from 'next/link';
import GalaxyScene from '@/components/scenes/GalaxyScene';

export default function GalaxyCeilingsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <section className="relative w-full">
        <GalaxyScene />
        <div className="absolute bottom-12 left-[6%] z-10">
          <nav className="text-xs uppercase tracking-widest text-[#C8A96E] mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="hover:underline">Services</Link>
          </nav>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wide text-white">
            GALAXY CEILINGS
          </h1>
        </div>
      </section>
    </main>
  );
}

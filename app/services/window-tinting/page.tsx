'use client';

import Link from 'next/link';
import WindowTintScene from '@/components/scenes/WindowTintScene';

export default function WindowTintingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <section className="service-hero container mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 max-w-xl">
          <nav className="text-xs uppercase tracking-widest text-[#C8A96E] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#services" className="hover:underline">Services</Link>
          </nav>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl tracking-wide text-white mb-4">
            WINDOW TINTING
          </h1>
          <p className="text-[#888] text-sm leading-relaxed uppercase tracking-wider mb-6">
            Solar heat reduction, privacy, glare elimination. Professional film application to all vehicle window types.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 text-xs uppercase tracking-widest border border-[#C8A96E] text-[#C8A96E] hover:bg-[#C8A96E] hover:text-[#0A0A0A] transition-colors"
          >
            Get a Quote
          </Link>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <WindowTintScene />
        </div>
      </section>
    </main>
  );
}

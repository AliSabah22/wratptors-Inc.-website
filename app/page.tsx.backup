'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import Stats from '@/components/Stats';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
import About from '@/components/About';
import Services from '@/components/Services';
import Locations from '@/components/Locations';
import Reviews from '@/components/Reviews';
import Financing from '@/components/Financing';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import { useReveal } from '@/hooks/useReveal';

declare global {
  interface Window {
    heroCarModel?: unknown;
    rimModel?: unknown;
    caliperModel?: unknown;
    cardModel?: unknown;
    trophyModel?: unknown;
  }
}

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  const onLoaderFinish = useCallback(() => {
    setLoaderDone(true);
  }, []);

  useReveal(loaderDone);

  useEffect(() => {
    const t = setTimeout(() => {
      console.log('=== WRAPTORS 3D STATUS ===');
      console.log('Hero car:', window.heroCarModel ? 'LOADED' : 'MISSING');
      console.log('Rim:', window.rimModel ? 'LOADED' : 'MISSING');
      console.log('Caliper:', window.caliperModel ? 'LOADED' : 'MISSING');
      console.log('Credit card:', window.cardModel ? 'LOADED' : 'MISSING');
      console.log('Trophy:', window.trophyModel ? 'LOADED' : 'MISSING');
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <CustomCursor />
      <Loader onFinish={onLoaderFinish} />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Locations />
        <Reviews />
        <Financing />
        <Partners />
        <Contact />
      </main>
    </>
  );
}

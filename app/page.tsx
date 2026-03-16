'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Stats from '@/components/Stats';

const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
import About from '@/components/About';
import Services from '@/components/Services';
import Locations from '@/components/Locations';
import Reviews from '@/components/Reviews';
import Financing from '@/components/Financing';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  const onLoaderFinish = useCallback(() => {
    setLoaderDone(true);
  }, []);

  useReveal(loaderDone);

  return (
    <>
      <CustomCursor />
      <Loader onFinish={onLoaderFinish} />
      <Nav />
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
        <Footer />
      </main>
    </>
  );
}

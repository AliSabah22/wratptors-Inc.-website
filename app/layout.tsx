import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: "Wraptors Inc. — World's Largest Vehicle Wrap Shop",
  description:
    "The world's largest and most experienced vehicle wrap shop. 13 locations. 9,000+ vehicles wrapped. Vinyl wraps, PPF, tinting, detailing, custom interiors.",
  openGraph: {
    title: "Wraptors Inc. — World's Largest Vehicle Wrap Shop",
    description:
      "The world's largest and most experienced vehicle wrap shop. 13 locations. 9,000+ vehicles wrapped.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

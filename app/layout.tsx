import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/src/components/animations/PageTransition';

export const metadata: Metadata = {
  title: "Wraptors Inc. — World's Largest Vehicle Wrap Shop",
  description:
    "Rated number one car boutique. 13 locations across Canada, USA and South Africa. Over 9,000 vehicles wrapped. Vehicle wrapping, PPF, window tinting, detailing and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}

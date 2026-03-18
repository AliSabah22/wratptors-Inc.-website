import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wraptors Inc. — The World's Largest Vehicle Wrap Shop",
  description:
    "Premium vehicle wraps, paint protection film, tinting, detailing and more. 13 global locations. 9,000+ vehicles wrapped. Zero compromises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

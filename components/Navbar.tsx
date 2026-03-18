"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT_INFO, SERVICES } from "@/src/data/content";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Franchises", href: "/franchises" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "Articles", href: "/articles" },
  { label: "Blog", href: "/blog" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // close mobile menu on route change
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Top utility bar (desktop) */}
      <div className="hidden md:flex fixed top-0 inset-x-0 z-40 h-9 items-center justify-between bg-black/80 backdrop-blur border-b border-tsborder px-[6%] text-[11px] tracking-[0.25em] uppercase text-tsmuted">
        <a
          href={CONTACT_INFO.phoneHref}
          className="hover:text-tsgold transition-colors"
        >
          {CONTACT_INFO.phone}
        </a>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="hover:text-tsgold transition-colors"
          >
            {CONTACT_INFO.email}
          </a>
          <Link
            href="/contact"
            className="px-4 py-1 rounded-full bg-tsgold text-tsblack hover:bg-white transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`fixed inset-x-0 z-50 transition-all ${
          scrolled ? "bg-tssurface/90 backdrop-blur border-b border-tsborder" : ""
        } ${"mt-0 md:mt-9"}`}
      >
        <div className="flex items-center justify-between px-[6%] py-4 md:py-3">
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-[0.35em] text-tsgold"
          >
            WRAPTORS
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  isActive(link.href) ? "text-tsgold" : "text-tsmuted"
                } hover:text-tsoffwhite`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT_INFO.shop}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] tracking-[0.25em] uppercase text-tsmuted hover:text-tsoffwhite transition-colors"
            >
              Shop
            </a>
            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 rounded-full bg-tsgold text-tsblack text-[11px] tracking-[0.25em] uppercase hover:bg-white transition-colors"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile button */}
          <button
            className="lg:hidden inline-flex flex-col justify-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-[1px] w-6 bg-tsoffwhite transition-transform ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1px] w-6 bg-tsoffwhite transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[1px] w-6 bg-tsoffwhite transition-transform ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Simple services mega dropdown placeholder on desktop (hover via CSS in future) */}
        <div className="hidden lg:block border-t border-tsborder/70 bg-tsblack/95">
          <div className="px-[6%] py-2 text-[10px] tracking-[0.25em] uppercase text-tsmuted">
            <span className="mr-4 text-tsgold">Key Services:</span>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="mr-4 hover:text-tsgold transition-colors"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile full screen menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-tsblack/95 backdrop-blur flex flex-col items-center justify-center gap-6">
          <nav className="flex flex-col items-center gap-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-3xl tracking-[0.3em] uppercase ${
                  isActive(link.href) ? "text-tsgold" : "text-tsoffwhite"
                } hover:text-tsgold transition-colors`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={CONTACT_INFO.shop}
              target="_blank"
              rel="noreferrer"
              className="font-display text-2xl tracking-[0.3em] uppercase text-tsmuted hover:text-tsgold transition-colors mt-4"
            >
              Shop
            </a>
          </nav>
        </div>
      )}
    </>
  );
}


import Image from 'next/image';
import Link from 'next/link';
import PartnerLogos from '@/components/PartnerLogos';

export const metadata = {
  title: 'Our Services | Wraptors Inc.',
};

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=';

type HubService = {
  slug: string;
  layout: 'image-left' | 'image-right';
  imageUrl: string;
  imageAlt: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

const SERVICES: HubService[] = [
  {
    slug: 'vehicle-wrapping',
    layout: 'image-left',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-wrapping.jpg',
    imageAlt: 'Vehicle Wrapping - Wraptors',
    heading: 'VEHICLE WRAPPING',
    body: 'We have gained a vast knowledge on vehicle wraps and\ncan offer our customers the best vehicle wrap solutions with\ntop-notch production and installation. Our team of experts\ncan create stunning vehicle wraps for any vehicle type or\nsize, from cars to boats and trucks.',
    ctaLabel: 'Read About Vehicle Wrapping',
    ctaHref: '/services/vehicle-wrapping',
  },
  {
    slug: 'auto-detailing',
    layout: 'image-right',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-detailing.jpg',
    imageAlt: 'Auto Detailing - Wraptors',
    heading: 'AUTO DETAILING',
    body: 'We offer a wide range of automotive detailing products\nand services. Our standard detailing package covers both\ninterior and exterior auto detailing and will restore your\ncar to its former showroom condition.',
    ctaLabel: 'Read About Auto Detailing',
    ctaHref: '/services/auto-detailing',
  },
  {
    slug: 'window-tinting',
    layout: 'image-left',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-tinting.jpg',
    imageAlt: 'Window Tinting - Wraptors',
    heading: 'WINDOW TINTING',
    body: 'Window tinting is the application of film to the\ninside or your vehicle\'s windows. Solar heat reduction,\nprivacy, and glare reduction are just some of the benefits\nto having your windows tinted.',
    ctaLabel: 'Read About Window Tinting',
    ctaHref: '/services/window-tinting',
  },
  {
    slug: 'paint-protection',
    layout: 'image-right',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-ppf.jpg',
    imageAlt: 'Paint Protection Film (PPF) - Wraptors',
    heading: 'PAINT PROTECTION FILM (PPF)',
    body: 'No matter what you call it – Clear Bra, Rock Guard,\nHood Film, Bumper Cover or Protective Film – paint protection\nfilm is the clear choice to protect your vehicle from chips,\nscratches and stains.',
    ctaLabel: 'Read About Paint Protection',
    ctaHref: '/services/paint-protection',
  },
  {
    slug: 'custom-interior',
    layout: 'image-left',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-interior.jpg',
    imageAlt: 'Custom Interior - Wraptors',
    heading: 'CUSTOM INTERIOR',
    body: 'We start from scratch with each of our clients laying\nout the design process, art work & material selection. We\nhand make each floor mat with meticulous attention to detail\nand thoroughly inspect them to ensure top quality.',
    ctaLabel: 'Read About Custom Interior',
    ctaHref: '/services/custom-interior',
  },
  {
    slug: 'starlight-headliner',
    layout: 'image-right',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-headliner.jpg',
    imageAlt: 'Starlight Headliner - Wraptors',
    heading: 'STARLIGHT HEADLINER',
    body: 'The Starlight Headliner is a custom service that will\ntransform a car\'s roof interior into a magnificent display\nof a star-filled night sky.',
    ctaLabel: 'Read About Starlight Headliner',
    ctaHref: '/services/starlight-headliner',
  },
  {
    slug: 'racing-stripes',
    layout: 'image-left',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-racing-stripes.jpg',
    imageAlt: 'Racing Stripes – Wraptors',
    heading: 'RACING STRIPES',
    body: 'At Wraptors, racing stripes are our specialty,\nexpertly applied racing stripes will transform your vehicle\nand give it an instant unique look.',
    ctaLabel: 'Read About Racing Stripes',
    ctaHref: '/services/racing-stripes',
  },
  {
    slug: 'galaxy-ceilings',
    layout: 'image-right',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-galaxy-ceilings.jpg',
    imageAlt: 'Galaxy Ceilings – Wraptors',
    heading: 'GALAXY CEILINGS',
    body: 'Our unique Galaxy Ceiling service turns the internal\nceiling of your ride into an eye-catching design feature to\nrecreate a starry night look.',
    ctaLabel: 'Read About Galaxy Ceilings',
    ctaHref: '/services/galaxy-ceilings',
  },
  {
    slug: 'decals',
    layout: 'image-left',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-galaxy-decals.jpg',
    imageAlt: 'Decals - Wraptors',
    heading: 'DECALS',
    body: 'Our experienced team can source and apply your choice\nof decal, or design something from scratch using only the\nbest quality materials.',
    ctaLabel: 'Read About Decals',
    ctaHref: '/services/decals',
  },
  {
    slug: 'caliper-painting',
    layout: 'image-right',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-caliper-painting.jpg',
    imageAlt: 'Caliper Painting - Wraptors',
    heading: 'CALIPER PAINTING',
    body: 'At Wraptors, we specialize in painting brake calipers\n expertly. We can paint your calipers to match an existing\nbody style or total restyling.',
    ctaLabel: 'Read About Caliper Painting',
    ctaHref: '/services/caliper-painting',
  },
  {
    slug: 'wheel-painting',
    layout: 'image-left',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-wheel-painting.jpg',
    imageAlt: 'Wheel Painting – Wraptors',
    heading: 'WHEEL PAINTING',
    body: 'We can paint wheels of all sizes, makes and models\nusing only premium products, and we\'ve got the biggest range of\ncolors in the business.',
    ctaLabel: 'Read About Wheel Painting',
    ctaHref: '/services/wheel-painting',
  },
];

function HubSectionTag() {
  return (
    <div
      style={{
        fontSize: 10,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      WHAT WE DO
    </div>
  );
}

export default function ServicesHubPage() {
  const fontBebas = { fontFamily: "'Bebas Neue', sans-serif" };
  const fontDM = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)' }}>
      {/* PAGE HERO */}
      <section style={{ padding: '7rem 8%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              ...fontDM,
              fontSize: 10,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            Home → Services
          </div>
          <div style={{ marginTop: 20 }}>
            <HubSectionTag />
          </div>
          <h1
            style={{
              ...fontBebas,
              fontSize: 'clamp(3rem, 5vw, 6rem)',
              lineHeight: 0.88,
              marginTop: 10,
            }}
          >
            SERVICES
          </h1>

          <p
            style={{
              ...fontDM,
              color: 'var(--muted)',
              lineHeight: 2.0,
              marginTop: 18,
              whiteSpace: 'pre-line',
            }}
          >
            Wraptors is the premier destination for automotive
            customization. With over 13 locations around the world,
            Wraptors has become a go-to for celebrities, athletes,
            and superstars alike. Our services include Vehicle Wraps,
            Ceramic Coating, PPF, Starlight, Rims, Tinting, and Full
            Vehicle Customization – all backed by our 5 year warranty.
            Experience the luxury of Wraptors today.
          </p>
          <p
            style={{
              ...fontDM,
              color: 'var(--muted)',
              lineHeight: 2.0,
              marginTop: 18,
              whiteSpace: 'pre-line',
            }}
          >
            Transform your car with our range of car wraps, ceramic
            coating, paint protection film, starlight and tinting
            services. Our experienced team of professionals will help
            you customize your vehicle to make it look and feel like
            new. We use only the highest quality materials to ensure
            a long-lasting finish.
          </p>
        </div>
      </section>

      {/* ALL 11 SERVICES */}
      <section style={{ padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 48 }}>
          {SERVICES.map((s) => {
            const imageFirst = s.layout === 'image-left';
            return (
              <div
                key={s.slug}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 48,
                  alignItems: 'center',
                }}
              >
                {imageFirst ? (
                  <>
                    <div style={{ position: 'relative', minHeight: 360 }}>
                      <Image
                        src={s.imageUrl}
                        alt={s.imageAlt}
                        fill
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        unoptimized={false}
                        sizes="(max-width: 768px) 100vw, 700px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '1.5rem 0' }}>
                      <h2
                        style={{
                          ...fontBebas,
                          color: 'var(--white)',
                          fontSize: 'clamp(2.2rem, 3.6vw, 4rem)',
                          lineHeight: 0.9,
                        }}
                      >
                        {s.heading}
                      </h2>
                      <p
                        style={{
                          ...fontDM,
                          color: 'var(--muted)',
                          lineHeight: 2.0,
                          marginTop: 16,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {s.body}
                      </p>
                      <div style={{ marginTop: 22 }}>
                        <Link
                          href={s.ctaHref}
                          style={{
                            color: 'var(--gold)',
                            fontFamily: "'DM Sans', sans-serif",
                            textDecoration: 'none',
                            fontSize: 12,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            borderBottom: '1px solid rgba(200,169,110,0.25)',
                            paddingBottom: 4,
                          }}
                        >
                          {s.ctaLabel} <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ padding: '1.5rem 0' }}>
                      <h2
                        style={{
                          ...fontBebas,
                          color: 'var(--white)',
                          fontSize: 'clamp(2.2rem, 3.6vw, 4rem)',
                          lineHeight: 0.9,
                        }}
                      >
                        {s.heading}
                      </h2>
                      <p
                        style={{
                          ...fontDM,
                          color: 'var(--muted)',
                          lineHeight: 2.0,
                          marginTop: 16,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {s.body}
                      </p>
                      <div style={{ marginTop: 22 }}>
                        <Link
                          href={s.ctaHref}
                          style={{
                            color: 'var(--gold)',
                            fontFamily: "'DM Sans', sans-serif",
                            textDecoration: 'none',
                            fontSize: 12,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            borderBottom: '1px solid rgba(200,169,110,0.25)',
                            paddingBottom: 4,
                          }}
                        >
                          {s.ctaLabel} <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                    <div style={{ position: 'relative', minHeight: 360 }}>
                      <Image
                        src={s.imageUrl}
                        alt={s.imageAlt}
                        fill
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                        unoptimized={false}
                        sizes="(max-width: 768px) 100vw, 700px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <PartnerLogos />
    </div>
  );
}



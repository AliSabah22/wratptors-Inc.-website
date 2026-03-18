import Image from 'next/image';
import Link from 'next/link';

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=';

const PARTNERS: Array<{ name: string; href: string; imageUrl?: string }> = [
  { name: '3M', href: 'https://www.3m.com' },
  { name: 'Avery Dennison', href: 'https://www.averydennison.com' },
  { name: 'Hexis', href: 'https://www.hexis-graphics.com/us' },
  { name: 'Suntek', href: 'https://suntekfilms.com' },
  { name: 'STEK', href: 'https://www.stek-usa.com' },
  {
    name: 'Wraptors Mafia',
    href: 'https://wraptorsmafia.com',
    imageUrl: 'https://www.wraptorsinc.com/wp-content/uploads/2023/03/partner-mafia.jpg',
  },
];

export default function PartnerLogos() {
  return (
    <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            fontFamily: "'DM Sans', sans-serif",
            opacity: 0.95,
          }}
        >
          CERTIFIED MATERIAL PARTNERS
        </div>

        <div
          style={{
            marginTop: 26,
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            flexWrap: 'wrap',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#666',
                fontSize: 13,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {p.imageUrl ? (
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={110}
                  height={28}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  unoptimized={false}
                  style={{ objectFit: 'contain' }}
                />
              ) : (
                p.name
              )}
            </a>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <a
            href="https://preferredmechanic.ca/auto-detailing-centers/mississauga-on/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://preferredmechanic.ca/awards/2024/9/97/ade8a673672f0e4c3da3fa6706f04979/BestOf-Mississauga-i150-2024.svg"
              alt="Best of Mississauga 2024 - Exterior & Interior Car Detailing"
              width={80}
              height={80}
              placeholder="blur"
              blurDataURL={blurDataURL}
              unoptimized={false}
              style={{ width: 80, height: 80 }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}


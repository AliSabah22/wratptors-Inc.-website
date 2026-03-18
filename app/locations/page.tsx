import Link from 'next/link';
import { LOCATIONS } from '@/src/data/content';
import LocationCard from '@/components/LocationCard';
import PartnerLogos from '@/components/PartnerLogos';
import FadeUp from '@/src/components/animations/FadeUp';

export const metadata = {
  title: 'Our 13 Global Locations | Wraptors Inc.',
};

const CANADA = LOCATIONS.filter((l) => l.region === 'Canada');
const USA = LOCATIONS.filter((l) => l.region === 'USA');
const SOUTH_AFRICA = LOCATIONS.filter((l) => l.region === 'South Africa');

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 9,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        paddingBottom: '1rem',
        borderBottom: '1px solid #222',
        marginBottom: '1.5rem',
        borderLeft: '2px solid #C8A96E',
        paddingLeft: 12,
      }}
    >
      {children}
    </div>
  );
}

export default function LocationsPage() {
  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh' }}>
      {/* PAGE HERO */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '7rem 8%',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(12rem, 25vw, 28rem)',
            lineHeight: 1,
            color: '#fff',
            opacity: 0.03,
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          13
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            Home → Locations
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginTop: 12,
            }}
          >
            FIND US
          </div>
          <FadeUp>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3.5rem, 8vw, 9rem)',
                lineHeight: 0.88,
                marginTop: 10,
                letterSpacing: '0.02em',
              }}
            >
              OUR LOCATIONS
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'var(--muted)',
                fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                marginTop: 14,
                lineHeight: 1.6,
              }}
            >
              13 locations across Canada, the United States
              <br />
              and South Africa
            </p>
          </FadeUp>
        </div>
      </section>

      {/* STATS ROW */}
      <section style={{ padding: '3rem 8%' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="locations-stats-grid"
        >
          <style>{`
            @media (max-width: 768px) {
              .locations-stats-grid { grid-template-columns: repeat(2, 1fr); }
            }
          `}</style>
          {[
            { value: '11', label: 'Canadian Locations' },
            { value: '2', label: 'US Locations' },
            { value: '1', label: 'South Africa' },
            { value: '13', label: 'Worldwide Total' },
          ].map(({ value, label }, i) => (
            <FadeUp key={label} delay={0.1 + i * 0.05}>
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: '1.5rem 1.25rem',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    color: 'var(--gold)',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    marginTop: 8,
                  }}
                >
                  {label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* SECTION 1 — CANADA */}
      <section style={{ padding: '0 8% 4rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <FadeUp>
            <SectionLabel>CANADA — 11 LOCATIONS</SectionLabel>
          </FadeUp>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              background: '#222',
            }}
            className="locations-canada-grid"
          >
            <style>{`
              @media (max-width: 900px) {
                .locations-canada-grid { grid-template-columns: repeat(2, 1fr); }
              }
              @media (max-width: 600px) {
                .locations-canada-grid { grid-template-columns: 1fr; }
              }
            `}</style>
            {CANADA.map((loc, i) => (
              <FadeUp key={loc.city + loc.address} delay={0.04 * i}>
                <LocationCard
                  city={loc.city}
                  address={loc.address}
                  phone={loc.phone}
                  phoneHref={loc.phoneHref}
                  email={loc.email}
                  website={loc.website}
                  websiteHref={loc.websiteHref}
                  isHQ={loc.isHQ}
                  mapsHref={loc.mapsHref}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — USA */}
      <section style={{ padding: '0 8% 4rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <FadeUp>
            <SectionLabel>UNITED STATES — 2 LOCATIONS</SectionLabel>
          </FadeUp>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 1,
              background: '#222',
            }}
            className="locations-usa-grid"
          >
            <style>{`
              @media (max-width: 600px) {
                .locations-usa-grid { grid-template-columns: 1fr; }
              }
            `}</style>
            {USA.map((loc, i) => (
              <FadeUp key={loc.city + loc.address} delay={0.1 + 0.1 * i}>
                <LocationCard
                  city={loc.city}
                  address={loc.address}
                  phone={loc.phone}
                  phoneHref={loc.phoneHref}
                  email={loc.email}
                  website={loc.website}
                  websiteHref={loc.websiteHref}
                  isHQ={loc.isHQ}
                  mapsHref={loc.mapsHref}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOUTH AFRICA */}
      <section style={{ padding: '0 8% 4rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <FadeUp>
            <SectionLabel>SOUTH AFRICA — 1 LOCATION</SectionLabel>
          </FadeUp>
          <div style={{ maxWidth: 400 }}>
            {SOUTH_AFRICA.map((loc) => (
              <FadeUp key={loc.city + loc.address} delay={0.1}>
                <LocationCard
                  city={loc.city}
                  address={loc.address}
                  phone={loc.phone}
                  phoneHref={loc.phoneHref}
                  email={loc.email}
                  website={loc.website}
                  websiteHref={loc.websiteHref}
                  isHQ={loc.isHQ}
                  mapsHref={loc.mapsHref}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — FRANCHISE CTA */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '5rem 8%',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '0.04em',
              color: 'var(--white)',
              lineHeight: 1,
            }}
          >
            DON&apos;T SEE YOUR CITY?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--muted)',
              lineHeight: 1.9,
              marginTop: 18,
              fontSize: 15,
            }}
          >
            We&apos;re expanding. New Wraptors locations are opening across North America, with 50 US
            franchise locations planned. Get in touch to bring Wraptors to your city.
          </p>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href="/contact"
              className="btn-gold"
              style={{ display: 'inline-block', textDecoration: 'none' }}
            >
              GET A QUOTE
            </Link>
            <Link
              href="/franchises"
              style={{
                display: 'inline-block',
                padding: '14px 24px',
                border: '1px solid #C8A96E',
                color: '#C8A96E',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background 200ms, color 200ms',
              }}
              className="locations-franchise-outline"
            >
              FRANCHISE OPPORTUNITIES
            </Link>
          </div>
          <style>{`
            .locations-franchise-outline:hover {
              background: rgba(200, 169, 110, 0.15);
              color: #C8A96E;
            }
          `}</style>
        </div>
      </section>

      {/* SECTION 5 — PARTNER LOGOS */}
      <PartnerLogos logoImageHeight={40} />

      {/* MAILING LIST */}
      <section style={{ padding: '5rem 8%', background: '#0A0A0A' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: 'var(--gold)',
              fontSize: 'clamp(2rem, 3vw, 2.5rem)',
              letterSpacing: '0.04em',
            }}
          >
            JOIN OUR MAILING LIST
          </div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--muted)',
              marginTop: 8,
              fontSize: 14,
            }}
          >
            Stay up to date with our Latest Releases and Promotions.
          </div>
          <form
            style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
            method="post"
          >
            <input
              type="text"
              name="_honey"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--white)',
                padding: '14px 16px',
                width: 320,
                outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{
                padding: '14px 24px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

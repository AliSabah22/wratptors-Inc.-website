/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import FadeUp from '@/src/components/animations/FadeUp';
import SlideIn from '@/src/components/animations/SlideIn';

export const metadata = {
  title: "About Wraptors | World's Largest Vehicle Wrap Shop",
};

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.5 8.25C16.5 7.55964 15.9404 7 15.25 7C14.5596 7 14 7.55964 14 8.25C14 8.94036 14.5596 9.5 15.25 9.5C15.9404 9.5 16.5 8.94036 16.5 8.25Z"
        fill="currentColor"
      />
      <path
        d="M7.5 3.5H16.5C18.7091 3.5 20.5 5.29086 20.5 7.5V16.5C20.5 18.7091 18.7091 20.5 16.5 20.5H7.5C5.29086 20.5 3.5 18.7091 3.5 16.5V7.5C3.5 5.29086 5.29086 3.5 7.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 10,
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'var(--gold)',
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const fontBebas: React.CSSProperties = { fontFamily: "'Bebas Neue', sans-serif" };
  const fontDM: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <div>
      {/* SECTION 1 — PAGE HERO */}
      <section
        style={{
          background: '#0A0A0A',
          padding: '7rem 8%',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.2 }}>
          <Image
            src="https://www.wraptorsinc.com/wp-content/uploads/2023/02/about-feature1.jpg"
            alt="About Wraptors Background"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
            style={{ objectFit: 'cover' }}
            unoptimized={false}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>
          <FadeUp delay={0}>
            <SectionTag>WHO WE ARE</SectionTag>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              style={{
                ...fontBebas,
                fontSize: 'clamp(5rem, 9vw, 11rem)',
                letterSpacing: '0.01em',
                lineHeight: 0.85,
                color: 'var(--white)',
                marginTop: '1.25rem',
              }}
            >
              ABOUT WRAPTORS
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div
              style={{
                marginTop: '0.75rem',
                fontSize: 10,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                ...fontDM,
              }}
            >
              Home / About
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — RATED NUMBER ONE */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'stretch' }}>
          <SlideIn direction="left" delay={0.1}>
          <div style={{ padding: '2rem 0' }}>
            <h2 style={{ ...fontBebas, fontSize: 'clamp(3rem, 5vw, 6rem)', lineHeight: 0.88, color: 'var(--white)' }}>
              WRAPTORS RATED NUMBER ONE CAR BOUTIQUE
            </h2>
            <p style={{ ...fontDM, marginTop: 16, color: 'var(--muted)', lineHeight: 2.0 }}>
              There's nothing like wrapping your car in a design that sets you apart
              from the crowd. Whether it's customizing your car for advertisement or
              personalization, wrapping is the way forward.
            </p>
            <p style={{ ...fontDM, marginTop: 16, color: 'var(--muted)', lineHeight: 2.0 }}>
              But not all wrap shops are created equal. There are some that offer
              exceptional customer experience and quality work. Wraptors is one such
              car wrap shop based in Canada, USA, and now in South Africa Cape Town,
              that offers a wide variety of custom designs, competitive pricing, and
              exceptional customer service. Read on to explore more about this unique
              wrap shop that has carved a niche for itself among enthusiasts and car
              owners across the country.
            </p>
          </div>
          </SlideIn>
          <SlideIn direction="right" delay={0.2}>
          <div style={{ position: 'relative', minHeight: 420 }}>
            <Link href="/services/vehicle-wrapping" style={{ display: 'block', position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="https://www.wraptorsinc.com/wp-content/uploads/2023/02/about-feature1.jpg"
                alt="Rated Number One Car Boutique - Wraptors"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          </SlideIn>
        </div>
      </section>

      {/* SECTION 3 — 13 LOCATIONS */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'stretch' }}>
          <div style={{ position: 'relative', minHeight: 420 }}>
            <Link href="/services/auto-detailing" style={{ display: 'block', position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="https://www.wraptorsinc.com/wp-content/uploads/2023/02/about-feature2.jpg"
                alt="Biggest Wrap Shop With Over 13 Locations Across The Globe - Wraptors"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
          <div style={{ padding: '2rem 0' }}>
            <h2 style={{ ...fontBebas, fontSize: 'clamp(3rem, 5vw, 6rem)', lineHeight: 0.88, color: 'var(--white)' }}>
              BIGGEST WRAP SHOP WITH OVER 13 LOCATIONS ACROSS THE GLOBE
            </h2>
            <p style={{ ...fontDM, marginTop: 16, color: 'var(--muted)', lineHeight: 2.0 }}>
              Wraptors is World's largest and most experienced specialist in vehicle
              wraps. With over 10 years of experience, we have gained a vast knowledge
              on vehicle wraps and can offer our customers the best vehicle wrap
              solutions with top-notch production and installation. We specialize in
              professional 3M vinyl film wraps, Avery, Wraptors Premium Film,
              Teckwrap, Hexis, Arlon, custom vinyl wrap creations, vehicle branding,
              starlight installation, rims powder coating, tint, and paint protection
              film. Our team of experts can create stunning vehicle wraps for any
              vehicle type or size, from cars to boats and trucks.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CREATIVE TEAM */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'stretch' }}>
          <div style={{ padding: '2rem 0' }}>
            <h2 style={{ ...fontBebas, fontSize: 'clamp(3rem, 5vw, 6rem)', lineHeight: 0.88, color: 'var(--white)' }}>
              TEAM OF CREATIVE PROFESSIONALS
            </h2>
            <p style={{ ...fontDM, marginTop: 16, color: 'var(--muted)', lineHeight: 2.0 }}>
              Our team is comprised of creative professionals who can create anything
              from creative vinyl wrap designs to precise 3M film wrapping services.
              We are a customer-centric company that believes in offering value-added
              services and quality products at affordable prices. Our wide range of
              vehicle wrap options allows you to customize your vehicle wrap experience
              to fit your needs and budget.
            </p>
            <p style={{ ...fontDM, marginTop: 16, color: 'var(--muted)', lineHeight: 2.0 }}>
              With unwavering commitment to quality, we make sure our vehicles look
              amazing every time. Get in touch with us today to discover how wraps can
              improve your vehicle's appearance!
            </p>
          </div>
          <div style={{ position: 'relative', minHeight: 420 }}>
            <Link href="/services/window-tinting" style={{ display: 'block', position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="https://www.wraptorsinc.com/wp-content/uploads/2023/02/about-feature3.jpg"
                alt="Team of Creative Professionals – Wraptors"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THE MASTER BEHIND THE VISION */}
      <section style={{ background: '#111111', borderTop: '1px solid #222222', borderBottom: '1px solid #222222', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'left',
              ...fontDM,
              fontSize: 10,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}
          >
            THE STORY
          </div>
          <h2 style={{ ...fontBebas, fontSize: 'clamp(3rem, 5vw, 6rem)', lineHeight: 0.88, color: 'var(--white)', marginTop: '1rem' }}>
            THE MASTER BEHIND THE VISION
          </h2>

          {/* SUBSECTION: STAS KRAVCHUK */}
          <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div
                style={{
                  width: 400,
                  height: 500,
                  background: '#111111',
                  border: '1px solid #C8A96E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
                aria-label="Stas Kravchuk founder photo placeholder"
              >
                <div
                  style={{
                    ...fontBebas,
                    fontSize: 120,
                    color: 'var(--gold)',
                    opacity: 0.2,
                    lineHeight: 1,
                  }}
                >
                  SK
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
                <a
                  href="https://instagram.com/mr.wraptors"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--gold)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, ...fontDM }}
                >
                  <InstagramIcon size={16} />
                  <span style={{ fontSize: 14 }}>@mr.wraptors</span>
                </a>
              </div>

              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0A0A0A', border: '1px solid var(--border)', padding: 18, textAlign: 'center' }}>
                  <div style={{ ...fontBebas, fontSize: 34, color: 'var(--gold)' }}>2016</div>
                  <div style={{ ...fontDM, fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Founded</div>
                </div>
                <div style={{ background: '#0A0A0A', border: '1px solid var(--border)', padding: 18, textAlign: 'center' }}>
                  <div style={{ ...fontBebas, fontSize: 34, color: 'var(--gold)' }}>13+</div>
                  <div style={{ ...fontDM, fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Locations Built</div>
                </div>
                <div style={{ background: '#0A0A0A', border: '1px solid var(--border)', padding: 18, textAlign: 'center' }}>
                  <div style={{ ...fontBebas, fontSize: 30, color: 'var(--gold)' }}>2×/yr</div>
                  <div style={{ ...fontDM, fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Growth Rate</div>
                </div>
                <div style={{ background: '#0A0A0A', border: '1px solid var(--border)', padding: 18, textAlign: 'center' }}>
                  <div style={{ ...fontBebas, fontSize: 34, color: 'var(--gold)' }}>#1</div>
                  <div style={{ ...fontDM, fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>Car Boutique in Canada</div>
                </div>
              </div>
            </div>

            <div style={{ ...fontDM }}>
              <p style={{ color: '#FAFAFA', lineHeight: 2.0 }}>
                Every empire has a beginning. For Wraptors, it started in 2016 with a
                single wrap shop in Mississauga, Ontario, a big dream, and a man who
                refused to stop building. Stas Kravchuk — known throughout the industry
                simply as Mr. Wraptors — is the founder and CEO of the world's largest
                vehicle wrap boutique. What began as a business to build a future for his
                growing family has become a global brand with 13 locations, a lifestyle
                movement, and a community that spans continents.
              </p>
              <p style={{ color: '#FAFAFA', lineHeight: 2.0, marginTop: 18 }}>
                Raised by a single mother in a low-income household in Ekaterinburg,
                Russia, Stas learned the value of money and hard work from a young age.
                He always knew he wanted to do something different — something that stood
                out. After studying small business management and enterprise at Algonquin
                College, he tried his hand at multiple ventures before discovering the
                world of car wrapping. Once he found it, everything changed. He opened
                Toronto Wraptors in 2016 — growing it at an average of two new locations
                per year and becoming a self-made millionaire in the process.
              </p>
              <p style={{ color: '#FAFAFA', lineHeight: 2.0, marginTop: 18 }}>
                For Stas, Wraptors was never just about vinyl. It was about reforming
                the look of the traditional garage — bringing a boutique feel, a clean
                facility, and a vibe that no one in the industry had created before. That
                energy attracted celebrities, athletes, and car enthusiasts from across
                the globe, turning Wraptors into not just a wrap shop but a full lifestyle
                brand.
              </p>

              <div
                style={{
                  marginTop: 22,
                  borderLeft: '2px solid var(--gold)',
                  paddingLeft: 24,
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  lineHeight: 1.9,
                  color: '#FAFAFA',
                }}
              >
                One thing we're proud of at Wraptors is we treat the Honda Civic
                clients the exact same as we treat the Lamborghini clients. A vehicle
                represents something you worked hard for, so it's important we treat it
                like your prized possession, no matter the value.
                <div style={{ marginTop: 12 }}>— Stas Kravchuk, Founder & CEO</div>
              </div>

              <div style={{ marginTop: 18 }}>
                <a
                  href="https://instagram.com/mr.wraptors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  FOLLOW THE JOURNEY <span aria-hidden style={{ marginLeft: 8 }}>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* SUBSECTION: CHRISTEL BARBIE */}
          <div style={{ marginTop: 64 }}>
            <h3 style={{ ...fontBebas, color: 'var(--gold)', fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: 0.95 }}>
              CHRISTEL BARBIE — CO-FOUNDER & BRAND DIRECTOR
            </h3>
            <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }}>
              <div>
                <div
                  style={{
                    width: 400,
                    height: 500,
                    background: '#111111',
                    border: '1px solid #C8A96E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      ...fontBebas,
                      fontSize: 120,
                      color: 'var(--gold)',
                      opacity: 0.2,
                      lineHeight: 1,
                    }}
                  >
                    CB
                  </div>
                </div>
              </div>
              <div style={{ ...fontDM }}>
                <p style={{ color: '#FAFAFA', lineHeight: 2.0 }}>
                  Behind every great founder is an even stronger partner. Christel Barbie
                  — Stas's wife and co-founder — has been instrumental in building the
                  Wraptors empire from the very beginning. It was Christel and her mother
                  who came up with the name 'Wraptors' — a name they had to fight to keep
                  when the Toronto Raptors basketball team challenged their trademark.
                  Christel oversees marketing, brand vision, and helps run the family
                  alongside their three children. As Stas puts it: 'No matter how hard
                  things become, Christel always has a master plan. She's the brains
                  behind a lot of it.'
                </p>

                <div
                  style={{
                    marginTop: 22,
                    borderLeft: '2px solid var(--gold)',
                    paddingLeft: 24,
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    lineHeight: 1.9,
                    color: '#FAFAFA',
                  }}
                >
                  Our lifestyle is entrepreneurship — being able to have your own
                  business. You can have taste, have fun, and enjoy life without
                  judgement. Just work hard.
                  <div style={{ marginTop: 12 }}>— Christel Barbie, Co-Founder</div>
                </div>
              </div>
            </div>
          </div>

          {/* SUBSECTION: THE WRAPTORS STORY */}
          <div style={{ marginTop: 64, ...fontDM }}>
            <p style={{ color: '#FAFAFA', lineHeight: 2.0 }}>
              What started as one shop in a Mississauga industrial unit has become a
              global automotive empire. Wraptors now operates 13 locations across
              Canada, the United States and South Africa — with plans to open 50
              franchise locations across the US in the coming years.
            </p>
            <p style={{ color: '#FAFAFA', lineHeight: 2.0, marginTop: 18 }}>
              The brand has expanded to include its own line of car care products
              including Wraptors N9, an Amazon best-seller and eco-friendly wrap care
              solution. A Netflix series and Amazon Prime series chronicling the
              Wraptors journey are in production. The head office in Mississauga spans
              10,000 square feet and includes a dedicated multi-media production room
              that handles social content generating over one million Instagram views.
            </p>
            <p style={{ color: '#FAFAFA', lineHeight: 2.0, marginTop: 18 }}>
              It became more a hub of a marketing company rather than a wrap business.
              It became a lifestyle brand where you could come in and hang out, take
              some cool pictures, see some cool clients and overall have a great
              experience.
              <span style={{ display: 'block', marginTop: 12 }}>— Stas Kravchuk</span>
            </p>

            <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
              {[
                { year: '2016', label: 'FOUNDED', desc: 'Single shop, Mississauga ON' },
                { year: '2022', label: 'WENT GLOBAL', desc: 'Expanded to USA and South Africa' },
                { year: '2026+', label: "WHAT'S NEXT", desc: 'Netflix series · 50 US franchises planned · new markets' },
              ].map((t) => (
                <div key={t.year} style={{ background: '#0A0A0A', border: '1px solid var(--border)', padding: 20 }}>
                  <div style={{ ...fontBebas, color: 'var(--gold)', fontSize: 44 }}>{t.year}</div>
                  <div style={{ ...fontBebas, color: 'var(--white)', fontSize: 18, marginTop: 6 }}>{t.label}</div>
                  <div style={{ ...fontDM, color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PARTNER LOGOS */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', ...fontDM }}>
            CERTIFIED MATERIAL PARTNERS
          </div>
          <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap', ...fontDM }}>
            <a href="https://www.3m.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>
              3M
            </a>
            <a href="https://www.averydennison.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>
              Avery Dennison
            </a>
            <a href="https://www.hexis-graphics.com/us" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>
              Hexis
            </a>
            <a href="https://suntekfilms.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>
              Suntek
            </a>
            <a href="https://www.stek-usa.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>
              STEK
            </a>
            <a href="https://wraptorsmafia.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: 13, textDecoration: 'none' }}>
              <Image
                src="https://www.wraptorsinc.com/wp-content/uploads/2023/03/partner-mafia.jpg"
                alt="Wraptors Mafia"
                width={110}
                height={26}
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ objectFit: 'contain' }}
              />
            </a>
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

      {/* SECTION 7 — MAILING LIST SIGNUP */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ ...fontBebas, color: 'var(--gold)', fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)' }}>JOIN OUR MAILING LIST</div>
          <div style={{ ...fontDM, color: 'var(--muted)', marginTop: 10 }}>{'Stay up to date with our Latest Releases and Promotions.'}</div>

          <form
            style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
            method="post"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--white)',
                padding: '14px 16px',
                width: 360,
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-gold">
              SUBSCRIBE
            </button>
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} />
          </form>
        </div>
      </section>

      {/* SECTION 8 — WRAPTORS APP */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ ...fontBebas, color: 'var(--white)', fontSize: 'clamp(2.8rem, 4vw, 4.2rem)' }}>WRAPTORS APP</div>
          <div style={{ ...fontDM, color: 'var(--muted)', marginTop: 10 }}>Book, track and manage your transformation from anywhere</div>

          <div style={{ marginTop: 26, display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 6 }}>
            {[
              'https://www.wraptorsinc.com/wp-content/uploads/2023/03/wraptors-app-1.jpg',
              'https://www.wraptorsinc.com/wp-content/uploads/2023/03/wraptors-app-2.jpg',
              'https://www.wraptorsinc.com/wp-content/uploads/2023/03/wraptors-app-3.jpg',
              'https://www.wraptorsinc.com/wp-content/uploads/2023/03/wraptors-app-4.jpg',
              'https://www.wraptorsinc.com/wp-content/uploads/2023/03/wraptors-app-5.jpg',
              'https://www.wraptorsinc.com/wp-content/uploads/2023/03/wraptors-app-6.jpg',
            ].map((src, i) => (
              <div
                key={src}
                style={{
                  width: 140,
                  borderRadius: 14,
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '9 / 16',
                  flex: '0 0 auto',
                  background: '#111111',
                }}
              >
                <Image
                  src={src}
                  alt={`Wraptors app screenshot ${i + 1}`}
                  fill
                  sizes="140px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  unoptimized={false}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 26, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="https://apps.apple.com/ca/app/wraptors-inc/id1572692992" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://www.wraptorsinc.com/wp-content/uploads/2023/02/spp-store.png"
                alt="Download on App Store"
                width={200}
                height={64}
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ height: 'auto' }}
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.wraptor.wraptorclient" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://www.wraptorsinc.com/wp-content/uploads/2023/02/google-play.png"
                alt="Get it on Google Play"
                width={200}
                height={64}
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ height: 'auto' }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* WE ARE SOCIAL (footer section) */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...fontBebas, color: 'var(--gold)', fontSize: 'clamp(2rem, 3vw, 3rem)' }}>WE ARE SOCIAL</div>
          <div style={{ ...fontDM, color: 'var(--muted)', marginTop: 18, display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
            <a href="https://www.facebook.com/wraptors" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
              Facebook
            </a>
            <a href="https://www.instagram.com/wraptors" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
              Instagram
            </a>
            <a href="https://www.youtube.com/@wraptors" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
              YouTube
            </a>
            <a href="https://www.tiktok.com/@wraptors" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none' }}>
              TikTok
            </a>
          </div>
        </div>
      </section>

      {/* PAGE FOOTER CTA (before global Footer) */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...fontBebas, color: 'var(--white)', fontSize: 'clamp(3rem, 6vw, 7rem)', lineHeight: 0.88 }}>
            READY TO TRANSFORM YOUR VEHICLE?
          </h2>
          <p style={{ ...fontDM, color: 'var(--muted)', marginTop: 12 }}>
            Book a consultation at any of our 13 locations worldwide.
          </p>
          <div style={{ marginTop: 24 }}>
            <a href="/contact" className="btn-gold">
              GET A QUOTE <span aria-hidden style={{ marginLeft: 8 }}>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


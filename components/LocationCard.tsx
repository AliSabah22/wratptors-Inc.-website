const iconSize = 14;
const muted = '#666';

function MapPinIcon() {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill={muted} />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill={muted} />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={muted} />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill={muted} />
    </svg>
  );
}

export type LocationCardProps = {
  city: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  website: string;
  websiteHref: string;
  isHQ: boolean;
  mapsHref?: string;
};

export default function LocationCard({
  city,
  address,
  phone,
  phoneHref,
  email,
  website,
  websiteHref,
  isHQ,
  mapsHref,
}: LocationCardProps) {
  return (
    <div
      style={{
        background: '#111111',
        border: '1px solid #222222',
        borderTop: isHQ ? '2px solid #C8A96E' : undefined,
        padding: '1.8rem 1.6rem',
        transition: 'background 300ms, border-color 300ms',
      }}
      className="location-card"
    >
      <style>{`
        .location-card:hover {
          background: #181818;
          border-color: #C8A96E;
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.8rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.25rem',
            letterSpacing: '0.06em',
            color: '#fff',
            display: 'block',
          }}
        >
          {city}
        </span>
        {isHQ && (
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.18em',
              background: '#C8A96E',
              color: '#000',
              padding: '2px 7px',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            HQ
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <MapPinIcon />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.78rem',
              color: '#666',
              lineHeight: 1.9,
            }}
          >
            {address}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PhoneIcon />
          <a
            href={phoneHref}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.78rem',
              color: '#C8A96E',
              textDecoration: 'none',
            }}
            className="location-card-phone"
          >
            {phone}
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MailIcon />
          <a
            href={`mailto:${email}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.75rem',
              color: '#C8A96E',
              textDecoration: 'none',
            }}
            className="location-card-email"
          >
            {email}
          </a>
        </div>

        {mapsHref && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <MapPinIcon />
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.75rem',
                color: '#C8A96E',
                textDecoration: 'none',
              }}
              className="location-card-email"
            >
              View on map
            </a>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <GlobeIcon />
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '0.75rem',
              color: '#666',
              textDecoration: 'none',
            }}
            className="location-card-website"
          >
            {website}
          </a>
        </div>
      </div>

      <style>{`
        .location-card-phone:hover,
        .location-card-email:hover { text-decoration: underline; }
        .location-card-website:hover { color: #C8A96E; }
      `}</style>
    </div>
  );
}

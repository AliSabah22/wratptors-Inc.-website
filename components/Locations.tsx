'use client';

import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const CANADA_LOCATIONS = [
  {
    city: 'Mississauga',
    hq: true,
    detail: '1081 Meyerside Dr Unit 1-2, Mississauga, ON L5T 1M4',
    tel: '647.620.9727',
    email: 'wrap@torontowraptors.com',
    web: 'https://wraptorsinc.com',
  },
  {
    city: 'Vaughan',
    hq: false,
    detail: '10 Planchet Rd Unit 17-18, Vaughan, ON L4K 2C8',
    tel: '647.669.9727',
    email: 'wrap@vaughanwraptors.com',
  },
  {
    city: 'Ottawa',
    hq: false,
    detail: '1555 St Laurent Blvd Unit B, Ottawa, ON K1G 1A1',
    tel: '613.979.9727',
    email: 'wrap@ottawawraptors.com',
  },
  {
    city: 'Ajax / Whitby / Oshawa',
    hq: false,
    detail: '1501 Hopkins St, Whitby, ON L1N 5Z9',
    tel: '437.488.9727',
    email: 'wrap@wraptorseast.com',
  },
  {
    city: 'Oakville',
    hq: false,
    detail: '2362 Wyecroft Rd Unit 2, Oakville, ON L6L 6M1',
    tel: '647.620.9727',
    email: 'wrap@wraptorsoakville.com',
  },
  {
    city: 'Hamilton',
    hq: false,
    detail: '325 Hilton Dr, Stoney Creek, ON L8E 2N4',
    tel: '437.990.9727',
    email: 'wrap@wraptorshamilton.com',
  },
  {
    city: 'Calgary',
    hq: false,
    detail: '3424-27th Street NE, Calgary, AB',
    tel: '587.433.9727',
    email: 'contact@wraptorscalgary.com',
  },
  {
    city: 'Waterloo',
    hq: false,
    detail: '745 Bridge St W #8, Waterloo, ON N2V 2G6',
    tel: '647.990.9727',
    email: 'wrap@wraptorstricity.com',
  },
  {
    city: 'Vancouver',
    hq: false,
    detail: '150-21900 Westminster Hwy, Richmond, BC V6V 0A5',
    tel: '778.986.9727',
    email: 'wrap@wraptorsvancouver.com',
  },
  {
    city: 'Barrie',
    hq: false,
    detail: '419 Huronia Rd Unit 2, Barrie, ON',
    tel: '416.891.9727',
    email: 'wrap@wraptorsnorth.com',
  },
  {
    city: 'Kingston',
    hq: false,
    detail: '212 Camden Rd, Napanee, ON K7R 1E3',
    tel: '613.312.8740',
    email: 'wrap@wraptorskingston.com',
  },
];

const US_LOCATIONS = [
  {
    city: 'Fort Lauderdale, FL',
    detail: '539 NE 34th Ct, Oakland Park, FL 33334',
    tel: '786.600.8919',
    email: 'wrap@wraptorsftl.com',
  },
  {
    city: 'Orlando, FL',
    detail: '4301 36th St Unit 100, Orlando, FL 32811',
    tel: '561.897.1553',
    email: 'wrap@wraptorsorlando.com',
  },
];

const SA_LOCATIONS = [
  {
    city: 'Cape Town',
    detail: 'Unit 16, Blaauwberg Business Park, 5 Potsdam Rd, Milnerton, 7441',
    tel: '+27 64 964 3908',
    email: 'wrap@wraptorscapetown.com',
  },
];

function LocationCard({
  city,
  hq = false,
  detail,
  tel,
  email,
  web,
  pinIndex = 0,
}: {
  city: string;
  hq?: boolean;
  detail: string;
  tel: string;
  email: string;
  web?: string;
  pinIndex?: number;
}) {
  return (
    <div
      className={`location-card ${hq ? 'hq' : ''}`}
      style={{ ['--i' as string]: pinIndex }}
    >
      <span className="location-city">
        {city}
        {hq && <span className="location-hq-badge">HQ</span>}
      </span>
      <div className="location-detail">
        {detail}
        <br />
        <a href={`tel:${tel.replace(/\D/g, '')}`}>{tel}</a>
        <br />
        <a href={`mailto:${email}`}>{email}</a>
        {web && (
          <>
            <br />
            <a href={web} target="_blank" rel="noopener noreferrer">
              wraptorsinc.com
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: '.locations-grid',
      start: 'top 85%',
      onEnter: () => section.classList.add('pin-drop-visible'),
    });
    return () => st.kill();
  }, []);

  let pinIndex = 0;
  return (
    <section id="locations" ref={sectionRef}>
      <div className="reveal">
        <p className="section-label">Find Us</p>
        <h2 className="section-title">OUR LOCATIONS</h2>
      </div>

      <div className="locations-region reveal" style={{ transitionDelay: '0.1s' }}>
        <div className="region-title">CANADA — 11 LOCATIONS</div>
        <div className="locations-grid">
          {CANADA_LOCATIONS.map((loc) => (
            <LocationCard key={loc.city} {...loc} pinIndex={pinIndex++} />
          ))}
        </div>
      </div>

      <div className="locations-region reveal" style={{ transitionDelay: '0.2s' }}>
        <div className="region-title">UNITED STATES — 2 LOCATIONS</div>
        <div className="locations-grid">
          {US_LOCATIONS.map((loc) => (
            <LocationCard key={loc.city} {...loc} pinIndex={pinIndex++} />
          ))}
        </div>
      </div>

      <div className="locations-region reveal" style={{ transitionDelay: '0.3s' }}>
        <div className="region-title">SOUTH AFRICA — 1 LOCATION</div>
        <div className="locations-grid">
          {SA_LOCATIONS.map((loc) => (
            <LocationCard key={loc.city} {...loc} pinIndex={pinIndex++} />
          ))}
        </div>
      </div>
    </section>
  );
}

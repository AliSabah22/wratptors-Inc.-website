'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const WrapCanvas = dynamic(() => import('@/components/WrapCanvas'), { ssr: false });
const PolishingMachineCardCanvas = dynamic(() => import('@/components/PolishingMachineCardCanvas'), { ssr: false });
const WindowTintCardCanvas = dynamic(() => import('@/components/WindowTintCardCanvas'), { ssr: false });
const DetailingBrushCardCanvas = dynamic(() => import('@/components/DetailingBrushCardCanvas'), { ssr: false });
const SteeringWheelCanvas = dynamic(() => import('@/components/SteeringWheelCanvas'), { ssr: false });
const StarlightCardCanvas = dynamic(() => import('@/components/StarlightCardCanvas'), { ssr: false });
const RacingStripesCardCanvas = dynamic(() => import('@/components/RacingStripesCardCanvas'), { ssr: false });
const GalaxyCardCanvas = dynamic(() => import('@/components/GalaxyCardCanvas'), { ssr: false });
const PenCanvas = dynamic(() => import('@/components/PenCanvas'), { ssr: false });
const CaliperCanvas = dynamic(() => import('@/components/CaliperCanvas'), { ssr: false });
const RimCanvas = dynamic(() => import('@/components/RimCanvas'), { ssr: false });

const SERVICES = [
  {
    num: '01',
    name: 'Vehicle Wrapping',
    desc: 'Full colour changes, custom designs, fleet branding. Matte, gloss, satin, chrome, carbon fiber. Lifespan up to 5–7 years.',
  },
  {
    num: '02',
    name: 'Paint Protection Film',
    desc: 'Clear Bra, Rock Guard, Hood Film — protect your paint from chips, scratches and stains without altering your look.',
  },
  {
    num: '03',
    name: 'Window Tinting',
    desc: 'Solar heat reduction, privacy, glare elimination. Professional film application to all vehicle window types.',
  },
  {
    num: '04',
    name: 'Auto Detailing',
    desc: 'Interior and exterior detailing packages that restore your vehicle to showroom condition. Full luxury service.',
  },
  {
    num: '05',
    name: 'Custom Interior',
    desc: 'Fully bespoke interior design from scratch. Hand-made floor mats, custom materials, meticulous attention to detail.',
  },
  {
    num: '06',
    name: 'Starlight Headliner',
    desc: 'Transform your roof interior into a magnificent star-filled night sky. A Wraptors signature experience.',
  },
  {
    num: '07',
    name: 'Racing Stripes',
    desc: 'Expertly applied racing stripes to instantly transform your vehicle with a bold, unique look.',
  },
  {
    num: '08',
    name: 'Galaxy Ceilings',
    desc: "A unique ceiling design service that turns your car's interior roof into an eye-catching galaxy display.",
  },
  {
    num: '09',
    name: 'Decals',
    desc: 'Sourced or designed from scratch using only premium quality vinyl materials. Any design, any size.',
  },
  {
    num: '10',
    name: 'Caliper Painting',
    desc: 'Brake caliper painting to match your body style or create a striking contrast. The finishing touch that counts.',
  },
  {
    num: '11',
    name: 'Wheel Painting',
    desc: 'All sizes, makes and models. Premium products, widest colour range in the business. Complete wheel transformation.',
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="reveal">
        <p className="section-label">What We Do</p>
        <h2 className="section-title">OUR SERVICES</h2>
      </div>
      <div className="services-grid reveal" style={{ transitionDelay: '0.15s' }}>
        {SERVICES.map((s, idx) => {
          const serviceSlug =
            idx === 2 ? '/services/window-tinting' :
            idx === 5 ? '/services/starlight-headliner' :
            idx === 6 ? '/services/racing-stripes' :
            idx === 7 ? '/services/galaxy-ceilings' : null;
          const hasModel = true;
          const cardContent = (
          <div className={`service-card${hasModel ? ' service-card--with-model' : ''}`}>
            {idx === 0 && (
              <>
                <WrapCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 1 && (
              <>
                <PolishingMachineCardCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 2 && (
              <>
                <WindowTintCardCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 3 && (
              <>
                <DetailingBrushCardCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 4 && (
              <>
                <SteeringWheelCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 5 && (
              <>
                <StarlightCardCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 6 && (
              <>
                <RacingStripesCardCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 7 && (
              <>
                <GalaxyCardCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 8 && (
              <>
                <PenCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 9 && (
              <>
                <CaliperCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            {idx === 10 && (
              <>
                <RimCanvas />
                <div className="service-model-fade" aria-hidden />
              </>
            )}
            <span className="service-num">{s.num}</span>
            <span className="service-name">{s.name}</span>
            <p className="service-desc">{s.desc}</p>
            <span className="service-arrow">→</span>
          </div>
          );
          return serviceSlug ? (
            <Link key={s.num} href={serviceSlug} className="block service-card-link">
              {cardContent}
            </Link>
          ) : (
            <div key={s.num}>{cardContent}</div>
          );
        })}
      </div>
    </section>
  );
}

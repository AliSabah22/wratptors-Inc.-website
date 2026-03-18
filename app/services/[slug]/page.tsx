import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES as SERVICE_TEXTS } from '@/src/data/content';
import QuoteForm from '@/components/QuoteForm';
import ThreeStepsProcess from '@/components/ThreeStepsProcess';
import PartnerLogos from '@/components/PartnerLogos';
import FadeUp from '@/src/components/animations/FadeUp';
import SlideIn from '@/src/components/animations/SlideIn';
import ScaleIn from '@/src/components/animations/ScaleIn';

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=';

type HeroFeature = {
  heading: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
};

type BenefitBlock =
  | {
      kind: 'image-left';
      heading: string;
      body: string;
      imageUrl: string;
      imageAlt: string;
      bullets?: string[];
    }
  | {
      kind: 'image-right';
      heading: string;
      body: string;
      imageUrl: string;
      imageAlt: string;
      bullets?: string[];
    }
  | {
      kind: 'text-only';
      heading: string;
      body: string;
      bullets?: string[];
    }
  | {
      kind: 'tinting';
      heading: string;
      imageUrl: string;
      imageAlt: string;
      bullets: string[];
    }
  | {
      kind: 'tinting-extended';
      heading: string;
      body: string;
      bullets: Array<{ title: string; desc: string }>;
    }
  | {
      kind: 'detailing';
      heading: string;
      imageUrl: string;
      imageAlt: string;
      body: string;
    }
  | {
      kind: 'detailing-benefits';
      heading: string;
      body: string;
      bullets: Array<{ title: string; desc: string }>;
    };

type ServiceSpec = {
  slug: string;
  pageTitle: string;
  displayName: string;
  heroBackgroundUrl: string;
  heroBackgroundAlt: string;
  feature: HeroFeature;
  benefits: BenefitBlock[];
  galleryImages: string[];
  quotePhotoUrl: string;
  quotePhotoAlt: string;
};

const SERVICE_SPECS: Record<string, ServiceSpec> = {
  'vehicle-wrapping': {
    slug: 'vehicle-wrapping',
    pageTitle: 'Vehicle Wrapping | Wraptors Inc.',
    displayName: 'Vehicle Wrapping',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/02/wrapping-feature1.jpg',
    heroBackgroundAlt: 'Vehicle Wrapping - Wraptors',
    feature: {
      heading: 'VEHICLE WRAPS',
      body:
        'Vehicle wraps are a great way to advertise your business\nor product. They can be used to create a unique look for\nyour vehicle, while also providing protection from the\nelements. Vehicle wraps are typically made of vinyl and\ncome in a variety of colors and designs. They can be\napplied to any type of vehicle, including cars, trucks,\nvans, and boats.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/02/wrapping-feature1.jpg',
      imageAlt: 'Vehicle Wraps - Wraptors',
    },
    benefits: [
      {
        kind: 'image-left',
        heading: 'LEADERS IN WRAP INDUSTRY',
        imageUrl:
          'https://www.wraptorsinc.com/wp-content/uploads/2023/02/wrapping-feature2.jpg',
        imageAlt: 'Car Wraps - Wraptors',
        body:
          'Wraptors are the Leaders in professional car vinyl\ngraphics design services. Our talented team will create\ndesign like nothing else, we will listen to your idea to\ncreate stunning wrap. A vehicle wrap allows you to change\nthe color of your car whether it be partial or a complete\ncolor change. We use only the highest level of vinyl films\nto ensure proper outcome!',
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic1.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic2.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic3.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic4.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic5.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic6.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-wrap-640x800.jpg',
    quotePhotoAlt: 'Quote - Vehicle Wrapping Wraptors',
  },
  'auto-detailing': {
    slug: 'auto-detailing',
    pageTitle: 'Auto Detailing | Wraptors Inc.',
    displayName: 'Auto Detailing',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/02/detailing-feature1.jpg',
    heroBackgroundAlt: 'Professional Auto Detailing Services - Wraptors',
    feature: {
      heading: 'PROFESSIONAL AUTO DETAILING SERVICES',
      body:
        'We offer a wide range of automotive detailing products\nand services. Our standard detailing package covers both\ninterior and exterior auto detailing and will restore your\ncar to its former showroom condition. We use ceramic\ncoating and polish.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/02/detailing-feature1.jpg',
      imageAlt: 'Professional Auto Detailing Services - Wraptors',
    },
    benefits: [
      {
        kind: 'detailing',
        heading: 'EXTERIOR DETAILING',
        imageUrl:
          'https://www.wraptorsinc.com/wp-content/uploads/2023/02/detailing-feature2.jpg',
        imageAlt: 'Exterior Detailing - Wraptors',
        body:
          'Want your car to look the way it did when you drove it\noff the lot? If so, then that\'s exactly what our auto\ndetailing service will provide for you. Mud, dirt, grime\nand salt. The list goes on with different things that\ncover the exterior of your car throughout the seasons.\nWe hand wash your vehicle using pH neutral soap. We\nensure that from top to bottom, your vehicle returns to\nits former glory and will not have streaks or water spots.',
      },
      {
        kind: 'detailing',
        heading: 'INTERIOR DETAILING',
        imageUrl:
          'https://www.wraptorsinc.com/wp-content/uploads/2023/02/detailing-feature3.jpg',
        imageAlt: 'Interior Detailing - Wraptors',
        body:
          'From your carpets to your centre console, we strive for\nan immaculate interior. We take care to clean your door\njams and foot holds so that truly from inside and out,\nyour car looks great. We do a complete interior vacuum\nand ensure dust does not remain on your dashboard, console\nor on any of the trims of your doors. Attention to detail\nis crucial for a great interior job.',
      },
      {
        kind: 'detailing-benefits',
        heading: 'WHY REGULAR AUTO DETAILING IS ESSENTIAL FOR YOUR CAR',
        body:
          'Your car is more than just a vehicle that takes you from\none place to another. It\'s your pride and joy, an\ninvestment that needs proper care to maintain its value\nand performance. One way to do this is through regular\nauto detailing. Auto detailing goes beyond just washing\nyour car; it involves a thorough cleaning and maintenance\nof your car\'s interior and exterior.',
        bullets: [
          {
            title: 'Maintain Your Paint',
            desc:
              'Your car\'s paint does more than just make it look good. It also protects the metal\nunderneath from rust and erosion. Regular auto detailing can help prevent this by\nwaxing, polishing, and washing your car regularly.',
          },
          {
            title: 'Remove All the Stains from the Interior',
            desc:
              'Your car\'s interior can accumulate a lot of stains over time from\nspills, food, and other unmentionable items. Regular auto\ndetailing can help remove these stains and keep your car\'s\ninterior looking and smelling fresh.',
          },
          {
            title: 'Keep the Underbody in Great Condition',
            desc:
              'The underbody of your car is just as important as the exterior and\ninterior. Regular auto detailing can help prevent damage by cleaning and maintaining the underbody of your car.',
          },
          {
            title: 'Allergies Begone',
            desc:
              'Dust and dirt can accumulate in your car\'s crevices and cracks, causing allergies to act\nup. Regular auto detailing can help prevent this by thoroughly cleaning your car\'s interior.',
          },
          {
            title: 'Increase the Value of Your Automobile',
            desc:
              'Your car\'s value decreases the moment you drive it off the lot.\nHowever, regular auto detailing can help maintain its\nvalue by keeping it in good condition.',
          },
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic7.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic8.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic9.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic10.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic12.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic11.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-detail-640x734.jpg',
    quotePhotoAlt: 'Quote - Auto Detailing Wraptors',
  },
  'window-tinting': {
    slug: 'window-tinting',
    pageTitle: 'Window Tinting | Wraptors Inc.',
    displayName: 'Window Tinting',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/02/tinting-features1.jpg',
    heroBackgroundAlt: 'Window Tinting - Wraptors',
    feature: {
      heading: 'PROTECTING YOUR VEHICLE',
      body:
        'Window Tinting is another popular option for protecting\nyour vehicle from the sun\'s harmful UV rays. Tinting can\nalso help reduce glare and heat inside the vehicle, making\nit more comfortable for passengers. Tinting is available\nin a variety of shades and colors, so you can choose the\none that best suits your needs.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/02/tinting-features1.jpg',
      imageAlt: 'Window Tinting - Wraptors',
    },
    benefits: [
      {
        kind: 'tinting',
        heading: 'WHY CHOOSE WRAPTORS TINTING SERVICES',
        imageUrl:
          'https://www.wraptorsinc.com/wp-content/uploads/2023/02/tinting-features2.jpg',
        imageAlt: 'Why Choose - Wraptors',
        bullets: [
          'Non-Metal, Non-Fading, Color stable, Dyed Carbon Construction',
          "Non-reflective, 'black' finish that will not fade",
          'Great solar performance with advanced UV protection',
          'No metal layers to cause interference with cell phone/radio',
          'Wraptors Lifetime Guarantee Warranty, including fading',
          'Ceramic — Non-Metal, Maximum Heat Rejection, Ceramic Construction',
        ],
      },
      {
        kind: 'tinting-extended',
        heading: 'WHY WINDOW TINT YOUR CAR FOR THE FINEST EXPERIENCE',
        body:
          'Your car is more than just a means of transportation,\nit\'s an extension of your personality and style. Window\ntinting is an often overlooked feature that can provide\na multitude of benefits to both the driver and the car.',
        bullets: [
          {
            title: "Protection for Your Car's Interior",
            desc:
              'One of the primary\nbenefits of window tint is that it helps protect your car\'s\ninterior from the damaging effects of the sun. Exposure to\nthe sun\'s UV rays can cause fading and discoloration of\nyour car\'s upholstery. Tinted windows can help reduce\nthe number of UV rays that penetrate the car\'s interior, thus\nprolonging the lifespan of your car\'s upholstery.',
          },
          {
            title: 'Reduced Glare',
            desc:
              'Glare from the sun is not only a\nnuisance, but it can also be a major safety issue for\ndrivers. Car window tinting can significantly reduce glare,\nproviding a safer driving experience for the driver and\nother motorists.',
          },
          {
            title: 'Cool and Comfortable Interior',
            desc:
              'Another major benefit\nof window car tint is that it helps keep your car cool on\nhot days. The sun\'s rays can cause the temperature inside\nthe car to rise to dangerous levels. Tinted windows can\nhelp reduce the amount of heat that enters the car.',
          },
          {
            title: 'Increased Privacy and Security',
            desc:
              'Car tinted windows\nprovide increased privacy for the driver and passengers,\nmaking it more difficult for outsiders to see inside the\ncar. This can also help prevent car thefts since it makes\nit harder for potential thieves to see valuable items.',
          },
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic14.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic13.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic15.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic18.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic17.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic16.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-tint-640x800.jpg',
    quotePhotoAlt: 'Quote - Window Tinting Wraptors',
  },
  'paint-protection': {
    slug: 'paint-protection',
    pageTitle: 'Paint Protection Film | Wraptors Inc.',
    displayName: 'Paint Protection Film (PPF)',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-ppf.jpg',
    heroBackgroundAlt: 'Paint Protection Film (PPF) - Wraptors',
    feature: {
      heading: 'PAINT PROTECTION FILM (PPF)',
      body:
        'No matter what you call it – Clear Bra, Rock Guard,\nHood Film, Bumper Cover or Protective Film – paint protection\nfilm is the clear choice to protect your vehicle from chips,\nscratches and stains.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-ppf.jpg',
      imageAlt: 'Paint Protection Film (PPF) - Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'LEADERS IN PAINT PROTECTION',
        body:
          'Wraptors installs only the finest paint protection film\nbrands including STEK and Suntek. Our certified installers\nensure a perfect fit on every panel. PPF is virtually\ninvisible once applied, preserving your original paint\ncolour and gloss while providing a tough barrier against\nroad debris, environmental contaminants and everyday wear.',
        bullets: [
          'Protection from stone chips and road debris',
          'Scratch and abrasion resistant surface',
          'Stain and contamination protection',
          'Self-healing top coat on premium grades',
          'Preserves original paint and vehicle value',
          'Virtually invisible when applied correctly',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic1.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic2.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic3.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic4.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic5.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic6.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-wrap-640x800.jpg',
    quotePhotoAlt: 'Quote - Paint Protection Film Wraptors',
  },
  'custom-interior': {
    slug: 'custom-interior',
    pageTitle: 'Custom Interior | Wraptors Inc.',
    displayName: 'Custom Interior',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-interior.jpg',
    heroBackgroundAlt: 'Custom Interior - Wraptors',
    feature: {
      heading: 'CUSTOM INTERIOR',
      body:
        'We start from scratch with each of our clients laying out\nthe design process, art work & material selection. We hand\nmake each floor mat with meticulous attention to detail and\nthoroughly inspect them to ensure top quality.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-interior.jpg',
      imageAlt: 'Custom Interior - Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'BESPOKE INTERIOR DESIGN',
        body:
          'Every custom interior project at Wraptors begins with a\none-on-one design consultation. We source the finest\nmaterials and work with precision craftsmanship to deliver\nan interior that is uniquely yours. From custom alcantara\nheadliners to bespoke leather stitching and hand-made floor\nmats — we build it all from scratch.',
        bullets: [
          'Full design consultation from scratch',
          'Premium material selection process',
          'Hand-made custom floor mats',
          'Alcantara, leather and suede options',
          'Meticulous quality inspection on every piece',
          'Tailored to any style and budget',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic7.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic8.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic9.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic10.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic11.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic12.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-detail-640x734.jpg',
    quotePhotoAlt: 'Quote - Custom Interior Wraptors',
  },
  'starlight-headliner': {
    slug: 'starlight-headliner',
    pageTitle: 'Starlight Headliner | Wraptors Inc.',
    displayName: 'Starlight Headliner',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-headliner.jpg',
    heroBackgroundAlt: 'Starlight Headliner - Wraptors',
    feature: {
      heading: 'STARLIGHT HEADLINER',
      body:
        'The Starlight Headliner is a custom service that will\ntransform a car\'s roof interior into a magnificent display\nof a star-filled night sky.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/02/services-service-headliner.jpg',
      imageAlt: 'Starlight Headliner - Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'THE WRAPTORS SIGNATURE EXPERIENCE',
        body:
          'The Wraptors Starlight Headliner is our most requested\ninterior service. Using hundreds or thousands of individual\nfibre optic strands, we recreate the feeling of lying under\na clear night sky — right inside your vehicle. Shooting\nstar effects, custom colours and density options make every\ninstallation completely unique.',
        bullets: [
          '500 to 3,000+ individual fibre optic stars',
          'Shooting star effects available',
          'Custom star density and colour temperature',
          'Works on any vehicle make and model',
          'Compatible with ambient lighting integration',
          'Lifetime craftsmanship guarantee',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic13.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic14.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic15.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic16.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic17.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic18.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-wrap-640x800.jpg',
    quotePhotoAlt: 'Quote - Starlight Headliner Wraptors',
  },
  'racing-stripes': {
    slug: 'racing-stripes',
    pageTitle: 'Racing Stripes | Wraptors Inc.',
    displayName: 'Racing Stripes',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-racing-stripes.jpg',
    heroBackgroundAlt: 'Racing Stripes – Wraptors',
    feature: {
      heading: 'RACING STRIPES',
      body:
        'At Wraptors, racing stripes are our specialty,\nexpertly applied racing stripes will transform your vehicle\nand give it an instant unique look.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-racing-stripes.jpg',
      imageAlt: 'Racing Stripes – Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'PRECISION STRIPE APPLICATION',
        body:
          'Racing stripes are one of the most impactful visual\nupgrades you can make to any vehicle. Our expert installers\nuse only premium vinyl to ensure crisp, straight lines with\nperfect symmetry. From classic single-stripe to bold\ntwin-stripe and custom graphic combos, we design and apply\nwith absolute precision.',
        bullets: [
          'Single, double or custom stripe designs',
          'Precision alignment on every application',
          'Available in any colour or finish',
          'Matte, gloss and satin stripe options',
          'Full length or partial stripe designs',
          'Compatible with any vehicle colour',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic1.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic2.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic3.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic4.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic5.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic6.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-wrap-640x800.jpg',
    quotePhotoAlt: 'Quote - Racing Stripes Wraptors',
  },
  'galaxy-ceilings': {
    slug: 'galaxy-ceilings',
    pageTitle: 'Galaxy Ceilings | Wraptors Inc.',
    displayName: 'Galaxy Ceilings',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-galaxy-ceilings.jpg',
    heroBackgroundAlt: 'Galaxy Ceilings – Wraptors',
    feature: {
      heading: 'GALAXY CEILINGS',
      body:
        'Our unique Galaxy Ceiling service turns the internal\nceiling of your ride into an eye-catching design feature\nto recreate a starry night look.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-galaxy-ceilings.jpg',
      imageAlt: 'Galaxy Ceilings – Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'PREMIUM INTERIOR ART',
        body:
          'The Galaxy Ceiling is Wraptors\' premium interior art\nservice — a full ceiling transformation that turns your\nheadliner into a breathtaking deep-space display. Using\ncustom artwork, specialised materials and integrated LED\nbacklighting, each Galaxy Ceiling is a one-of-a-kind\nmasterpiece designed specifically for your vehicle.',
        bullets: [
          'Full custom galaxy artwork per vehicle',
          'Full ceiling panel coverage',
          'LED backlighting integration',
          'Multiple colour themes and styles',
          'Deep space, nebula and aurora options',
          'Every installation is 100% unique',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic13.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic14.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic15.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic16.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic17.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic18.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-wrap-640x800.jpg',
    quotePhotoAlt: 'Quote - Galaxy Ceilings Wraptors',
  },
  decals: {
    slug: 'decals',
    pageTitle: 'Decals | Wraptors Inc.',
    displayName: 'Decals',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-galaxy-decals.jpg',
    heroBackgroundAlt: 'Decals - Wraptors',
    feature: {
      heading: 'DECALS',
      body:
        'Our experienced team can source and apply your choice\nof decal, or design something from scratch using only the\nbest quality materials.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-galaxy-decals.jpg',
      imageAlt: 'Decals - Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'CUSTOM DESIGN FROM SCRATCH',
        body:
          'From subtle accent decals to large-format custom graphics,\nWraptors handles every decal project with the same care and\nprecision as our full wraps. Our in-house design team can\ncreate original artwork from your brief, or we can source\nand apply a specific decal you have in mind. We only use\npremium vinyl for permanent, vibrant results.',
        bullets: [
          'Full custom design service from scratch',
          'Premium quality vinyl materials only',
          'Any size or shape decal',
          'Brand logos and corporate graphics',
          'Colour-accurate printing',
          'Precision placement every time',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic1.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic2.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic3.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic4.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic5.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic6.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-wrap-640x800.jpg',
    quotePhotoAlt: 'Quote - Decals Wraptors',
  },
  'caliper-painting': {
    slug: 'caliper-painting',
    pageTitle: 'Caliper Painting | Wraptors Inc.',
    displayName: 'Caliper Painting',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-caliper-painting.jpg',
    heroBackgroundAlt: 'Caliper Painting - Wraptors',
    feature: {
      heading: 'CALIPER PAINTING',
      body:
        'At Wraptors, we specialize in painting brake calipers\n expertly. We can paint your calipers to match an existing\nbody style or total restyling.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-caliper-painting.jpg',
      imageAlt: 'Caliper Painting - Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'THE FINISHING TOUCH THAT COUNTS',
        body:
          'The brakes are one of the most visible parts of any wheel\nsetup, and painted calipers are the finishing touch that\nseparates a good build from a great one. Wraptors uses only\nhigh-temperature resistant paint and professional prep\nprocesses to ensure a lasting finish that looks\nfactory-quality through years of driving.',
        bullets: [
          'Match or contrast your body colour',
          'High-heat resistant specialist paint',
          'Professional colour matching service',
          'Any colour or finish available',
          'Includes full caliper prep and cleaning',
          'Long-lasting durable finish',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic7.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic8.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic9.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic10.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic11.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic12.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-detail-640x734.jpg',
    quotePhotoAlt: 'Quote - Caliper Painting Wraptors',
  },
  'wheel-painting': {
    slug: 'wheel-painting',
    pageTitle: 'Wheel Painting | Wraptors Inc.',
    displayName: 'Wheel Painting',
    heroBackgroundUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-wheel-painting.jpg',
    heroBackgroundAlt: 'Wheel Painting – Wraptors',
    feature: {
      heading: 'WHEEL PAINTING',
      body:
        'We can paint wheels of all sizes, makes and models using\nonly premium products, and we\'ve got the biggest range of\ncolors in the business.',
      imageUrl:
        'https://www.wraptorsinc.com/wp-content/uploads/2023/03/home-service-wheel-painting.jpg',
      imageAlt: 'Wheel Painting – Wraptors',
    },
    benefits: [
      {
        kind: 'text-only',
        heading: 'COMPLETE WHEEL TRANSFORMATION',
        body:
          'Wheel painting is one of the most cost-effective ways to\ndramatically transform the look of any vehicle. Wraptors offers the widest colour range in the industry and uses\nonly premium products to ensure your wheels look incredible\nand stay that way. From gloss black to custom metallics, we have the colour and the expertise.',
        bullets: [
          'All sizes, makes and models accepted',
          'Widest colour range in the industry',
          'Premium products only',
          'Powder coating available',
          'Full wheel prep and priming included',
          'Complete wheel set or individual wheels',
        ],
      },
    ],
    galleryImages: [
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic7.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic8.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic9.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic10.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic11.jpg',
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/service-gallery-pic12.jpg',
    ],
    quotePhotoUrl:
      'https://www.wraptorsinc.com/wp-content/uploads/2023/03/quote-pic-detail-640x734.jpg',
    quotePhotoAlt: 'Quote - Wheel Painting Wraptors',
  },
};

const BULK_SLUGS = Object.keys(SERVICE_SPECS);

export function generateStaticParams() {
  return BULK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const spec = SERVICE_SPECS[params.slug];
  if (!spec) return {};
  return { title: spec.pageTitle };
}

function Breadcrumb({ items }: { items: string[] }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 10 }}>
      {items.join(' / ')}
    </div>
  );
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const spec = SERVICE_SPECS[params.slug];
  if (!spec) notFound();

  const textService = SERVICE_TEXTS.find((s) => s.slug === params.slug);

  // Fill in benefit bodies/bullets from src/data/content.ts where available (overrides are provided for auto-detailing and window-tinting).
  const benefits = spec.benefits.map((b) => {
    if (b.kind === 'text-only') {
      const filled = { ...b };
      if (textService && filled.body === '') {
        filled.body = textService.leaderDesc;
      }
      const bulletsLen = filled.bullets?.length ?? 0;
      if (textService && bulletsLen === 0) {
        filled.bullets = textService.benefits;
      }
      return filled;
    }
    if (b.kind === 'image-left' || b.kind === 'image-right') {
      if (textService && b.body === '') {
        return { ...b, body: textService.leaderDesc, bullets: textService.benefits };
      }
      return b;
    }
    return b;
  });

  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)' }}>
      {/* PAGE HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '7rem 8%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, zIndex: 0 }}>
          <Image src={spec.heroBackgroundUrl} alt={spec.heroBackgroundAlt} fill placeholder="blur" blurDataURL={blurDataURL} unoptimized={false} style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            SERVICES
          </div>
          <FadeUp delay={0.1}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 6vw, 7rem)', lineHeight: 0.88, marginTop: 14 }}>
              {spec.displayName}
            </h1>
          </FadeUp>
          <Breadcrumb items={['Home', 'Services', spec.displayName]} />
        </div>
      </section>

      {/* SECTION 2 — HERO FEATURE */}
      <section style={{ padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <FadeUp delay={0}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 3.8vw, 4rem)', lineHeight: 0.88 }}>{spec.feature.heading}</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, marginTop: 16, whiteSpace: 'pre-line' }}>{spec.feature.body}</p>
            </FadeUp>
            <div style={{ marginTop: 24 }}>
              <FadeUp delay={0.2}>
                <a href="#quote-form" className="btn-gold" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  GET A QUOTE <span aria-hidden style={{ marginLeft: 8 }}>→</span>
                </a>
              </FadeUp>
            </div>
          </div>
          <ScaleIn delay={0.15}>
            <div style={{ position: 'relative', minHeight: 420 }}>
              <Image
                src={spec.feature.imageUrl}
                alt={spec.feature.imageAlt}
                fill
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* SECTION 3..N — BENEFITS */}
      <section style={{ padding: '0 8% 5rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {benefits.map((b, idx) => {
            const slideDir: 'left' | 'right' =
              b.kind === 'image-right' || b.kind === 'tinting'
                ? 'right'
                : b.kind === 'image-left'
                  ? 'left'
                  : 'left';
            if (b.kind === 'image-left' || b.kind === 'image-right') {
              const imageSideLeft = b.kind === 'image-left';
              return (
                <SlideIn key={idx} direction={slideDir} delay={0}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginTop: idx === 0 ? 0 : 60 }}>
                    {imageSideLeft && (
                      <div style={{ position: 'relative', minHeight: 360 }}>
                        <Image src={b.imageUrl} alt={b.imageAlt} fill placeholder="blur" blurDataURL={blurDataURL} unoptimized={false} style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                    <div>
                      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 0.88 }}>{b.heading}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, marginTop: 16, whiteSpace: 'pre-line' }}>{b.body}</p>
                      {b.bullets && b.bullets.length > 0 && (
                        <ul style={{ fontFamily: "'DM Sans', sans-serif", marginTop: 14, color: 'var(--muted)', lineHeight: 1.9, paddingLeft: 18 }}>
                          {b.bullets.map((t) => (
                            <li key={t} style={{ marginTop: 6 }}>
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {!imageSideLeft && (
                      <div style={{ position: 'relative', minHeight: 360 }}>
                        <Image src={b.imageUrl} alt={b.imageAlt} fill placeholder="blur" blurDataURL={blurDataURL} unoptimized={false} style={{ objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </SlideIn>
              );
            }

            if (b.kind === 'text-only') {
              return (
                <SlideIn key={idx} direction={slideDir} delay={0}>
                  <div style={{ marginTop: idx === 0 ? 0 : 60 }}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 0.88 }}>{b.heading}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, marginTop: 16, whiteSpace: 'pre-line' }}>{b.body}</p>
                    {b.bullets && b.bullets.length > 0 && (
                      <ul style={{ fontFamily: "'DM Sans', sans-serif", marginTop: 14, color: 'var(--muted)', lineHeight: 1.9, paddingLeft: 18 }}>
                        {b.bullets.map((t) => (
                          <li key={t} style={{ marginTop: 6 }}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SlideIn>
              );
            }

            if (b.kind === 'tinting') {
              return (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginTop: idx === 0 ? 0 : 60 }}>
                  <div style={{ position: 'relative', minHeight: 360 }}>
                    <Image src={b.imageUrl} alt={b.imageAlt} fill placeholder="blur" blurDataURL={blurDataURL} unoptimized={false} style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 0.88 }}>{b.heading}</h3>
                    <ul style={{ fontFamily: "'DM Sans', sans-serif", marginTop: 14, color: 'var(--muted)', lineHeight: 1.9, paddingLeft: 18 }}>
                      {b.bullets.map((t) => (
                        <li key={t} style={{ marginTop: 8 }}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            if (b.kind === 'tinting-extended') {
              return (
                <div key={idx} style={{ marginTop: idx === 0 ? 60 : 60 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 0.88 }}>{b.heading}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, marginTop: 16, whiteSpace: 'pre-line' }}>{b.body}</p>
                  <div style={{ marginTop: 14 }}>
                    {b.bullets.map((it) => (
                      <div key={it.title} style={{ marginTop: 18 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--white)', fontSize: 14, letterSpacing: '0.02em' }}>
                          {it.title}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, whiteSpace: 'pre-line', marginTop: 8 }}>
                          {it.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (b.kind === 'detailing') {
              return (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', marginTop: idx === 0 ? 0 : 60 }}>
                  <div style={{ position: 'relative', minHeight: 360 }}>
                    <Image src={b.imageUrl} alt={b.imageAlt} fill placeholder="blur" blurDataURL={blurDataURL} unoptimized={false} style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 0.88 }}>{b.heading}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, marginTop: 16, whiteSpace: 'pre-line' }}>{b.body}</p>
                  </div>
                </div>
              );
            }

            if (b.kind === 'detailing-benefits') {
              return (
                <div key={idx} style={{ marginTop: idx === 0 ? 60 : 60 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', lineHeight: 0.88 }}>{b.heading}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, marginTop: 16, whiteSpace: 'pre-line' }}>{b.body}</p>
                  <div style={{ marginTop: 14 }}>
                    {b.bullets.map((it) => (
                      <div key={it.title} style={{ marginTop: 18 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--white)', fontSize: 14 }}>
                          {it.title}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0, whiteSpace: 'pre-line', marginTop: 8 }}>
                          {it.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>

      {/* 3-STEP PROCESS */}
      <ThreeStepsProcess />

      {/* GALLERY */}
      <section style={{ padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.9 }}>
              WE&apos;VE DONE THIS BEFORE
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', marginTop: 10, fontSize: 16 }}>
              Trust in our experience.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {spec.galleryImages.map((src, i) => (
              <div key={src} className="gallery-tile" style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
                <Image src={src} alt={`${spec.displayName} gallery ${i + 1}`} width={600} height={400} placeholder="blur" blurDataURL={blurDataURL} unoptimized={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="gallery-overlay" aria-hidden style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 200ms ease' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--gold)', fontSize: 22 }}>{spec.displayName}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .gallery-tile:hover .gallery-overlay {
            opacity: 1 !important;
          }
        `}</style>
      </section>

      {/* QUOTE FORM + CONTACT */}
      <section style={{ padding: '5rem 8%', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <QuoteForm formId="quote-form" />
          </div>
          <div>
            <div style={{ position: 'relative', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src={spec.quotePhotoUrl}
                alt={spec.quotePhotoAlt}
                width={700}
                height={500}
                placeholder="blur"
                blurDataURL={blurDataURL}
                unoptimized={false}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div style={{ marginTop: 18, fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 2.0 }}>
              <div style={{ color: 'var(--white)' }}>Phone: 647.620.WRAP (9727) → <a href="tel:+16476209727" style={{ color: 'var(--gold)' }}>tel:+16476209727</a></div>
              <div style={{ marginTop: 10 }}>
                Address: 1081 Meyerside Dr Unit 1-2, <br />
                Mississauga, ON L5T 1M4, Canada →{' '}
                <a href="https://goo.gl/maps/rZEQBMhtQV3K1xxY6" style={{ color: 'var(--gold)' }}>
                  https://goo.gl/maps/rZEQBMhtQV3K1xxY6
                </a>
              </div>
              <div style={{ marginTop: 10 }}>
                Email: <a href="mailto:wrap@torontowraptors.com" style={{ color: 'var(--gold)' }}>wrap@torontowraptors.com</a> →{' '}
                <a href="mailto:wrap@torontowraptors.com" style={{ color: 'var(--gold)' }}>mailto:wrap@torontowraptors.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnerLogos />
    </div>
  );
}


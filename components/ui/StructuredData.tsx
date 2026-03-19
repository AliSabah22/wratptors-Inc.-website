export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'Wraptors Inc.',
    description: "Rated #1 car boutique. 13 global locations. 9,000+ vehicles wrapped. Vehicle wrapping, PPF, window tinting, starlight headliners. Canada, USA, South Africa.",
    url: 'https://www.wraptorsinc.com',
    telephone: '+16476209727',
    email: 'wrap@torontowraptors.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1081 Meyerside Dr Unit 1-2',
      addressLocality: 'Mississauga',
      addressRegion: 'ON',
      postalCode: 'L5T 1M4',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.6532,
      longitude: -79.3832,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '556',
    },
    openingHours: 'Mo-Fr 09:00-18:00, Sa 10:00-16:00',
    priceRange: '$$',
    sameAs: [
      'https://www.instagram.com/wraptors',
      'https://www.facebook.com/wraptors',
      'https://www.youtube.com/@wraptors',
      'https://www.tiktok.com/@wraptors',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

const PARTNERS = [
  '3M',
  'AVERY DENNISON',
  'HEXIS',
  'SUNTEK',
  'STEK',
  'WRAPTORS MAFIA',
  'TECKWRAP',
  'ARLON',
];

export default function Partners() {
  return (
    <section id="partners" className="partners-section">
      <p className="partners-label">Certified Material Partners</p>
      <div className="partners-list reveal">
        {PARTNERS.map((name) => (
          <span key={name} className="partner-name">
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 79; // adjust to your actual number of frames
const FRAME_PATH = (index: number) =>
  `/wraptors-frames/frame_${String(index).padStart(3, "0")}.jpg`;

type HeroTextConfig = {
  id: string;
  primary: string;
  secondary: string;
  primaryGold?: boolean;
  secondaryGold?: boolean;
  showButton?: boolean;
  start: number;
  end: number;
};

const HERO_TEXT_CONFIGS: HeroTextConfig[] = [
  {
    id: "legend",
    primary: "EVERY LEGEND STARTS HERE",
    secondary: "The world's largest vehicle wrap shop",
    start: 0,
    end: 0.18
  },
  {
    id: "old",
    primary: "OUT WITH THE OLD",
    secondary: "We strip it back to bare perfection",
    start: 0.18,
    end: 0.32
  },
  {
    id: "precision",
    primary: "PRECISION IS EVERYTHING",
    secondary: "Every panel measured. Every edge inspected.",
    start: 0.32,
    end: 0.52
  },
  {
    id: "transformation",
    primary: "THE TRANSFORMATION",
    secondary: "9,000+ vehicles wrapped. Zero compromises.",
    start: 0.52,
    end: 0.7
  },
  {
    id: "details",
    primary: "THE DETAILS MAKE THE LEGEND",
    secondary: "Calipers. Tints. Finishing. All of it.",
    start: 0.7,
    end: 0.9
  },
  {
    id: "wraptors",
    primary: "THIS IS WRAPTORS",
    secondary: "13 locations. 10+ years. Your car is next.",
    primaryGold: true,
    secondaryGold: false,
    showButton: true,
    start: 0.9,
    end: 1.02
  }
];

function useScrollHeroProgress() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const totalScrollDistance = container.offsetHeight - window.innerHeight;
      const scrollYRelative = window.scrollY - container.offsetTop;
      const rawProgress =
        totalScrollDistance > 0 ? scrollYRelative / totalScrollDistance : 0;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return { containerRef, progress };
}

function useInViewFade(selector: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}

function useStatsCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const startAnimation = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        const nextValue = Math.round(target * eased);
        setValue(nextValue);
        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [target, durationMs]);

  return { value, elementRef };
}

function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { containerRef, progress } = useScrollHeroProgress();

  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.decoding = "async";
        images.push(img);
        promises.push(
          new Promise((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
        );
      }
      await Promise.all(promises);
      if (cancelled) return;
      loadedImagesRef.current = images;
      setImagesLoaded(true);
    };

    loadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const images = loadedImagesRef.current;
    if (!canvas || images.length === 0) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)));
      const img = images[frameIndex];
      if (!img || !img.complete) return;

      const { width, height } = canvas;
      const logicalWidth = width;
      const logicalHeight = height;

      context.fillStyle = "#000";
      context.fillRect(0, 0, logicalWidth, logicalHeight);

      const imgAspect = img.width / img.height;
      const canvasAspect = logicalWidth / logicalHeight;

      let drawWidth: number;
      let drawHeight: number;
      if (canvasAspect > imgAspect) {
        drawWidth = logicalWidth;
        drawHeight = logicalWidth / imgAspect;
      } else {
        drawHeight = logicalHeight;
        drawWidth = logicalHeight * imgAspect;
      }

      const dx = (logicalWidth - drawWidth) / 2;
      const dy = (logicalHeight - drawHeight) / 2;

      context.drawImage(img, dx, dy, drawWidth, drawHeight);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [progress, imagesLoaded]);

  const getLayerOpacity = (config: HeroTextConfig) => {
    const { start, end } = config;
    const len = end - start || 0.01;
    const p = (progress - start) / len;
    if (p <= 0 || p >= 1) return 0;

    const fadeAmount = 0.2;
    if (p < fadeAmount) return p / fadeAmount;
    if (p > 1 - fadeAmount) return (1 - p) / fadeAmount;
    return 1;
  };

  const scrollToQuote = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="hero-wrapper">
      <div className="hero-sticky">
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-overlay">
          {HERO_TEXT_CONFIGS.map((config) => {
            const opacity = getLayerOpacity(config);
            const isFinal = config.id === "wraptors";
            return (
              <div key={config.id} className="hero-text-layer" style={{ opacity }}>
                {!isFinal && <div className="hero-kicker">WRAPTORS INC.</div>}
                <div className={"hero-title" + (config.primaryGold ? " gold" : "")}>
                  {config.primary}
                </div>
                <p className={"hero-subtitle" + (config.secondaryGold ? " gold" : "")}>
                  {config.secondary}
                </p>
                {config.showButton && (
                  <div className="hero-cta-row">
                    <button
                      type="button"
                      className="hero-cta-button"
                      onClick={scrollToQuote}
                    >
                      Get a quote
                    </button>
                    <button
                      type="button"
                      className="hero-cta-secondary"
                      onClick={() => {
                        const el = document.getElementById("services");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Explore services
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.75;
      setSolid(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav ${solid ? "solid" : ""}`}>
      <div className="nav-inner">
        <div
          className="nav-logo"
          onClick={() => scrollToId("top")}
          style={{ cursor: "pointer" }}
        >
          <div className="nav-logo-mark">
            <span>W</span>
          </div>
          <span>WRAPTORS</span>
        </div>

        <div className="nav-links">
          <button className="nav-link" type="button" onClick={() => scrollToId("services")}>
            SERVICES
          </button>
          <button className="nav-link" type="button" onClick={() => scrollToId("about")}>
            ABOUT
          </button>
          <button className="nav-link" type="button" onClick={() => scrollToId("locations")}>
            LOCATIONS
          </button>
          <button className="nav-link" type="button" onClick={() => scrollToId("reviews")}>
            REVIEWS
          </button>
          <button className="nav-link" type="button" onClick={() => scrollToId("contact")}>
            CONTACT
          </button>
        </div>

        <button className="nav-cta" type="button" onClick={() => scrollToId("contact")}>
          Get a quote
        </button>

        <button
          className="nav-menu-toggle"
          aria-label="Open navigation"
          type="button"
          onClick={() => scrollToId("services")}
        >
          MENU
        </button>
      </div>
    </nav>
  );
}

export default function Home() {
  useInViewFade(".fade-section");

  const vehiclesStat = useStatsCountUp(9000);
  const yearsStat = useStatsCountUp(10);
  const locationsStat = useStatsCountUp(13);
  const reviewsStat = useStatsCountUp(556);

  const services = [
    "Vehicle Wrapping",
    "Paint Protection Film",
    "Window Tinting",
    "Auto Detailing",
    "Custom Interior",
    "Starlight Headliner",
    "Racing Stripes",
    "Galaxy Ceilings",
    "Decals",
    "Caliper Painting",
    "Wheel Painting"
  ];

  const locations = {
    Canada: ["Toronto", "Mississauga", "Ottawa", "Montreal", "Vancouver"],
    "United States": ["New York", "Miami", "Los Angeles", "Dallas", "Chicago", "Atlanta"],
    "South Africa": ["Johannesburg", "Cape Town", "Durban"]
  };

  const testimonials = [
    {
      name: "ALEX M.",
      meta: "Tesla Model X · Full Satin Wrap",
      body: "They treated my Tesla like it was their own. Zero seams visible, flawless finish, and they walked me through every option."
    },
    {
      name: "PRIYA S.",
      meta: "Range Rover Sport · PPF + Tint",
      body: "The attention to detail was unreal. Edges wrapped perfectly, no dust, no bubbles. This is how premium should feel."
    },
    {
      name: "JORDAN R.",
      meta: "BMW M4 · Color Change Wrap",
      body: "From design consult to delivery, the team was on point. Car looks like it rolled out of a concept studio."
    },
    {
      name: "LUCAS D.",
      meta: "Mercedes G-Wagon · Full Package",
      body: "Wrap, calipers, tints, stars in the headliner. Every single element lines up. Worth every dollar."
    }
  ];

  const onContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for reaching out to Wraptors. A specialist will contact you shortly.");
  };

  return (
    <main className="page" id="top">
      <Navbar />

      <HeroScrollSequence />

      <section id="stats" className="section stats-section fade-section anchor-offset">
        <div className="section-inner">
          <div className="stats-bar">
            <div className="stat-item" ref={vehiclesStat.elementRef}>
              <div className="stat-item-label">VEHICLES WRAPPED</div>
              <div className="stat-item-value">{vehiclesStat.value.toLocaleString()}+</div>
            </div>
            <div className="stat-item" ref={yearsStat.elementRef}>
              <div className="stat-item-label">YEARS EXPERIENCE</div>
              <div className="stat-item-value">{yearsStat.value}+</div>
            </div>
            <div className="stat-item" ref={locationsStat.elementRef}>
              <div className="stat-item-label">GLOBAL LOCATIONS</div>
              <div className="stat-item-value">{locationsStat.value}</div>
            </div>
            <div className="stat-item" ref={reviewsStat.elementRef}>
              <div className="stat-item-label">FIVE STAR REVIEWS</div>
              <div className="stat-item-value">{reviewsStat.value}+</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section fade-section anchor-offset">
        <div className="section-inner">
          <h2 className="section-heading">SERVICES</h2>
          <p className="section-subtitle">
            From full color changes to stealth protection and starlit cabins, every service is
            engineered to make your vehicle feel one of one.
          </p>

          <div className="services-grid">
            {services.map((service) => (
              <article key={service} className="service-card">
                <div className="service-name">{service.toUpperCase()}</div>
                <div className="service-meta">
                  Built by specialist installers using the highest-grade materials on the planet.
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section fade-section anchor-offset">
        <div className="section-inner">
          <h2 className="section-heading">ABOUT WRAPTORS</h2>
          <div className="about-layout">
            <div>
              <p className="about-body">
                Wraptors was built for people who refuse to blend in. From day one, our standard has
                been simple: deliver a finish so clean it feels factory, but louder. Thirteen
                locations later, we're the world's largest dedicated vehicle wrap shop—trusted by
                daily drivers, supercar collectors, and OEM partners alike.
              </p>
              <p className="about-body">
                Every project begins with tear-down and inspection, not a film roll. We blueprint
                panels, chase every edge, and obsess over tension so your wrap looks just as sharp
                on day 1,000 as it does on day 1.
              </p>
            </div>
            <div className="about-features">
              <div className="about-feature-card">
                <div className="about-feature-title">GLOBAL STANDARD, LOCAL TEAMS</div>
                <div className="about-feature-body">
                  13 locations across three countries operating on a single playbook—same training,
                  same materials, same everything. No surprises when your keys change hands.
                </div>
              </div>
              <div className="about-feature-card">
                <div className="about-feature-title">MATERIALS THAT GO THE DISTANCE</div>
                <div className="about-feature-body">
                  We spec films from 3M, Avery Dennison, Hexis, Suntek, STEK and more—chosen for
                  longevity, clarity and removability, not just color chart hype.
                </div>
              </div>
              <div className="about-feature-card">
                <div className="about-feature-title">BUILT FOR DAILY USE</div>
                <div className="about-feature-body">
                  Wraptors cars don't live in photo studios. We wrap for real driveways, real
                  winters, real track days—and back it with the installation quality to match.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="locations" className="section fade-section anchor-offset">
        <div className="section-inner">
          <h2 className="section-heading">OUR LOCATIONS</h2>
          <p className="section-subtitle">
            13 studios worldwide operated by Wraptors-trained teams, all wired into one standard of
            precision.
          </p>

          <div className="locations-groups">
            {Object.entries(locations).map(([region, list]) => (
              <div key={region} className="location-group-card">
                <div className="location-group-title">{region.toUpperCase()}</div>
                <ul className="location-list">
                  {list.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section fade-section anchor-offset">
        <div className="section-inner">
          <h2 className="section-heading">CLIENT APPROVED</h2>
          <div className="review-header">
            <div className="review-rating">
              <div className="review-rating-score">4.9</div>
              <div className="review-rating-text">
                Based on 556+ Google reviews across 13 locations.
              </div>
            </div>
            <div className="review-stars">★★★★★ WRAPTORS VERIFIED</div>
          </div>

          <div className="reviews-grid">
            {testimonials.map((review) => (
              <article key={review.name} className="review-card">
                <div className="review-name">{review.name}</div>
                <div className="review-meta">{review.meta}</div>
                <p className="review-body">{review.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="financing" className="section fade-section anchor-offset">
        <div className="section-inner">
          <div className="financing-banner">
            <div>
              <div className="financing-heading">WE DO FINANCING</div>
              <p className="financing-copy">
                Break the build into manageable payments without watering down the spec. Flexible
                terms, fast approvals, and no shortcuts on materials or install quality.
              </p>
            </div>
            <div className="financing-actions">
              <button
                type="button"
                className="financing-cta"
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Apply now
              </button>
              <button type="button" className="financing-secondary">
                Talk to a build specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section fade-section anchor-offset">
        <div className="section-inner">
          <h2 className="section-heading">GET A QUOTE</h2>
          <div className="contact-grid">
            <div className="contact-copy">
              Tell us about your vehicle, how you drive it, and how loud you want it to feel. A
              Wraptors build specialist will come back with tailored options, timelines, and
              pricing—no templates, no generic packages.
            </div>
            <div className="contact-form-card">
              <form onSubmit={onContactSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Name</label>
                    <input className="form-input" type="text" name="name" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" name="email" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Phone</label>
                    <input className="form-input" type="tel" name="phone" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Vehicle</label>
                    <input
                      className="form-input"
                      type="text"
                      name="vehicle"
                      placeholder="Year · Make · Model"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Service</label>
                    <select name="service" className="form-select">
                      <option value="">Select a service</option>
                      <option value="Vehicle Wrapping">Vehicle Wrapping</option>
                      <option value="Paint Protection Film">Paint Protection Film</option>
                      <option value="Window Tinting">Window Tinting</option>
                      <option value="Auto Detailing">Auto Detailing</option>
                      <option value="Custom Interior">Custom Interior</option>
                      <option value="Starlight Headliner">Starlight Headliner</option>
                      <option value="Racing Stripes">Racing Stripes</option>
                      <option value="Galaxy Ceilings">Galaxy Ceilings</option>
                      <option value="Decals">Decals</option>
                      <option value="Caliper Painting">Caliper Painting</option>
                      <option value="Wheel Painting">Wheel Painting</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-textarea"
                      name="message"
                      placeholder="Tell us what you have in mind. Colors, finishes, timelines—anything."
                    />
                  </div>
                </div>

                <button type="submit" className="form-submit">
                  Submit build request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-logo">WRAPTORS</div>
            <p className="footer-brand-copy">
              The world's largest vehicle wrap shop. Thirteen locations. Ten-plus years of builds.
              One standard: perfection at every panel.
            </p>
            <div className="footer-badges-logos">
              <div className="app-badge">
                <span className="app-badge-label">Download on the</span>
                <span className="app-badge-store">App Store</span>
              </div>
              <div className="app-badge">
                <span className="app-badge-label">Get it on</span>
                <span className="app-badge-store">Google Play</span>
              </div>
              <span className="partner-pill">3M Preferred</span>
              <span className="partner-pill">Avery Dennison</span>
              <span className="partner-pill">Hexis</span>
              <span className="partner-pill">Suntek</span>
              <span className="partner-pill">STEK</span>
            </div>
          </div>

          <div className="footer-nav-social">
            <div className="footer-nav-links">
              <a href="#services" className="footer-link">
                SERVICES
              </a>
              <a href="#about" className="footer-link">
                ABOUT
              </a>
              <a href="#locations" className="footer-link">
                LOCATIONS
              </a>
              <a href="#reviews" className="footer-link">
                REVIEWS
              </a>
              <a href="#financing" className="footer-link">
                FINANCING
              </a>
              <a href="#contact" className="footer-link">
                GET A QUOTE
              </a>
            </div>

            <div>
              <div className="footer-social">
                <a href="#" className="social-pill">
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-pill">
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-pill">
                  <span>YouTube</span>
                </a>
                <a href="#" className="social-pill">
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Wraptors Inc. All rights reserved.</span>
          <span>Built for legends, not traffic.</span>
        </div>
      </footer>
    </main>
  );
}

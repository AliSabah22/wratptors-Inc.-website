# Wraptors Inc. — Next.js Website

The world's largest vehicle wrap shop — rebuilt as a **Next.js 14** (App Router) project for optimal performance, SEO, and maintainability.

## What’s included

- **Next.js 14** with App Router and React 18
- **TypeScript** across the app
- **Component-based structure**: Nav, Hero, Stats, About, Services, Locations, Reviews, Financing, Partners, Contact, Footer
- **Global CSS** preserved from the original design (Bebas Neue, DM Sans, gold/dark theme)
- **Client-side behavior**: custom cursor, loader, scroll-driven hero text, reveal-on-scroll, stats count-up, contact form
- **Hero**: optional scroll-driven frame animation (place frames in `public/wraptors-frames/` as `frame_001.jpg` … `frame_240.jpg`) or fallback headline
- **Metadata** for SEO (title, description, Open Graph)

## Quick start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — run ESLint

## Project structure

```
├── app/
│   ├── globals.css    # Global styles (from original index.html)
│   ├── layout.tsx     # Root layout + metadata
│   └── page.tsx       # Home page (client, composes all sections)
├── components/        # UI components
│   ├── Nav.tsx
│   ├── Loader.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Locations.tsx
│   ├── Reviews.tsx
│   ├── Financing.tsx
│   ├── Partners.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/
│   └── useReveal.ts   # Intersection Observer for reveal + stats count-up
├── public/            # Static assets
│   └── wraptors-frames/  # Optional: frame_001.jpg … frame_240.jpg for hero
├── next.config.js
├── tsconfig.json
└── package.json
```

## Hero video frames (optional)

To enable the scroll-driven hero animation:

1. Create `public/wraptors-frames/`.
2. Add images named `frame_001.jpg` through `frame_240.jpg` (or your count).
3. Ensure `frame_001.jpg` exists so the loader can detect frames.

If frames are missing, the hero shows the “World’s Largest Wrap Shop” fallback and scroll text still updates by scroll progress.


---
name: nextjs-r3f-3d-sections
description: Implements production-grade 3D website sections in Next.js using React Three Fiber and drei. Use when building or editing 3D sections, loading .glb models, or when the user mentions R3F, @react-three/fiber, drei, or 3D in a Next.js app.
---

# Production 3D Sections (Next.js + R3F)

## Tech assumptions

- Next.js App Router or Pages Router
- React
- @react-three/fiber
- @react-three/drei
- three
- .glb assets in `/public/models` (served at `/models/...`)

## Rules

### 1. Client components

Any component that uses R3F, drei, or `useFrame` must be a client component:

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
// ...
```

Use Server Components for layout and data; keep 3D canvases and scene logic in Client Components.

### 2. Model paths

Load .glb from the public models folder only:

- Store files in `/public/models/` (e.g. `/public/models/hero-car.glb`).
- Reference in code as `/models/hero-car.glb` (no `public` in the path).

```tsx
useGLTF('/models/hero-car.glb');
```

### 3. Separate model correction from layout transforms

- **Model correction**: centering, uniform scale to fit a reference size, and any rotation that fixes the asset’s default orientation. Apply these in one place (e.g. after loading or in a wrapper group).
- **Layout transforms**: position/rotation/scale for the section (e.g. responsive placement, parallax). Apply these on a parent group or the same group after correction, not mixed into the raw model.

Example structure:

```tsx
<group position={layoutPosition} rotation={layoutRotation} scale={layoutScale}>
  <group ref={modelGroup}>
    <primitive object={scene} />  {/* correction applied to modelGroup */}
  </group>
</group>
```

### 4. Bounding box before final placement

- After loading the model, compute its bounding box (e.g. `Box3.setFromObject()`).
- Use the box to:
  - Center the model (subtract box center from position).
  - Choose a uniform scale so the largest dimension fits a target size (e.g. 2 units).
- Apply layout position/rotation/scale only after this correction so placement is predictable across breakpoints.

```tsx
useEffect(() => {
  if (!modelRef.current) return;
  const box = new THREE.Box3().setFromObject(modelRef.current);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(size);
  modelRef.current.position.sub(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  modelRef.current.scale.setScalar(TARGET_SIZE / maxDim);
}, []);
```

### 5. Explicit desktop / tablet / mobile transform configs

Define per-breakpoint transforms (position, rotation, scale) and use them in the layout group. Avoid hardcoding a single set of values.

```tsx
const transforms = {
  desktop: { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
  tablet:  { position: [0, 0.2, 0], rotation: [0, 0, 0], scale: 0.9 },
  mobile:  { position: [0, 0.5, 0], rotation: [0, 0, 0], scale: 0.6 },
};

// In component: use a hook or media query to pick transforms[breakpoint]
```

Use CSS media queries or a small hook (e.g. `useMediaQuery` or `useBreakpoint`) to select the active config and pass it into the layout group.

### 6. Performance and responsiveness

- Cap `devicePixelRatio` (e.g. `Math.min(window.devicePixelRatio, 2)`) in `<Canvas dpr={[1, 2]} />` or equivalent.
- Use `frameloop="demand"` when the scene does not need continuous animation.
- Lazy-load 3D sections when they are below the fold (e.g. dynamic import + intersection observer or next/dynamic).
- Preload critical models with `useGLTF.preload('/models/...')`.
- Prefer `useGLTF` and drei helpers over manual loaders when using R3F.
- Keep geometry and texture complexity appropriate for mobile; consider lower-LOD or simplified models for small screens if needed.

## Checklist

When adding or editing a 3D section:

- [ ] Component is a client component where it uses R3F/drei
- [ ] .glb paths are under `/public/models` and referenced as `/models/...`
- [ ] Model centering and scaling are done from a computed bounding box, separate from layout
- [ ] Layout transforms (position, rotation, scale) are applied after model correction
- [ ] Desktop, tablet, and mobile transform configs are defined and wired to breakpoints
- [ ] Canvas dpr is capped; use `frameloop="demand"` when no continuous animation is needed
- [ ] Critical models are preloaded; below-the-fold sections are lazy-loaded where appropriate

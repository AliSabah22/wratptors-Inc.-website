/**
 * Named transform configs per section for desktop / tablet / mobile.
 * Layout scale multiplies the normalized scale from model bounds (normalizedScale * layout.scale).
 */

export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export interface LayoutTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface SectionTransformConfig {
  desktop: LayoutTransform;
  tablet: LayoutTransform;
  mobile: LayoutTransform;
}

/** Rims section: service model canvas */
export const rimsTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [Math.PI / 2, 0, -Math.PI], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [Math.PI / 2, 0, -Math.PI], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [Math.PI / 2, 0, -Math.PI], scale: 0.85 },
};

/** Polishing machine (Paint Protection Film service card) */
export const polishingMachineTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.9 },
};

/** Tint model (Window Tinting service card) */
export const tintModelTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.9 },
};

/** Detailing brush (Auto Detailing service card) */
export const detailingBrushTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.9 },
};

/** Interior model (Custom Interior service card) */
export const interiorTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [0, Math.PI / 4, 0], scale: 0.9 },
};

/** Caliper section */
export const caliperTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [-0.2, Math.PI / 4, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [-0.2, Math.PI / 4, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [-0.2, Math.PI / 4, 0], scale: 0.9 },
};

/** Credit card (financing) section — centered, front face toward camera, no lean */
export const cardTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [-0.35, 0, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [-0.35, 0, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0], rotation: [-0.35, 0, 0], scale: 0.85 },
};

/** Trophy / stats section */
export const trophyTransforms: SectionTransformConfig = {
  desktop: { position: [0, -0.3, 0], rotation: [-0.1, 0, 0], scale: 1 },
  tablet:  { position: [0, -0.3, 0], rotation: [-0.1, 0, 0], scale: 0.95 },
  mobile:  { position: [0, -0.3, 0], rotation: [-0.1, 0, 0], scale: 0.9 },
};

/** About / pink wrap section */
export const aboutWrapTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0.8], rotation: [Math.PI / 6, Math.PI / 4, 0], scale: 1 },
  tablet:  { position: [0, 0, 0.8], rotation: [Math.PI / 6, Math.PI / 4, 0], scale: 0.95 },
  mobile:  { position: [0, 0, 0.8], rotation: [Math.PI / 6, Math.PI / 4, 0], scale: 0.85 },
};

/** Hero car: main foreground, raised so it sits on top of the ground */
export const heroCarTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [0, Math.PI * 0.75, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [0, Math.PI * 0.75, 0], scale: 0.98 },
  mobile:  { position: [0, 0, 0], rotation: [0, Math.PI * 0.75, 0], scale: 0.92 },
};

/** Hero camera: cinematic, always looks at car center */
export const heroCameraConfig = {
  position: [0, 1.2, 6] as [number, number, number],
  lookAt: [0, 0.45, 0] as [number, number, number],
  fov: 42,
};

/** Hero underground garage: background behind car on Z */
export const heroGarageConfig = {
  /** Primary background behind car */
  position: [0, 0, -4.5] as [number, number, number],
  /** Raise car above garage floor so it clearly sits on top (no clipping) */
  carYOffset: 0.45,
    /** Target size for garage's largest dimension (scale = this / largestDimension) */
  targetDisplaySize: 20,
  /** Material: visible grey with shading, no env wash-out */
  material: {
    color: 0x4a4e56,
    /** false = lit MeshStandardMaterial (visible form), true = flat MeshBasicMaterial */
    flat: false,
  },
  materialStandard: {
    metalness: 0.05,
    roughness: 0.9,
    envMapIntensity: 0,
    emissive: 0x1a1e24,
    emissiveIntensity: 0.18,
  },
  /** Fog tint (matches garage mood); used in Hero for scene.fog */
  fogColor: 0x080a0e,
  fogDensity: 0.055,
};

/** Loader logo: single scale, no breakpoints */
export const loaderLogoTransforms: SectionTransformConfig = {
  desktop: { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
  tablet:  { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
  mobile:  { position: [0, 0, 0], rotation: [0, 0, 0], scale: 1 },
};

/** Nav logo: small fixed size */
export const navLogoTransforms: SectionTransformConfig = {
  desktop: { position: [0.08, 0, 0], rotation: [0, 0, 0], scale: 1 },
  tablet:  { position: [0.08, 0, 0], rotation: [0, 0, 0], scale: 1 },
  mobile:  { position: [0.08, 0, 0], rotation: [0, 0, 0], scale: 1 },
};

/** Target display sizes (largest dimension in world units) per model for normalized scale */
export const modelTargetDisplaySizes: Record<string, number> = {
  rims: 1.6,
  polishingMachine: 1.8,
  tintModel: 2.4,
  detailingBrush: 1.7,
  interior: 1.8,
  caliper: 1.8,
  card: 3.0,
  trophy: 1.35,
  aboutWrap: 1.4,
  heroCar: 3.2,
  heroGarage: 20,
  loaderLogo: 2.0,
  navLogo: 1.6,
};

/** Simple breakpoint from window width */
export function getBreakpoint(width: number): Breakpoint {
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
}

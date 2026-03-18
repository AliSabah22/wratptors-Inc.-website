import * as THREE from 'three';

export interface ModelBounds {
  box: THREE.Box3;
  size: THREE.Vector3;
  width: number;
  height: number;
  depth: number;
  largestDimension: number;
  center: THREE.Vector3;
  minY: number;
}

/**
 * Compute bounding box and derived metrics for a model (does not mutate the object).
 * Use for centering, grounding, and scale derivation.
 */
export function getModelBounds(object: THREE.Object3D): ModelBounds {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const width = size.x;
  const height = size.y;
  const depth = size.z;
  const largestDimension = Math.max(width, height, depth) || 1;
  const minY = box.min.y;
  return { box, size, width, height, depth, largestDimension, center, minY };
}

export interface ModelCorrectionOptions {
  /** Target size in world units for the model's largest dimension after scaling */
  targetDisplaySize: number;
  /** If true, translate so model's bottom (minY) sits at y=0 */
  groundToZero?: boolean;
  /** Optional clamp for normalized scale (e.g. [0.6, 3] for caliper) */
  scaleClamp?: [number, number];
}

/**
 * Apply source correction: center model using bbox center, optionally ground to y=0,
 * scale so largest dimension equals targetDisplaySize.
 * Does not apply layout transforms (position/rotation/scale from section config).
 * Returns the normalized scale applied (for use as finalScale = normalizedScale * layout.scale).
 */
export function applyModelCorrection(
  model: THREE.Object3D,
  options: ModelCorrectionOptions
): number {
  const { targetDisplaySize, groundToZero = false, scaleClamp } = options;
  const { center, largestDimension, minY } = getModelBounds(model);

  model.position.sub(center);
  if (groundToZero) {
    model.position.y -= minY;
  }

  let normalizedScale = targetDisplaySize / largestDimension;
  if (scaleClamp) {
    normalizedScale = Math.min(scaleClamp[1], Math.max(scaleClamp[0], normalizedScale));
  }
  model.scale.setScalar(normalizedScale);
  return normalizedScale;
}

/**
 * Re-center a model after it has been scaled/rotated (e.g. so it sits at origin for camera target).
 * Use when you apply rotation after initial correction and want the rotated AABB centered.
 */
export function recenterAfterTransform(model: THREE.Object3D): void {
  const box = new THREE.Box3().setFromObject(model);
  const center = new THREE.Vector3();
  box.getCenter(center);
  model.position.sub(center);
}

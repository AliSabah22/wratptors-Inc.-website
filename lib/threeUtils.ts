import * as THREE from 'three';

/**
 * Creates a circular gradient dot texture for particles.
 * innerColor: rgba string for center, outerColor: rgba string for edge (transparent)
 */
export function createCircleTexture(
  innerColor: string,
  outerColor: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(0.3, innerColor);
  gradient.addColorStop(1, outerColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Returns the shared gold material for Wraptors design system.
 */
export function createGoldMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xc8a96e,
    metalness: 0.95,
    roughness: 0.06,
    emissive: 0xc8a96e,
    emissiveIntensity: 0.12,
  });
}

/**
 * Creates and configures a WebGL renderer for scene use.
 */
export function setupRenderer(
  container: HTMLElement,
  width: number,
  height: number
): { renderer: THREE.WebGLRenderer; canvas: HTMLCanvasElement } {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.localClippingEnabled = true;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);
  return { renderer, canvas };
}

/**
 * Disposes scene geometries, materials, and renderer to prevent memory leaks.
 */
export function disposeScene(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
): void {
  scene.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const m = obj as THREE.Mesh;
      m.geometry?.dispose();
      if (Array.isArray(m.material)) {
        m.material.forEach((mat) => mat.dispose());
      } else {
        m.material?.dispose();
      }
    }
    if ((obj as THREE.Points).isPoints) {
      const p = obj as THREE.Points;
      p.geometry?.dispose();
      (p.material as THREE.Material)?.dispose();
    }
    if ((obj as THREE.Line).isLine) {
      const l = obj as THREE.Line;
      l.geometry?.dispose();
      (l.material as THREE.Material)?.dispose();
    }
  });
  renderer.dispose();
}

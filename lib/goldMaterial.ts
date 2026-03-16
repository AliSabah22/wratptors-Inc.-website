import * as THREE from 'three';

export const goldMaterial = new THREE.MeshStandardMaterial({
  color: 0xc8a96e,
  metalness: 0.95,
  roughness: 0.08,
  emissive: 0xc8a96e,
  emissiveIntensity: 0.12,
});

export function applyGoldToModel(model: THREE.Object3D, material: THREE.MeshStandardMaterial = goldMaterial) {
  model.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const m = child as THREE.Mesh;
      m.castShadow = true;
      m.receiveShadow = true;
      m.material = material;
    }
  });
}

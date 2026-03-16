'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export default function CaliperCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 500);
    camera.position.set(0, 0.3, 3.0);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(300, 220);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'width:100%; height:220px; display:block; position:absolute; top:0; left:0; z-index:1;';
    renderer.domElement.style.willChange = 'transform';

    const calLight1 = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(calLight1);
    const calLight2 = new THREE.PointLight(0xffe4a0, 5.0, 15);
    calLight2.position.set(0, 3, 3);
    scene.add(calLight2);
    const calLight3 = new THREE.PointLight(0xc8a96e, 3.0, 10);
    calLight3.position.set(-2, 0, 2);
    scene.add(calLight3);

    let modelRef: THREE.Object3D | null = null;
    let baseY = 0;

    function setupCaliperModel(gltf: { scene: THREE.Group }) {
      const model = gltf.scene;
      scene.add(model);
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);
      model.position.sub(center);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(1.3 / maxDim);
      const box2 = new THREE.Box3().setFromObject(model);
      const center2 = new THREE.Vector3();
      box2.getCenter(center2);
      model.position.sub(center2);
      model.rotation.x = -0.2;
      model.rotation.y = Math.PI / 3;
      model.rotation.z = 0;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.material = new THREE.MeshStandardMaterial({
            color: 0xc8a96e,
            metalness: 0.95,
            roughness: 0.05,
            emissive: 0xc8a96e,
            emissiveIntensity: 0.25,
          });
          m.castShadow = true;
        }
      });
      gsap.from(model.rotation, { y: model.rotation.y - Math.PI, duration: 1.0, ease: 'power3.out' });
      gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'back.out(2)' });
      modelRef = model;
      baseY = model.position.y;
      (window as unknown as { caliperModel?: THREE.Object3D; caliperBaseY?: number }).caliperModel = model;
      (window as unknown as { caliperBaseY?: number }).caliperBaseY = baseY;
      let meshCount = 0;
      model.traverse((ch) => {
        if ((ch as THREE.Mesh).isMesh) meshCount++;
      });
      console.log('CALIPER SETUP COMPLETE — meshes:', meshCount);
    }

    const loader = new GLTFLoader();
    loader.load(
      '/assets/break%20caliper.glb',
      (gltf) => {
        setupCaliperModel(gltf);
      },
      undefined,
      (err) => {
        console.error('Caliper load failed with %20, trying raw space...', err);
        loader.load(
          '/assets/break caliper.glb',
          (gltf2) => {
            setupCaliperModel(gltf2);
          },
          undefined,
          (err2) => {
            console.error('CALIPER LOAD ERROR:', err2);
            const caliperCard = document.querySelector('.service-card:nth-child(10)');
            if (caliperCard) {
              const placeholder = document.createElement('div');
              placeholder.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:220px;display:flex;align-items:center;justify-content:center;z-index:1;font-family:\'Bebas Neue\',sans-serif;font-size:3.5rem;color:var(--border);';
              placeholder.innerHTML = '10';
              caliperCard.appendChild(placeholder);
            }
          }
        );
      }
    );

    const resize = () => {
      if (!containerRef.current) return;
      const w = Math.max(containerRef.current.offsetWidth, 300);
      const h = 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let caliperTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      caliperTime += 0.014;
      if (modelRef) {
        modelRef.rotation.y += 0.006;
        modelRef.position.y = baseY + Math.sin(caliperTime * 1.1) * 0.04;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="caliper-canvas"
      className="service-model-canvas"
      style={{ width: '100%', height: 220, display: 'block', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
    />
  );
}

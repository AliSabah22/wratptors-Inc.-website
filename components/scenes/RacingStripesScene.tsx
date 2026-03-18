'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { applyModelCorrection } from '@/lib/modelBounds';
import { createGoldMaterial, setupRenderer, disposeScene } from '@/lib/threeUtils';

const STRIPE_COLORS: { name: string; hex: string }[] = [
  { name: 'Gold', hex: '#C8A96E' },
  { name: 'Gloss White', hex: '#F5F5F5' },
  { name: 'Gloss Red', hex: '#CC1100' },
  { name: 'Electric Blue', hex: '#0055EE' },
  { name: 'Satin Black', hex: '#1A1A1A' },
  { name: 'Chrome', hex: '#D0D0D0' },
];

type StripeStyle = 'single' | 'double' | 'triple';

export default function RacingStripesScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stripeColor, setStripeColor] = useState('#C8A96E');
  const [stripeStyle, setStripeStyle] = useState<StripeStyle>('single');
  const stripeMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rebuildStripesRef = useRef<((style: StripeStyle) => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = Math.max(container.offsetWidth || window.innerWidth, 320);
    const height = 500;
    const { renderer } = setupRenderer(container, width, height);
    renderer.setClearColor(0x0a0a0a, 0);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 1000);
    camera.position.set(0, 4.5, 3.5);
    camera.lookAt(0, 0, 0);
    camera.near = 0.01;
    camera.far = 1000;
    camera.updateProjectionMatrix();

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(2, 5, 3);
    dir.castShadow = true;
    scene.add(dir);
    const pl = new THREE.PointLight(0xc8a96e, 0.6, 20);
    pl.position.set(-3, 2, -2);
    scene.add(pl);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.7,
      roughness: 0.3,
    });

    const stripeMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8a96e,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xc8a96e,
      emissiveIntensity: 0.15,
      transparent: true,
      opacity: 1,
    });

    let carRef: THREE.Object3D | null = null;
    const stripeMeshes: THREE.Mesh[] = [];

    function buildStripes(style: StripeStyle) {
      stripeMeshes.forEach((m) => {
        scene.remove(m);
        m.geometry.dispose();
      });
      stripeMeshes.length = 0;

      const stripeGeo = new THREE.PlaneGeometry(0.18, 3.8);
      const mat = stripeMaterial;

      if (style === 'single') {
        const m = new THREE.Mesh(stripeGeo.clone(), mat);
        m.rotation.x = -Math.PI / 2;
        m.position.set(0, 0.82, 0);
        m.renderOrder = 1;
        scene.add(m);
        stripeMeshes.push(m);
      } else if (style === 'double') {
        for (const x of [-0.14, 0.14]) {
          const m = new THREE.Mesh(stripeGeo.clone(), mat);
          m.rotation.x = -Math.PI / 2;
          m.position.set(x, 0.82, 0);
          m.renderOrder = 1;
          scene.add(m);
          stripeMeshes.push(m);
        }
      } else {
        for (const x of [-0.26, 0, 0.26]) {
          const m = new THREE.Mesh(stripeGeo.clone(), mat);
          m.rotation.x = -Math.PI / 2;
          m.position.set(x, 0.82, 0);
          m.renderOrder = 1;
          scene.add(m);
          stripeMeshes.push(m);
        }
      }
    }
    stripeMaterialRef.current = stripeMaterial;
    rebuildStripesRef.current = buildStripes;
    buildStripes(stripeStyle);

    const loader = new GLTFLoader();
    loader.load(
      '/assets/car%20model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((c) => {
          if ((c as THREE.Mesh).isMesh) {
            (c as THREE.Mesh).material = bodyMat;
          }
        });
        applyModelCorrection(model, { targetDisplaySize: 2.8, groundToZero: true });
        model.position.set(0, 0, 0);
        scene.add(model);
        carRef = model;
        gsap.from(stripeMaterial, { opacity: 0, duration: 0.8, delay: 1.2, onComplete: () => { stripeMaterial.transparent = false; stripeMaterial.opacity = 1; } });
      },
      undefined,
      () => {
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 0.8, 1.2),
          bodyMat
        );
        box.position.y = 0.4;
        scene.add(box);
        carRef = box;
      }
    );

    gsap.from(camera.position, { y: 12, duration: 1.8, ease: 'power3.out' });

    let rafId: number;
    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      if (carRef) carRef.rotation.y += 0.003;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.offsetWidth || window.innerWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      stripeMeshes.forEach((m) => m.geometry.dispose());
      bodyMat.dispose();
      stripeMaterial.dispose();
      disposeScene(renderer, scene);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const mat = stripeMaterialRef.current;
    if (!mat) return;
    mat.color.set(stripeColor);
    mat.emissive.set(stripeColor);
  }, [stripeColor]);

  useEffect(() => {
    rebuildStripesRef.current?.(stripeStyle);
  }, [stripeStyle]);

  return (
    <div className="flex flex-col gap-8">
      <div ref={containerRef} className="w-full min-h-[500px] h-[500px] bg-[#0A0A0A]" />
      <div className="space-y-4">
        <label className="block text-[11px] uppercase tracking-widest text-[#888]">Stripe colour</label>
        <div className="flex flex-wrap gap-2">
          {STRIPE_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setStripeColor(c.hex)}
              className="w-10 h-10 rounded-full border-2 transition-transform"
              style={{
                backgroundColor: c.hex,
                borderColor: stripeColor === c.hex ? '#C8A96E' : '#333',
                transform: stripeColor === c.hex ? 'scale(1.1)' : 'scale(1)',
              }}
              title={c.name}
            />
          ))}
        </div>
        <label className="block text-[11px] uppercase tracking-widest text-[#888] mt-4">Stripe style</label>
        <div className="flex gap-2">
          {(['single', 'double', 'triple'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStripeStyle(s)}
              className="px-4 py-2 text-xs uppercase tracking-widest rounded-full transition-colors"
              style={{
                backgroundColor: stripeStyle === s ? '#C8A96E' : '#111',
                color: stripeStyle === s ? '#0A0A0A' : '#888',
                border: '1px solid ' + (stripeStyle === s ? '#C8A96E' : '#333'),
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

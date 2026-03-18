'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { applyModelCorrection, recenterAfterTransform } from '@/lib/modelBounds';
import { tintModelTransforms, modelTargetDisplaySizes, getBreakpoint } from '@/lib/transformConfigs';

export default function TintModelCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 500);
    camera.position.set(0, 0, 2.8);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.localClippingEnabled = false;
    const cardW = container.parentElement?.getBoundingClientRect().width ?? container.offsetWidth ?? 300;
    const w = Math.max(cardW, 280);
    const h = 220;
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = `width:100%; height:220px; min-width:100%; min-height:220px; display:block; position:absolute; top:0; left:0; right:0; pointer-events:none;`;
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0xc8a96e, 0.9));
    const key = new THREE.PointLight(0xffe4a0, 2.5, 12);
    key.position.set(1.5, 2, 2);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8a96e, 1.2, 10);
    fill.position.set(-1, 0, 1.5);
    scene.add(fill);

    let modelRef: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/tint%20model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.castShadow = true;
            m.receiveShadow = true;
            const mat = m.material as THREE.MeshStandardMaterial;
            if (mat && mat.emissive) {
              mat.emissiveIntensity = (mat.emissiveIntensity ?? 0) + 0.15;
            }
          }
        });
        scene.add(model);

        const targetDisplaySize = modelTargetDisplaySizes.tintModel;
        applyModelCorrection(model, { targetDisplaySize });
        recenterAfterTransform(model);

        const layout = tintModelTransforms[getBreakpoint(window.innerWidth)];
        model.position.x = layout.position[0];
        model.position.y = layout.position[1];
        model.position.z = layout.position[2];
        model.rotation.x = layout.rotation[0];
        model.rotation.y = layout.rotation[1];
        model.rotation.z = layout.rotation[2];
        model.scale.multiplyScalar(layout.scale);
        modelRef = model;
        setLoadState('loaded');
        resize();
        renderer.render(scene, camera);

        gsap.from(model.rotation, {
          y: model.rotation.y - Math.PI / 2,
          duration: 1.0,
          ease: 'power3.out',
        });
        gsap.from(model.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.85,
          ease: 'back.out(1.6)',
        });
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('[TintModel]', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => {
        console.error('[TintModel] Model failed to load:', err);
        setLoadState('error');
      }
    );

    const resize = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const parentW = el.parentElement?.getBoundingClientRect().width;
      const w = Math.max(el.offsetWidth, parentW ?? 0, 280);
      const h = 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener('resize', resize);

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.01;
      if (modelRef) {
        modelRef.rotation.y += 0.004;
        modelRef.position.y = Math.sin(time * 1.2) * 0.03;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="tint-model-canvas"
      className="service-model-canvas"
      style={{
        width: '100%',
        height: 220,
        minHeight: 220,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        zIndex: 2,
        contain: 'layout style paint',
      }}
    >
      {loadState === 'loading' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.02)', zIndex: 0 }}>
          <span style={{ fontSize: 12, color: '#888' }}>Loading…</span>
        </div>
      )}
      {loadState === 'error' && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.04)', zIndex: 0 }}>
          <span style={{ fontSize: 12, color: '#c00' }}>Model could not load</span>
        </div>
      )}
    </div>
  );
}

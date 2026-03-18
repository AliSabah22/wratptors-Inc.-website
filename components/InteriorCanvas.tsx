'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { applyModelCorrection, recenterAfterTransform } from '@/lib/modelBounds';
import { interiorTransforms, modelTargetDisplaySizes, getBreakpoint } from '@/lib/transformConfigs';

export default function InteriorCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.name = '';
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 500);
    camera.name = '';
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

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    ambient.name = '';
    scene.add(ambient);
    const key = new THREE.PointLight(0xffffff, 3, 20);
    key.name = '';
    key.position.set(2, 2, 3);
    scene.add(key);
    const fill = new THREE.PointLight(0xe8e8e8, 2, 18);
    fill.name = '';
    fill.position.set(-2, 0.5, 2);
    scene.add(fill);
    const front = new THREE.DirectionalLight(0xffffff, 1.2);
    front.name = '';
    front.position.set(0, 0, 5);
    scene.add(front);

    let modelRef: THREE.Object3D | null = null;

    const modelUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/assets/interior.glb`
        : '/assets/interior.glb';

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const safeMaterial = new THREE.MeshBasicMaterial({
          color: 0xd4d4d4,
          depthWrite: true,
          side: THREE.DoubleSide,
        });
        safeMaterial.name = '';

        model.traverse((child) => {
          const obj = child as THREE.Object3D;
          obj.name = typeof obj.name === 'string' ? obj.name : '';
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            if (m.geometry?.attributes) {
              const attrs = m.geometry.attributes as Record<string, { name?: string }>;
              Object.keys(attrs).forEach((key) => {
                if (attrs[key] && typeof attrs[key].name !== 'string') attrs[key].name = '';
              });
            }
            m.material = safeMaterial;
          }
        });
        scene.add(model);

        const targetDisplaySize = modelTargetDisplaySizes.interior;
        applyModelCorrection(model, { targetDisplaySize });
        recenterAfterTransform(model);

        const layout = interiorTransforms[getBreakpoint(window.innerWidth)];
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
        requestAnimationFrame(() => {
          try {
            renderer.render(scene, camera);
          } catch (e) {
            console.warn('[Interior] First render failed (model still visible):', e);
          }
        });

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
        if (xhr.lengthComputable) console.log('[Interior]', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => {
        const msg = err?.message ?? String(err);
        const status = err?.target && 'status' in err.target ? (err.target as XMLHttpRequest).status : '';
        const responseURL = err?.target && 'responseURL' in err.target ? (err.target as XMLHttpRequest).responseURL : '';
        console.error('[Interior] Model failed to load:', msg, status ? `HTTP ${status}` : '', responseURL || modelUrl);
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
      try {
        renderer.render(scene, camera);
      } catch (_) {
        // avoid crash if render throws (e.g. trim on null from driver/three)
      }
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
      id="interior-canvas"
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

'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { applyModelCorrection, recenterAfterTransform } from '@/lib/modelBounds';
import { aboutWrapTransforms, modelTargetDisplaySizes, getBreakpoint } from '@/lib/transformConfigs';

export default function AboutCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    const initW = container.offsetWidth || 600;
    const initH = container.offsetHeight || 520;
    renderer.setSize(initW, initH);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0xc8a96e, 0.7));
    const pl = new THREE.PointLight(0xffe4a0, 2.2, 12);
    pl.position.set(2, 2, 2);
    scene.add(pl);

    let modelRef: THREE.Object3D | null = null;
    let baseRotationX = Math.PI / 6;

    const loader = new GLTFLoader();
    const WRAP_PATHS = ['/assets/pink%20wrap.glb', '/assets/pink wrap.glb'];
    let wrapPathIndex = 0;

    const onWrapLoaded = (gltf: { scene: THREE.Group }) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.castShadow = true;
          m.receiveShadow = true;
        }
      });
      scene.add(model);

      const targetDisplaySize = modelTargetDisplaySizes.aboutWrap;
      applyModelCorrection(model, { targetDisplaySize });
      recenterAfterTransform(model);

      const layout = aboutWrapTransforms[getBreakpoint(window.innerWidth)];
      model.position.x = layout.position[0];
      model.position.y = layout.position[1];
      model.position.z = layout.position[2];
      model.rotation.x = layout.rotation[0];
      model.rotation.y = layout.rotation[1];
      model.rotation.z = layout.rotation[2];
      model.scale.multiplyScalar(layout.scale);
      baseRotationX = layout.rotation[0];
      modelRef = model;

      const distance = (targetDisplaySize / 2) / Math.tan((camera.fov * Math.PI) / 180 / 2) * 1.4;
      camera.position.z = distance;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      gsap.from(model.rotation, {
        y: model.rotation.y + Math.PI,
        duration: 1.6,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from(model.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.0,
        ease: 'back.out(1.7)',
        delay: 0.2,
      });
    };

    const onWrapProgress = (xhr: ProgressEvent<EventTarget>) => {
      if (xhr.lengthComputable) console.log('Loading:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
    };

    const onWrapError = (err: unknown) => {
      wrapPathIndex++;
      if (wrapPathIndex < WRAP_PATHS.length) {
        console.warn('Wrap roll failed, trying fallback path...', err);
        loader.load(WRAP_PATHS[wrapPathIndex], onWrapLoaded, onWrapProgress, onWrapError);
      } else {
        console.warn('Wrap roll failed:', err);
      }
    };

    loader.load(WRAP_PATHS[wrapPathIndex], onWrapLoaded, onWrapProgress, onWrapError);

    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', resize);

    let aboutTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      aboutTime += 0.016;
      if (modelRef) {
        modelRef.rotation.y += 0.006;
        (modelRef as THREE.Object3D & { rotation: THREE.Euler }).rotation.x =
          baseRotationX + Math.sin(aboutTime * 0.7) * 0.15;
        modelRef.position.y = Math.sin(aboutTime * 1.0) * 0.08;
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
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
}

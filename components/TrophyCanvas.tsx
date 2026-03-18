'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { applyModelCorrection, recenterAfterTransform } from '@/lib/modelBounds';
import { trophyTransforms, modelTargetDisplaySizes, getBreakpoint } from '@/lib/transformConfigs';

gsap.registerPlugin(ScrollTrigger);

export default function TrophyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const baseYRef = useRef(0);
  const statsInViewRef = useRef(false);
  const entranceDoneRef = useRef(false);

  const runEntrance = (model: THREE.Object3D) => {
    if (entranceDoneRef.current) return;
    entranceDoneRef.current = true;
    gsap.from(model.rotation, { y: model.rotation.y - Math.PI * 2, duration: 1.8, ease: 'power3.out' });
    gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: 'back.out(2)' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const defaultH = 240;
    const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 500);
    camera.position.set(0, -0.2, 5.0);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(container.offsetWidth, container.offsetHeight || defaultH);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0xc8a96e, 0.8));
    const pl1 = new THREE.PointLight(0xffe4a0, 3, 12);
    pl1.position.set(1.5, 2, 2);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xc8a96e, 1.5, 12);
    pl2.position.set(-1.5, -1, 1);
    scene.add(pl2);

    const loader = new GLTFLoader();
    loader.load(
      '/assets/golden_trophy.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.castShadow = true;
            m.receiveShadow = true;
          }
        });
        scene.add(model);

        const targetDisplaySize = modelTargetDisplaySizes.trophy;
        applyModelCorrection(model, { targetDisplaySize });
        recenterAfterTransform(model);

        const layout = trophyTransforms[getBreakpoint(window.innerWidth)];
        model.position.x = layout.position[0];
        model.position.y = layout.position[1];
        model.position.z = layout.position[2];
        model.rotation.x = layout.rotation[0];
        model.rotation.y = layout.rotation[1];
        model.rotation.z = layout.rotation[2];
        model.scale.multiplyScalar(layout.scale);

        baseYRef.current = model.position.y;
        modelRef.current = model;
        if (statsInViewRef.current) runEntrance(model);
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('Loading:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => console.warn('Trophy failed:', err)
    );

    const st = ScrollTrigger.create({
      trigger: '#stats',
      start: 'top 80%',
      onEnter: () => {
        statsInViewRef.current = true;
        if (modelRef.current) runEntrance(modelRef.current);
      },
    });

    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight || defaultH;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let trophyTime = 0;
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden || !container.contains(renderer.domElement)) return;
      trophyTime += 0.012;
      const model = modelRef.current;
      if (model) {
        model.rotation.y += 0.008;
        model.position.y = baseYRef.current + Math.sin(trophyTime * 1.5) * 0.06;
      }
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      st.kill();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      modelRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="trophy-canvas"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: 'transparent',
        willChange: 'transform',
      }}
    />
  );
}

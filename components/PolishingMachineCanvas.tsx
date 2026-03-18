'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { applyModelCorrection, recenterAfterTransform } from '@/lib/modelBounds';
import { polishingMachineTransforms, modelTargetDisplaySizes, getBreakpoint } from '@/lib/transformConfigs';

export default function PolishingMachineCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 500);
    camera.position.set(0, 0, 2.5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(container.offsetWidth, container.offsetHeight || 220);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0xc8a96e, 0.8));
    const key = new THREE.PointLight(0xffe4a0, 2.5, 10);
    key.position.set(1.5, 2, 2);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8a96e, 1.2, 8);
    fill.position.set(-1, 0, 1.5);
    scene.add(fill);

    let modelRef: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/polishing%20machine.glb',
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

        const targetDisplaySize = modelTargetDisplaySizes.polishingMachine;
        applyModelCorrection(model, { targetDisplaySize });
        recenterAfterTransform(model);

        const layout = polishingMachineTransforms[getBreakpoint(window.innerWidth)];
        model.position.x = layout.position[0];
        model.position.y = layout.position[1];
        model.position.z = layout.position[2];
        model.rotation.x = layout.rotation[0];
        model.rotation.y = layout.rotation[1];
        model.rotation.z = layout.rotation[2];
        model.scale.multiplyScalar(layout.scale);
        modelRef = model;

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
      undefined,
      (err) => console.warn('Polishing machine failed to load:', err)
    );

    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight || 220;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
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
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="polishing-machine-canvas" className="service-model-canvas" />;
}

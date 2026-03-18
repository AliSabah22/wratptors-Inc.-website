'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { applyModelCorrection } from '@/lib/modelBounds';
import { navLogoTransforms, modelTargetDisplaySizes } from '@/lib/transformConfigs';

const ROTATION_SPEED = (Math.PI * 2) / 12;

export default function NavLogoCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, 2.1);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const size = 96;
    renderer.setSize(size, size);
    renderer.domElement.style.width = `${size}px`;
    renderer.domElement.style.height = `${size}px`;
    renderer.domElement.style.display = 'block';

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(2, 2, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.4);
    rim.position.set(-2, 1, -3);
    scene.add(rim);

    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();
    loader.load(
      '/assets/Logo%20Model.glb',
      (gltf) => {
        model = gltf.scene;
        scene.add(model);

        const targetDisplaySize = modelTargetDisplaySizes.navLogo;
        applyModelCorrection(model, { targetDisplaySize });
        const layout = navLogoTransforms.desktop;
        model.position.x = layout.position[0];
        model.position.y = layout.position[1];
        model.position.z = layout.position[2];
        model.rotation.x = layout.rotation[0];
        model.rotation.y = layout.rotation[1];
        model.rotation.z = layout.rotation[2];
        model.scale.multiplyScalar(layout.scale);
      },
      undefined,
      () => {}
    );

    let last = performance.now();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      if (model) {
        model.rotation.y -= ROTATION_SPEED * dt;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: 96, height: 52 }} />;
}

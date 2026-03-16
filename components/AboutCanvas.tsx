'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

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
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0xc8a96e, 0.7));
    const pl = new THREE.PointLight(0xffe4a0, 2.2, 12);
    pl.position.set(2, 2, 2);
    scene.add(pl);

    let modelRef: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/wrap.glb',
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
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        model.position.sub(center);
        const TARGET = 1.4;
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        model.position.z = 0.8;
        model.rotation.x = Math.PI / 6;
        model.rotation.y = Math.PI / 4;
        modelRef = model;
        const distance = (TARGET / 2) / Math.tan((camera.fov * Math.PI / 180) / 2) * 1.4;
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
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('Loading:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => console.warn('Wrap roll failed:', err)
    );

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
        (modelRef as THREE.Object3D & { rotation: THREE.Euler }).rotation.x = Math.PI / 6 + Math.sin(aboutTime * 0.7) * 0.15;
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

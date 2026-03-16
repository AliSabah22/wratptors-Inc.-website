'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export default function RimCanvas() {
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

    const rimAmbient = new THREE.AmbientLight(0xc8a96e, 0.8);
    rimAmbient.name = 'rimAmbient';
    scene.add(rimAmbient);
    const rimKey = new THREE.PointLight(0xffe4a0, 3.0, 8);
    rimKey.position.set(1.5, 2, 2);
    scene.add(rimKey);
    const rimFill = new THREE.PointLight(0xc8a96e, 1.5, 6);
    rimFill.position.set(-1, 0, 1.5);
    scene.add(rimFill);
    const rimBack = new THREE.PointLight(0xffffff, 0.8, 5);
    rimBack.position.set(0, -1, -2);
    scene.add(rimBack);

    let modelRef: THREE.Object3D | null = null;
    let baseY = 0;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/Rims.glb',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(1.6 / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        model.rotation.x = Math.PI / 2;
        model.rotation.z = 0;
        model.rotation.y = -Math.PI;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.material = new THREE.MeshStandardMaterial({
              color: 0xc8a96e,
              metalness: 0.95,
              roughness: 0.06,
              emissive: 0xc8a96e,
              emissiveIntensity: 0.1,
            });
            m.castShadow = true;
          }
        });
        gsap.to(model.rotation, { y: 0, duration: 1.2, ease: 'power3.out' });
        gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: 'back.out(2)' });
        modelRef = model;
        baseY = model.position.y;
        (window as unknown as { rimModel?: THREE.Object3D; rimBaseY?: number }).rimModel = model;
        (window as unknown as { rimBaseY?: number }).rimBaseY = baseY;
      },
      undefined,
      (err) => console.warn('Rim failed to load:', err)
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

    let rimTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      rimTime += 0.016;
      if (modelRef) {
        (modelRef as THREE.Object3D & { rotation: THREE.Euler }).rotation.z += 0.01;
        modelRef.position.y = baseY + Math.sin(rimTime * 1.0) * 0.05;
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

  return <div ref={containerRef} id="rim-canvas" className="service-model-canvas" />;
}

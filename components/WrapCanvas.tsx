'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export default function WrapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(42, 300 / 230, 0.01, 500);
    camera.position.set(0, 0.2, 2.8);
    camera.lookAt(0, 0, 0);
    camera.near = 0.01;
    camera.far = 500;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(300, 230);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const key = new THREE.PointLight(0xffe4a0, 4.0, 10);
    key.position.set(2, 3, 3);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8a96e, 2.5, 8);
    fill.position.set(-2, 0, 2);
    scene.add(fill);
    const rim = new THREE.PointLight(0xffffff, 1.2, 6);
    rim.position.set(0, -2, -2);
    scene.add(rim);

    let modelRef: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/wrap.glb',
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.material = new THREE.MeshStandardMaterial({
              color: 0xc8a96e,
              metalness: 0.95,
              roughness: 0.06,
              emissive: 0xc8a96e,
              emissiveIntensity: 0.18,
            });
          }
        });
        scene.add(model);
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const TARGET = 1.4;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        modelRef = model;

        gsap.from(model.rotation, { y: model.rotation.y + Math.PI, duration: 1.2, ease: 'power3.out' });
        gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: 'back.out(1.7)' });
      },
      undefined,
      (err) => console.warn('Wrap model failed to load:', err)
    );

    const resize = () => {
      if (!containerRef.current) return;
      camera.aspect = 300 / 230;
      camera.updateProjectionMatrix();
      renderer.setSize(300, 230);
    };
    window.addEventListener('resize', resize);

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      if (modelRef) {
        modelRef.rotation.y += 0.006;
        modelRef.rotation.x = Math.sin(time * 0.7) * 0.15;
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

  return <div ref={containerRef} id="wrap-canvas" className="service-model-canvas" />;
}

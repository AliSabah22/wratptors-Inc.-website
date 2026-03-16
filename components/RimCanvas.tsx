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
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 500);
    camera.position.set(0, 0, 2.8);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(container.offsetWidth, container.offsetHeight || 220);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0x555555, 0.7));
    const pl1 = new THREE.PointLight(0xffe4a0, 2.5, 12);
    pl1.position.set(1.2, 2, 1.2);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xc8a96e, 1.5, 12);
    pl2.position.set(-1.2, 0, 1);
    scene.add(pl2);

    let modelRef: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/Rims.glb',
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
        const TARGET = 1.2;
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        model.rotation.x = Math.PI / 2;
        modelRef = model;
        const distance = (TARGET / 2) / Math.tan((camera.fov * Math.PI / 180) / 2) * 1.4;
        camera.position.z = distance;
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        gsap.from(model.rotation, {
          y: model.rotation.y - Math.PI * 2,
          duration: 1.2,
          ease: 'power3.out',
        });

        const card = document.querySelector('.service-card:nth-child(11)');
        if (card) {
          card.addEventListener('mouseenter', () => {
            gsap.to(model.rotation, { y: model.rotation.y + Math.PI * 2, duration: 0.9, ease: 'power2.inOut' });
          });
        }
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('Loading:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => console.warn('Rim failed:', err)
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
        (modelRef as THREE.Object3D & { rotation: THREE.Euler }).rotation.y += 0.012;
        modelRef.position.y = Math.sin(rimTime * 1.3) * 0.04;
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

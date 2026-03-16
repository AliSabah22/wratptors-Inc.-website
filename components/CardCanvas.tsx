'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CardCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 500);
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(300, 300);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0x333333, 0.6));
    const sl = new THREE.SpotLight(0xffe4a0, 3.5, 20);
    sl.position.set(2, 3, 2);
    scene.add(sl);
    const pl = new THREE.PointLight(0xc8a96e, 2, 12);
    pl.position.set(-1.5, 0, 1);
    scene.add(pl);

    let modelRef: THREE.Object3D | null = null;
    let st: ScrollTrigger | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/credit card.glb',
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
        model.rotation.y = Math.PI;
        model.rotation.x = -0.25;
        model.rotation.z = 0.08;
        modelRef = model;
        const distance = (TARGET / 2) / Math.tan((camera.fov * Math.PI / 180) / 2) * 1.4;
        camera.position.z = distance;
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        st = ScrollTrigger.create({
          trigger: '#financing',
          start: 'top 70%',
          onEnter: () => {
            gsap.from(model.rotation, {
              y: model.rotation.y - Math.PI,
              duration: 1.4,
              ease: 'power3.out',
            });
            gsap.from(model.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.0,
              ease: 'back.out(1.8)',
            });
          },
        });
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('Loading:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => console.warn('Credit card failed:', err)
    );

    let cardTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      cardTime += 0.016;
      if (modelRef) {
        modelRef.rotation.y = Math.PI + Math.sin(cardTime * 0.6) * 0.25;
        modelRef.rotation.x = -0.25 + Math.sin(cardTime * 0.4) * 0.08;
        modelRef.position.y = Math.sin(cardTime * 0.9) * 0.08;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      if (st) st.kill();
      cancelAnimationFrame(rafId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="card-canvas"
      style={{
        width: 300,
        height: 300,
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        willChange: 'transform',
      }}
    />
  );
}

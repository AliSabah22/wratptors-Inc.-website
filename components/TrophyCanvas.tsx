'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TrophyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
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
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        model.position.sub(center);
        const TARGET = 1.35;
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        model.position.y -= 0.3;
        model.rotation.y = 0;
        model.rotation.x = -0.1;
        modelRef.current = model;
        (window as unknown as { trophyModel?: THREE.Object3D }).trophyModel = model;
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
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      trophyTime += 0.012;
      const model = modelRef.current;
      if (model) {
        model.rotation.y += 0.008;
        model.position.y = Math.sin(trophyTime * 1.5) * 0.06;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
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

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
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 500);
    camera.position.set(0, 0, 2.8);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(340, 340);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    const cardAmbient = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(cardAmbient);
    const cardKey = new THREE.SpotLight(0xffe4a0, 4.0);
    cardKey.position.set(1.5, 3, 2.5);
    cardKey.angle = Math.PI / 6;
    cardKey.penumbra = 0.4;
    scene.add(cardKey);
    const cardFill = new THREE.PointLight(0xc8a96e, 2.5, 8);
    cardFill.position.set(-2, 0, 2);
    scene.add(cardFill);
    const cardEdge = new THREE.PointLight(0xc8a96e, 1.5, 5);
    cardEdge.position.set(0, -1, -2);
    scene.add(cardEdge);

    let modelRef: THREE.Object3D | null = null;
    let st: ScrollTrigger | null = null;
    let baseY = 0;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/credit card.glb',
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
        model.scale.setScalar(2.2 / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        model.rotation.x = -0.4;
        model.rotation.y = Math.PI;
        model.rotation.z = 0.06;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.material = new THREE.MeshStandardMaterial({
              color: 0x0d0d0d,
              metalness: 0.95,
              roughness: 0.08,
              emissive: 0xc8a96e,
              emissiveIntensity: 0.2,
            });
          }
        });
        gsap.from(model.rotation, { x: model.rotation.x - Math.PI / 2, duration: 1.4, ease: 'power3.out' });
        gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: 'back.out(1.6)' });
        modelRef = model;
        baseY = model.position.y;
        (window as unknown as { cardModel?: THREE.Object3D; cardBaseY?: number }).cardModel = model;
        (window as unknown as { cardBaseY?: number }).cardBaseY = baseY;
        console.log('Credit card loaded successfully');

        st = ScrollTrigger.create({
          trigger: '#financing',
          start: 'top 70%',
          onEnter: () => {
            gsap.from(model.rotation, { x: model.rotation.x - Math.PI / 2, duration: 1.4, ease: 'power3.out' });
            gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 1.0, ease: 'back.out(1.6)' });
          },
        });
      },
      undefined,
      (err) => console.error('CREDIT CARD FAILED:', err)
    );

    const resize = () => {
      if (!containerRef.current) return;
      const w = 340;
      const h = 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let cardTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      cardTime += 0.012;
      if (modelRef) {
        modelRef.rotation.y = Math.PI + Math.sin(cardTime * 0.5) * 0.2;
        modelRef.rotation.x = -0.4 + Math.sin(cardTime * 0.35) * 0.06;
        modelRef.position.y = baseY + Math.sin(cardTime * 0.8) * 0.07;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      if (st) st.kill();
      window.removeEventListener('resize', resize);
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
        width: 340,
        height: 340,
        flexShrink: 0,
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
      }}
    />
  );
}

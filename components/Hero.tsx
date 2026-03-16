'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

const HERO_TEXTS = [
  { id: 'ht0', title: 'EVERY LEGEND\nSTARTS HERE', sub: "The world's largest vehicle wrap shop", gold: false, cta: false },
  { id: 'ht1', title: 'OUT WITH\nTHE OLD', sub: 'We strip it back to bare perfection', gold: false, cta: false },
  { id: 'ht2', title: 'PRECISION IS\nEVERYTHING', sub: 'Every panel measured. Every edge inspected.', gold: false, cta: false },
  { id: 'ht3', title: 'THE\nTRANSFORMATION', sub: '9,000+ vehicles wrapped. Zero compromises.', gold: false, cta: false },
  { id: 'ht4', title: 'THE DETAILS\nMAKE THE LEGEND', sub: 'Calipers. Tints. Finishing. All of it.', gold: false, cta: false },
  { id: 'ht5', title: 'THIS IS\nWRAPTORS', sub: '13 locations. 10+ years. Your car is next.', gold: true, cta: true },
];

const THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.75, 0.9];

const CAMERA_POSITIONS = [
  { x: 0, y: 0.9, z: 5.8 },
  { x: 2.6, y: 1.0, z: 4.2 },
  { x: 0, y: 2.2, z: 3.2 },
  { x: -2.6, y: 1.0, z: 4.2 },
  { x: 0, y: 0.4, z: 4.8 },
  { x: 0, y: 0.9, z: 5.2 },
];

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlesPosRef = useRef<Float32Array | null>(null);
  const lastProgressRef = useRef(-1);

  useEffect(() => {
    const heroScroll = scrollRef.current;
    if (!heroScroll) return;
    const onScroll = () => {
      const rect = heroScroll.getBoundingClientRect();
      const scrollHeight = heroScroll.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
      let active = 0;
      for (let i = 0; i < THRESHOLDS.length; i++) {
        if (progress >= THRESHOLDS[i]) active = i;
      }
      setActiveIndex(active);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const heroScroll = scrollRef.current;
    if (!container || !heroScroll) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 1000);
    camera.position.set(0, 1.0, 6);
    camera.lookAt(0, 0.3, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0x333333, 0.65));
    const keyLight = new THREE.SpotLight(0xffffff, 4);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    (keyLight.shadow as THREE.SpotLightShadow).mapSize.width = 2048;
    (keyLight.shadow as THREE.SpotLightShadow).mapSize.height = 2048;
    keyLight.angle = Math.PI / 6;
    keyLight.penumbra = 0.3;
    scene.add(keyLight);
    const fillLight = new THREE.SpotLight(0xc8a96e, 2);
    fillLight.position.set(-4, 3, 2);
    fillLight.angle = Math.PI / 5;
    fillLight.penumbra = 0.5;
    scene.add(fillLight);
    const rimLight = new THREE.SpotLight(0xffe4a0, 2.5);
    rimLight.position.set(0, 2, -5);
    rimLight.angle = Math.PI / 4;
    rimLight.penumbra = 0.2;
    scene.add(rimLight);
    const underGlow = new THREE.PointLight(0xc8a96e, 0.2, 4);
    underGlow.position.set(0, -0.5, 0);
    scene.add(underGlow);

    const floorGeo = new THREE.PlaneGeometry(40, 40);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.9,
      roughness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    const nParticles = 800;
    const pPos = new Float32Array(nParticles * 3);
    for (let i = 0; i < nParticles; i++) {
      const angle = (i / nParticles) * Math.PI * 2 + Math.random() * 0.5;
      const r = 3.5;
      pPos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pPos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        color: 0xc8a96e,
        size: 0.03,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      })
    );
    scene.add(particles);
    particlesRef.current = particles;
    particlesPosRef.current = pPos;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/car model.glb',
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
        const TARGET = 3.0;
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);
        const box3 = new THREE.Box3().setFromObject(model);
        const minY = box3.min.y;
        model.position.y = -minY;
        model.rotation.y = Math.PI;
        model.castShadow = true;
        carRef.current = model;

        gsap.from(model.rotation, {
          y: model.rotation.y - Math.PI * 1.5,
          duration: 2.0,
          ease: 'power3.out',
          delay: 0.3,
        });
        gsap.from(model.scale, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: 'back.out(1.4)',
          delay: 0.1,
        });
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('Loading:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => console.warn('Model failed to load:', err)
    );

    let mouseX = 0.5;
    let targetRotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      targetRotY = (mouseX - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resizeHero = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    resizeHero();
    window.addEventListener('resize', resizeHero);

    let heroTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      heroTime += 0.016;

      const rect = heroScroll.getBoundingClientRect();
      const scrollHeight = heroScroll.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));

      const idx = Math.min(5, Math.floor(progress * 5.99));
      const nextIdx = Math.min(5, idx + 1);
      const t = progress * 5.99 - idx;
      const a = CAMERA_POSITIONS[idx];
      const b = CAMERA_POSITIONS[nextIdx];
      camera.position.x = a.x + (b.x - a.x) * t;
      camera.position.y = a.y + (b.y - a.y) * t;
      camera.position.z = a.z + (b.z - a.z) * t;
      camera.lookAt(0, 0.3, 0);

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002;
      }

      const car = carRef.current;
      if (car) {
        car.rotation.y += (targetRotY - car.rotation.y) * 0.03;
        car.position.y = Math.sin(heroTime * 0.8) * 0.02;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeHero);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      floorGeo.dispose();
      floorMat.dispose();
      pGeo.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      carRef.current = null;
      particlesRef.current = null;
      particlesPosRef.current = null;
    };
  }, []);

  return (
    <div className="hero-scroll" id="hero-scroll" ref={scrollRef}>
      <div className="hero-sticky" id="hero-sticky">
        <div ref={containerRef} id="threejs-container" />
        <div className="hero-overlay" />

        {HERO_TEXTS.map((item, i) => (
          <div
            key={item.id}
            className={`hero-text ${i === activeIndex ? 'visible' : ''}`}
            id={item.id}
          >
            <h1 className={item.gold ? 'gold' : ''}>
              {item.title.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < item.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p>{item.sub}</p>
            {item.cta && (
              <Link href="#contact" className="hero-cta">
                Get a Quote
              </Link>
            )}
          </div>
        ))}

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
}

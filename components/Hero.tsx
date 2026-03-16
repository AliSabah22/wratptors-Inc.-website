'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
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

const HERO_CAMERA_SEGMENTS = [
  { x: -2.0, y: 0.9, z: 6.0, lookX: 0.8, lookY: 0.5, lookZ: 0 },
  { x: 0, y: 5.0, z: 2.5, lookX: 0.8, lookY: 0.5, lookZ: 0 },
  { x: 3.5, y: 0.9, z: 4.0, lookX: 0, lookY: 0.5, lookZ: 0 },
  { x: 0, y: 0.6, z: 5.5, lookX: 0.8, lookY: 0.6, lookZ: 0 },
  { x: 0, y: 0.6, z: 5.5, lookX: 0.8, lookY: 0.6, lookZ: 0 },
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
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.06);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 1000);
    camera.position.set(-2.0, 0.9, 6.0);
    camera.lookAt(0.8, 0.5, 0);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0x333333, 0.65));
    const keyLight = new THREE.SpotLight(0xffffff, 0.5);
    keyLight.position.set(3, 6, 4);
    keyLight.castShadow = true;
    keyLight.color.set(0xffffff);
    (keyLight.shadow as THREE.SpotLightShadow).mapSize.width = 2048;
    (keyLight.shadow as THREE.SpotLightShadow).mapSize.height = 2048;
    keyLight.angle = Math.PI / 8;
    keyLight.penumbra = 0.6;
    scene.add(keyLight);
    const fillLight = new THREE.SpotLight(0xc8a96e, 1.2);
    fillLight.position.set(-4, 3, 2);
    fillLight.color.set(0xc8a96e);
    fillLight.angle = Math.PI / 5;
    fillLight.penumbra = 0.5;
    scene.add(fillLight);
    const carFront = new THREE.DirectionalLight(0xffffff, 1.2);
    carFront.position.set(0, 2, 6);
    scene.add(carFront);
    const rimLight = new THREE.SpotLight(0xffe4a0, 1.0);
    rimLight.position.set(0, 2, -5);
    rimLight.angle = Math.PI / 6;
    rimLight.penumbra = 0.5;
    scene.add(rimLight);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;

    const shadowGeo = new THREE.PlaneGeometry(4, 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.01;
    scene.add(shadow);

    // Golden dust particles: keep Y outside the car's vertical band (car sits ~0.3–1.8)
    // so particles don't render in front of the car and create "clipping through dust"
    const nParticles = 600;
    const pPos = new Float32Array(nParticles * 3);
    const carYMin = -0.3;
    const carYMax = 1.9;
    for (let i = 0; i < nParticles; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 28;
      const yRand = Math.random();
      pPos[i * 3 + 1] = yRand < 0.5
        ? carYMin - Math.random() * 7.5
        : carYMax + Math.random() * 6.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const canvas2d = document.createElement('canvas');
    canvas2d.width = 32;
    canvas2d.height = 32;
    const ctx = canvas2d.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(200, 169, 110, 1)');
    gradient.addColorStop(0.4, 'rgba(200, 169, 110, 0.8)');
    gradient.addColorStop(1, 'rgba(200, 169, 110, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(canvas2d);
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc8a96e,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      alphaTest: 0.01,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: particleTexture,
    });
    const particles = new THREE.Points(pGeo, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;
    particlesPosRef.current = pPos;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/hypercar%2B3d%2Bmodel.glb',
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
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        model.position.x = -center.x;
        model.position.z = -center.z;
        model.position.y = -box.min.y;
        const targetWidth = 3.2;
        const scaleF = targetWidth / size.x;
        model.scale.setScalar(scaleF);
        model.position.x = 0.8;
        model.rotation.y = Math.PI * 0.75;

        const finalBox = new THREE.Box3().setFromObject(model);
        const carBottom = finalBox.min.y;
        model.position.y += -carBottom + 0.01;

        shadow.scale.x = (finalBox.max.x - finalBox.min.x) * 0.9;
        shadow.scale.z = (finalBox.max.z - finalBox.min.z) * 1.1;

        model.castShadow = true;
        carRef.current = model;
        (window as unknown as { heroCarModel?: THREE.Object3D }).heroCarModel = model;
        console.log('car loaded');

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

      let idx = 0;
      if (progress < 0.2) idx = 0;
      else if (progress < 0.4) idx = 1;
      else if (progress < 0.6) idx = 2;
      else if (progress < 0.8) idx = 3;
      else idx = 4;
      const nextIdx = Math.min(4, idx + 1);
      const segmentProgress = progress < 0.2 ? progress / 0.2 : progress < 0.4 ? (progress - 0.2) / 0.2 : progress < 0.6 ? (progress - 0.4) / 0.2 : progress < 0.8 ? (progress - 0.6) / 0.2 : (progress - 0.8) / 0.2;
      const a = HERO_CAMERA_SEGMENTS[idx];
      const b = HERO_CAMERA_SEGMENTS[nextIdx];
      const t = segmentProgress;
      camera.position.x = a.x + (b.x - a.x) * t;
      camera.position.y = a.y + (b.y - a.y) * t;
      camera.position.z = a.z + (b.z - a.z) * t;
      camera.lookAt(a.lookX + (b.lookX - a.lookX) * t, a.lookY + (b.lookY - a.lookY) * t, a.lookZ + (b.lookZ - a.lookZ) * t);

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002;
      }

      const car = carRef.current;
      if (car) {
        car.rotation.y += (targetRotY - car.rotation.y) * 0.03;
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeHero);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      shadowGeo.dispose();
      shadowMat.dispose();
      pGeo.dispose();
      (particles.material as THREE.PointsMaterial).map?.dispose();
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

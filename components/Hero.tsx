'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { applyModelCorrection } from '@/lib/modelBounds';
import { heroCarTransforms, heroGarageConfig, heroCameraConfig, modelTargetDisplaySizes, getBreakpoint } from '@/lib/transformConfigs';

const HERO_TEXTS = [
  { id: 'ht0', title: 'EVERY LEGEND\nSTARTS HERE', sub: "The world's largest vehicle wrap shop", gold: false, cta: false },
  { id: 'ht1', title: 'OUT WITH\nTHE OLD', sub: 'We strip it back to bare perfection', gold: false, cta: false },
  { id: 'ht2', title: 'PRECISION IS\nEVERYTHING', sub: 'Every panel measured. Every edge inspected.', gold: false, cta: false },
  { id: 'ht3', title: 'THE\nTRANSFORMATION', sub: '9,000+ vehicles wrapped. Zero compromises.', gold: false, cta: false },
  { id: 'ht4', title: 'THE DETAILS\nMAKE THE LEGEND', sub: 'Calipers. Tints. Finishing. All of it.', gold: false, cta: false },
  { id: 'ht5', title: 'THIS IS\nWRAPTORS', sub: '13 locations. 10+ years. Your car is next.', gold: true, cta: true },
];

const THRESHOLDS = [0, 0.2, 0.4, 0.6, 0.75, 0.9];

const CAR_CENTER = { x: 0, y: 0.45, z: 0 };
const HERO_CAMERA_SEGMENTS = [
  { x: 0, y: 1.2, z: 6.0, lookX: CAR_CENTER.x, lookY: CAR_CENTER.y, lookZ: CAR_CENTER.z },
  { x: 0, y: 4.0, z: 2.8, lookX: CAR_CENTER.x, lookY: CAR_CENTER.y, lookZ: CAR_CENTER.z },
  { x: 3.2, y: 1.2, z: 4.2, lookX: CAR_CENTER.x, lookY: CAR_CENTER.y, lookZ: CAR_CENTER.z },
  { x: 0, y: 0.8, z: 5.5, lookX: CAR_CENTER.x, lookY: CAR_CENTER.y, lookZ: CAR_CENTER.z },
  { x: 0, y: 0.8, z: 5.5, lookX: CAR_CENTER.x, lookY: CAR_CENTER.y, lookZ: CAR_CENTER.z },
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
    scene.fog = new THREE.FogExp2(heroGarageConfig.fogColor, heroGarageConfig.fogDensity);
    const camera = new THREE.PerspectiveCamera(heroCameraConfig.fov, 1, 0.01, 1000);
    camera.position.set(heroCameraConfig.position[0], heroCameraConfig.position[1], heroCameraConfig.position[2]);
    camera.lookAt(heroCameraConfig.lookAt[0], heroCameraConfig.lookAt[1], heroCameraConfig.lookAt[2]);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    scene.add(new THREE.AmbientLight(0x2a2e36, 0.35));
    const carKeyLight = new THREE.SpotLight(0xffffff, 1.4);
    carKeyLight.position.set(2, 2, 5);
    carKeyLight.castShadow = true;
    carKeyLight.target.position.set(CAR_CENTER.x, CAR_CENTER.y, CAR_CENTER.z);
    scene.add(carKeyLight);
    scene.add(carKeyLight.target);
    (carKeyLight.shadow as THREE.SpotLightShadow).mapSize.width = 2048;
    (carKeyLight.shadow as THREE.SpotLightShadow).mapSize.height = 2048;
    carKeyLight.angle = Math.PI / 6;
    carKeyLight.penumbra = 0.5;
    const carFill = new THREE.DirectionalLight(0xc8a96e, 0.9);
    carFill.position.set(-2, 1, 4);
    scene.add(carFill);
    const carRim = new THREE.SpotLight(0xffe4a0, 0.8);
    carRim.position.set(0, 0, -3);
    carRim.target.position.set(CAR_CENTER.x, CAR_CENTER.y, CAR_CENTER.z);
    scene.add(carRim);
    scene.add(carRim.target);
    carRim.angle = Math.PI / 8;
    carRim.penumbra = 0.5;
    const bgAmbient = new THREE.AmbientLight(0x363a42, 0.25);
    scene.add(bgAmbient);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;

    const fbxLoader = new FBXLoader();
    fbxLoader.setResourcePath('/assets/');
    fbxLoader.load(
      '/assets/garage.fbx',
      (garage) => {
        const matConfig = heroGarageConfig.material;
        const useFlat = matConfig.flat !== false;
        garage.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.castShadow = true;
            m.receiveShadow = true;
            const mat = useFlat
              ? new THREE.MeshBasicMaterial({
                  color: matConfig.color,
                  depthWrite: true,
                })
              : new THREE.MeshStandardMaterial({
                  color: matConfig.color,
                  metalness: heroGarageConfig.materialStandard.metalness,
                  roughness: heroGarageConfig.materialStandard.roughness,
                  envMapIntensity: heroGarageConfig.materialStandard.envMapIntensity,
                  emissive: heroGarageConfig.materialStandard.emissive,
                  emissiveIntensity: heroGarageConfig.materialStandard.emissiveIntensity,
                });
            if (!useFlat) (mat as THREE.MeshStandardMaterial).envMap = null;
            m.material = mat;
          }
        });
        const targetDisplaySize = heroGarageConfig.targetDisplaySize;
        applyModelCorrection(garage, { targetDisplaySize, groundToZero: true });
        garage.position.set(heroGarageConfig.position[0], heroGarageConfig.position[1], heroGarageConfig.position[2]);
        scene.add(garage);
      },
      (xhr) => {
        if (xhr.lengthComputable) console.log('[Hero] Garage:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => {
        console.error('[Hero] Garage model failed to load:', err);
      }
    );

    // Golden dust particles: keep Y outside the car's vertical band (car sits on ground ~0.35–1.8)
    const nParticles = 600;
    const pPos = new Float32Array(nParticles * 3);
    const carYMin = -0.2;
    const carYMax = 1.85;
    for (let i = 0; i < nParticles; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 28;
      const yRand = Math.random();
      pPos[i * 3 + 1] = yRand < 0.5
        ? carYMin - Math.random() * 7
        : carYMax + Math.random() * 6;
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

    const breakpoint = getBreakpoint(window.innerWidth);
    const layout = heroCarTransforms[breakpoint];

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
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

        const targetDisplaySize = modelTargetDisplaySizes.heroCar;
        applyModelCorrection(model, { targetDisplaySize, groundToZero: true });

        model.position.x = layout.position[0];
        model.position.y = layout.position[1] + heroGarageConfig.carYOffset;
        model.position.z = layout.position[2];
        model.rotation.x = layout.rotation[0];
        model.rotation.y = layout.rotation[1];
        model.rotation.z = layout.rotation[2];
        model.scale.multiplyScalar(layout.scale);

        model.castShadow = true;
        carRef.current = model;
        (window as unknown as { heroCarModel?: THREE.Object3D }).heroCarModel = model;

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
        if (xhr.lengthComputable) console.log('[Hero] Car:', ((xhr.loaded / xhr.total) * 100).toFixed(0) + '%');
      },
      (err) => {
        console.error('[Hero] Car model failed to load:', err);
      }
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

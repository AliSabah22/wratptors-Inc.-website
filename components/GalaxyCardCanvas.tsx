'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const PARTICLE_COUNT = 400;
const NUM_ARMS = 2;

export default function GalaxyCardCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(60, 300 / 230, 0.01, 500);
    camera.position.set(0, 3.5, 0);
    camera.lookAt(0, 0, 0);
    camera.near = 0.01;
    camera.far = 500;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(300, 230);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const white = new THREE.Color(0xffffff);
    const gold = new THREE.Color(0xc8a96e);
    const red = new THREE.Color(0x8b0000);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const arm = Math.floor(Math.random() * NUM_ARMS);
      const radius = Math.pow(Math.random(), 0.5) * 1.8;
      const angle = arm * Math.PI + radius * 2.5 + (Math.random() - 0.5) * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const t = Math.min(radius / 1.8, 1);
      const c = t < 0.5 ? white.clone().lerp(gold, t * 2) : gold.clone().lerp(red, (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const galaxyPoints = new THREE.Points(geometry, material);
    scene.add(galaxyPoints);

    gsap.from(galaxyPoints.rotation, { y: -Math.PI, duration: 2, ease: 'power3.out' });
    gsap.from(material, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });

    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      galaxyPoints.rotation.y += 0.003;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const resize = () => {
      camera.aspect = 300 / 230;
      camera.updateProjectionMatrix();
      renderer.setSize(300, 230);
    };
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="galaxy-card-canvas" className="service-model-canvas" />;
}

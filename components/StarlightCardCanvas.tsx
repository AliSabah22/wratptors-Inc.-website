'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const STAR_COUNT = 220;

export default function StarlightCardCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(65, 300 / 230, 0.01, 500);
    camera.position.set(0, 0, 3);
    camera.lookAt(0, 0.3, 0);
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

    const dimLight = new THREE.PointLight(0x111111, 0.2, 20);
    dimLight.position.set(0, 3, 0);
    scene.add(dimLight);

    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.45;
      const r = 1.5 + Math.random() * 1.0;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 0.5;
      sizes[i] = Math.random() < 0.08 ? 0.07 : 0.025;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.03,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      map: texture,
    });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let shootingStar: { line: THREE.Line; startTime: number } | null = null;
    let lastShootingStar = 0;

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;

      for (let i = 0; i < 30; i++) {
        const idx = Math.floor(Math.random() * STAR_COUNT);
        sizes[idx] = (Math.random() < 0.08 ? 0.07 : 0.025) * (0.5 + Math.random());
      }
      geometry.attributes.size.needsUpdate = true;

      if (time - lastShootingStar > 3 && !shootingStar) {
        lastShootingStar = time;
        const trail = new Float32Array(6);
        trail[0] = -1.5;
        trail[1] = 1.2;
        trail[2] = 0;
        trail[3] = 1.5;
        trail[4] = -0.8;
        trail[5] = 0;
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute('position', new THREE.BufferAttribute(trail, 3));
        const trailMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        const line = new THREE.Line(trailGeo, trailMat);
        scene.add(line);
        shootingStar = { line, startTime: time };
      }

      if (shootingStar) {
        const elapsed = time - shootingStar.startTime;
        if (elapsed > 0.8) {
          scene.remove(shootingStar.line);
          shootingStar.line.geometry.dispose();
          (shootingStar.line.material as THREE.Material).dispose();
          shootingStar = null;
        } else {
          const t = elapsed / 0.8;
          const x = -1.5 + 3 * t;
          const y = 1.2 - 2 * t;
          const pos = shootingStar.line.geometry.attributes.position as THREE.BufferAttribute;
          pos.setXYZ(0, x - 0.3, y + 0.15, 0);
          pos.setXYZ(1, x, y, 0);
          pos.needsUpdate = true;
        }
      }

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
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="starlight-card-canvas" className="service-model-canvas" />;
}

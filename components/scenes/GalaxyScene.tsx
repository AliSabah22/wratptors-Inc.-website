'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { createCircleTexture, setupRenderer, disposeScene } from '@/lib/threeUtils';

const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 1200 : 3000;
const NUM_ARMS = 3;
const ARM_ANGLE = (Math.PI * 2) / NUM_ARMS;
const SPIN_FACTOR = 3.5;
const SPREAD = 0.5;

export default function GalaxyScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = Math.max(container.offsetWidth || window.innerWidth, 320);
    const height = 560;
    const { renderer } = setupRenderer(container, width, height);
    renderer.setClearColor(0x030306, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000);
    camera.position.set(0, 12, 0);
    camera.lookAt(0, 0, 0);
    camera.near = 0.01;
    camera.far = 1000;
    camera.updateProjectionMatrix();

    const count = typeof window !== 'undefined' && window.innerWidth < 768
      ? Math.floor(PARTICLE_COUNT * 0.4)
      : PARTICLE_COUNT;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const arm = Math.floor(Math.random() * NUM_ARMS);
      const radius = Math.pow(Math.random(), 0.6) * 6;
      const angle = arm * ARM_ANGLE + radius * SPIN_FACTOR + (Math.random() - 0.5) * SPREAD;
      const scatter = (Math.random() - 0.5) * SPREAD * radius * 0.5;
      const scatterAngle = angle + Math.PI / 2;
      positions[i * 3] = Math.cos(angle) * radius + Math.cos(scatterAngle) * scatter;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = Math.sin(angle) * radius + Math.sin(scatterAngle) * scatter;

      sizes[i] = radius < 0.5 ? 0.12 : 0.04 + Math.random() * 0.04;

      const t = Math.min(radius / 6, 1);
      if (t < 0.2) {
        colors[i * 3] = 0.7 + t * 0.3;
        colors[i * 3 + 1] = 0.85 + t * 0.1;
        colors[i * 3 + 2] = 1.0;
      } else if (t < 0.6) {
        const s = (t - 0.2) / 0.4;
        colors[i * 3] = THREE.MathUtils.lerp(1.0, 0.78, s);
        colors[i * 3 + 1] = THREE.MathUtils.lerp(0.95, 0.66, s);
        colors[i * 3 + 2] = THREE.MathUtils.lerp(1.0, 0.43, s);
      } else {
        const s = (t - 0.6) / 0.4;
        colors[i * 3] = THREE.MathUtils.lerp(0.78, 0.55, s);
        colors[i * 3 + 1] = THREE.MathUtils.lerp(0.66, 0.23, s);
        colors[i * 3 + 2] = THREE.MathUtils.lerp(0.43, 0.23, s);
      }
    }

    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    galaxyGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const galaxyTexture = createCircleTexture(
      'rgba(255,255,255,0.9)',
      'rgba(200,169,110,0)'
    );
    const galaxyMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.001,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      map: galaxyTexture,
    });

    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxyPoints);

    const coreGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffeecc,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    gsap.from(galaxyMat, { opacity: 0, duration: 2.5, ease: 'power2.inOut' });
    gsap.from(galaxyPoints.rotation, { y: -Math.PI, duration: 3, ease: 'power3.out' });

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;

      galaxyPoints.rotation.y += 0.0015;
      core.rotation.y += 0.005;
      (core.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(time * 1.5) * 0.3;

      const progress = Math.min(window.scrollY / 600, 1);
      camera.position.y = 12 - progress * 9.5;
      camera.position.z = progress * 5;
      camera.lookAt(0, 0, 0);
      camera.fov = 60 + progress * 15;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.offsetWidth || window.innerWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      galaxyTexture.dispose();
      disposeScene(renderer, scene);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full min-h-[560px] h-[560px] bg-[#0A0A0A]" />;
}

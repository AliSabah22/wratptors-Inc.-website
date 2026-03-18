'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { createCircleTexture, setupRenderer, disposeScene } from '@/lib/threeUtils';

const STAR_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 600 : 1500;

export default function StarlightScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = Math.max(container.offsetWidth || window.innerWidth, 320);
    const height = 520;
    const { renderer } = setupRenderer(container, width, height);
    renderer.setClearColor(0x050508, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);
    camera.position.set(0, -2, 0);
    camera.lookAt(0, 1, 0);
    camera.near = 0.01;
    camera.far = 1000;
    camera.updateProjectionMatrix();

    const envLight = new THREE.PointLight(0xffffff, 0.1, 30);
    envLight.position.set(0, 5, 0);
    scene.add(envLight);

    const count = typeof window !== 'undefined' && window.innerWidth < 768
      ? Math.floor(STAR_COUNT * 0.4)
      : STAR_COUNT;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const baseSizes = new Float32Array(count);
    const twinkleSpeeds = new Float32Array(count);
    const twinkleOffsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      const radius = 8 + Math.random() * 4;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) + 2;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      const isLarge = Math.random() < 0.05;
      baseSizes[i] = isLarge ? 0.08 : 0.03;
      sizes[i] = baseSizes[i];
      twinkleSpeeds[i] = 0.5 + Math.random() * 2.5;
      twinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starTexture = createCircleTexture(
      'rgba(255,255,255,1)',
      'rgba(200,169,110,0)'
    );
    const starMaterial = new THREE.PointsMaterial({
      map: starTexture,
      size: 0.04,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    const shootingStars: { line: THREE.Line; progress: number; speed: number; direction: THREE.Vector3; headPos: THREE.Vector3 }[] = [];
    let nextShootingStar = 2 + Math.random() * 3;

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;

      for (let i = 0; i < count; i++) {
        sizes[i] = baseSizes[i] * (0.7 + 0.6 * Math.sin(time * twinkleSpeeds[i] + twinkleOffsets[i]));
      }
      starGeo.attributes.size.needsUpdate = true;
      starMaterial.opacity = 0.85 + 0.15 * Math.sin(time * 1.2);

      nextShootingStar -= 0.016;
      if (nextShootingStar <= 0 && shootingStars.length < 4) {
        nextShootingStar = 2 + Math.random() * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = 0.1 + Math.random() * 0.3;
        const radius = 10;
        const startPos = new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi) + 2,
          radius * Math.sin(phi) * Math.sin(theta)
        );
        const direction = new THREE.Vector3(-startPos.x, -startPos.y * 0.3, -startPos.z).normalize();
        const trailPoints: THREE.Vector3[] = [];
        for (let t = 0; t < 20; t++) {
          trailPoints.push(startPos.clone().add(direction.clone().multiplyScalar(-t * 0.15)));
        }
        const lineGeo = new THREE.BufferGeometry().setFromPoints(trailPoints);
        const lineMat = new THREE.LineBasicMaterial({
          color: 0xffeedd,
          transparent: true,
          opacity: 0.8,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        scene.add(line);
        shootingStars.push({
          line,
          progress: 0,
          speed: 0.04 + Math.random() * 0.03,
          direction,
          headPos: startPos.clone(),
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.headPos.add(ss.direction.clone().multiplyScalar(ss.speed));
        ss.progress += ss.speed * 0.5;
        const posAttr = ss.line.geometry.attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < 20; j++) {
          const p = ss.headPos.clone().add(ss.direction.clone().multiplyScalar(-j * 0.15));
          posAttr.setXYZ(j, p.x, p.y, p.z);
        }
        posAttr.needsUpdate = true;
        (ss.line.material as THREE.LineBasicMaterial).opacity = Math.max(0, 1 - ss.progress);
        if (ss.progress > 1) {
          scene.remove(ss.line);
          ss.line.geometry.dispose();
          (ss.line.material as THREE.Material).dispose();
          shootingStars.splice(i, 1);
        }
      }

      const scrollProgress = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      camera.position.y = -2 + scrollProgress * 1.5;
      camera.lookAt(0, 1 - scrollProgress * 0.5, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    gsap.from(camera.position, { y: -8, duration: 2.5, ease: 'power3.out' });
    gsap.from(starMaterial, { opacity: 0, duration: 2, ease: 'power2.out' });

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
      starTexture.dispose();
      shootingStars.forEach((ss) => {
        ss.line.geometry.dispose();
        (ss.line.material as THREE.Material).dispose();
      });
      disposeScene(renderer, scene);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full min-h-[520px] h-[520px] bg-[#0A0A0A]" />;
}

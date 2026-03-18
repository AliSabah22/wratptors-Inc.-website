'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function RacingStripesCardCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(48, 300 / 230, 0.01, 500);
    camera.position.set(0, 0, 2.2);
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(0xffe4a0, 2, 10);
    key.position.set(1, 2, 2);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8a96e, 1, 8);
    fill.position.set(-1, -1, 1);
    scene.add(fill);

    const hoodGeo = new THREE.PlaneGeometry(2.8, 2.0);
    const hoodMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.7, roughness: 0.3 });
    const hood = new THREE.Mesh(hoodGeo, hoodMat);
    hood.position.z = -0.02;
    scene.add(hood);

    const stripeWidth = 0.18;
    const stripeHeight = 2.2;
    const stripes: THREE.Mesh[] = [];

    for (let i = 0; i < 2; i++) {
      const xPos = i === 0 ? -0.24 : 0.24;
      const stripeGeo = new THREE.PlaneGeometry(stripeWidth, stripeHeight);
      const stripeMat = new THREE.MeshStandardMaterial({
        color: 0xc8a96e,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xc8a96e,
        emissiveIntensity: 0.25,
      });
      const stripe = new THREE.Mesh(stripeGeo, stripeMat);
      stripe.position.set(xPos, 0, 0);
      scene.add(stripe);
      stripes.push(stripe);
    }

    gsap.from(camera.position, { z: 5, duration: 1.2, ease: 'power3.out' });
    gsap.from(
      stripes.map((s) => s.position),
      { y: 2, duration: 0.9, ease: 'power3.out', stagger: 0.1 }
    );

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      camera.position.x = Math.sin(time * 0.5) * 0.15;
      camera.lookAt(0, 0, 0);
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
      hoodGeo.dispose();
      hoodMat.dispose();
      stripes.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="stripes-card-canvas" className="service-model-canvas" />;
}

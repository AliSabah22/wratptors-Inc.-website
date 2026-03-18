'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function PenCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(42, 300 / 230, 0.01, 500);
    camera.position.set(0, 0, 3.5);
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

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const key = new THREE.PointLight(0xffe4a0, 4.0, 10);
    key.position.set(2, 3, 3);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8a96e, 2.5, 8);
    fill.position.set(-2, 0, 2);
    scene.add(fill);
    const rim = new THREE.PointLight(0xffffff, 1.2, 6);
    rim.position.set(0, -2, -2);
    scene.add(rim);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc8a96e,
      metalness: 0.95,
      roughness: 0.06,
      emissive: 0xc8a96e,
      emissiveIntensity: 0.18,
    });

    const barrelGeo = new THREE.CylinderGeometry(0.09, 0.09, 1.8, 12);
    const barrel = new THREE.Mesh(barrelGeo, goldMat);

    const tipGeo = new THREE.ConeGeometry(0.09, 0.35, 12);
    const tip = new THREE.Mesh(tipGeo, goldMat);
    tip.position.y = -1.075;
    tip.rotation.z = Math.PI;

    const capGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.1, 12);
    const cap = new THREE.Mesh(capGeo, goldMat);
    cap.position.y = 0.95;

    const clipGeo = new THREE.BoxGeometry(0.04, 1.2, 0.06);
    const clip = new THREE.Mesh(clipGeo, goldMat);
    clip.position.set(0.11, 0.3, 0);

    const pen = new THREE.Group();
    pen.add(barrel, tip, cap, clip);
    pen.rotation.z = 0.4;
    scene.add(pen);

    gsap.from(pen.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: 'back.out(2)' });
    gsap.from(pen.rotation, { y: -Math.PI, duration: 1.2, ease: 'power3.out' });

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      pen.rotation.z = 0.4 + Math.sin(time * 0.6) * 0.08;
      pen.position.y = Math.sin(time * 0.9) * 0.06;
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
      barrelGeo.dispose();
      tipGeo.dispose();
      capGeo.dispose();
      clipGeo.dispose();
      goldMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="pen-canvas" className="service-model-canvas" />;
}

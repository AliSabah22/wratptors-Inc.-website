'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ShieldCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(40, 300 / 230, 0.01, 500);
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

    const shape = new THREE.Shape();
    shape.moveTo(0, 1.2);
    shape.bezierCurveTo(0.8, 1.2, 1.2, 0.8, 1.2, 0.2);
    shape.bezierCurveTo(1.2, -0.4, 0.8, -0.9, 0, -1.3);
    shape.bezierCurveTo(-0.8, -0.9, -1.2, -0.4, -1.2, 0.2);
    shape.bezierCurveTo(-1.2, 0.8, -0.8, 1.2, 0, 1.2);

    const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 };
    const shieldGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    shieldGeo.computeBoundingBox();
    const box = shieldGeo.boundingBox!;
    const center = new THREE.Vector3();
    box.getCenter(center);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0xc8a96e,
      metalness: 0.95,
      roughness: 0.06,
      emissive: 0xc8a96e,
      emissiveIntensity: 0.2,
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shield.position.sub(center);
    scene.add(shield);

    gsap.from(shield.rotation, { y: -Math.PI, duration: 1.2, ease: 'power3.out' });
    gsap.from(shield.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: 'back.out(2)' });

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      shield.rotation.y = Math.sin(time * 0.8) * 0.3;
      shield.position.y = Math.sin(time * 1.2) * 0.06;
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
      shieldGeo.dispose();
      shieldMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="shield-canvas" className="service-model-canvas" />;
}

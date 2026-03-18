'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function SprayBottleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(42, 300 / 230, 0.01, 500);
    camera.position.set(0, 0.2, 3.5);
    camera.lookAt(0, 0.2, 0);
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

    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.38, 1.4, 16);
    const body = new THREE.Mesh(bodyGeo, goldMat);
    body.position.y = 0;

    const neckGeo = new THREE.CylinderGeometry(0.14, 0.28, 0.35, 16);
    const neck = new THREE.Mesh(neckGeo, goldMat);
    neck.position.y = 0.875;

    const nozzleGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 8);
    const nozzle = new THREE.Mesh(nozzleGeo, goldMat);
    nozzle.rotation.z = Math.PI / 2;
    nozzle.position.set(0.3, 1.05, 0);

    const triggerGeo = new THREE.BoxGeometry(0.08, 0.4, 0.1);
    const trigger = new THREE.Mesh(triggerGeo, goldMat);
    trigger.position.set(0.35, 0.65, 0);
    trigger.rotation.z = -0.3;

    const bottle = new THREE.Group();
    bottle.add(body, neck, nozzle, trigger);
    scene.add(bottle);

    gsap.from(bottle.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: 'back.out(2)' });

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      bottle.rotation.y += 0.006;
      bottle.position.y = Math.sin(time * 1.1) * 0.05;
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
      bodyGeo.dispose();
      neckGeo.dispose();
      nozzleGeo.dispose();
      triggerGeo.dispose();
      goldMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="spray-bottle-canvas" className="service-model-canvas" />;
}

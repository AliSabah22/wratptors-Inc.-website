'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function SteeringWheelCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(45, 300 / 230, 0.01, 500);
    camera.position.set(0, 0, 2.8);
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

    const rimGeo = new THREE.TorusGeometry(0.8, 0.07, 12, 60);
    const rimMesh = new THREE.Mesh(rimGeo, goldMat);

    const spokeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const spoke1 = new THREE.Mesh(spokeGeo, goldMat);
    spoke1.rotation.z = Math.PI / 2;
    spoke1.position.x = 0.4;

    const spoke2 = new THREE.Mesh(spokeGeo.clone(), goldMat);
    spoke2.rotation.z = Math.PI / 2 + (Math.PI * 2) / 3;
    spoke2.position.set(-0.35, -0.35, 0);

    const spoke3 = new THREE.Mesh(spokeGeo.clone(), goldMat);
    spoke3.rotation.z = Math.PI / 2 + (Math.PI * 4) / 3;
    spoke3.position.set(-0.35, 0.35, 0);

    const hubGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.1, 16);
    hubGeo.rotateX(Math.PI / 2);
    const hub = new THREE.Mesh(hubGeo, goldMat);

    const wheel = new THREE.Group();
    wheel.add(rimMesh, spoke1, spoke2, spoke3, hub);
    wheel.rotation.x = 0.3;
    scene.add(wheel);

    gsap.from(wheel.rotation, { z: -Math.PI, duration: 1.4, ease: 'power3.out' });
    gsap.from(wheel.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'back.out(1.8)' });

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      wheel.rotation.z += 0.004;
      wheel.position.y = Math.sin(time * 0.9) * 0.05;
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
      rimGeo.dispose();
      spokeGeo.dispose();
      hubGeo.dispose();
      goldMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="steering-wheel-canvas" className="service-model-canvas" />;
}

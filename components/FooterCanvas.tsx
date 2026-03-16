'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function FooterCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const aspect = container.offsetWidth / container.offsetHeight;
    const cam = new THREE.PerspectiveCamera(50, aspect, 0.01, 500);
    cam.position.set(0, 0, 8);
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();

    const shape = new THREE.Shape();
    shape.moveTo(-4, 2);
    shape.lineTo(-3.2, 2);
    shape.lineTo(-2, -1.2);
    shape.lineTo(-0.8, 1.5);
    shape.lineTo(0, 1.5);
    shape.lineTo(0.8, 1.5);
    shape.lineTo(2, -1.2);
    shape.lineTo(3.2, 2);
    shape.lineTo(4, 2);
    shape.lineTo(3.4, 2);
    shape.lineTo(2.2, -1.5);
    shape.lineTo(1.0, 1.8);
    shape.lineTo(0, 1.8);
    shape.lineTo(-1.0, 1.8);
    shape.lineTo(-2.2, -1.5);
    shape.lineTo(-3.4, 2);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc8a96e,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0xc8a96e,
      emissiveIntensity: 0.08,
    });
    const wMesh = new THREE.Mesh(geometry, material);
    geometry.computeBoundingBox();
    const wCenter = new THREE.Vector3();
    geometry.boundingBox!.getCenter(wCenter);
    wMesh.position.sub(wCenter);
    scene.add(wMesh);
    scene.add(new THREE.AmbientLight(0xc8a96e, 1));

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = false;
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.willChange = 'transform';

    const resize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', resize);

    let footerTime = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      footerTime += 0.016;
      wMesh.rotation.y = Math.sin(footerTime * 0.2) * 0.08;
      wMesh.rotation.x = Math.sin(footerTime * 0.15) * 0.04;
      renderer.render(scene, cam);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="footer-canvas"
      className="footer-canvas-bg"
    />
  );
}

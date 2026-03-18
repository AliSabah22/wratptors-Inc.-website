'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function WindowTintCardCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(42, 300 / 230, 0.01, 500);
    camera.position.set(0, 0.1, 3.2);
    camera.lookAt(0, 0.1, 0);
    camera.near = 0.01;
    camera.far = 500;
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.localClippingEnabled = true;
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
    shape.moveTo(-1.1, -0.8);
    shape.lineTo(-1.1, 0.1);
    shape.quadraticCurveTo(-1.0, 0.85, -0.4, 1.0);
    shape.lineTo(0.4, 1.0);
    shape.quadraticCurveTo(1.0, 0.85, 1.1, 0.1);
    shape.lineTo(1.1, -0.8);
    shape.closePath();

    const extrudeSettings = { depth: 0.05, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const tintedMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.92,
      metalness: 0.3,
      roughness: 0.1,
      side: THREE.FrontSide,
    });
    tintedMat.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.05)];
    const tintedMesh = new THREE.Mesh(geometry.clone(), tintedMat);
    scene.add(tintedMesh);

    const clearMat = new THREE.MeshStandardMaterial({
      color: 0x88bbdd,
      transparent: true,
      opacity: 0.18,
      metalness: 0.1,
      roughness: 0.05,
      side: THREE.FrontSide,
    });
    clearMat.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.05)];
    const clearMesh = new THREE.Mesh(geometry.clone(), clearMat);
    scene.add(clearMesh);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.1, 0.05, 0.06),
      new THREE.Vector3(1.1, 0.05, 0.06),
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc8a96e });
    const line = new THREE.Line(lineGeo, lineMat);
    scene.add(line);

    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x444444 });
    scene.add(new THREE.LineSegments(edges, edgeMat));

    gsap.from(scene.rotation, { y: -0.5, duration: 1.2, ease: 'power3.out' });

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      scene.rotation.y += 0.006;
      scene.position.y = Math.sin(time * 1.1) * 0.04;
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
      tintedMesh.geometry.dispose();
      clearMesh.geometry.dispose();
      tintedMat.dispose();
      clearMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      edges.dispose();
      edgeMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="window-tint-card-canvas" className="service-model-canvas" />;
}

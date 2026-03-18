'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export default function CaliperCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(44, 300 / 230, 0.01, 500);
    camera.position.set(0, 0.15, 2.4);
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

    let groupRef: THREE.Group | null = null;

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc8a96e,
      metalness: 0.95,
      roughness: 0.06,
      emissive: 0xc8a96e,
      emissiveIntensity: 0.22,
    });

    const loader = new GLTFLoader();
    loader.load(
      '/assets/Break%20caliper.glb',
      (gltf) => {
        const model = gltf.scene;
        const pivotGroup = new THREE.Group();
        pivotGroup.add(model);
        scene.add(pivotGroup);

        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const TARGET = 1.7;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);

        pivotGroup.rotation.y = Math.PI / 3;
        pivotGroup.rotation.x = -0.12;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            if (Array.isArray(m.material)) m.material.forEach((mat) => (mat as THREE.Material).dispose());
            else if (m.material) (m.material as THREE.Material).dispose();
            m.material = goldMat;
          }
        });

        groupRef = pivotGroup;
        gsap.from(pivotGroup.rotation, { y: pivotGroup.rotation.y - Math.PI, duration: 1.0, ease: 'power3.out' });
        gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'back.out(2)' });
      },
      undefined,
      (err) => console.error('Caliper load failed:', err)
    );

    const resize = () => {
      if (!containerRef.current) return;
      camera.aspect = 300 / 230;
      camera.updateProjectionMatrix();
      renderer.setSize(300, 230);
    };
    window.addEventListener('resize', resize);

    let time = 0;
    let rafId: number;

    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      if (groupRef) {
        groupRef.rotation.y += 0.005;
        groupRef.position.y = Math.sin(time * 1.1) * 0.04;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      goldMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="caliper-canvas" className="service-model-canvas" />;
}

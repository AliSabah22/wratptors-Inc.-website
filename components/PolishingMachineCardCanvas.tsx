'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

export default function PolishingMachineCardCanvas() {
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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(300, 230);
    renderer.setClearColor(0x000000, 0);
    if (renderer.toneMapping !== undefined) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
    }
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const key = new THREE.PointLight(0xffe4a0, 8.0, 20);
    key.position.set(1.5, 2.5, 3);
    scene.add(key);
    const fill = new THREE.PointLight(0xc8a96e, 6.0, 16);
    fill.position.set(-1.5, 0, 2);
    scene.add(fill);
    const rim = new THREE.PointLight(0xffffff, 3.0, 14);
    rim.position.set(0, -2, -2);
    scene.add(rim);
    const front = new THREE.PointLight(0xffe4a0, 5.0, 16);
    front.position.set(0, 0, 4);
    scene.add(front);
    const top = new THREE.PointLight(0xffffff, 4.0, 14);
    top.position.set(0, 3, 0);
    scene.add(top);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(0, 0, 5);
    dir.target.position.set(0, 0, 0);
    scene.add(dir);
    scene.add(dir.target);

    const GOLD_COLOR = 0xd4af37;

    let modelRef: THREE.Object3D | null = null;

    const loader = new GLTFLoader();
    loader.load(
      '/assets/polishing%20machine.glb',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const TARGET = 1.4;
        model.scale.setScalar(TARGET / maxDim);
        const box2 = new THREE.Box3().setFromObject(model);
        const center2 = new THREE.Vector3();
        box2.getCenter(center2);
        model.position.sub(center2);

        let meshCount = 0;
        model.traverse((child) => {
          const obj = child as THREE.Mesh;
          if (obj.isMesh && obj.geometry) {
            if (Array.isArray(obj.material)) obj.material.forEach((mat) => (mat as THREE.Material).dispose());
            else if (obj.material) (obj.material as THREE.Material).dispose();
            obj.material = new THREE.MeshStandardMaterial({
              color: GOLD_COLOR,
              metalness: 0.9,
              roughness: 0.1,
              emissive: GOLD_COLOR,
              emissiveIntensity: 0.75,
              side: THREE.DoubleSide,
            });
            meshCount += 1;
          }
        });
        if (process.env.NODE_ENV === 'development') {
          console.log('Gold material applied to N meshes:', meshCount);
        }
        modelRef = model;

        gsap.from(model.rotation, { y: -Math.PI, duration: 1.2, ease: 'power3.out' });
        gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 0.9, ease: 'back.out(2)' });
      },
      undefined,
      (err) => console.warn('Polishing machine model failed to load:', err)
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
      if (modelRef) {
        modelRef.rotation.y += 0.006;
        modelRef.position.y = Math.sin(time * 1.0) * 0.05;
      }
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
      if (modelRef) {
        modelRef.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            const mat = m.material as THREE.Material | THREE.Material[];
            if (Array.isArray(mat)) mat.forEach((a) => a.dispose());
            else if (mat) mat.dispose();
          }
        });
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} id="polishing-machine-canvas" className="service-model-canvas" />;
}

'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

const W = 480;
const H = 280;
const CARD_GLB_PATHS = ['/assets/credit%20card.glb', '/assets/credit card.glb'];

export default function CardCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const camera = new THREE.PerspectiveCamera(28, W / H, 0.01, 1000);
    camera.position.set(0, 0, 3.8);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const scene = new THREE.Scene();

    // Strong lighting so card is never black
    scene.add(new THREE.AmbientLight(0xffffff, 1.8));
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(2, 2, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.8);
    fill.position.set(-2, 0, 3);
    scene.add(fill);
    const front = new THREE.DirectionalLight(0xffffff, 1.0);
    front.position.set(0, 0, 5);
    scene.add(front);

    let pivotGroup: THREE.Group | null = null;
    let cardBaseY = 0;
    let cardTime = 0;

    const loader = new GLTFLoader();
    let pathIndex = 0;

    function tryLoad() {
      loader.load(
        CARD_GLB_PATHS[pathIndex],
        onModelLoad,
        undefined,
        (err) => {
          pathIndex++;
          if (pathIndex < CARD_GLB_PATHS.length) tryLoad();
          else console.error('Credit card failed to load:', err);
        }
      );
    }

    function onModelLoad(gltf: { scene: THREE.Group }) {
      const model = gltf.scene;
      const pivot = new THREE.Group();
      pivot.add(model);
      scene.add(pivot);

      // Reset model transforms
      model.position.set(0, 0, 0);
      model.rotation.set(0, 0, 0);
      model.scale.set(1, 1, 1);
      model.updateMatrixWorld(true);

      // Detect thin axis and stand card up so face is toward +Z
      const rawBox = new THREE.Box3().setFromObject(model);
      const rawSize = new THREE.Vector3();
      rawBox.getSize(rawSize);
      const mx = rawSize.x;
      const my = rawSize.y;
      const mz = rawSize.z;
      const minDim = Math.min(mx, my, mz);

      if (minDim === my) {
        model.rotation.x = Math.PI / 2;
      } else if (minDim === mx) {
        model.rotation.y = Math.PI / 2;
      }
      // else minDim === mz: face already toward +Z

      model.updateMatrixWorld(true);

      // Two-pass center inside pivot (like CaliperCanvas)
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);
      model.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const TARGET = 1.7;
      model.scale.setScalar(TARGET / maxDim);

      model.updateMatrixWorld(true);
      const box2 = new THREE.Box3().setFromObject(model);
      const center2 = new THREE.Vector3();
      box2.getCenter(center2);
      model.position.sub(center2);

      // Pivot stays at origin; rotation shows card face to camera
      pivot.position.set(0, 0, 0);
      pivot.rotation.x = -0.35;
      pivot.rotation.y = Math.PI;
      pivot.rotation.z = 0;
      cardBaseY = pivot.position.y;

      // Bright material so card is always visible
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.material = new THREE.MeshStandardMaterial({
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x000000,
            emissiveIntensity: 0,
          });
        }
      });

      pivotGroup = pivot;
      if (typeof window !== 'undefined') (window as unknown as { cardModel?: THREE.Object3D }).cardModel = pivot;

      gsap.from(pivot.rotation, { x: pivot.rotation.x - Math.PI / 2, duration: 1.4, ease: 'power3.out' });
      gsap.from(model.scale, { x: 0, y: 0, z: 0, duration: 1, ease: 'back.out(1.6)' });
    }

    tryLoad();

    let rafId: number;
    function animateCard() {
      rafId = requestAnimationFrame(animateCard);
      if (document.hidden || !wrapperRef.current?.contains(canvas)) return;
      cardTime += 0.012;
      if (pivotGroup) {
        pivotGroup.rotation.y = Math.PI + Math.sin(cardTime * 0.5) * 0.15;
        pivotGroup.rotation.x = -0.35 + Math.sin(cardTime * 0.3) * 0.05;
        pivotGroup.position.y = cardBaseY + Math.sin(cardTime * 0.8) * 0.04;
      }
      renderer.render(scene, camera);
    }
    animateCard();

    const onResize = () => {
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      if (pivotGroup) {
        pivotGroup.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.geometry?.dispose();
            (m.material as THREE.Material)?.dispose();
          }
        });
      }
      if (typeof window !== 'undefined') delete (window as unknown as { cardModel?: THREE.Object3D }).cardModel;
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="card-canvas"
      style={{
        width: W,
        height: H,
        position: 'relative',
        flexShrink: 0,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: W, height: H, display: 'block', position: 'relative', zIndex: 1 }}
        width={W}
        height={H}
      />
    </div>
  );
}

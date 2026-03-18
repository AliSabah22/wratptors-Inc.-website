'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { applyModelCorrection, recenterAfterTransform } from '@/lib/modelBounds';
import { loaderLogoTransforms, modelTargetDisplaySizes } from '@/lib/transformConfigs';

const LOADER_DURATION_MS = 1500;
const ROTATION_SPEED = (Math.PI * 2) / 10;
const INITIAL_ROTATION_Y = 0;

type LoaderProps = {
  onFinish: () => void;
};

export default function Loader({ onFinish }: LoaderProps) {
  const [hidden, setHidden] = useState(false);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const bar = document.getElementById('loaderBar');
    const text = document.getElementById('loaderText');
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / LOADER_DURATION_MS, 1);
      if (bar) bar.style.width = `${Math.round(progress * 100)}%`;
      if (text) text.textContent = progress >= 1 ? 'Ready' : 'Loading experience';
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHidden(true);
          onFinish();
        }, 500);
      }
    };
    requestAnimationFrame(tick);
  }, [onFinish]);

  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    const scene = new THREE.Scene();
    scene.background = null as unknown as THREE.Color;
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 2.85);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    wrap.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(2, 2, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(-1, 0.5, 2);
    scene.add(fill);

    let model: THREE.Object3D | null = null;
    const onLogoLoaded = (gltf: { scene: THREE.Group }) => {
      model = gltf.scene;
      scene.add(model);
      model.rotation.y = INITIAL_ROTATION_Y;

      const targetDisplaySize = modelTargetDisplaySizes.loaderLogo;
      applyModelCorrection(model, { targetDisplaySize });
      recenterAfterTransform(model);
      const layout = loaderLogoTransforms.desktop;
      model.position.x = layout.position[0];
      model.position.y = layout.position[1];
      model.position.z = layout.position[2];
      model.rotation.x = layout.rotation[0];
      model.rotation.y += layout.rotation[1];
      model.rotation.z = layout.rotation[2];
      model.scale.multiplyScalar(layout.scale);
    };
    const onLogoError = () => {
      const geo = new THREE.TorusKnotGeometry(0.4, 0.12, 64, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0xc8a96e });
      const mesh = new THREE.Mesh(geo, mat);
      model = mesh;
      mesh.rotation.y = INITIAL_ROTATION_Y;
      scene.add(mesh);
    };

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/assets/Logo%20Model.glb',
      onLogoLoaded,
      undefined,
      (err) => {
        gltfLoader.load('/assets/Logo Model.glb', onLogoLoaded, undefined, () => onLogoError());
      }
    );

    const resize = () => {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    resize();
    const resizeAfterLayout = () => {
      requestAnimationFrame(() => resize());
    };
    resizeAfterLayout();
    window.addEventListener('resize', resize);

    let lastTime = performance.now();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!wrap.contains(renderer.domElement)) return;
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (model) model.rotation.y -= ROTATION_SPEED * dt;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      className={`loader ${hidden ? 'hidden' : ''}`}
      id="loader"
      aria-hidden={hidden}
    >
      <div className="loader-logo-canvas" ref={canvasWrapRef} />
      <div className="loader-bar-wrap">
        <div
          className="loader-bar"
          id="loaderBar"
          style={{ width: '0%' }}
        />
      </div>
      <div className="loader-text" id="loaderText">
        Loading experience
      </div>
    </div>
  );
}

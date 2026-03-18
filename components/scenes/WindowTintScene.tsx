'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { setupRenderer, disposeScene } from '@/lib/threeUtils';

const TINT_LABELS: Record<number, string> = {
  5: 'Limo Dark — Maximum privacy',
  20: 'Dark — High privacy',
  35: 'Standard — Recommended',
  50: 'Medium — Light tint',
  70: 'Light — Minimal tint',
};

function getTintLabel(value: number): string {
  const keys = Object.keys(TINT_LABELS).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - value) <= Math.abs(closest - value)) closest = k;
  }
  return TINT_LABELS[closest] ?? `${value}%`;
}

export default function WindowTintScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [tintLevel, setTintLevel] = useState(35);
  const updateTintRef = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = 560;
    const height = 400;
    const { renderer } = setupRenderer(container, width, height);
    renderer.setClearColor(0x0a0a0a, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.z = 3.5;
    camera.near = 0.01;
    camera.far = 1000;
    camera.updateProjectionMatrix();

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pl1 = new THREE.PointLight(0xffffff, 1.5, 20);
    pl1.position.set(2, 2, 3);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xc8a96e, 0.8, 20);
    pl2.position.set(-2, -1, 2);
    scene.add(pl2);

    const shape = new THREE.Shape();
    shape.moveTo(-1.4, -1.0);
    shape.lineTo(-1.4, 0.2);
    shape.quadraticCurveTo(-1.3, 1.0, -0.6, 1.2);
    shape.lineTo(0.6, 1.2);
    shape.quadraticCurveTo(1.3, 1.0, 1.4, 0.2);
    shape.lineTo(1.4, -1.0);
    shape.closePath();

    const extrudeSettings = { depth: 0.04, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const tintedMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      transparent: true,
      opacity: (100 - 35) / 100 * 0.92,
      side: THREE.DoubleSide,
    });
    const tintedMesh = new THREE.Mesh(geometry.clone(), tintedMat);
    scene.add(tintedMesh);

    const clearMat = new THREE.MeshStandardMaterial({
      color: 0x88aacc,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const clearMesh = new THREE.Mesh(geometry.clone(), clearMat);
    scene.add(clearMesh);

    const tintClipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
    const clearClipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    tintedMesh.material.clippingPlanes = [tintClipPlane];
    clearMesh.material.clippingPlanes = [clearClipPlane];

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.4, 0, 0.05),
      new THREE.Vector3(1.4, 0, 0.05),
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xc8a96e });
    const dividerLine = new THREE.Line(lineGeo, lineMat);
    scene.add(dividerLine);

    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x333333 });
    scene.add(new THREE.LineSegments(edges, edgeMat));

    function updateTint(value: number) {
      tintedMat.opacity = ((100 - value) / 100) * 0.92;
      const yBound = (value / 100) * 2.2 - 1.1;
      tintClipPlane.constant = -yBound;
      clearClipPlane.constant = yBound;
      dividerLine.position.y = yBound;
    }
    updateTintRef.current = updateTint;
    updateTint(tintLevel);

    let time = 0;
    let rafId: number;
    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      time += 0.016;
      scene.rotation.y = Math.sin(time * 0.4) * 0.06;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onResize = () => {
      const w = container.offsetWidth || width;
      const h = container.offsetHeight || height;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    if (canvasRef.current) {
      gsap.from(canvasRef.current, { opacity: 0, duration: 1.2, ease: 'power2.out' });
      gsap.from(scene.rotation, { y: -0.4, duration: 1.5, ease: 'power3.out' });
    }

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      geometry.dispose();
      disposeScene(renderer, scene);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    updateTintRef.current?.(tintLevel);
  }, [tintLevel]);

  const tintLabelPercent = tintLevel <= 15 ? 12 : tintLevel <= 40 ? 8 : 5;
  const clearLabelPercent = 100 - tintLabelPercent;

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <div ref={canvasRef} className="relative w-full overflow-hidden rounded bg-[#0A0A0A]" style={{ width: 560, height: 400, maxWidth: '100%', minHeight: 400 }}>
        <div
          className="absolute right-4 text-xs font-medium text-[#C8A96E] z-10 pointer-events-none"
          style={{ top: `${tintLabelPercent}%`, transform: 'translateY(-50%)' }}
        >
          TINTED
        </div>
        <div
          className="absolute right-4 text-xs text-[#888] z-10 pointer-events-none"
          style={{ top: `${clearLabelPercent}%`, transform: 'translateY(-50%)' }}
        >
          CLEAR
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-[11px] uppercase tracking-widest text-[#888] font-normal">
          Tint level
        </label>
        <input
          type="range"
          min={5}
          max={90}
          step={5}
          value={tintLevel}
          onChange={(e) => setTintLevel(Number(e.target.value))}
          className="window-tint-slider w-full h-2 rounded-full appearance-none cursor-pointer bg-[#222]"
          style={{
            background: `linear-gradient(to right, #C8A96E 0%, #C8A96E ${((tintLevel - 5) / 85) * 100}%, #222 ${((tintLevel - 5) / 85) * 100}%, #222 100%)`,
          }}
        />
        <p className="text-xs text-[#C8A96E]">
          {tintLevel}% — {getTintLabel(tintLevel)}
        </p>
      </div>
    </div>
  );
}

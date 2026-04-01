import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { scrollState } from '../utils/scrollStore';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export default function BookModel() {
  const groupRef = useRef();
  const leftWingRef = useRef();
  const rightWingRef = useRef();
  const { viewport } = useThree();

  // Materials
  const coverColor = '#2563eb'; // Deep premium blue
  const coverMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: coverColor, roughness: 0.6 }), []);
  const spineMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: coverColor, roughness: 0.6 }), []);

  const pageTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#cbd5e1'; 
    ctx.lineWidth = 2;
    for (let i = 50; i < 512; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
    
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 0);
    ctx.lineTo(60, 512);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  const pagesMaterials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({ color: '#f1f5f9', roughness: 0.9 });
    const lined = new THREE.MeshStandardMaterial({ map: pageTexture, roughness: 0.9 });
    return [edge, edge, edge, edge, lined, lined];
  }, [pageTexture]);

  // Precise Book Dimensions
  const w = 2.6; // Width of single page
  const h = 3.8; // Height
  const cThick = 0.08; // Cover thickness
  const pThick = 0.3; // Thickness of the page block on each side
  const spineWidth = pThick * 2; // Perfectly encloses both page blocks

  useFrame((state, delta) => {
    // p=0 (Top of page) -> Book is CLOSED
    // p=1 (Scrolled down) -> Book is OPEN
    const p = scrollState.progress;

    // 1. BUTTERFLY OPENING ANIMATION
    // Left wing rotates from +90 deg (closed) to 0 deg (open)
    const leftRot = THREE.MathUtils.lerp(Math.PI / 2, 0, p);
    // Right wing rotates from -90 deg (closed) to 0 deg (open)
    const rightRot = THREE.MathUtils.lerp(-Math.PI / 2, 0, p);

    leftWingRef.current.rotation.y = THREE.MathUtils.lerp(leftWingRef.current.rotation.y, leftRot, 0.1);
    rightWingRef.current.rotation.y = THREE.MathUtils.lerp(rightWingRef.current.rotation.y, rightRot, 0.1);

    // 2. DIAGONAL MOVEMENT ACROSS SCREEN
    // Place perfectly to the right beside the title exactly
    const startX = viewport.width > 8 ? 3.5 : 2.5;
    const startY = 0; // Centers it perfectly on the Y axis next to the title
    
    // Diagonal across the screen to the opposite corner
    const endX = -3.5;
    const endY = -(viewport.height / 2) * 0.8;

    const targetX = THREE.MathUtils.lerp(startX, endX, p);
    const targetY = THREE.MathUtils.lerp(startY, endY, p);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

    // 3. CINEMATIC 3D GROUP ROTATION
    // When Closed (p=0), rotate group so the Front Cover (Right Wing outer face) points to the Camera
    const groupStartRotY = -Math.PI / 2 - Math.PI / 12; // -90 deg + slight isometric tilt
    // When Open (p=1), flatten it out so we see perfectly inside the book
    const groupEndRotY = 0;

    const groupStartRotX = Math.PI / 6; // Angled down so we can see the top spine edges nicely
    const groupEndRotX = Math.PI / 12;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, THREE.MathUtils.lerp(groupStartRotX, groupEndRotX, p), 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, THREE.MathUtils.lerp(groupStartRotY, groupEndRotY, p), 0.08);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>

      {/* SPINE */}
      {/* Centered at X=0. Forms the rigid back of the book */}
      <mesh position={[0, 0, 0]} material={spineMaterial}>
        <boxGeometry args={[spineWidth + cThick * 2, h + 0.04, cThick]} />
      </mesh>

      {/* LEFT WING (Back Cover + Left Pages) */}
      {/* Hinged exactly at the left edge of the inner spine */}
      <group position={[-spineWidth / 2, 0, cThick / 2]}>
        <group ref={leftWingRef}>
          {/* Cover */}
          <mesh position={[-w / 2, 0, -cThick / 2]} material={coverMaterial}>
            <boxGeometry args={[w, h, cThick]} />
          </mesh>
          {/* Pages */}
          <mesh position={[-(w - 0.05) / 2, 0, pThick / 2]} material={pagesMaterials}>
            <boxGeometry args={[w - 0.05, h - 0.1, pThick]} />
          </mesh>
        </group>
      </group>

      {/* RIGHT WING (Front Cover + Right Pages) */}
      {/* Hinged exactly at the right edge of the inner spine */}
      <group position={[spineWidth / 2, 0, cThick / 2]}>
        <group ref={rightWingRef}>
          {/* Cover */}
          <mesh position={[w / 2, 0, -cThick / 2]} material={coverMaterial}>
            <boxGeometry args={[w, h, cThick]} />
          </mesh>
          {/* Pages */}
          <mesh position={[(w - 0.05) / 2, 0, pThick / 2]} material={pagesMaterials}>
            <boxGeometry args={[w - 0.05, h - 0.1, pThick]} />
          </mesh>

          {/* FRONT COVER BRANDING (Visible when book is closed!) */}
          <Text
            position={[w / 2, 0, -cThick / 2 - 0.05]} // Placed on the outside face of the front cover
            rotation={[0, Math.PI, 0]} // Flipped so it reads correctly from the outside
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            NEXTSCHOLAR
          </Text>
        </group>
      </group>

    </group>
  );
}

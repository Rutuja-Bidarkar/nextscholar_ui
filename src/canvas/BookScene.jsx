import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Preload } from '@react-three/drei';
import BookModel from './BookModel';

export default function BookScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <BookModel />
        </Float>
        <Environment preset="city" />
        <Preload all />
      </Canvas>
    </div>
  );
}

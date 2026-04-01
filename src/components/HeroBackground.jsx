import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { gsap } from 'gsap';

function Blob({ color, position, speed, distort, delay }) {
  const blobRef = useRef();

  useEffect(() => {
    // LAYER 3 - GSAP animation for Blobs
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current.position, {
        x: position[0] + (Math.random() > 0.5 ? 1.5 : -1.5),
        y: position[1] + 1,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });
    return () => ctx.revert();
  }, [position, delay]);

  return (
    <Sphere ref={blobRef} args={[1.5, 64, 64]} scale={2} position={position}>
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={speed}
        roughness={0}
      />
    </Sphere>
  );
}

export default function HeroBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. LAYER 1 — Animated Gradient Base
      gsap.to(".bg-base", {
        backgroundPosition: "200% 50%",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });

      // 2. LAYER 2 — Animated Grid
      gsap.to(".grid-bg", {
        x: -50,
        y: -50,
        duration: 2,
        repeat: -1,
        ease: "linear"
      });

      // 4. LAYER 4 — Multi-Depth Particle System
      const animateLayer = (selector, yDist, durationBase) => {
        gsap.utils.toArray(selector).forEach((p) => {
          // Continuous upward float
          gsap.to(p, {
            y: `-=${yDist}px`,
            x: () => `+=${Math.random() * 100 - 50}px`,
            duration: () => durationBase + Math.random() * 10,
            delay: () => Math.random() * -30,
            repeat: -1,
            ease: "none"
          });
          // Independent pulsating glow
          gsap.to(p, {
            opacity: 0.1, // Fade down to 0.1, yoyo back to native opacity
            scale: 0.5,
            duration: () => 2 + Math.random() * 3,
            delay: () => Math.random() * -10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      };

      animateLayer('.particle-bg', 300, 15);
      animateLayer('.particle-mid', 500, 10);
      animateLayer('.particle-fg', 800, 6);

      // 5. LAYER 5 — Cursor Reactive Glow & Particle Parallax
      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Gentle Cursor Glow
        gsap.to(".cursor-glow", {
          x: mouseX - 200,
          y: mouseY - 200,
          duration: 0.8,
          ease: "power2.out"
        });

        // Delicate Particle Parallax Response
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const offX = (mouseX - cx) / cx;
        const offY = (mouseY - cy) / cy;

        gsap.to(".particles-wrapper-bg", { x: offX * -15, y: offY * -15, duration: 1, ease: "power2.out" });
        gsap.to(".particles-wrapper-mid", { x: offX * -35, y: offY * -35, duration: 1, ease: "power2.out" });
        gsap.to(".particles-wrapper-fg", { x: offX * -60, y: offY * -60, duration: 1, ease: "power2.out" });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, bgRef);

    return () => ctx.revert();
  }, []);

  // Pre-calculate array values grouped by depth
  const particleSystem = React.useMemo(() => {
    const generateParticles = (count, sizeMin, sizeMax, opacityMin, opacityMax) => {
      const colors = ["#a855f7", "#60a5fa", "#e879f9", "#ffffff"];
      return Array.from({ length: count }).map(() => {
        let cx = Math.random();
        let cy = Math.random();
        // Since they float up continuously, we spawn them in a much taller area (150vh) to ensure continuous flow
        return {
          left: `${cx * 100}vw`,
          top: `${cy * 150}vh`, 
          size: `${sizeMin + Math.random() * (sizeMax - sizeMin)}px`,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: opacityMin + Math.random() * (opacityMax - opacityMin),
          blur: `${Math.random() * 2}px`,
          shadow: Math.random() > 0.5 ? `0 0 ${Math.random() * 10 + 5}px rgba(168, 85, 247, 0.8)` : 'none'
        };
      });
    };

    // Substantially increased base sizes and minimum opacities for distinct visibility!
    return {
      bg: generateParticles(180, 2, 4, 0.3, 0.6),   // Massive background cloud
      mid: generateParticles(150, 4, 6, 0.4, 0.8),  // Mid-sized
      fg: generateParticles(80, 6, 8, 0.6, 1.0)     // Fore-ground large and bright!
    };
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* LAYER 1: Base Animated Gradient */}
      <div 
        className="bg-base absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(270deg, #0a0f2c, #1e3a8a, #7c3aed, #0a0f2c)",
          backgroundSize: "400% 400%"
        }}
      />

      {/* LAYER 2: Animated Tech Grid */}
      <div 
        className="grid-bg absolute top-0 left-0"
        style={{
          width: "200vw",
          height: "200vh",
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />

      {/* LAYER 3: 3D Floating Blobs */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          {/* Purple */}
          <Blob color="#7c3aed" position={[-4, 1, 0]} speed={2} distort={0.4} delay={0} />
          {/* Blue */}
          <Blob color="#3b82f6" position={[4, -2, -2]} speed={1.5} distort={0.5} delay={1} />
          {/* Indigo */}
          <Blob color="#4f46e5" position={[0, 3, -4]} speed={2.5} distort={0.3} delay={0.5} />
        </Canvas>
      </div>

      {/* LAYER 4: Hundreds of Tiny Scattered Floating Particles */}
      <div className="absolute inset-0">
        <div className="particles-wrapper-bg absolute inset-0">
          {particleSystem.bg.map((p, i) => (
            <div key={`bg-${i}`} className="particle-bg absolute rounded-full"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color, filter: `blur(${p.blur})`, opacity: p.opacity, boxShadow: p.shadow }} />
          ))}
        </div>
        
        <div className="particles-wrapper-mid absolute inset-0">
          {particleSystem.mid.map((p, i) => (
            <div key={`mid-${i}`} className="particle-mid absolute rounded-full"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color, filter: `blur(${p.blur})`, opacity: p.opacity, boxShadow: p.shadow }} />
          ))}
        </div>

        <div className="particles-wrapper-fg absolute inset-0">
          {particleSystem.fg.map((p, i) => (
            <div key={`fg-${i}`} className="particle-fg absolute rounded-full"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color, filter: `blur(${p.blur})`, opacity: p.opacity, boxShadow: p.shadow }} />
          ))}
        </div>
      </div>

      {/* LAYER 5: Cursor Reactive Glow */}
      <div 
        className="cursor-glow absolute top-0 left-0"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(124,58,237,0.3), transparent)",
          filter: "blur(80px)"
        }}
      />
      
    </div>
  );
}

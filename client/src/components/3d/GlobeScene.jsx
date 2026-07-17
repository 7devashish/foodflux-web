import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

function Globe() {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color="#2DCC70"
        envMapIntensity={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
        metalness={0.1}
        roughness={0.5}
        distort={0.2}
        speed={1}
        wireframe
      />
    </Sphere>
  );
}

export function GlobeScene() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Globe />
      </Canvas>
    </div>
  );
}

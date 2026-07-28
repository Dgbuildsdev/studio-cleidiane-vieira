import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // spherical distribution weighted toward outer shell for depth
      const r = Math.pow(Math.random(), 0.5) * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={new THREE.Color("#e8cfa0")}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function CenterGlow() {
  return (
    <mesh position={[0, 0, -2]}>
      <sphereGeometry args={[1.4, 32, 32]} />
      <meshBasicMaterial
        color="#f0d9a8"
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="pointer-events-none"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#e8cfa0" />
        <CenterGlow />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}

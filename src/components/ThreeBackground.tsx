import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Particle field — 4 000 points in 3-D space
// Reacts to mouse (parallax tilt) + scroll (camera flies forward)
// ---------------------------------------------------------------------------
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);

  // Build geometry once
  const { positions, colors } = useMemo(() => {
    const count = 1000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color("#22d3ee");
    const indigo = new THREE.Color("#818cf8");
    const white = new THREE.Color("#e0f2fe");

    for (let i = 0; i < count; i++) {
      // Distribute in a wide, deep box — more depth than width for flythrough feel
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;

      // 45% cyan, 30% indigo, 25% white
      const t = Math.random();
      const c = t < 0.45 ? cyan : t < 0.75 ? indigo : white;
      col[i * 3 + 0] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  // Larger "star" accent layer — sparse bright points
  const starPositions = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 38;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;

    // Slow auto-drift on Y axis
    meshRef.current.rotation.y = t * 0.018;

    // Mouse parallax — smooth lerp toward target
    const targetX = state.mouse.y * -0.12;
    const targetZ = state.mouse.x * 0.08;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * 0.04;

    // Scroll: camera drifts forward + slightly down
    const scrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

    state.camera.position.z = 9 - progress * 5;
    state.camera.position.y = -progress * 1.5;
    // Subtle camera tilt follows mouse
    state.camera.rotation.x +=
      (state.mouse.y * 0.03 - state.camera.rotation.x) * 0.03;
    state.camera.rotation.y +=
      (-state.mouse.x * 0.03 - state.camera.rotation.y) * 0.03;
  });

  return (
    <group ref={meshRef}>
      {/* Main particle cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Accent bright stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#e0f2fe"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Floating geometric accent — subtle wireframe icosahedron
// Drifts slowly, reacts to mouse rotation
// ---------------------------------------------------------------------------
function GeometricAccent() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.07;
    meshRef.current.rotation.y = t * 0.11;
    // Mouse-driven wobble
    meshRef.current.position.x +=
      (state.mouse.x * 1.5 - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y +=
      (state.mouse.y * 1.0 - meshRef.current.position.y) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[4, 1, -3]}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshBasicMaterial color="#0891b2" wireframe transparent opacity={0.12} />
    </mesh>
  );
}


// ---------------------------------------------------------------------------
// Root export — transparent canvas layered behind all content
// ---------------------------------------------------------------------------
export default function ThreeBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 70 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
        <GeometricAccent />
      </Canvas>
    </div>
  );
}

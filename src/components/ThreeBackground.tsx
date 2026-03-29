import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

let _mx = 0
let _my = 0

const PARTICLE_COUNT = 1000
const STAR_COUNT     = 80

const _p = new Float32Array(PARTICLE_COUNT * 4)
for (let i = 0; i < _p.length; i++) _p[i] = Math.random()

const _s = new Float32Array(STAR_COUNT * 3)
for (let i = 0; i < _s.length; i++) _s[i] = Math.random()

function ParticleField() {
  const groupRef   = useRef<THREE.Group>(null)
  const pointsRef  = useRef<THREE.Points>(null)

  const { positions, colors, home } = useMemo(() => {
    const pos  = new Float32Array(PARTICLE_COUNT * 3)
    const col  = new Float32Array(PARTICLE_COUNT * 3)
    const home = new Float32Array(PARTICLE_COUNT * 3)

    const cyan   = new THREE.Color("#22d3ee")
    const indigo = new THREE.Color("#818cf8")
    const white  = new THREE.Color("#e0f2fe")

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (_p[i*4]   - 0.5) * 30
      const y = (_p[i*4+1] - 0.5) * 18
      const z = (_p[i*4+2] - 0.5) * 40
      pos[i*3]=home[i*3]=x;  pos[i*3+1]=home[i*3+1]=y;  pos[i*3+2]=home[i*3+2]=z

      const t = _p[i*4+3]
      const c = t < 0.45 ? cyan : t < 0.75 ? indigo : white
      col[i*3]=c.r;  col[i*3+1]=c.g;  col[i*3+2]=c.b
    }

    return { positions: pos, colors: col, home }
  }, [])

  const starPositions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3)
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i*3]   = (_s[i*3]   - 0.5) * 28
      pos[i*3+1] = (_s[i*3+1] - 0.5) * 16
      pos[i*3+2] = (_s[i*3+2] - 0.5) * 38
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current) return

    const t = state.clock.elapsedTime

    groupRef.current.rotation.y = t * 0.018
    const targetX = _my * -0.12
    const targetZ = _mx *  0.08
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.04

    const scrollY   = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress  = maxScroll > 0 ? scrollY / maxScroll : 0
    state.camera.position.z = 9 - progress * 5
    state.camera.position.y = -progress * 1.5
    state.camera.rotation.x += ( _my * 0.03 - state.camera.rotation.x) * 0.03
    state.camera.rotation.y += (-_mx * 0.03 - state.camera.rotation.y) * 0.03

    const camZ   = state.camera.position.z
    const halfH  = Math.tan((70 / 2) * (Math.PI / 180)) * camZ
    const aspect = state.size.width / state.size.height
    const mx = _mx * halfH * aspect
    const my = _my * halfH

    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array
    const R   = 3.5

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2

      const dx = arr[ix] - mx
      const dy = arr[iy] - my
      const d2 = dx * dx + dy * dy

      let tx = home[ix], ty = home[iy]

      if (d2 < R * R && d2 > 0.01) {
        const d = Math.sqrt(d2)
        const f = ((R - d) / R) ** 1.5 * 3.0
        tx += (dx / d) * f
        ty += (dy / d) * f
      }

      arr[ix] += (tx       - arr[ix]) * 0.055
      arr[iy] += (ty       - arr[iy]) * 0.055
      arr[iz] += (home[iz] - arr[iz]) * 0.04
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
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

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
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
  )
}

function GeometricAccent() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.07
    meshRef.current.rotation.y = t * 0.11
    meshRef.current.position.x += (state.mouse.x * 1.5 - meshRef.current.position.x) * 0.02
    meshRef.current.position.y += (state.mouse.y * 1.0 - meshRef.current.position.y) * 0.02
  })

  return (
    <mesh ref={meshRef} position={[4, 1, -3]}>
      <icosahedronGeometry args={[1.4, 1]} />
      <meshBasicMaterial color="#0891b2" wireframe transparent opacity={0.12} />
    </mesh>
  )
}

export default function ThreeBackground() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      _mx =  (e.clientX / window.innerWidth)  * 2 - 1
      _my = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 70 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
        <GeometricAccent />
      </Canvas>
    </div>
  )
}

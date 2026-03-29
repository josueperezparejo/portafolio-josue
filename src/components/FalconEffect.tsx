import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

const CAM_Z   = 2.4
const CAM_FOV = 70
const HALF_H  = Math.tan((CAM_FOV / 2) * (Math.PI / 180)) * CAM_Z  // ≈ 1.68

const INNER = 160   // cyan cloud inside the falcon silhouette
const STARS = 30    // bright white sparks
const OUTER = 90    // indigo-to-cyan rotating halo
const TOTAL = INNER + STARS + OUTER

// ─── Pre-generate randomness at module level (outside React tree) ────────────
// This satisfies react-hooks/purity since useMemo only sees deterministic math.
const _rnd = (() => {
  const buf = new Float32Array(TOTAL * 5)   // 5 random values per particle
  for (let i = 0; i < buf.length; i++) buf[i] = Math.random()
  return buf
})()

// Gold palette
const GOLD_DEEP   = new THREE.Color('#b45309')   // deep amber — base
const GOLD_MID    = new THREE.Color('#f59e0b')   // warm gold — mid tone
const GOLD_BRIGHT = new THREE.Color('#fbbf24')   // bright gold — highlights
const WHITE       = new THREE.Color('#fff8e7')   // warm white — star sparks

// ─────────────────────────────────────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────────────────────────────────────
function Particles({ mouse }: { mouse: { current: THREE.Vector2 } }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors, home, outerA, outerR } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3)
    const colors    = new Float32Array(TOTAL * 3)
    const home      = new Float32Array(TOTAL * 3)
    const outerA    = new Float32Array(OUTER)
    const outerR    = new Float32Array(OUTER)
    const tmp       = new THREE.Color()

    const put = (i: number, x: number, y: number, z: number, c: THREE.Color) => {
      positions[i*3]=home[i*3]=x; positions[i*3+1]=home[i*3+1]=y; positions[i*3+2]=home[i*3+2]=z
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b
    }

    // ── Inner cyan cloud ─────────────────────────────────────────────────────
    for (let i = 0; i < INNER; i++) {
      const b = i * 5
      const a = _rnd[b]   * Math.PI * 2
      const r = Math.sqrt(_rnd[b+1]) * 0.78
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r * 1.15
      const z = (_rnd[b+2] - 0.5) * 0.22
      tmp.lerpColors(GOLD_MID, GOLD_BRIGHT, _rnd[b+3])
      put(i, x, y, z, tmp)
    }

    // ── Bright white star sparks ──────────────────────────────────────────────
    for (let j = 0; j < STARS; j++) {
      const i = INNER + j
      const b = i * 5
      const a = _rnd[b]   * Math.PI * 2
      const r = Math.sqrt(_rnd[b+1]) * 0.75
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r * 1.1
      const z = (_rnd[b+2] - 0.5) * 0.18
      put(i, x, y, z, WHITE)  // warm-white sparks for the "star" shimmer
    }

    // ── Outer halo ring (cyan → indigo angular gradient) ──────────────────────
    for (let j = 0; j < OUTER; j++) {
      const i = INNER + STARS + j
      const b = i * 5
      const a = (j / OUTER) * Math.PI * 2 + (_rnd[b] - 0.5) * 0.28
      const r = 0.92 + _rnd[b+1] * 0.42
      const x = Math.cos(a) * r
      const y = Math.sin(a) * r
      const z = (_rnd[b+2] - 0.5) * 0.12
      const blend = (Math.sin(a * 2) + 1) / 2   // 0-1 gradient along the ring
      tmp.lerpColors(GOLD_DEEP, GOLD_BRIGHT, blend)
      put(i, x, y, z, tmp)
      outerA[j] = a
      outerR[j] = r
    }

    return { positions, colors, home, outerA, outerR }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    const t   = clock.getElapsedTime()
    const mx  = mouse.current.x
    const my  = mouse.current.y

    for (let i = 0; i < TOTAL; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2
      const phi = i * 2.3999  // golden-angle phase

      let tx: number, ty: number

      if (i < INNER + STARS) {
        tx = home[ix] + Math.sin(t * 0.22 + phi)       * 0.036
        ty = home[iy] + Math.cos(t * 0.27 + phi * 1.4) * 0.036
      } else {
        const j = i - INNER - STARS
        const a = outerA[j] + t * 0.10
        tx = Math.cos(a) * outerR[j]
        ty = Math.sin(a) * outerR[j]
      }

      // Mouse repulsion
      const dx = arr[ix] - mx
      const dy = arr[iy] - my
      const d2 = dx * dx + dy * dy
      const R  = 0.58
      if (d2 < R * R && d2 > 1e-6) {
        const d = Math.sqrt(d2)
        const f = ((R - d) / R) ** 1.5 * 0.70
        tx += (dx / d) * f
        ty += (dy / d) * f
      }

      arr[ix] += (tx       - arr[ix]) * 0.062
      arr[iy] += (ty       - arr[iy]) * 0.062
      arr[iz] += (home[iz] - arr[iz]) * 0.062
    }

    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.026}
        sizeAttenuation
        transparent
        opacity={0.90}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Export — parent must be 350 × 350 px (FalconMark size).
// This div extends 80 px beyond on every side.
// ─────────────────────────────────────────────────────────────────────────────
export default function FalconEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse        = useRef(new THREE.Vector2(9999, 9999))
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouse.current.x =  ((e.clientX - rect.left) / rect.width  * 2 - 1) * HALF_H
      mouse.current.y = -(((e.clientY - rect.top)  / rect.height * 2 - 1)) * HALF_H
    }
    const onLeave = () => mouse.current.set(9999, 9999)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none"
      style={{ inset: '-80px' }}
    >
      <Canvas
        camera={{ position: [0, 0, CAM_Z], fov: CAM_FOV }}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  )
}

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Edges, Float, PerformanceMonitor, RoundedBox } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

export type SceneQuality = 'high' | 'low'

interface Props {
  quality: SceneQuality
  /** Pauses rendering entirely when the hero is off-screen or the tab is hidden. */
  active: boolean
  onReady?: () => void
}

const VIOLET = new THREE.Color('#8868ff')
const CYAN = new THREE.Color('#4bdcf5')

/** Small deterministic PRNG so the circuit layout is identical on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Shared pointer + scroll state, written by window listeners and read inside useFrame. */
function useInputRefs() {
  const pointer = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1.2)
    }
    onScroll()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return { pointer, scroll }
}

// ───────────────────────── Circuit traces with travelling pulses ─────────────────────────

const traceVertex = /* glsl */ `
  attribute float aDist;
  attribute float aSeed;
  attribute float aLen;
  varying float vDist;
  varying float vSeed;
  varying float vLen;
  void main() {
    vDist = aDist; vSeed = aSeed; vLen = aLen;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const traceFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vDist;
  varying float vSeed;
  varying float vLen;
  void main() {
    float speed = 0.22 + vSeed * 0.3;
    float head = fract(uTime * speed + vSeed * 7.0) * (vLen + 0.8) - 0.2;
    float d = head - vDist;
    float pulse = smoothstep(0.35, 0.0, d) * step(0.0, d);
    vec3 col = mix(uColorA, uColorB, vSeed);
    float base = 0.16;
    gl_FragColor = vec4(col * (base + pulse * 2.4), base + pulse * 0.9);
  }
`

function buildTraces(count: number, width: number, height: number, z: number, seed: number) {
  const rand = mulberry32(seed)
  const cols = 8
  const rows = 14
  const cell = { x: width / cols, y: height / rows }
  const toWorld = (cx: number, cy: number) => new THREE.Vector3(-width / 2 + cx * cell.x, -height / 2 + cy * cell.y, z)

  const positions: number[] = []
  const dists: number[] = []
  const seeds: number[] = []
  const lens: number[] = []
  const pads: THREE.Vector3[] = []

  for (let p = 0; p < count; p++) {
    let cx = Math.floor(rand() * (cols + 1))
    let cy = Math.floor(rand() * (rows + 1))
    const pts = [toWorld(cx, cy)]
    let horizontal = rand() > 0.5
    const steps = 2 + Math.floor(rand() * 4)
    for (let s = 0; s < steps; s++) {
      const len = 1 + Math.floor(rand() * 3)
      const dir = rand() > 0.5 ? 1 : -1
      if (horizontal) cx = THREE.MathUtils.clamp(cx + dir * len, 0, cols)
      else cy = THREE.MathUtils.clamp(cy + dir * len, 0, rows)
      const next = toWorld(cx, cy)
      if (!next.equals(pts[pts.length - 1])) pts.push(next)
      horizontal = !horizontal
    }
    if (pts.length < 2) continue

    let total = 0
    const cumulative = [0]
    for (let i = 1; i < pts.length; i++) cumulative.push((total += pts[i].distanceTo(pts[i - 1])))
    const s = rand()
    for (let i = 1; i < pts.length; i++) {
      positions.push(pts[i - 1].x, pts[i - 1].y, pts[i - 1].z, pts[i].x, pts[i].y, pts[i].z)
      dists.push(cumulative[i - 1], cumulative[i])
      seeds.push(s, s)
      lens.push(total, total)
    }
    pads.push(pts[0], pts[pts.length - 1])
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aDist', new THREE.Float32BufferAttribute(dists, 1))
  geometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1))
  geometry.setAttribute('aLen', new THREE.Float32BufferAttribute(lens, 1))
  return { geometry, pads }
}

function CircuitFace({ count, width, height, z, seed, flip = false }: { count: number; width: number; height: number; z: number; seed: number; flip?: boolean }) {
  const { geometry, pads } = useMemo(() => buildTraces(count, width, height, z, seed), [count, width, height, z, seed])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: traceVertex,
        fragmentShader: traceFragment,
        uniforms: { uTime: { value: 0 }, uColorA: { value: VIOLET }, uColorB: { value: CYAN } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )
  const padsRef = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    const mesh = padsRef.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    pads.forEach((p, i) => mesh.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z + 0.001)))
    mesh.instanceMatrix.needsUpdate = true
  }, [pads])

  useEffect(() => () => {
    geometry.dispose()
    material.dispose()
  }, [geometry, material])

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <group rotation={flip ? [0, Math.PI, 0] : [0, 0, 0]}>
      <lineSegments geometry={geometry} material={material} />
      <instancedMesh ref={padsRef} args={[undefined, undefined, pads.length]}>
        <circleGeometry args={[0.022, 12]} />
        <meshBasicMaterial color="#9fe9f7" toneMapped={false} transparent opacity={0.85} />
      </instancedMesh>
    </group>
  )
}

// ───────────────────────────────── The monolith ─────────────────────────────────

const SIZE = { w: 1.45, h: 2.55, d: 0.4 }

function Monolith({ quality }: { quality: SceneQuality }) {
  return (
    <group>
      <RoundedBox args={[SIZE.w, SIZE.h, SIZE.d]} radius={0.07} smoothness={quality === 'high' ? 5 : 3}>
        <meshPhysicalMaterial
          color="#0e1017"
          metalness={0.92}
          roughness={0.26}
          clearcoat={1}
          clearcoatRoughness={0.12}
          envMapIntensity={1.5}
        />
      </RoundedBox>
      <CircuitFace count={quality === 'high' ? 26 : 16} width={SIZE.w - 0.24} height={SIZE.h - 0.3} z={SIZE.d / 2 + 0.002} seed={7} />
      {quality === 'high' && <CircuitFace count={18} width={SIZE.w - 0.24} height={SIZE.h - 0.3} z={SIZE.d / 2 + 0.002} seed={21} flip />}
      {/* Status LEDs and a luminous seam — small engineering details that read at a distance. */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-SIZE.w / 2 + 0.16 + i * 0.07, SIZE.h / 2 - 0.13, SIZE.d / 2 + 0.003]}>
          <circleGeometry args={[0.016, 12]} />
          <meshBasicMaterial color={i === 0 ? '#4bdcf5' : '#8868ff'} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, -SIZE.h / 2 + 0.12, SIZE.d / 2 + 0.003]}>
        <planeGeometry args={[SIZE.w - 0.3, 0.008]} />
        <meshBasicMaterial color="#b2a1ff" toneMapped={false} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

// ────────────────────────────── Orbiting node network ──────────────────────────────

function NodeNetwork({ count = 16, radius = 1.85 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.InstancedMesh>(null)

  const { nodes, lines } = useMemo(() => {
    const rand = mulberry32(42)
    const nodes = Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + rand() * 0.18
      const r = radius + (rand() - 0.5) * 0.35
      return new THREE.Vector3(Math.cos(a) * r, (rand() - 0.5) * 0.35, Math.sin(a) * r)
    })
    const pos: number[] = []
    nodes.forEach((n, i) => {
      for (const step of [1, 3]) {
        const m = nodes[(i + step) % count]
        pos.push(n.x, n.y, n.z, m.x, m.y, m.z)
      }
    })
    const lines = new THREE.BufferGeometry()
    lines.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    return { nodes, lines }
  }, [count, radius])

  useEffect(() => {
    const mesh = nodesRef.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    nodes.forEach((n, i) => mesh.setMatrixAt(i, m.makeTranslation(n.x, n.y, n.z)))
    mesh.instanceMatrix.needsUpdate = true
  }, [nodes])

  useEffect(() => () => lines.dispose(), [lines])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08
  })

  return (
    <group rotation={[0.42, 0, -0.18]}>
      <group ref={ref}>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color="#8868ff" transparent opacity={0.22} depthWrite={false} />
        </lineSegments>
        <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]}>
          <icosahedronGeometry args={[0.032, 1]} />
          <meshStandardMaterial color="#0e1017" emissive="#4bdcf5" emissiveIntensity={1.2} toneMapped={false} />
        </instancedMesh>
      </group>
    </group>
  )
}

// ──────────────────────────────── Ambient details ────────────────────────────────

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const geometry = useMemo(() => {
    const rand = mulberry32(3)
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.6 + rand() * 2.4
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      pos.set([r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.7, r * Math.sin(phi) * Math.sin(theta)], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])
  useEffect(() => () => geometry.dispose(), [geometry])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.02
  })
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#b2a1ff" size={0.02} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  )
}

function GlassPanel({ position, rotation, size }: { position: [number, number, number]; rotation: [number, number, number]; size: [number, number] }) {
  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh position={position} rotation={rotation}>
        <boxGeometry args={[size[0], size[1], 0.012]} />
        <meshPhysicalMaterial color="#a99bff" transparent opacity={0.08} roughness={0.08} metalness={0.1} clearcoat={1} envMapIntensity={2} depthWrite={false} />
        <Edges color="#c9c0ff" transparent opacity={0.35} />
      </mesh>
    </Float>
  )
}

// ─────────────────────────── Procedural studio lighting ───────────────────────────

/**
 * A tiny "light studio" baked into an environment map with PMREM: a few emissive panels
 * and a ring, rendered once. Gives the metal its reflections without loading HDR files.
 */
function StudioEnvironment({ size }: { size: number }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)

  useEffect(() => {
    const studio = new THREE.Scene()
    const disposables: { dispose: () => void }[] = []
    const panel = (color: string, intensity: number, position: [number, number, number], rotation: [number, number, number], scale: [number, number], ring = false) => {
      const geometry = ring ? new THREE.RingGeometry(0.42, 0.5, 48) : new THREE.PlaneGeometry(1, 1)
      const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      mesh.rotation.set(...rotation)
      mesh.scale.set(scale[0], scale[1], 1)
      studio.add(mesh)
      disposables.push(geometry, material)
    }
    panel('#8868ff', 2.2, [0, 3.5, -3], [0, 0, 0], [10, 1.2])
    panel('#4bdcf5', 1.6, [4.5, 0, 1.5], [0, -Math.PI / 2, 0], [6, 5])
    panel('#ffffff', 0.9, [-4.5, 0.5, 1.5], [0, Math.PI / 2, 0], [6, 5])
    panel('#ffffff', 1.2, [0, 0, 5], [0, Math.PI, 0], [2.5, 2.5], true)

    const pmrem = new THREE.PMREMGenerator(gl)
    const target = pmrem.fromScene(studio, 0.02, 0.1, 100, { size })
    scene.environment = target.texture
    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
      disposables.forEach((d) => d.dispose())
    }
  }, [gl, scene, size])

  return null
}

// ─────────────────────────────────── Rig ───────────────────────────────────

function Rig({ quality, onReady }: { quality: SceneQuality; onReady?: () => void }) {
  const group = useRef<THREE.Group>(null)
  const spin = useRef(0.5)
  const intro = useRef(0)
  const { pointer, scroll } = useInputRefs()

  useEffect(() => {
    onReady?.()
  }, [onReady])

  useFrame((_, rawDelta) => {
    const g = group.current
    if (!g) return
    const delta = Math.min(rawDelta, 1 / 20)
    intro.current = Math.min(intro.current + delta * 0.7, 1)
    const easeIntro = 1 - Math.pow(1 - intro.current, 3)
    spin.current += delta * 0.16
    const s = scroll.current

    const targetY = spin.current + pointer.current.x * 0.45 + s * 0.9
    const targetX = -pointer.current.y * 0.16 + s * 0.25
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta)
    g.position.y = THREE.MathUtils.damp(g.position.y, -s * 1.1 + (1 - easeIntro) * -0.6, 4, delta)
    const scale = (0.86 + easeIntro * 0.14) * (1 - s * 0.12)
    g.scale.setScalar(scale)
  })

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <Monolith quality={quality} />
      </Float>
      <NodeNetwork count={quality === 'high' ? 18 : 12} />
      {quality === 'high' && (
        <>
          <GlassPanel position={[-1.55, 0.75, -0.9]} rotation={[0.1, 0.5, 0.08]} size={[0.85, 1.15]} />
          <GlassPanel position={[1.5, -0.85, -0.6]} rotation={[-0.08, -0.55, -0.05]} size={[0.7, 0.95]} />
        </>
      )}
    </group>
  )
}

export default function HeroScene({ quality, active, onReady }: Props) {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, quality === 'high' ? 1.6 : 1.25))

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={dpr}
      camera={{ position: [0, 0.1, 8.4], fov: 32, near: 0.1, far: 40 }}
      gl={{ antialias: quality === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(window.devicePixelRatio || 1, 1.6))} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <pointLight position={[-3, 1.2, 2.4]} intensity={14} distance={10} color="#8868ff" />
      <pointLight position={[3, -1, 2.2]} intensity={10} distance={10} color="#4bdcf5" />
      <StudioEnvironment size={256} />
      <Rig quality={quality} onReady={onReady} />
      <Particles count={quality === 'high' ? 260 : 110} />
    </Canvas>
  )
}

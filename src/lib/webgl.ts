let cached: boolean | undefined

/** True when the browser can create a WebGL context. Cached after the first call. */
export function canRenderWebGL() {
  if (cached !== undefined) return cached
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    cached = !!gl
    ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}

/** Rough heuristic for devices where a live 3D scene would cost more than it adds. */
export function isLowPowerDevice() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return true
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true
  return (nav.hardwareConcurrency ?? 8) <= 4
}

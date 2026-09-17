import { prefersReducedMotion } from '@/lib/motion';

let webgl2: boolean | null = null;

export function canRenderScene(): boolean {
  if (typeof window === 'undefined' || prefersReducedMotion()) return false;

  if (webgl2 === null) {
    const gl = document.createElement('canvas').getContext('webgl2');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    webgl2 = gl !== null;
  }

  return webgl2;
}

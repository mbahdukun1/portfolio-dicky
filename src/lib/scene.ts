import {
  CanvasTexture,
  Color,
  Line,
  Mesh,
  Points,
  Shape,
  Sprite,
  SRGBColorSpace,
  WebGLRenderer,
  type Material,
  type Object3D,
  type Texture,
} from 'three';

export interface Tint {
  color: Color;
  alpha: number;
}

export function parseCssColor(value: string): Tint {
  const rgba = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?/);

  if (rgba) {
    const [, r, g, b, a] = rgba;
    return {
      color: new Color().setRGB(Number(r) / 255, Number(g) / 255, Number(b) / 255, SRGBColorSpace),
      alpha: a === undefined ? 1 : Number(a),
    };
  }

  return { color: new Color(value || '#888888'), alpha: 1 };
}

export function readPalette() {
  const computed = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: string) =>
    computed.getPropertyValue(name).replace(/\s+/g, ' ').trim() || fallback;

  return {
    surface: parseCssColor(token('--surface', '#12161c')),
    border: parseCssColor(token('--border-strong', 'rgba(255, 255, 255, 0.18)')),
    accent: parseCssColor(token('--accent', '#2dd4bf')),
    accentText: token('--accent', '#2dd4bf'),
    primaryText: token('--text-primary', '#e9ecef'),
    secondaryText: token('--text-secondary', '#a8b0bb'),
    bgText: token('--bg', '#0b0d10'),
    sans: token('--font-sans', 'Inter, system-ui, sans-serif'),
  };
}

export type Palette = ReturnType<typeof readPalette>;

export function watchTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export function roundedRect(width: number, height: number, radius: number): Shape {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const shape = new Shape();

  shape.moveTo(-halfWidth + radius, -halfHeight);
  shape.lineTo(halfWidth - radius, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius);
  shape.lineTo(halfWidth, halfHeight - radius);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
  shape.lineTo(-halfWidth + radius, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius);
  shape.lineTo(-halfWidth, -halfHeight + radius);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight);

  return shape;
}

export function dotTexture(): CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const context = canvas.getContext('2d');

  if (context) {
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.45, 'rgba(255,255,255,0.6)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
  }

  return new CanvasTexture(canvas);
}

export function createRenderer(host: HTMLElement, className: string): WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.className = className;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.prepend(renderer.domElement);
  return renderer;
}

export function runWhileVisible(
  host: Element,
  renderer: WebGLRenderer,
  tick: (delta: number) => void,
): () => void {
  let last = 0;

  const loop = (now: number) => {
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    tick(delta);
  };

  const observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      last = 0;
      renderer.setAnimationLoop(loop);
    } else {
      renderer.setAnimationLoop(null);
    }
  });

  observer.observe(host);

  return () => {
    observer.disconnect();
    renderer.setAnimationLoop(null);
  };
}

function disposeMaterial(material: Material) {
  (material as Material & { map?: Texture | null }).map?.dispose();
  material.dispose();
}

export function destroyRenderer(renderer: WebGLRenderer, scene: Object3D): void {
  renderer.setAnimationLoop(null);

  scene.traverse((object) => {
    if (object instanceof Sprite) {
      disposeMaterial(object.material);
      return;
    }

    if (object instanceof Mesh || object instanceof Line || object instanceof Points) {
      object.geometry.dispose();
      const materials: Material[] = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach(disposeMaterial);
    }
  });

  renderer.dispose();
  renderer.forceContextLoss();
  renderer.domElement.remove();
}

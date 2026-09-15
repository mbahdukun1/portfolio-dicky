import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  CylinderGeometry,
  DirectionalLight,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
  type Texture,
} from 'three';

import {
  createRenderer,
  destroyRenderer,
  readPalette,
  roundedRect,
  runWhileVisible,
  watchTheme,
} from '@/lib/scene';

import styles from './SceneCanvas.module.css';

const BODY_WIDTH = 1.5;
const BODY_HEIGHT = 3.1;
const BODY_RADIUS = 0.24;
const BODY_DEPTH = 0.12;
const BEVEL = 0.035;
const SCREEN_INSET = 0.07;
const FOV = 28;
const TAU = Math.PI * 2;

function screenGeometry(width: number, height: number, radius: number): ShapeGeometry {
  const geometry = new ShapeGeometry(roundedRect(width, height, radius), 10);
  const position = geometry.getAttribute('position');
  const uv: number[] = [];

  for (let i = 0; i < position.count; i += 1) {
    uv.push(position.getX(i) / width + 0.5, position.getY(i) / height + 0.5);
  }

  geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  return geometry;
}

function cover(texture: Texture, aspect: number) {
  const image = texture.image as { width: number; height: number };
  const imageAspect = image.width / image.height;

  if (imageAspect > aspect) {
    texture.repeat.set(aspect / imageAspect, 1);
    texture.offset.set((1 - texture.repeat.x) / 2, 0);
  } else {
    texture.repeat.set(1, imageAspect / aspect);
    texture.offset.set(0, 1 - texture.repeat.y);
  }
}

interface PhoneSceneProps {
  sources: string[];
  index: number;
}

export function PhoneScene({ sources, index }: PhoneSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || sources.length === 0) return;

    let disposed = false;

    const renderer = createRenderer(root, styles.canvas);
    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
    const phone = new Group();
    scene.add(phone);

    const bodyGeometry = new ExtrudeGeometry(roundedRect(BODY_WIDTH, BODY_HEIGHT, BODY_RADIUS), {
      depth: BODY_DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 4,
      curveSegments: 16,
    });
    bodyGeometry.center();

    const bodyMaterial = new MeshStandardMaterial({ color: 0x15181d, metalness: 0.6, roughness: 0.32 });
    phone.add(new Mesh(bodyGeometry, bodyMaterial));

    const face = BODY_DEPTH / 2 + BEVEL;
    const screenWidth = BODY_WIDTH - SCREEN_INSET * 2;
    const screenHeight = BODY_HEIGHT - SCREEN_INSET * 2;
    const screenAspect = screenWidth / screenHeight;
    const glassGeometry = screenGeometry(screenWidth, screenHeight, BODY_RADIUS - SCREEN_INSET / 2);

    const glass = new Mesh(glassGeometry, new MeshBasicMaterial({ color: 0x050607 }));
    glass.position.z = face + 0.002;
    phone.add(glass);

    const createScreen = (offset: number) => {
      const material = new MeshBasicMaterial({ transparent: true, opacity: 0 });
      const mesh = new Mesh(glassGeometry, material);
      mesh.position.z = face + offset;
      phone.add(mesh);
      return material;
    };

    const current = createScreen(0.004);
    const incoming = createScreen(0.006);

    const bump = new Mesh(new CylinderGeometry(0.22, 0.22, 0.06, 40), bodyMaterial);
    bump.rotation.x = Math.PI / 2;
    bump.position.set(-0.38, 1.1, -face - 0.03);

    const lens = new Mesh(
      new CylinderGeometry(0.1, 0.1, 0.07, 32),
      new MeshStandardMaterial({ color: 0x050608, metalness: 0.9, roughness: 0.12 }),
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.set(-0.38, 1.1, -face - 0.045);
    phone.add(bump, lens);

    scene.add(new AmbientLight(0xffffff, 0.7));
    const key = new DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 4, 6);
    scene.add(key);
    const rim = new PointLight(0xffffff, 18, 14);
    rim.position.set(-3, 1.5, -3);
    scene.add(rim);

    const applyPalette = () => {
      rim.color.copy(readPalette().accent.color);
    };
    applyPalette();

    const loader = new TextureLoader();
    const anisotropy = renderer.capabilities.getMaxAnisotropy();
    const textures = new Map<string, Texture>();
    const ready = new Set<string>();

    const request = (src: string | undefined) => {
      if (!src || textures.has(src)) return;

      const texture = loader.load(src, (loaded) => {
        if (disposed) return;
        cover(loaded, screenAspect);
        ready.add(src);
      });
      texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = anisotropy;
      textures.set(src, texture);
    };

    let shown = -1;
    let fading = -1;
    let fade = 0;
    let yaw = 0;
    let pitch = 0;
    let velocity = 0;
    let idle = 2;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMove = 0;
    let time = 0;

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;

      const tan = Math.tan((FOV * Math.PI) / 360);
      const distance = Math.max(4.1 / 2 / tan, 2.6 / 2 / tan / camera.aspect);
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      render();
    };

    const tick = (delta: number) => {
      time += delta;

      const count = sources.length;
      const wanted = ((indexRef.current % count) + count) % count;
      const wantedSrc = sources[wanted];
      request(wantedSrc);
      request(sources[(wanted + 1) % count]);
      request(sources[(wanted - 1 + count) % count]);

      if (fading === -1 && wanted !== shown && wantedSrc && ready.has(wantedSrc)) {
        const texture = textures.get(wantedSrc);
        if (texture) {
          if (incoming.map !== texture) {
            incoming.map = texture;
            incoming.needsUpdate = true;
          }
          fading = wanted;
          fade = 0;
        }
      }

      if (fading !== -1) {
        fade = Math.min(1, fade + delta * 3.5);
        incoming.opacity = fade;

        if (fade === 1) {
          current.map = incoming.map;
          current.opacity = 1;
          current.needsUpdate = true;
          incoming.opacity = 0;
          shown = fading;
          fading = -1;
        }
      }

      if (!dragging) {
        idle += delta;
        velocity *= Math.exp(-delta * 2.5);
        yaw += velocity * delta;

        if (idle > 1.2 && Math.abs(velocity) < 1.5) {
          const home = Math.round(yaw / TAU) * TAU + Math.sin(time * 0.6) * 0.32;
          yaw += (home - yaw) * (1 - Math.exp(-delta * 2.2));
        }

        pitch += (Math.sin(time * 0.8) * 0.05 - pitch) * (1 - Math.exp(-delta * 3));
      }

      phone.rotation.set(pitch, yaw, 0);
      phone.position.y = Math.sin(time * 1.1) * 0.06;

      render();
    };

    const handleDown = (event: PointerEvent) => {
      dragging = true;
      velocity = 0;
      lastX = event.clientX;
      lastY = event.clientY;
      lastMove = performance.now();
      root.setPointerCapture(event.pointerId);
      root.dataset.dragging = '';
    };

    const handleMove = (event: PointerEvent) => {
      if (!dragging) return;

      const now = performance.now();
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      const dt = Math.max((now - lastMove) / 1000, 0.008);

      lastX = event.clientX;
      lastY = event.clientY;
      lastMove = now;

      yaw += dx * 0.012;
      pitch = Math.max(-0.5, Math.min(0.5, pitch + dy * 0.006));
      velocity = (dx * 0.012) / dt;
    };

    const handleUp = (event: PointerEvent) => {
      if (!dragging) return;

      dragging = false;
      idle = 0;
      velocity = performance.now() - lastMove > 80 ? 0 : Math.max(-10, Math.min(10, velocity));

      if (root.hasPointerCapture(event.pointerId)) root.releasePointerCapture(event.pointerId);
      delete root.dataset.dragging;
    };

    const sizing = new ResizeObserver(resize);
    const stopTheme = watchTheme(() => {
      applyPalette();
      render();
    });

    resize();
    const stopLoop = runWhileVisible(root, renderer, tick);
    sizing.observe(root);
    root.addEventListener('pointerdown', handleDown);
    root.addEventListener('pointermove', handleMove);
    root.addEventListener('pointerup', handleUp);
    root.addEventListener('pointercancel', handleUp);

    return () => {
      disposed = true;
      stopLoop();
      stopTheme();
      sizing.disconnect();
      root.removeEventListener('pointerdown', handleDown);
      root.removeEventListener('pointermove', handleMove);
      root.removeEventListener('pointerup', handleUp);
      root.removeEventListener('pointercancel', handleUp);
      delete root.dataset.dragging;
      textures.forEach((texture) => texture.dispose());
      destroyRenderer(renderer, scene);
    };
  }, [sources]);

  return <div className={styles.root} ref={rootRef} aria-hidden="true" />;
}

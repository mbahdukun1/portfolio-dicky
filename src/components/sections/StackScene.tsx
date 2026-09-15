import { useEffect, useRef, useState } from 'react';
import {
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  ShapeGeometry,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from 'three';

import { skillGroups } from '@/data/skills';
import type { StackLayer } from '@/data/stackLayers';
import { cn } from '@/lib/cn';
import {
  createRenderer,
  destroyRenderer,
  dotTexture,
  readPalette,
  roundedRect,
  runWhileVisible,
  watchTheme,
  type Palette,
} from '@/lib/scene';

import styles from './StackScene.module.css';

const PLATE_SIZE = 2.2;
const PLATE_RADIUS = 0.28;
const PLATE_GAP = 0.95;
const PLATE_GAP_OPEN = 1.2;
const ACTIVE_LIFT = 0.18;
const HOVER_LIFT = 0.1;
const PARTICLE_COUNT = 72;
const BASE_YAW = -0.66;
const STACK_SPAN = 3.4;
const LOST_SHIFT = -0.45;
const CAMERA_DISTANCE = 11;
const CAMERA_DIRECTION = new Vector3(0, 0.8, 1).normalize();
const TEXT_SIZE = 1024;
const TEXT_STRETCH = 1.5;

interface Plate {
  group: Group;
  fill: MeshBasicMaterial;
  edge: LineBasicMaterial;
  text: MeshBasicMaterial;
  hit: Mesh;
  canvas: HTMLCanvasElement;
  texture: CanvasTexture;
  edgeOpacity: number;
  dim: number;
}

function drawLabel(plate: Plate, layer: StackLayer, palette: Palette, accent: boolean) {
  const context = plate.canvas.getContext('2d');
  if (!context) return;

  const center = TEXT_SIZE / 2;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, TEXT_SIZE, TEXT_SIZE);
  context.setTransform(1, 0, 0, TEXT_STRETCH, 0, center * (1 - TEXT_STRETCH));
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.lineJoin = 'round';
  context.shadowColor = palette.bgText;
  context.shadowBlur = 22;

  context.fillStyle = context.strokeStyle = accent ? palette.accentText : palette.primaryText;
  context.font = `700 116px ${palette.sans}`;
  context.lineWidth = 5;
  context.strokeText(layer.label, center, center + 10);
  context.fillText(layer.label, center, center + 10);

  context.fillStyle = context.strokeStyle = palette.secondaryText;
  context.font = `600 50px ${palette.sans}`;
  context.lineWidth = 2.5;
  context.strokeText(layer.tech, center, center + 90);
  context.fillText(layer.tech, center, center + 90);

  context.shadowBlur = 0;
  plate.texture.needsUpdate = true;
}

interface StackSceneProps {
  layers: StackLayer[];
  missingIndex?: number;
  interactive?: boolean;
}

export function StackScene({ layers, missingIndex, interactive = true }: StackSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let disposed = false;

    const renderer = createRenderer(root, styles.canvas);
    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 60);
    const stack = new Group();
    const restX = missingIndex === undefined ? 0 : LOST_SHIFT;
    stack.rotation.y = BASE_YAW;
    stack.position.x = restX;
    scene.add(stack);

    const count = layers.length;
    const restY = (index: number, gap: number) => ((count - 1) / 2 - index) * gap;
    const shape = roundedRect(PLATE_SIZE, PLATE_SIZE, PLATE_RADIUS);
    const outline = shape.getPoints(6);
    const anisotropy = renderer.capabilities.getMaxAnisotropy();

    const plates: Plate[] = layers.map((_, index) => {
      const group = new Group();
      group.position.y = restY(index, PLATE_GAP);
      const order = (count - 1 - index) * 3;

      const fill = new MeshBasicMaterial({ transparent: true, side: DoubleSide, depthWrite: false });
      const hit = new Mesh(new ShapeGeometry(shape), fill);
      hit.rotation.x = -Math.PI / 2;
      hit.renderOrder = order;
      hit.userData.index = index;

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = TEXT_SIZE;
      const texture = new CanvasTexture(canvas);
      texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = anisotropy;

      const text = new MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
      const label = new Mesh(new PlaneGeometry(PLATE_SIZE, PLATE_SIZE), text);
      label.rotation.x = -Math.PI / 2;
      label.rotation.z = -BASE_YAW;
      label.position.y = 0.004;
      label.renderOrder = order + 1;

      const edge = new LineBasicMaterial({ transparent: true });
      const border = new Line(new BufferGeometry().setFromPoints(outline), edge);
      border.rotation.x = -Math.PI / 2;
      border.renderOrder = order + 2;

      group.add(hit, label, border);
      stack.add(group);

      return { group, fill, edge, text, hit, canvas, texture, edgeOpacity: 1, dim: 1 };
    });

    const inset = PLATE_SIZE / 2 - 0.22;
    const railPoints: number[] = [];
    [
      [-inset, -inset],
      [inset, -inset],
      [inset, inset],
      [-inset, inset],
    ].forEach(([x, z]) => railPoints.push(x, 0.5, z, x, -0.5, z));

    const railMaterial = new LineBasicMaterial({ transparent: true });
    const railGeometry = new BufferGeometry();
    railGeometry.setAttribute('position', new Float32BufferAttribute(railPoints, 3));
    const rails = new LineSegments(railGeometry, railMaterial);
    stack.add(rails);

    const spread = PLATE_SIZE * 0.36;
    const initialTop = restY(0, PLATE_GAP);
    const initialBottom = restY(count - 1, PLATE_GAP);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      positions[i * 3] = (Math.random() * 2 - 1) * spread;
      positions[i * 3 + 1] = initialBottom + Math.random() * (initialTop - initialBottom);
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * spread;
      speeds[i] = 0.22 + Math.random() * 0.34;
    }

    const particleGeometry = new BufferGeometry();
    const positionAttribute = new Float32BufferAttribute(positions, 3);
    particleGeometry.setAttribute('position', positionAttribute);

    const particleMaterial = new PointsMaterial({
      size: 0.07,
      map: dotTexture(),
      transparent: true,
      depthWrite: false,
    });
    const particles = new Points(particleGeometry, particleMaterial);
    particles.renderOrder = count * 3;
    stack.add(particles);

    let palette = readPalette();
    let hovered: number | null = null;
    let active: number | null = null;
    let time = 0;

    const isMissing = (index: number) => index === missingIndex;

    const drawLabels = () => {
      plates.forEach((plate, index) => drawLabel(plate, layers[index], palette, isMissing(index)));
    };

    const paint = () => {
      plates.forEach((plate, index) => {
        const lead = active === null ? index === 0 && missingIndex === undefined : index === active;
        const lit = lead || index === hovered || isMissing(index);

        plate.fill.color.copy(
          lead ? palette.surface.color.clone().lerp(palette.accent.color, 0.14) : palette.surface.color,
        );
        plate.edge.color.copy(lit ? palette.accent.color : palette.border.color);
        plate.edgeOpacity = lit ? 1 : Math.min(1, palette.border.alpha * 2.4);
      });

      railMaterial.color.copy(palette.border.color);
      railMaterial.opacity = palette.border.alpha;
      particleMaterial.color.copy(palette.accent.color);
    };

    const updatePlates = (ease: number) => {
      const gap = active === null ? PLATE_GAP : PLATE_GAP_OPEN;

      plates.forEach((plate, index) => {
        const { group } = plate;
        const missing = isMissing(index);
        const lift = index === active ? ACTIVE_LIFT : index === hovered ? HOVER_LIFT : 0;
        const targetY = restY(index, gap) + lift + (missing ? Math.sin(time * 1.3) * 0.1 : 0);
        const targetDim = active === null || index === active ? 1 : 0.4;

        group.position.y += (targetY - group.position.y) * ease;
        group.position.x += ((missing ? 1.25 : 0) - group.position.x) * ease;
        group.rotation.z = missing ? Math.sin(time * 0.9) * 0.14 : 0;
        group.rotation.x = missing ? 0.12 + Math.sin(time * 0.7) * 0.05 : 0;

        plate.dim += (targetDim - plate.dim) * ease;
        plate.fill.opacity = missing ? 0.06 : (index === (active ?? 0) ? 0.5 : 0.26) * plate.dim;
        plate.edge.opacity = missing ? 0.55 + Math.sin(time * 3) * 0.35 : plate.edgeOpacity * plate.dim;
        plate.text.opacity = 0.35 + plate.dim * 0.65;
      });

      const top = plates[0]?.group.position.y ?? 0;
      const bottom = plates[count - 1]?.group.position.y ?? 0;
      rails.position.y = (top + bottom) / 2;
      rails.scale.y = Math.max(top - bottom, 0.001);

      return { top, bottom };
    };

    drawLabels();
    paint();
    updatePlates(1);

    const render = () => renderer.render(scene, camera);

    let openShift = 0;
    let openScale = 1;

    const resize = () => {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.copy(CAMERA_DIRECTION).multiplyScalar(CAMERA_DISTANCE / Math.min(camera.aspect, 1));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();

      const visibleWidth =
        2 * camera.position.length() * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
      const panelSpace = Math.min(width * 0.5, 270) + width * 0.02 + 16;
      const freeWidth = Math.max(width - panelSpace, width * 0.35);

      openShift = ((freeWidth - width) / 2 / width) * visibleWidth;
      openScale = Math.min(1, (((freeWidth - 24) / width) * visibleWidth) / STACK_SPAN);
      root.style.setProperty('--free-center', `${freeWidth / 2}px`);

      render();
    };

    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };

    const tick = (delta: number) => {
      time += delta;
      const ease = 1 - Math.exp(-delta * 7);
      const { top, bottom } = updatePlates(ease);

      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const y = positionAttribute.getY(i) - speeds[i] * delta;
        positionAttribute.setY(i, y < bottom || y > top + 0.3 ? top + Math.random() * 0.2 : y);
      }
      positionAttribute.needsUpdate = true;

      tilt.x += (pointer.x - tilt.x) * ease;
      tilt.y += (pointer.y - tilt.y) * ease;
      stack.rotation.y = BASE_YAW + tilt.x * 0.35;
      stack.rotation.x = tilt.y * 0.15;
      stack.position.x += ((active === null ? restX : openShift) - stack.position.x) * ease;
      stack.scale.setScalar(stack.scale.x + ((active === null ? 1 : openScale) - stack.scale.x) * ease);

      render();
    };

    const raycaster = new Raycaster();
    const ndc = new Vector2();
    const hitTargets = plates.map((plate) => plate.hit);

    const pick = (event: PointerEvent | MouseEvent): number | null => {
      const rect = root.getBoundingClientRect();
      ndc.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      const [hit] = raycaster.intersectObjects(hitTargets, false);
      return hit ? (hit.object.userData.index as number) : null;
    };

    const select = (index: number | null) => {
      active = index;
      setSelected(index);
      paint();
    };

    const setHovered = (next: number | null) => {
      if (next === hovered) return;
      hovered = next;
      root.style.cursor = next === null ? '' : 'pointer';
      paint();
    };

    const handleMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;

      const overPanel = event.target instanceof Element && event.target.closest('[data-panel]');
      if (interactive) setHovered(overPanel ? null : pick(event));
    };

    const handleLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      setHovered(null);
    };

    const handleClick = (event: MouseEvent) => {
      if (!interactive) return;
      if (event.target instanceof Element && event.target.closest('[data-panel]')) return;
      const index = pick(event);
      select(index === null || index === active ? null : index);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (!interactive) return;
      const last = count - 1;

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        select(active === null ? 0 : Math.min(active + 1, last));
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        select(active === null ? last : Math.max(active - 1, 0));
      } else if (event.key === 'Escape' && active !== null) {
        select(null);
      } else {
        return;
      }

      event.preventDefault();
    };

    const sizing = new ResizeObserver(resize);
    const stopTheme = watchTheme(() => {
      palette = readPalette();
      drawLabels();
      paint();
      render();
    });

    resize();
    const stopLoop = runWhileVisible(root, renderer, tick);
    sizing.observe(root);
    root.addEventListener('pointermove', handleMove);
    root.addEventListener('pointerleave', handleLeave);
    root.addEventListener('click', handleClick);
    root.addEventListener('keydown', handleKey);

    document.fonts?.ready.then(() => {
      if (disposed) return;
      drawLabels();
      render();
    });

    return () => {
      disposed = true;
      stopLoop();
      stopTheme();
      sizing.disconnect();
      root.removeEventListener('pointermove', handleMove);
      root.removeEventListener('pointerleave', handleLeave);
      root.removeEventListener('click', handleClick);
      root.removeEventListener('keydown', handleKey);
      root.style.cursor = '';
      destroyRenderer(renderer, scene);
    };
  }, [layers, missingIndex, interactive]);

  const layer = selected === null ? undefined : layers[selected];
  const group = layer && skillGroups.find((entry) => entry.id === layer.skillGroup);
  const items = group?.items ?? layer?.tech.split(' · ') ?? [];

  return (
    <div
      ref={rootRef}
      className={styles.root}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'group' : undefined}
      aria-label={
        interactive
          ? 'Tech stack explorer. Use the arrow keys to move between layers and Escape to close.'
          : undefined
      }
      aria-hidden={interactive ? undefined : true}
    >
      <span className={styles.floor} aria-hidden="true" />

      {interactive ? (
        <p className={styles.live} aria-live="polite">
          {layer ? `${group?.title ?? layer.label}: ${items.join(', ')}` : ''}
        </p>
      ) : null}

      {layer ? (
        <div className={styles.panel} key={layer.id} data-panel="" aria-hidden="true">
          <span className={styles.panelEyebrow}>
            Layer {String((selected ?? 0) + 1).padStart(2, '0')} · {layer.label}
          </span>
          <span className={styles.panelTitle}>{group?.title ?? layer.label}</span>
          {group ? <p className={styles.panelText}>{group.description}</p> : null}
          <ul className={styles.chips}>
            {items.map((item) => (
              <li key={item} className={styles.chip}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {interactive ? (
        <span className={cn(styles.hint, layer && styles.hintShifted)} aria-hidden="true">
          {layer ? 'Esc or click to close' : 'Click a layer · or use ↑ ↓'}
        </span>
      ) : null}
    </div>
  );
}

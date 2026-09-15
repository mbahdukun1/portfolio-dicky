import { useEffect, useRef } from 'react';
import {
  BufferGeometry,
  CanvasTexture,
  CylinderGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  Raycaster,
  Scene,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from 'three';

import type { IntegrationMap, IntegrationNode } from '@/data/integrations';
import {
  createRenderer,
  destroyRenderer,
  dotTexture,
  readPalette,
  runWhileVisible,
  watchTheme,
  type Palette,
} from '@/lib/scene';

import styles from './SceneCanvas.module.css';

const RADIUS = 2.7;
const ARC_HEIGHT = 0.9;
const PULSES_PER_LINK = 4;
const PULSE_SPEED = 0.32;
const TAG_WIDTH = 768;
const TAG_HEIGHT = 200;
const CAMERA_DISTANCE = 10.5;
const CAMERA_DIRECTION = new Vector3(0, 0.85, 1).normalize();

interface Tag {
  canvas: HTMLCanvasElement;
  texture: CanvasTexture;
  material: SpriteMaterial;
  sprite: Sprite;
}

interface Link {
  node: IntegrationNode;
  curve: QuadraticBezierCurve3;
  line: LineBasicMaterial;
  body: MeshBasicMaterial;
  edge: LineBasicMaterial;
  tag: Tag;
  hit: Mesh;
  glow: number;
  fade: number;
}

function createTag(): Tag {
  const canvas = document.createElement('canvas');
  canvas.width = TAG_WIDTH;
  canvas.height = TAG_HEIGHT;

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;

  const material = new SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false });
  const sprite = new Sprite(material);
  sprite.scale.set(2.3, 2.3 * (TAG_HEIGHT / TAG_WIDTH), 1);
  sprite.renderOrder = 10;

  return { canvas, texture, material, sprite };
}

function drawTag(tag: Tag, title: string, detail: string, palette: Palette, emphasis: boolean) {
  const context = tag.canvas.getContext('2d');
  if (!context) return;

  context.clearRect(0, 0, TAG_WIDTH, TAG_HEIGHT);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.lineJoin = 'round';
  context.shadowColor = palette.bgText;
  context.shadowBlur = 18;

  context.fillStyle = context.strokeStyle = emphasis ? palette.accentText : palette.primaryText;
  context.font = `700 58px ${palette.sans}`;
  context.lineWidth = 3;
  context.strokeText(title, TAG_WIDTH / 2, TAG_HEIGHT * 0.36);
  context.fillText(title, TAG_WIDTH / 2, TAG_HEIGHT * 0.36);

  context.fillStyle = context.strokeStyle = palette.secondaryText;
  context.font = `600 36px ${palette.sans}`;
  context.lineWidth = 1.5;
  context.strokeText(detail, TAG_WIDTH / 2, TAG_HEIGHT * 0.74);
  context.fillText(detail, TAG_WIDTH / 2, TAG_HEIGHT * 0.74);

  context.shadowBlur = 0;
  tag.texture.needsUpdate = true;
}

interface IntegrationSceneProps {
  map: IntegrationMap;
  focus: string | null;
  onFocus: (id: string | null) => void;
}

export function IntegrationScene({ map, focus, onFocus }: IntegrationSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef(focus);
  const onFocusRef = useRef(onFocus);

  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  useEffect(() => {
    onFocusRef.current = onFocus;
  }, [onFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let disposed = false;

    const renderer = createRenderer(root, styles.canvas);
    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 1, 0.1, 60);
    const rig = new Group();
    const world = new Group();
    rig.add(world);
    scene.add(rig);

    const coreGeometry = new CylinderGeometry(0.62, 0.62, 0.18, 6);
    const coreBody = new MeshBasicMaterial({ transparent: true, opacity: 0.9 });
    const core = new Mesh(coreGeometry, coreBody);
    const coreEdge = new LineBasicMaterial({ transparent: true });
    core.add(new LineSegments(new EdgesGeometry(coreGeometry), coreEdge));
    world.add(core);

    const coreTag = createTag();
    coreTag.sprite.position.set(0, 1, 0);
    coreTag.sprite.scale.multiplyScalar(1.15);
    world.add(coreTag.sprite);

    const ringPoints = Array.from({ length: 97 }, (_, index) => {
      const angle = (index / 96) * Math.PI * 2;
      return new Vector3(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS);
    });
    const ringMaterial = new LineBasicMaterial({ transparent: true });
    world.add(new Line(new BufferGeometry().setFromPoints(ringPoints), ringMaterial));

    const nodeGeometry = new CylinderGeometry(0.34, 0.34, 0.1, 40);
    const nodeEdges = new EdgesGeometry(nodeGeometry, 20);
    const hitGeometry = new CylinderGeometry(0.8, 0.8, 1, 12);

    const positions = map.nodes.map((_, index) => {
      const angle = (index / map.nodes.length) * Math.PI * 2 + Math.PI / 2;
      return new Vector3(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS);
    });

    const links: Link[] = map.nodes.map((node, index) => {
      const position = positions[index] ?? new Vector3();
      const viaIndex = node.via ? map.nodes.findIndex((entry) => entry.id === node.via) : -1;
      const origin = positions[viaIndex]?.clone() ?? new Vector3();

      const body = new MeshBasicMaterial({ transparent: true });
      const disc = new Mesh(nodeGeometry, body);
      disc.position.copy(position);

      const edge = new LineBasicMaterial({ transparent: true });
      const outline = new LineSegments(nodeEdges, edge);
      outline.position.copy(position);

      const hit = new Mesh(hitGeometry, new MeshBasicMaterial({ visible: false }));
      hit.position.copy(position);
      hit.userData.id = node.id;

      const curve = new QuadraticBezierCurve3(
        origin.clone(),
        origin.clone().lerp(position, 0.5).setY(ARC_HEIGHT),
        position.clone(),
      );
      const line = new LineBasicMaterial({ transparent: true });
      const path = new Line(new BufferGeometry().setFromPoints(curve.getPoints(48)), line);

      const tag = createTag();
      tag.sprite.position.copy(position).setY(0.62);

      world.add(disc, outline, hit, path, tag.sprite);

      return { node, curve, line, body, edge, tag, hit, glow: 0.45, fade: 1 };
    });

    const pulseCount = links.length * PULSES_PER_LINK;
    const progress = new Float32Array(pulseCount);
    const reverse = new Uint8Array(pulseCount);

    for (let i = 0; i < pulseCount; i += 1) {
      const direction = links[Math.floor(i / PULSES_PER_LINK)]?.node.direction;
      progress[i] = (i % PULSES_PER_LINK) / PULSES_PER_LINK;
      reverse[i] = direction === 'in' || (direction === 'both' && i % 2 === 1) ? 1 : 0;
    }

    const pulseGeometry = new BufferGeometry();
    const pulseAttribute = new Float32BufferAttribute(new Float32Array(pulseCount * 3), 3);
    pulseGeometry.setAttribute('position', pulseAttribute);

    const pulseMaterial = new PointsMaterial({
      size: 0.16,
      map: dotTexture(),
      transparent: true,
      depthWrite: false,
    });
    world.add(new Points(pulseGeometry, pulseMaterial));

    let palette = readPalette();
    let spin = 0;
    let time = 0;
    let hovered: string | null = null;

    const paint = () => {
      coreBody.color.copy(palette.surface.color.clone().lerp(palette.accent.color, 0.3));
      coreEdge.color.copy(palette.accent.color);
      ringMaterial.color.copy(palette.border.color);
      ringMaterial.opacity = palette.border.alpha;
      pulseMaterial.color.copy(palette.accent.color);

      links.forEach((link) => {
        link.body.color.copy(palette.surface.color);
        link.edge.color.copy(palette.accent.color);
        link.line.color.copy(palette.accent.color);
        drawTag(link.tag, link.node.label, link.node.detail, palette, false);
      });

      drawTag(coreTag, map.core, map.coreDetail, palette, true);
    };

    paint();

    const render = () => renderer.render(scene, camera);

    const resize = () => {
      const width = Math.max(root.clientWidth, 1);
      const height = Math.max(root.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.copy(CAMERA_DIRECTION).multiplyScalar(CAMERA_DISTANCE / Math.min(camera.aspect, 1));
      camera.lookAt(0, 0.2, 0);
      camera.updateProjectionMatrix();
      render();
    };

    const pointer = { x: 0, y: 0 };
    const tilt = { x: 0, y: 0 };
    const point = new Vector3();

    const tick = (delta: number) => {
      time += delta;
      const ease = 1 - Math.exp(-delta * 6);
      const current = focusRef.current;

      if (current === null) spin += delta * 0.08;
      tilt.x += (pointer.x - tilt.x) * ease;
      tilt.y += (pointer.y - tilt.y) * ease;
      world.rotation.y = spin + tilt.x * 0.4;
      rig.rotation.x = tilt.y * 0.12;
      core.scale.setScalar(1 + Math.sin(time * 2.2) * 0.035);

      for (let i = 0; i < pulseCount; i += 1) {
        const link = links[Math.floor(i / PULSES_PER_LINK)];
        if (!link) continue;

        progress[i] = (progress[i] + delta * PULSE_SPEED) % 1;

        if (current !== null && link.node.id !== current) {
          pulseAttribute.setXYZ(i, 0, -100, 0);
          continue;
        }

        link.curve.getPoint(reverse[i] ? 1 - progress[i] : progress[i], point);
        pulseAttribute.setXYZ(i, point.x, point.y, point.z);
      }
      pulseAttribute.needsUpdate = true;

      links.forEach((link) => {
        const lit = current === null || link.node.id === current;
        link.glow += ((current === null ? 0.45 : lit ? 1 : 0.08) - link.glow) * ease;
        link.fade += ((lit ? 1 : 0.3) - link.fade) * ease;
        link.line.opacity = link.glow;
        link.edge.opacity = link.fade;
        link.body.opacity = 0.9 * link.fade;
        link.tag.material.opacity = link.fade;
      });

      render();
    };

    const raycaster = new Raycaster();
    const ndc = new Vector2();
    const hitTargets = links.map((link) => link.hit);

    const handleMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;

      ndc.set(pointer.x * 2, -pointer.y * 2);
      raycaster.setFromCamera(ndc, camera);
      const [hit] = raycaster.intersectObjects(hitTargets, false);
      const id = hit ? (hit.object.userData.id as string) : null;

      if (id !== hovered) {
        hovered = id;
        root.style.cursor = id === null ? '' : 'pointer';
        onFocusRef.current(id);
      }
    };

    const handleLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      if (hovered === null) return;
      hovered = null;
      root.style.cursor = '';
      onFocusRef.current(null);
    };

    const sizing = new ResizeObserver(resize);
    const stopTheme = watchTheme(() => {
      palette = readPalette();
      paint();
      render();
    });

    resize();
    const stopLoop = runWhileVisible(root, renderer, tick);
    sizing.observe(root);
    root.addEventListener('pointermove', handleMove);
    root.addEventListener('pointerleave', handleLeave);

    document.fonts?.ready.then(() => {
      if (disposed) return;
      paint();
      render();
    });

    return () => {
      disposed = true;
      stopLoop();
      stopTheme();
      sizing.disconnect();
      root.removeEventListener('pointermove', handleMove);
      root.removeEventListener('pointerleave', handleLeave);
      root.style.cursor = '';
      destroyRenderer(renderer, scene);
    };
  }, [map]);

  return <div className={styles.root} ref={rootRef} />;
}

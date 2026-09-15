import { lazy, Suspense, useState, type CSSProperties } from 'react';

import { stackLayers, type StackLayer } from '@/data/stackLayers';
import { useEnterAnimation } from '@/hooks/useEnterAnimation';
import { useNearViewport } from '@/hooks/useNearViewport';
import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/cn';
import { depthIndex } from '@/lib/style';
import { canRenderScene } from '@/lib/webgl';

import styles from './StackVisual.module.css';

const StackScene = lazy(() =>
  import('./StackScene').then((module) => ({ default: module.StackScene })),
);

const LOST_LAYER: CSSProperties = { borderStyle: 'dashed', opacity: 0.35 };

interface StackVisualProps {
  layers?: StackLayer[];
  missingIndex?: number;
  interactive?: boolean;
  className?: string;
}

function CssStack({ layers, missingIndex }: { layers: StackLayer[]; missingIndex?: number }) {
  return (
    <>
      <span className={styles.floor} />

      <div className={styles.stack}>
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={styles.layer}
            style={index === missingIndex ? { ...depthIndex(index), ...LOST_LAYER } : depthIndex(index)}
          >
            <span className={styles.label}>{layer.label}</span>
            <span className={styles.tech}>{layer.tech}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export function StackVisual({
  layers = stackLayers,
  missingIndex,
  interactive = true,
  className,
}: StackVisualProps) {
  const [sceneSupported] = useState(canRenderScene);
  const sceneRef = useTilt<HTMLDivElement>(!sceneSupported, 9);
  const near = useNearViewport(sceneRef, sceneSupported);
  const showScene = sceneSupported && near;

  useEnterAnimation(sceneRef, 1100);

  const fallback = <CssStack layers={layers} missingIndex={missingIndex} />;

  return (
    <div
      className={cn(styles.scene, className)}
      ref={sceneRef}
      aria-hidden={showScene && interactive ? undefined : true}
    >
      {showScene ? (
        <Suspense fallback={fallback}>
          <StackScene layers={layers} missingIndex={missingIndex} interactive={interactive} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

import { lazy, Suspense, useRef, useState } from 'react';

import type { IntegrationDirection, IntegrationMap as IntegrationMapData } from '@/data/integrations';
import { useNearViewport } from '@/hooks/useNearViewport';
import { cn } from '@/lib/cn';
import { canRenderScene } from '@/lib/webgl';

import styles from './IntegrationMap.module.css';

const IntegrationScene = lazy(() =>
  import('./IntegrationScene').then((module) => ({ default: module.IntegrationScene })),
);

const DIRECTION: Record<IntegrationDirection, { symbol: string; label: string }> = {
  in: { symbol: '→', label: 'sends data in' },
  out: { symbol: '←', label: 'receives data' },
  both: { symbol: '⇄', label: 'syncs both ways' },
};

interface IntegrationMapProps {
  map: IntegrationMapData;
  compact?: boolean;
  className?: string;
}

export function IntegrationMap({ map, compact = false, className }: IntegrationMapProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [sceneSupported] = useState(canRenderScene);
  const near = useNearViewport(stageRef, sceneSupported);
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <div className={cn(styles.map, compact && styles.compact, className)}>
      {sceneSupported ? (
        <div className={styles.stage} ref={stageRef} aria-hidden="true">
          {near ? (
            <Suspense fallback={null}>
              <IntegrationScene map={map} focus={focus} onFocus={setFocus} />
            </Suspense>
          ) : null}
          {compact ? null : <span className={styles.hint}>Hover a system to trace it</span>}
        </div>
      ) : null}

      <ul className={cn(styles.legend, compact && sceneSupported && styles.srOnly)}>
        <li className={cn(styles.item, styles.core)}>
          <span className={styles.symbol} aria-hidden="true">
            ◆
          </span>
          <span className={styles.label}>{map.core}</span>
          <span className={styles.detail}>{map.coreDetail}</span>
        </li>

        {map.nodes.map((node) => (
          <li
            key={node.id}
            className={cn(styles.item, focus === node.id && styles.active)}
            onMouseEnter={() => setFocus(node.id)}
            onMouseLeave={() => setFocus(null)}
          >
            <span className={styles.symbol} aria-hidden="true">
              {DIRECTION[node.direction].symbol}
            </span>
            <span className={styles.label}>
              {node.label}
              <span className={styles.srOnly}> — {DIRECTION[node.direction].label}</span>
            </span>
            <span className={styles.detail}>
              {node.detail}
              {node.via
                ? ` · via ${map.nodes.find((entry) => entry.id === node.via)?.label ?? node.via}`
                : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

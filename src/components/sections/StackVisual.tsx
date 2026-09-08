import { stackLayers } from '@/data/stackLayers';
import { useEnterAnimation } from '@/hooks/useEnterAnimation';
import { useTilt } from '@/hooks/useTilt';
import { depthIndex } from '@/lib/style';

import styles from './StackVisual.module.css';

export function StackVisual() {
  const sceneRef = useTilt<HTMLDivElement>(true, 9);

  useEnterAnimation(sceneRef, 1100);

  return (
    <div className={styles.scene} ref={sceneRef} aria-hidden="true">
      <span className={styles.floor} />

      <div className={styles.stack}>
        {stackLayers.map((layer, index) => (
          <div key={layer.id} className={styles.layer} style={depthIndex(index)}>
            <span className={styles.label}>{layer.label}</span>
            <span className={styles.tech}>{layer.tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

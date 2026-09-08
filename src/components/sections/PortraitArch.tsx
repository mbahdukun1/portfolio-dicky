import { useState } from 'react';

import { profile } from '@/data/profile';
import { useEnterAnimation } from '@/hooks/useEnterAnimation';
import { useTilt } from '@/hooks/useTilt';

import styles from './PortraitArch.module.css';

export function PortraitArch() {
  const [imageFailed, setImageFailed] = useState(false);

  const sceneRef = useTilt<HTMLDivElement>(true, 6);

  useEnterAnimation(sceneRef, 1000);

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('');

  return (
    <div className={styles.scene} ref={sceneRef}>
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.stage}>
        <span className={styles.outline} aria-hidden="true" />

        <div className={styles.frame}>
          {imageFailed ? (
            <span className={styles.fallback} aria-hidden="true">
              {initials}
            </span>
          ) : (
            <img
              className={styles.photo}
              src={profile.avatar}
              alt={profile.avatarAlt}
              width={853}
              height={1280}
              loading="eager"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          )}

          <span className={styles.scrim} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

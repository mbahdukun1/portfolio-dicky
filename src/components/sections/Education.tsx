import { useState } from 'react';

import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { certifications, education } from '@/data/education';
import { formatMonth } from '@/lib/date';
import { revealDelay } from '@/lib/style';

import styles from './Education.module.css';

const COLLAPSED_COUNT = 4;

export function Education() {
  const [expanded, setExpanded] = useState(false);

  const visibleCertifications = expanded
    ? certifications
    : certifications.slice(0, COLLAPSED_COUNT);
  const hiddenCount = certifications.length - COLLAPSED_COUNT;

  return (
    <Section
      id="education"
      eyebrow="Education & Certification"
      title="How the foundation was built"
      pattern="rings"
      description="A computer engineering degree, an immersive full-stack bootcamp, and the certifications picked up along the way."
    >
      <div className={styles.layout}>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Education</h3>

          <ol className={styles.list}>
            {education.map((item, index) => (
              <li key={item.id}>
                <Card revealDelay={index * 70} className={styles.card}>
                  <span className={styles.period}>
                    {formatMonth(item.start)} — {formatMonth(item.end)}
                  </span>
                  <h4 className={styles.institution}>{item.institution}</h4>
                  <p className={styles.field}>{item.field}</p>
                  <p className={styles.qualification}>{item.qualification}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Certifications</h3>

          <ul className={styles.certList}>
            {visibleCertifications.map((item, index) => (
              <li
                key={item.id}
                className={styles.cert}
                data-reveal=""
                style={revealDelay((index % COLLAPSED_COUNT) * 60)}
              >
                <span className={styles.certMarker} aria-hidden="true" />
                <div>
                  <p className={styles.certName}>{item.name}</p>
                  <p className={styles.certIssuer}>{item.issuer}</p>
                </div>
              </li>
            ))}
          </ul>

          {hiddenCount > 0 ? (
            <button
              type="button"
              className={styles.toggle}
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : `Show ${hiddenCount} more`}
              <Icon
                name="chevron-down"
                size={14}
                className={expanded ? styles.chevronUp : undefined}
              />
            </button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

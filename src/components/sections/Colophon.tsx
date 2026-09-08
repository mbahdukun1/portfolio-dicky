import { Section } from '@/components/ui/Section';
import { caseStudies } from '@/data/caseStudies';
import { method, stack } from '@/data/colophon';
import { publishedWork } from '@/data/work';
import { revealDelay } from '@/lib/style';

import styles from './Colophon.module.css';

export function Colophon() {
  return (
    <Section
      id="colophon"
      eyebrow="Colophon"
      title="How this site is built"
      pattern="rules"
      description="The same questions I would ask about anyone else's work, answered about my own: what it runs on, and why it is put together this way."
    >
      <div className={styles.layout}>
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Stack</h3>

          <ul className={styles.list}>
            {stack.map((entry, index) => (
              <li
                key={entry.name}
                className={styles.entry}
                data-reveal=""
                style={revealDelay(Math.min(index, 5) * 50)}
              >
                <span className={styles.marker} aria-hidden="true" />
                <div>
                  <p className={styles.name}>{entry.name}</p>
                  <p className={styles.detail}>{entry.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Method</h3>

          <ul className={styles.list}>
            {method.map((entry, index) => (
              <li
                key={entry.name}
                className={styles.entry}
                data-reveal=""
                style={revealDelay(Math.min(index, 5) * 50)}
              >
                <span className={styles.marker} aria-hidden="true" />
                <div>
                  <p className={styles.name}>{entry.name}</p>
                  <p className={styles.detail}>{entry.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dl className={styles.stats} data-reveal="">
        <div>
          <dt>Projects</dt>
          <dd>{publishedWork.length}</dd>
        </div>
        <div>
          <dt>Case studies</dt>
          <dd>{caseStudies.length}</dd>
        </div>
        <div>
          <dt>Runtime dependencies</dt>
          <dd>3</dd>
        </div>
        <div>
          <dt>Trackers</dt>
          <dd>0</dd>
        </div>
      </dl>
    </Section>
  );
}

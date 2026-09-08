import { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { formatDuration, formatPeriod, monthsBetween } from '@/lib/date';
import { revealDelay } from '@/lib/style';
import type { Experience } from '@/types/portfolio';

import styles from './Experience.module.css';

const COLLAPSED_COUNT = 3;

interface ExperienceItemProps {
  experience: Experience;
  delay: number;
}

export function ExperienceItem({ experience, delay }: ExperienceItemProps) {
  const [expanded, setExpanded] = useState(false);

  const isCurrent = experience.end === null;
  const achievements = expanded
    ? experience.achievements
    : experience.achievements.slice(0, COLLAPSED_COUNT);
  const hiddenCount = experience.achievements.length - COLLAPSED_COUNT;

  return (
    <li className={styles.item} data-reveal="" style={revealDelay(delay)}>
      <div className={styles.marker} aria-hidden="true">
        <span className={isCurrent ? styles.dotCurrent : styles.dot} />
      </div>

      <article className={styles.body}>
        <header className={styles.head}>
          <div>
            <h3 className={styles.role}>{experience.role}</h3>
            <p className={styles.company}>{experience.company}</p>
          </div>

          <div className={styles.timing}>
            <span className={styles.period}>
              {formatPeriod(experience.start, experience.end)}
            </span>
            <span className={styles.duration}>
              {formatDuration(monthsBetween(experience.start, experience.end))}
            </span>
          </div>
        </header>

        <ul className={styles.facts}>
          <li>
            <Icon name="pin" size={14} />
            {experience.location}
          </li>
          <li>{experience.employmentType}</li>
          {isCurrent ? <li className={styles.current}>Current role</li> : null}
        </ul>

        <p className={styles.summary}>{experience.summary}</p>

        <ul className={styles.achievements}>
          {achievements.map((achievement) => (
            <li key={achievement}>{achievement}</li>
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

        <div className={styles.stack}>
          {experience.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </article>
    </li>
  );
}

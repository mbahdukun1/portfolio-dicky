import { Container } from '@/components/layout/Container';
import { PageIntro } from '@/components/layout/PageIntro';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { earlierExperiences, experiences, softwareExperiences } from '@/data/experiences';
import { formatDuration, formatPeriod, monthsBetween } from '@/lib/date';
import { revealDelay } from '@/lib/style';
import type { Experience } from '@/types/portfolio';

import styles from './ExperiencePage.module.css';

function Chapter({ experience, index }: { experience: Experience; index: number }) {
  const isCurrent = experience.end === null;
  const story = experience.story ?? [experience.summary];

  return (
    <article
      className={styles.chapter}
      data-reveal=""
      style={revealDelay(Math.min(index, 4) * 60)}
    >
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        <span className={isCurrent ? styles.dotCurrent : styles.dot} />
        <span className={styles.line} />
      </div>

      <div className={styles.content}>
        <p className={styles.period}>
          {formatPeriod(experience.start, experience.end)}
          <span className={styles.duration}>
            {formatDuration(monthsBetween(experience.start, experience.end))}
          </span>
          {isCurrent ? <span className={styles.current}>Current</span> : null}
        </p>

        <h2 className={styles.chapterTitle}>{experience.chapter ?? experience.role}</h2>

        <p className={styles.role}>
          {experience.role} · <span className={styles.company}>{experience.company}</span>
        </p>

        <ul className={styles.facts}>
          <li>
            <Icon name="pin" size={14} />
            {experience.location}
          </li>
          <li>{experience.employmentType}</li>
        </ul>

        <div className={styles.story}>
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <details className={styles.details}>
          <summary className={styles.summary}>
            <span>What that meant day to day</span>
            <Icon name="chevron-down" size={14} className={styles.summaryIcon} />
          </summary>

          <ul className={styles.achievements}>
            {experience.achievements.map((achievement) => (
              <li key={achievement}>{achievement}</li>
            ))}
          </ul>
        </details>

        <div className={styles.stack}>
          {experience.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ExperiencePage() {
  const totalMonths = softwareExperiences.reduce(
    (months, item) => months + monthsBetween(item.start, item.end),
    0,
  );
  const earliestYear = Math.min(
    ...experiences.map((item) => Number(item.start.slice(0, 4))),
  );

  return (
    <>
      <PageIntro
        eyebrow="The journey"
        title="From the workshop floor to system architecture"
        lede="It did not start with code. This is the long version: every role in order, and why each one led to the next."
        meta={[
          { label: 'Engineering roles', value: String(softwareExperiences.length) },
          { label: 'In software', value: formatDuration(totalMonths) },
          { label: 'Starting', value: String(earliestYear) },
        ]}
      />

      <section className={styles.body} aria-label="Career journey">
        <Container>
          <div className={styles.timeline}>
            {softwareExperiences.map((experience, index) => (
              <Chapter key={experience.id} experience={experience} index={index} />
            ))}
          </div>

          {earlierExperiences.length > 0 ? (
            <div className={styles.before} data-reveal="">
              <header className={styles.beforeHead}>
                <p className={styles.beforeEyebrow}>
                  <span className={styles.beforeRule} aria-hidden="true" />
                  Before software
                </p>
                <h2 className={styles.beforeTitle}>Where the habits came from</h2>
                <p className={styles.beforeLede}>
                  The roles that came before the first line of production code — and the
                  parts of them that stayed.
                </p>
              </header>

              <div className={styles.beforeList}>
                {earlierExperiences.map((experience, index) => (
                  <Chapter
                    key={experience.id}
                    experience={experience}
                    index={softwareExperiences.length + index}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className={styles.outro}>
            <p className={styles.outroText}>
              That is the route so far. The next chapter is usually the interesting one.
            </p>

            <div className={styles.outroActions}>
              <Button to="/projects" variant="secondary">
                See the projects
              </Button>
              <Button to="/#contact" trailing={<Icon name="arrow-up-right" size={16} />}>
                Get in touch
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

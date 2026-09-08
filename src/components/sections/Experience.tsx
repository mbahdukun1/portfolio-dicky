import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { experiences, recentExperiences, softwareExperiences } from '@/data/experiences';

import styles from './Experience.module.css';
import { ExperienceItem } from './ExperienceItem';

export function Experience() {
  const remaining = experiences.length - recentExperiences.length;
  const earliestYear = Math.min(
    ...experiences.map((item) => Number(item.start.slice(0, 4))),
  );

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where the work happened"
      pattern="rules"
      description={`${softwareExperiences.length} engineering roles across product studios, consultancies, and enterprise delivery — from automation bots to the architecture decisions behind a microservices platform.`}
    >
      <ol className={styles.timeline}>
        {recentExperiences.map((experience, index) => (
          <ExperienceItem key={experience.id} experience={experience} delay={index * 60} />
        ))}
      </ol>

      {remaining > 0 ? (
        <div className={styles.more} data-reveal="">
          <div className={styles.moreCopy}>
            <p className={styles.moreCount}>{remaining} earlier roles</p>
            <p className={styles.moreText}>
              Back to {earliestYear}, written as one story rather than a list.
            </p>
          </div>

          <Button
            to="/experience"
            variant="secondary"
            trailing={<Icon name="arrow-up-right" size={16} />}
          >
            Read the full journey
          </Button>
        </div>
      ) : null}
    </Section>
  );
}

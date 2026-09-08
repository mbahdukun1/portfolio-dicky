import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { featuredWork, highlightedWork, publishedWork } from '@/data/work';

import { ProjectCard } from './ProjectCard';
import styles from './Work.module.css';

export function Work() {
  const shown = featuredWork ? [featuredWork, ...highlightedWork] : highlightedWork;
  const remaining = publishedWork.length - shown.length;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems I have designed, built, and shipped"
      pattern="stripes"
      description="The three most recent — a warehouse platform, the handheld app that works its floor, and the workshop app behind its fleet. Each one has a case study behind it."
      tone="sunken"
    >
      {featuredWork ? (
        <ProjectCard item={featuredWork} variant="featured" className={styles.featured} />
      ) : null}

      <div className={styles.grid}>
        {highlightedWork.map((item, index) => (
          <ProjectCard key={item.id} item={item} revealDelay={index * 60} />
        ))}
      </div>

      {remaining > 0 ? (
        <div className={styles.more} data-reveal="">
          <div className={styles.moreCopy}>
            <p className={styles.moreCount}>
              {remaining} more {remaining === 1 ? 'project' : 'projects'}
            </p>
            <p className={styles.moreText}>
              The rest of the archive, including the freelance and personal builds.
            </p>
          </div>

          <Button
            to="/projects"
            variant="secondary"
            trailing={<Icon name="arrow-up-right" size={16} />}
          >
            Browse all projects
          </Button>
        </div>
      ) : null}
    </Section>
  );
}

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { WorkItem } from '@/types/portfolio';

import styles from './ProjectCard.module.css';
import { ProjectCover } from './ProjectCover';

function ProjectLinks({ item }: { item: WorkItem }) {
  if (!item.href && !item.repo) return null;

  return (
    <div className={styles.links}>
      {item.href ? (
        <a href={item.href} target="_blank" rel="noreferrer noopener">
          <Icon name="globe" size={15} />
          Live
        </a>
      ) : null}

      {item.repo ? (
        <a href={item.repo} target="_blank" rel="noreferrer noopener">
          <Icon name="github" size={15} />
          Source
        </a>
      ) : null}
    </div>
  );
}

interface ProjectCardProps {
  item: WorkItem;
  variant?: 'default' | 'featured';
  revealDelay?: number;
  className?: string;
}

export function ProjectCard({
  item,
  variant = 'default',
  revealDelay,
  className,
}: ProjectCardProps) {
  const isFeatured = variant === 'featured';

  const head = (
    <>
      <div className={styles.meta}>
        {isFeatured ? <Badge tone="accent">Featured</Badge> : null}
        <span className={styles.context}>{item.context}</span>
        <span className={styles.period}>{item.period}</span>
      </div>

      <h3 className={cn(styles.title, isFeatured && styles.featuredTitle)}>
        {item.href ? (
          <a href={item.href} target="_blank" rel="noreferrer noopener">
            {item.title}
            <Icon name="arrow-up-right" size={isFeatured ? 18 : 16} />
          </a>
        ) : (
          item.title
        )}
      </h3>

      <p className={styles.description}>{item.description}</p>

      <ul className={styles.contributions}>
        {item.contributions.map((contribution) => (
          <li key={contribution}>{contribution}</li>
        ))}
      </ul>

      <div className={styles.footer}>
        <div className={styles.stack}>
          {item.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <ProjectLinks item={item} />
      </div>
    </>
  );

  if (isFeatured) {
    return (
      <Card tilt className={cn(styles.card, styles.featured, className)}>
        <ProjectCover item={item} className={styles.featuredCover} />
        <div className={styles.featuredBody}>{head}</div>
      </Card>
    );
  }

  return (
    <Card tilt revealDelay={revealDelay} className={cn(styles.card, className)}>
      <ProjectCover item={item} className={styles.cover} />
      {head}
    </Card>
  );
}

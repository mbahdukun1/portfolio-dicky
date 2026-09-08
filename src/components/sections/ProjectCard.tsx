import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { hasCaseStudy } from '@/data/caseStudies';
import { cn } from '@/lib/cn';
import type { WorkItem } from '@/types/portfolio';

import styles from './ProjectCard.module.css';
import { ProjectCover } from './ProjectCover';

function ProjectLinks({ item }: { item: WorkItem }) {
  const story = hasCaseStudy(item.id);

  if (!story && !item.href && !item.repo) return null;

  return (
    <div className={styles.links}>
      {story ? (
        <Link to={`/projects/${item.id}`} className={styles.story}>
          <Icon name="expand" size={15} />
          Read the case study
        </Link>
      ) : null}

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
  const story = hasCaseStudy(item.id);
  const hasLinks = story || Boolean(item.href) || Boolean(item.repo);

  const titleContent = story ? (
    <Link to={`/projects/${item.id}`}>
      {item.title}
      <Icon name="arrow-up-right" size={isFeatured ? 18 : 16} />
    </Link>
  ) : item.href ? (
    <a href={item.href} target="_blank" rel="noreferrer noopener">
      {item.title}
      <Icon name="arrow-up-right" size={isFeatured ? 18 : 16} />
    </a>
  ) : (
    item.title
  );

  const head = (
    <>
      <div className={styles.meta}>
        {isFeatured ? <Badge tone="accent">Featured</Badge> : null}
        {item.comingSoon ? <Badge tone="accent">Coming soon</Badge> : null}
        <span className={styles.context}>{item.context}</span>
        <span className={styles.period}>{item.period}</span>
      </div>

      <h3 className={cn(styles.title, isFeatured && styles.featuredTitle)}>{titleContent}</h3>

      <p className={styles.description}>{item.description}</p>

      {item.contributions.length > 0 ? (
        <ul className={styles.contributions}>
          {item.contributions.map((contribution) => (
            <li key={contribution}>{contribution}</li>
          ))}
        </ul>
      ) : (
        <p className={styles.pending}>Write-up in progress.</p>
      )}

      {item.stack.length > 0 || hasLinks ? (
        <div className={styles.footer}>
          {item.stack.length > 0 ? (
            <div className={styles.stack}>
              {item.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          ) : null}

          <ProjectLinks item={item} />
        </div>
      ) : null}
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

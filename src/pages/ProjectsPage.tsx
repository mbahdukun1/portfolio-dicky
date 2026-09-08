import { useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { PageIntro } from '@/components/layout/PageIntro';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { publishedWork, workTags } from '@/data/work';
import { cn } from '@/lib/cn';

import styles from './ProjectsPage.module.css';

const ALL = 'All';

export function ProjectsPage() {
  const [tag, setTag] = useState(ALL);

  const filtered = useMemo(
    () =>
      tag === ALL ? publishedWork : publishedWork.filter((item) => item.stack.includes(tag)),
    [tag],
  );

  const years = publishedWork.map((item) => item.period.slice(0, 4));
  const oldest = years.reduce((a, b) => (a < b ? a : b), years[0] ?? '');

  return (
    <>
      <PageIntro
        eyebrow="Project archive"
        title="Everything, not only the highlights"
        lede="From enterprise platforms to things I built for myself. Each entry says what it does and what I contributed."
        meta={[
          { label: 'Projects', value: String(publishedWork.length) },
          { label: 'Since', value: oldest },
          { label: 'Technologies', value: String(workTags.length) },
        ]}
      />

      <section className={styles.body} aria-label="All projects">
        <Container>
          <div className={styles.filters} role="group" aria-label="Filter by technology">
            <button
              type="button"
              className={cn(styles.chip, tag === ALL && styles.chipActive)}
              aria-pressed={tag === ALL}
              onClick={() => setTag(ALL)}
            >
              All
              <span className={styles.chipCount}>{publishedWork.length}</span>
            </button>

            {workTags.map((item) => (
              <button
                key={item}
                type="button"
                className={cn(styles.chip, tag === item && styles.chipActive)}
                aria-pressed={tag === item}
                onClick={() => setTag(item)}
              >
                {item}
                <span className={styles.chipCount}>
                  {publishedWork.filter((project) => project.stack.includes(item)).length}
                </span>
              </button>
            ))}
          </div>

          <p className={styles.count} aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            {tag === ALL ? '' : ` using ${tag}`}
          </p>

          <div className={styles.grid}>
            {filtered.map((item, index) => (
              <ProjectCard
                key={item.id}
                item={item}
                revealDelay={Math.min(index, 5) * 60}
              />
            ))}
          </div>

          <div className={styles.outro}>
            <p className={styles.outroText}>
              Something here worth a longer conversation?
            </p>

            <div className={styles.outroActions}>
              <Button to="/experience" variant="secondary">
                Read the journey
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

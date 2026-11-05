import { useMemo, useState } from 'react';

import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { Section } from '@/components/ui/Section';
import { hasCaseStudy } from '@/data/caseStudies/catalog';
import { skillGroups } from '@/data/skills';
import { cn } from '@/lib/cn';
import { projectsUsing, shortTitle } from '@/lib/skillUsage';
import type { SkillGroup } from '@/types/portfolio';

import styles from './Skills.module.css';

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const usage = useMemo(
    () => new Map(group.items.map((item) => [item, projectsUsing(item)])),
    [group.items],
  );
  const linked = group.items.filter((item) => (usage.get(item)?.length ?? 0) > 0);
  const [active, setActive] = useState<string | null>(null);
  const projects = active ? (usage.get(active) ?? []) : [];

  return (
    <Card tilt revealDelay={index * 70} className={styles.card}>
      <header className={styles.head}>
        <span className={styles.icon}>
          <Icon name={group.icon} size={20} />
        </span>

        <div>
          <h3 className={styles.title}>{group.title}</h3>
          <p className={styles.description}>{group.description}</p>
        </div>
      </header>

      <ul className={styles.items}>
        {group.items.map((item) => {
          const count = usage.get(item)?.length ?? 0;

          if (count === 0) {
            return (
              <li key={item} className={styles.item}>
                {item}
              </li>
            );
          }

          return (
            <li key={item}>
              <button
                type="button"
                className={cn(styles.item, styles.skill, active === item && styles.skillActive)}
                onMouseEnter={() => setActive(item)}
                onFocus={() => setActive(item)}
                onClick={() => setActive(item)}
                aria-pressed={active === item}
              >
                {item}
                <span className={styles.count}>{count}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {linked.length > 0 ? (
        <div className={styles.usage} aria-live="polite">
          {active && projects.length > 0 ? (
            <>
              <span className={styles.usageLabel}>
                <span className={styles.usageSkill}>{active}</span> shipped in
              </span>
              <ul className={styles.usageList} key={active}>
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      to={hasCaseStudy(project.id) ? `/projects/${project.id}` : '/projects'}
                      className={styles.usageLink}
                    >
                      {shortTitle(project)}
                      <Icon name="arrow-up-right" size={12} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <span className={styles.usageHint}>
              Hover a highlighted skill to see the projects it shipped in
            </span>
          )}
        </div>
      ) : null}
    </Card>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The toolkit, grouped by what it is for"
      pattern="dots"
      description="Listed by how I actually use them day to day rather than as a wall of logos — frontend and backend first, then the data and platform work that keeps both honest."
      tone="sunken"
    >
      <div className={styles.grid}>
        {skillGroups.map((group, index) => (
          <SkillCard key={group.id} group={group} index={index} />
        ))}
      </div>
    </Section>
  );
}

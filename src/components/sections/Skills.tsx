import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { skillGroups } from '@/data/skills';

import styles from './Skills.module.css';

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
          <Card key={group.id} tilt revealDelay={index * 70} className={styles.card}>
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
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

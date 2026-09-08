import { Section } from '@/components/ui/Section';
import { languages } from '@/data/education';
import { profile } from '@/data/profile';

import styles from './About.module.css';
import { StackVisual } from './StackVisual';

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineer across the whole stack, deliberate about the parts that are hard to change."
      pattern="beam"
    >
      <div className={styles.layout}>
        <div className={styles.prose} data-reveal="">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}

          <div className={styles.languages}>
            <span className={styles.languagesLabel}>Languages</span>
            <ul>
              {languages.map((language) => (
                <li key={language.name}>
                  <strong>{language.name}</strong>
                  <span>{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <StackVisual />
      </div>
    </Section>
  );
}

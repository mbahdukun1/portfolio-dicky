import { useRef } from 'react';

import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { StatValue } from '@/components/ui/StatValue';
import { experiences } from '@/data/experiences';
import { profile } from '@/data/profile';
import { topSkills } from '@/data/skills';
import { useHeroIntro } from '@/hooks/useHeroIntro';
import { stats } from '@/lib/stats';
import { revealDelay } from '@/lib/style';

import styles from './Hero.module.css';
import { PortraitArch } from './PortraitArch';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const current = experiences[0];

  useHeroIntro(heroRef);

  return (
    <section
      id="home"
      className={styles.hero}
      aria-labelledby="hero-heading"
      ref={heroRef}
    >
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <Badge tone="accent" className={styles.status} data-hero="status">
            <span className={styles.pulse} aria-hidden="true" />
            {current ? `Currently at ${current.company}` : 'Available for work'}
          </Badge>

          <h1 className={styles.title} id="hero-heading" data-hero="title">
            {profile.name}
          </h1>

          <p className={styles.headline} data-hero="headline">
            {profile.headline}
          </p>
          <p className={styles.tagline} data-hero="tagline">
            {profile.tagline}
          </p>

          <ul className={styles.meta} data-hero="meta">
            <li>
              <Icon name="pin" size={15} />
              {profile.location}
            </li>
            <li>
              <Icon name="mail" size={15} />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          </ul>

          <div className={styles.actions} data-hero="actions">
            <Button href="#contact" trailing={<Icon name="arrow-up-right" size={16} />}>
              Get in touch
            </Button>
            <Button
              href={profile.resume}
              variant="secondary"
              external
              leading={<Icon name="arrow-down" size={16} />}
            >
              Download CV
            </Button>

            <div className={styles.socials}>
              {profile.socials
                .filter((social) => social.icon !== 'mail')
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.social}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    title={social.label}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
            </div>
          </div>

          <div className={styles.coreSkills} data-hero="core">
            <span className={styles.coreLabel}>Core</span>
            {topSkills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>

        <PortraitArch />

        <dl className={styles.stats}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={styles.stat}
              data-reveal=""
              style={revealDelay(index * 70)}
            >
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>
                <StatValue value={stat.value} />
              </dd>
              <p className={styles.statDetail}>{stat.detail}</p>
            </div>
          ))}
        </dl>
      </Container>

      <a className={styles.scrollHint} href="#about">
        <Icon name="arrow-down" size={16} />
        Scroll
      </a>
    </section>
  );
}

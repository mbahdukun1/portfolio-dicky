import { useMemo, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { PageIntro } from '@/components/layout/PageIntro';
import { IntegrationMap } from '@/components/sections/IntegrationMap';
import { PhoneShowcase } from '@/components/sections/PhoneShowcase';
import { ShotFrame } from '@/components/sections/ShotFrame';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Lightbox } from '@/components/ui/Lightbox';
import { caseStudies } from '@/data/caseStudies';
import { integrations } from '@/data/integrations';
import { publishedWork } from '@/data/work';
import { cn } from '@/lib/cn';
import { revealDelay } from '@/lib/style';
import type { CaseStudy } from '@/types/portfolio';

import styles from './CaseStudyPage.module.css';

interface CaseStudyPageProps {
  study: CaseStudy;
}

export function CaseStudyPage({ study }: CaseStudyPageProps) {
  const [openShot, setOpenShot] = useState<number | null>(null);

  const project = publishedWork.find((item) => item.id === study.slug);
  const stack = project?.stack ?? [];

  const indexOfShot = (id: string) => study.gallery.findIndex((shot) => shot.id === id);
  
  const wideSet = study.gallery.every((shot) => shot.shape === 'wide');
  const phoneShots = useMemo(
    () => study.gallery.filter((shot) => shot.shape !== 'wide'),
    [study.gallery],
  );
  const integration = integrations[study.slug];

  const position = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(position + 1) % caseStudies.length];

  return (
    <>
      <PageIntro
        eyebrow={study.context}
        title={study.title}
        lede={study.lede}
        backTo="/projects"
        backLabel="Back to projects"
        meta={[
          { label: 'Role', value: study.role },
          { label: 'Platform', value: study.platform },
          { label: 'Period', value: study.period },
          ...(study.gallery.length > 0
            ? [{ label: 'Screens', value: String(study.gallery.length) }]
            : []),
        ]}
      >
        {stack.length > 0 ? (
          <div className={styles.stack}>
            {stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        ) : null}
      </PageIntro>

      <article className={styles.body}>
        <Container>
          <section className={styles.overview} data-reveal="">
            {study.overview.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? styles.lead : undefined}>
                {paragraph}
              </p>
            ))}
          </section>

          <PhoneShowcase
            shots={phoneShots}
            onOpen={(shot) => setOpenShot(indexOfShot(shot.id))}
            className={styles.flow}
          >
            <header className={styles.blockHead} data-reveal="">
              <p className={styles.eyebrow}>In the hand</p>
              <h2 className={styles.blockTitle}>Turn the device over</h2>
              <p className={styles.blockLede}>
                Drag the phone to spin it, step through the screens, or open any of them full size.
              </p>
            </header>
          </PhoneShowcase>

          <section className={styles.flow} aria-labelledby="flow-heading">
            <header className={styles.blockHead} data-reveal="">
              <p className={styles.eyebrow}>End to end</p>
              <h2 id="flow-heading" className={styles.blockTitle}>
                How the app runs, start to finish
              </h2>
            </header>

            <ol className={styles.steps}>
              {study.flow.map((step, index) => (
                <li
                  key={step.title}
                  className={styles.step}
                  data-reveal=""
                  style={revealDelay(Math.min(index, 5) * 60)}
                >
                  <span className={styles.stepIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDetail}>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {integration ? (
            <section className={styles.flow} aria-labelledby="systems-heading">
              <header className={styles.blockHead} data-reveal="">
                <p className={styles.eyebrow}>Systems</p>
                <h2 id="systems-heading" className={styles.blockTitle}>
                  Where the data moves
                </h2>
                <p className={styles.blockLede}>
                  Every system this app has to agree with, and which way the data flows between
                  them.
                </p>
              </header>

              <IntegrationMap map={integration} />
            </section>
          ) : null}

          {study.chapters.map((chapter) => (
            <section
              key={chapter.id}
              className={styles.chapter}
              aria-labelledby={`${chapter.id}-heading`}
            >
              <div className={styles.prose} data-reveal="">
                <h2 id={`${chapter.id}-heading`} className={styles.chapterTitle}>
                  {chapter.heading}
                </h2>

                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {chapter.shots && chapter.shots.length > 0 ? (
                <div className={cn(styles.shots, wideSet && styles.wideSet)}>
                  {chapter.shots.map((id, index) => {
                    const shotIndex = indexOfShot(id);
                    const shot = study.gallery[shotIndex];
                    if (!shot) return null;

                    return (
                      <div
                        key={shot.id}
                        className={shot.shape === 'wide' ? styles.shotWide : undefined}
                        data-reveal=""
                        style={revealDelay(Math.min(index, 4) * 60)}
                      >
                        <ShotFrame
                          shot={shot}
                          onOpen={() => setOpenShot(shotIndex)}
                          showCaption={false}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </section>
          ))}

          {study.outcomes && study.outcomes.length > 0 ? (
            <section className={styles.outcomes} data-reveal="" aria-labelledby="outcomes-heading">
              <h2 id="outcomes-heading" className={styles.outcomesTitle}>
                What changed
              </h2>

              <ul className={styles.outcomesList}>
                {study.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {study.gallery.length > 0 ? (
          <section className={styles.gallery} aria-labelledby="gallery-heading">
            <header className={styles.blockHead} data-reveal="">
              <p className={styles.eyebrow}>Every screen</p>
              <h2 id="gallery-heading" className={styles.blockTitle}>
                The full walkthrough
              </h2>
              <p className={styles.blockLede}>
                {study.gallery.length} screens from the app. Click any of them to see it full size —
                arrow keys move through the set.
              </p>
            </header>

            <div className={cn(styles.galleryGrid, wideSet && styles.wideSet)}>
              {study.gallery.map((shot, index) => (
                <div
                  key={shot.id}
                  className={shot.shape === 'wide' ? styles.shotWide : undefined}
                  data-reveal=""
                  style={revealDelay(Math.min(index, 5) * 50)}
                >
                  <ShotFrame shot={shot} onOpen={() => setOpenShot(index)} />
                </div>
              ))}
            </div>
          </section>
          ) : null}

          <nav className={styles.outro} aria-label="Keep reading">
            <div>
              <p className={styles.outroLabel}>Next case study</p>
              <p className={styles.outroTitle}>{next?.title}</p>
            </div>

            <div className={styles.outroActions}>
              <Button to="/projects" variant="secondary">
                All projects
              </Button>
              {next && next.slug !== study.slug ? (
                <Button
                  to={`/projects/${next.slug}`}
                  trailing={<Icon name="arrow-up-right" size={16} />}
                >
                  Read it
                </Button>
              ) : null}
            </div>
          </nav>
        </Container>
      </article>

      {openShot !== null ? (
        <Lightbox
          shots={study.gallery}
          index={openShot}
          onClose={() => setOpenShot(null)}
          onNavigate={setOpenShot}
        />
      ) : null}
    </>
  );
}

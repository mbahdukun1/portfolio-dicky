import { useEffect, type ReactNode } from 'react';

import { Backdrop } from '@/components/layout/Backdrop';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { findCaseStudy } from '@/data/caseStudies';
import { absoluteUrl } from '@/data/site';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/hooks/useRouter';
import { CaseStudyPage } from '@/pages/CaseStudyPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectsPage } from '@/pages/ProjectsPage';

import styles from './App.module.css';

const HOME_TITLE = 'Dicky Maulana — Software Engineer & Full Stack Developer';

const PAGE_TITLES: Record<string, string> = {
  '/projects': 'Projects — Dicky Maulana',
  '/experience': 'The journey — Dicky Maulana',
};

function caseStudyFor(path: string) {
  const slug = path.startsWith('/projects/') ? path.slice('/projects/'.length) : '';
  return slug ? findCaseStudy(slug) : undefined;
}

function renderPage(path: string): ReactNode {
  if (path === '/') return <HomePage />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/experience') return <ExperiencePage />;

  const study = caseStudyFor(path);
  if (study) return <CaseStudyPage key={study.slug} study={study} />;

  return <NotFoundPage />;
}

function titleFor(path: string): string {
  const study = caseStudyFor(path);
  if (study) return `${study.title} — Dicky Maulana`;
  return PAGE_TITLES[path] ?? HOME_TITLE;
}

export default function App() {
  const { path } = useRouter();

  useReveal(path);

  useEffect(() => {
    document.title = titleFor(path);

    // Every route is served from index.html, so the canonical tag has to follow
    // the router — otherwise each page claims to be the home page.
    const url = absoluteUrl(path);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');

    if (canonical) canonical.href = url;
    if (ogUrl) ogUrl.content = url;
  }, [path]);

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>

      <Backdrop />
      <ScrollProgress />
      <Header />

      <main id="main">{renderPage(path)}</main>

      <Footer />
    </>
  );
}

import { lazy, Suspense, useEffect, type ReactNode } from 'react';

import { Backdrop } from '@/components/layout/Backdrop';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { findCaseStudyEntry } from '@/data/caseStudies/catalog';
import { absoluteUrl } from '@/data/site';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/hooks/useRouter';
import { HomePage } from '@/pages/HomePage';

import styles from './App.module.css';

const loadCaseStudyPage = () => import('@/pages/CaseStudyPage');
const loadExperiencePage = () => import('@/pages/ExperiencePage');
const loadProjectsPage = () => import('@/pages/ProjectsPage');
const loadNotFoundPage = () => import('@/pages/NotFoundPage');

const CaseStudyRoute = lazy(() => loadCaseStudyPage().then((module) => ({ default: module.CaseStudyRoute })));
const ExperiencePage = lazy(() => loadExperiencePage().then((module) => ({ default: module.ExperiencePage })));
const ProjectsPage = lazy(() => loadProjectsPage().then((module) => ({ default: module.ProjectsPage })));
const NotFoundPage = lazy(() => loadNotFoundPage().then((module) => ({ default: module.NotFoundPage })));

function preloadPages() {
  void loadProjectsPage();
  void loadCaseStudyPage();
  void loadExperiencePage();
}

const HOME_TITLE = 'Dicky Maulana — Software Engineer & Full Stack Developer';

const PAGE_TITLES: Record<string, string> = {
  '/projects': 'Projects — Dicky Maulana',
  '/experience': 'The journey — Dicky Maulana',
};

function caseStudyFor(path: string) {
  const slug = path.startsWith('/projects/') ? path.slice('/projects/'.length) : '';
  return slug ? findCaseStudyEntry(slug) : undefined;
}

function renderPage(path: string): ReactNode {
  if (path === '/') return <HomePage />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/experience') return <ExperiencePage />;

  const study = caseStudyFor(path);
  if (study) return <CaseStudyRoute key={study.slug} slug={study.slug} />;

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
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(preloadPages, { timeout: 4000 });
      return () => window.cancelIdleCallback(handle);
    }

    const timer = window.setTimeout(preloadPages, 2500);
    return () => window.clearTimeout(timer);
  }, []);

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

      <main id="main">
        <Suspense fallback={null}>{renderPage(path)}</Suspense>
      </main>

      <Footer />
    </>
  );
}

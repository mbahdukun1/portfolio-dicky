import { useEffect, type ReactNode } from 'react';

import { Backdrop } from '@/components/layout/Backdrop';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { useReveal } from '@/hooks/useReveal';
import { useRouter } from '@/hooks/useRouter';
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

function renderPage(path: string): ReactNode {
  if (path === '/') return <HomePage />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/experience') return <ExperiencePage />;
  return <NotFoundPage />;
}

export default function App() {
  const { path } = useRouter();

  useReveal(path);

  useEffect(() => {
    document.title = PAGE_TITLES[path] ?? HOME_TITLE;
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

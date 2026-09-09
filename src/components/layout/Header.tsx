import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { navigation, PAGE_FOR_SECTION, pageLinks } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useRouter } from '@/hooks/useRouter';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/cn';

import styles from './Header.module.css';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();
  const { path } = useRouter();

  const sectionIds = useMemo(() => navigation.map((item) => item.id), []);
  const scrolledSection = useScrollSpy(sectionIds);

  const activeId = path === '/' ? scrolledSection : (PAGE_FOR_SECTION[path] ?? '');

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The active pill is one element that slides, rather than a background that
  // jumps between links. Measured from the DOM so it survives font swaps.
  const navListRef = useRef<HTMLUListElement>(null);
  const measuredOnce = useRef(false);
  const [indicator, setIndicator] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    animate: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    const list = navListRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[data-active="true"]');

      if (!active) {
        setIndicator(null);
        measuredOnce.current = false;
        return;
      }

      setIndicator({
        left: active.offsetLeft,
        top: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
        animate: measuredOnce.current,
      });
      measuredOnce.current = true;
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeId]);

  const [firstName, ...lastNameParts] = profile.name.split(' ');
  const lastName = lastNameParts.join(' ');

  // "Software Engineer · Full Stack Developer" — the navbar only has room for one.
  const shortRole = profile.headline.split('·').pop()?.trim() ?? '';

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <Container className={styles.inner}>
        <Link
          to="/#home"
          className={styles.brand}
          onClick={closeMenu}
          ariaLabel={`${profile.name} — home`}
        >
          <span className={styles.brandName}>
            <span className={styles.brandFirst}>{firstName}</span>
            {lastName && <span className={styles.brandLast}>{lastName}</span>}
          </span>

          {shortRole && (
            <span className={styles.brandRole} aria-hidden="true">
              {shortRole}
            </span>
          )}
        </Link>

        <nav className={styles.nav} aria-label="Section navigation">
          <ul className={styles.navList} ref={navListRef}>
            {indicator && (
              <li
                className={cn(
                  styles.navIndicator,
                  indicator.animate && styles.navIndicatorSlide,
                )}
                aria-hidden="true"
                style={{
                  transform: `translate(${indicator.left}px, ${indicator.top}px)`,
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                }}
              />
            )}

            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  className={cn(styles.navLink, activeId === item.id && styles.navActive)}
                  ariaCurrent={activeId === item.id ? 'true' : undefined}
                  dataActive={activeId === item.id ? 'true' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </Container>

      <Container>
        <div
          id="mobile-menu"
          className={cn(styles.mobileMenu, menuOpen && styles.mobileMenuOpen)}
          hidden={!menuOpen}
        >
          <ul className={styles.mobileList}>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  className={cn(
                    styles.mobileLink,
                    activeId === item.id && styles.mobileLinkActive,
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.mobilePages}>
            {pageLinks.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className={styles.mobilePageLink}
                onClick={closeMenu}
              >
                <span className={styles.mobilePageLabel}>
                  {page.label}
                  <Icon name="arrow-up-right" size={14} />
                </span>
                <span className={styles.mobilePageDescription}>{page.description}</span>
              </Link>
            ))}
          </div>

          <a className={styles.mobileMail} href={`mailto:${profile.email}`}>
            <Icon name="mail" size={16} />
            {profile.email}
          </a>
        </div>
      </Container>
    </header>
  );
}

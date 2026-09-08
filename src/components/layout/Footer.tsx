import { Container } from '@/components/layout/Container';
import { Icon } from '@/components/ui/Icon';
import { Link } from '@/components/ui/Link';
import { navigation, pageLinks } from '@/data/navigation';
import { profile } from '@/data/profile';

import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.identity}>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.role}>{profile.headline}</p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <Link to={`/#${item.id}`}>{item.label}</Link>
              </li>
            ))}

            {pageLinks.map((page) => (
              <li key={page.to}>
                <Link to={page.to} className={styles.pageLink}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.socials}>
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              title={social.label}
              {...(social.icon === 'mail'
                ? {}
                : { target: '_blank', rel: 'noreferrer noopener' })}
            >
              <Icon name={social.icon} size={18} />
            </a>
          ))}
        </div>
      </Container>

      <Container className={styles.legal}>
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className={styles.built}>Built with React, TypeScript, and Vite.</p>
      </Container>
    </footer>
  );
}

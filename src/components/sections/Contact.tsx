import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { profile } from '@/data/profile';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { revealDelay } from '@/lib/style';

import styles from './Contact.module.css';

export function Contact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk about what you are building"
      pattern="glow"
      description="Open to full-stack roles, system architecture work, and collaborations. The fastest way to reach me is email — I read everything."
      tone="sunken"
    >
      <div className={styles.layout}>
        <div className={styles.primary} data-reveal="">
          <p className={styles.emailLabel}>Email</p>

          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>

          <div className={styles.actions}>
            <Button
              href={`mailto:${profile.email}`}
              trailing={<Icon name="arrow-up-right" size={16} />}
            >
              Send an email
            </Button>

            <Button
              variant="secondary"
              onClick={() => void copy(profile.email)}
              ariaLabel="Copy email address"
            >
              {copied ? 'Copied' : 'Copy address'}
            </Button>

            <Button
              href={profile.resume}
              variant="ghost"
              external
              leading={<Icon name="arrow-down" size={16} />}
            >
              Download CV
            </Button>
          </div>

          <p className={styles.location}>
            <Icon name="pin" size={15} />
            Based in {profile.location} — comfortable with remote and hybrid teams.
          </p>
        </div>

        <ul className={styles.links}>
          {profile.socials.map((social, index) => (
            <li key={social.label} data-reveal="" style={revealDelay(index * 70)}>
              <a
                className={styles.link}
                href={social.href}
                {...(social.icon === 'mail'
                  ? {}
                  : { target: '_blank', rel: 'noreferrer noopener' })}
              >
                <span className={styles.linkIcon}>
                  <Icon name={social.icon} size={18} />
                </span>

                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>{social.label}</span>
                  <span className={styles.linkHandle}>{social.handle}</span>
                </span>

                <Icon name="arrow-up-right" size={16} className={styles.linkArrow} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

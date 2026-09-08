import type { MouseEvent, ReactNode } from 'react';

import { toHref } from '@/context/router-context';
import { useRouter } from '@/hooks/useRouter';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  ariaCurrent?: 'page' | 'true';
}

/**
 * Anchor that routes in place. Keeps a real href so the link is copyable,
 * middle-clickable, and crawlable; only plain left clicks are intercepted.
 */
export function Link({
  to,
  children,
  className,
  onClick,
  ariaLabel,
  ariaCurrent,
}: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onClick?.();
    navigate(to);
  };

  return (
    <a
      href={toHref(to)}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  );
}

import type { ReactNode, SVGProps } from 'react';

import type { IconName } from '@/types/portfolio';

const STROKE_ICONS: Partial<Record<IconName, ReactNode>> = {
  mail: (
    <>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="m3.5 7.5 7.31 5.2a2 2 0 0 0 2.38 0l7.31-5.2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M2.75 12h18.5M12 2.75c2.5 2.6 3.75 5.68 3.75 9.25S14.5 18.65 12 21.25c-2.5-2.6-3.75-5.68-3.75-9.25S9.5 5.35 12 2.75Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10.5" r="2.75" />
    </>
  ),
  'arrow-up-right': <path d="M7 17 17 7M8.5 7H17v8.5" />,
  'arrow-down': <path d="M12 4.5v15M5.5 13l6.5 6.5 6.5-6.5" />,
  'chevron-down': <path d="m5.5 9 6.5 6.5L18.5 9" />,
  expand: (
    <>
      <circle cx="10.75" cy="10.75" r="6.5" />
      <path d="M10.75 8.25v5M8.25 10.75h5M15.5 15.5 20.5 20.5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 1.75v2.5M12 19.75v2.5M22.25 12h-2.5M4.25 12h-2.5M19.25 4.75 17.5 6.5M6.5 17.5l-1.75 1.75M19.25 19.25 17.5 17.5M6.5 6.5 4.75 4.75" />
    </>
  ),
  moon: <path d="M20.5 14.6A8.75 8.75 0 0 1 9.4 3.5a8.75 8.75 0 1 0 11.1 11.1Z" />,
  menu: <path d="M3.75 7h16.5M3.75 12h16.5M3.75 17h16.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  code: <path d="m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 4.5l-3 15" />,
  server: (
    <>
      <rect x="3" y="3.75" width="18" height="6.5" rx="2" />
      <rect x="3" y="13.75" width="18" height="6.5" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.75" rx="8" ry="3" />
      <path d="M4 5.75v12.5c0 1.66 3.58 3 8 3s8-1.34 8-3V5.75" />
      <path d="M20 12c0 1.66-3.58 3-8 3s-8-1.34-8-3" />
    </>
  ),
  cloud: (
    <path d="M7.5 19h10a4.5 4.5 0 0 0 .6-8.96 6 6 0 0 0-11.55-1.3A4.25 4.25 0 0 0 7.5 19Z" />
  ),
};

const BRAND_ICONS: Partial<Record<IconName, ReactNode>> = {
  linkedin: (
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.25h4v11.25H3V9.25Zm6.5 0h3.83v1.54h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76v5.9h-4v-5.23c0-1.25-.02-2.85-1.82-2.85-1.82 0-2.1 1.35-2.1 2.76v5.32h-4V9.25Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.49.09.67-.21.67-.47l-.01-1.85c-2.73.59-3.3-1.16-3.3-1.16-.45-1.13-1.1-1.44-1.1-1.44-.9-.61.07-.6.07-.6 1 .07 1.52 1.02 1.52 1.02.88 1.51 2.32 1.07 2.888.82.09-.64.35-1.07.63-1.32-2.18-.25-4.47-1.09-4.47-4.84 0-1.07.38-1.95 1.01-2.64-.1-.25-.44-1.25.1-2.61 0 0 .83-.26 2.72 1a9.4 9.4 0 0 1 4.95 0c1.88-1.26 2.71-1 2.71-1 .55 1.36.2 2.36.1 2.61.63.69 1.01 1.57 1.01 2.64 0 3.76-2.29 4.59-4.48 4.83.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.57.68.47A9.8 9.8 0 0 0 12 2.2Z"
    />
  ),
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  const brand = BRAND_ICONS[name];

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        {...props}
      >
        {brand}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {STROKE_ICONS[name]}
    </svg>
  );
}

interface ImportMetaEnv {
  /** Vite's public base path, always with a trailing slash. */
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'virtual:case-study-catalog' {
  const catalog: { slug: string; title: string; screens: number }[];
  export default catalog;
}

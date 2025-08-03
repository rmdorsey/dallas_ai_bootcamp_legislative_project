/// <reference types="vite/client" />

// Complete type definitions for Vite environment
interface ImportMetaEnv {
  // Built-in Vite environment variables
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;

  // Custom environment variables (must be prefixed with VITE_)
  readonly VITE_FASTAPI_URL?: string;
  readonly VITE_DOCKER?: string;
  readonly VITE_APP_ENV?: string;
  // Add other custom environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly hot?: import('vite/types/hot').ViteHotContext;
  readonly glob: import('vite/types/importGlob').ImportGlobFunction;
}
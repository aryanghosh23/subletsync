/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  /** Base URL or full path to your chat API — see `src/lib/assistant-client.ts`. */
  readonly VITE_ASSISTANT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

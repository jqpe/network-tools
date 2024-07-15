/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TLD_LIST_URI: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

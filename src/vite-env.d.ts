/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QISCUS_APPID: string
  readonly VITE_QISCUS_USERID: string
  readonly VITE_QISCUS_USERNAME: string
  readonly VITE_QISCUS_PASSKEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

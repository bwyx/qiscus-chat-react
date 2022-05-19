// temporary solution since there is no typescript definition for qiscus,
// i could assert anywhere with 'any' type but i love typescript, so i typed it a few

// unreleased Qiscus SDK v3 is using typescript, right? why not add typescript definition for the v2?

declare module 'qiscus-sdk-core' {
  interface InitOptions {
    AppId: string
    options: {
      baseUrl?: string
      [key: string]: any
    }
  }

  export default class QiscusSDK {
    constructor()

    isLogin: boolean

    init: (opts: InitOptions) => Promise<void>
    setUser: (
      userId: string,
      userKey: string,
      username: string,
      avatarURL?: string,
      extras?: Record<string, string | number | boolean>
    ) => Promise<void>

    disconnect(): void

    [key: string]: any
  }
}

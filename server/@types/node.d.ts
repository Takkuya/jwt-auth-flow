export {}

type EnvString = Record<'ACCESS_TOKEN_SECRET' | 'REFRESH_TOKEN_SECRET', string>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvString {}
  }
}

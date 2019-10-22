export const PORT: number = 3000
export const ROUTES_DIR: string = './dist/routes/**/*.js'
export const MODELS_DIR: string = './dist/models/**/*.js'
export const USE_DB: boolean = false
export const DB_CONNECTION_STRING =
  process.env.NODE_ENV === 'docker'
    ? 'mongodb://mongo:27017/express-typescript-starter'
    : 'mongodb://localhost:27017/express-typescript-starter'

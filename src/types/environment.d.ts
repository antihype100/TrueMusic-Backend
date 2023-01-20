declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }
}

export {};

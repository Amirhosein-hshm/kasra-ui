declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_BASE_URL_SERVER_SIDE: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

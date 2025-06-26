import { defineConfig } from 'orval';

export default defineConfig({
  kasra: {
    input: './docs/openapi.json',
    output: {
      target: './lib/services/kasra.api.ts',
      schemas: './lib/types/',
      client: 'axios',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './lib/axios/mutator.js',
          name: 'api',
        },
      },
    },
  },
});

import { defineConfig } from 'orval';
require('dotenv').config();

export default defineConfig({
  kasra: {
    input: process.env.OPENAPI_JSON_URL,
    output: {
      target: './lib/services1/kasra.api.ts',
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
  // kasraZod: {
  //   input: './docs/openapi.json',
  //   output: {
  //     target: './lib/validation1/kasra-zod.ts',
  //     client: 'zod',
  //     mode: 'tags-split',
  //     override: {},
  //   },
  // },
});

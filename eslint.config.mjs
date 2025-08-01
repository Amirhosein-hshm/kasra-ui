import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      // (اختیاری) اگر مایل باشی سایر warningها هم غیرفعال شوند:
      // '@typescript-eslint/ban-ts-comment': 'off',
      // '@typescript-eslint/no-require-imports': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
];

export default eslintConfig;

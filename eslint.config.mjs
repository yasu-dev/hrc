import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
  },
  globalIgnores([
    '.next/**',
    '.netlify/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'tmp/**',
    'docs/old/**',
    'docs/**/*.js',
    'docs/**/*.html',
  ]),
]);

export default eslintConfig;

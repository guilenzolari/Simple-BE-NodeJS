import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node, // Ambiente Node.js
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    extends: [
      js.configs.recommended, // Regras recomendadas do ESLint
      prettier, // Desativa conflitos com o Prettier
    ],
    rules: {
      'prettier/prettier': 'error', // Mostra erro se o código não estiver formatado
    },
  },
]);

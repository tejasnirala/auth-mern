import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules'] }, // Ignore unnecessary folders
  {
    files: ['server/**/*.js'], // Apply Node.js settings to server files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // Enable Node.js globals (includes process)
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-undef': 'off', // Prevent ESLint from flagging process.env as undefined
    },
  },
  {
    files: ['client/**/*.{js,jsx}'], // Apply React/browser settings to client files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Keep browser globals for the client
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

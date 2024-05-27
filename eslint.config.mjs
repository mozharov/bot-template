import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'script'}},
  {languageOptions: {globals: globals.browser}},
  ...tseslint.configs.recommended,
  {
    languageOptions: {parserOptions: {project: './tsconfig.json'}},
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      'prefer-const': 'warn',
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
            properties: 'off',
            parameterProperties: 'explicit',
            methods: 'explicit',
            accessors: 'explicit',
          },
        },
      ],
    },
  },
]

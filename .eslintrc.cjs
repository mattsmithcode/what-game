/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'eol-last': ['error', 'always'],
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { baseIndent: 1 }]
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                'indent': "off"
            }
        }
    ]
};

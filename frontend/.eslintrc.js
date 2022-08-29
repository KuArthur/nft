module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
        'prettier/vue',
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': 'error',
        'vue/attribute-hyphenation': 'off',
    },
    globals: {
        $nuxt: true,
    },
};

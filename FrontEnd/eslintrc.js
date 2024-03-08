module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        'prefer-const': ['error', { destructuring: 'all' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'react/prop-types': 'off',
    },
};

module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest", // Allows the use of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    env: {
        es6: true,
        node: true,
    },
    rules: {
        indent: ['error', 2, { SwitchCase: 1 }],
        'no-console': 'off',
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
    },
};
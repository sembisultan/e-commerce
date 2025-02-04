module.exports = {
    extends: ['next/core-web-vitals'],
    rules: {
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'indent': ['error', 4],
        'jsx-quotes': ['error', 'prefer-double'],
        'semi': ['error', 'always']
    }
};

module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'airbnb-base',
        'plugin:vue/essential',
    ],
    plugins: [
        'vue'
    ],
    env: {
        browser: true,
    },
    rules: {
        'indent': ['error', 4],

        // in the project we are dealing often with bitwise logic
        'no-bitwise': 'off',

        // Vue often requires to modify properties
        // and some reducers are simpler that way
        'no-param-reassign': ['error', { props: false }],

        // all awaits inside loops are counter implementations
        'no-await-in-loop': 'off',

        // allow else-if statements for better readability
        'no-else-return': ['error', { allowElseIf: true }],

        // usage of continues is allowed if they reduce
        // levels of nestedness of if conditions in code
        'no-continue': 'off',
    },
}

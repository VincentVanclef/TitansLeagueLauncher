module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/typescript'],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'no-empty': 'off'
	},
	parserOptions: {
		parser: '@typescript-eslint/parser'
	}
};

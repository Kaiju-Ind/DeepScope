import type { TechnologyDefinition } from '../../types';

export const jetpackTechnologyDefinition: TechnologyDefinition = {
	id: 'jetpack',
	name: 'Jetpack',
	website: 'https://jetpack.com',
	description: 'Jetpack is a popular WordPress plugin created by Automattic, the people behind WordPress.com.',
	icon: 'Jetpack.svg',
	categories: [
		'wordpress-ecosystem',
	],
	rules: [
		{
			id: 'jetpack:scriptSrc:gap0',
			kind: 'scriptSrc',
			pattern: new RegExp('stats\\.wp\\.com\\/s-\\d+\\.js'),
			description: 'Script source URL matches a jetpack stats script, which is a known technology marker.',
		},
		{
			id: 'jetpack:scriptSrc:gap1',
			kind: 'scriptSrc',
			pattern: new RegExp('[cs]0\\.wp\\.com\\/'),
			description: 'Script source matches a jetpack script source URL, which is a known technology marker.',
		},
		{
			id: 'jetpack:resourceUrl:gap2',
			kind: 'resourceUrl',
			pattern: new RegExp('i[0-2]\\.wp\\.com\\/'),
			description: 'Script source matches a jetpack resource URL, which is a known technology marker.',
		},
		{
			id: 'jetpack:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/wp-content\\/plugins\\/jetpack\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'jetpack:dom:1',
			kind: 'dom',
			selector: "link[href*='/wp-content/plugins/jetpack/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
		cpe: 'cpe:2.3:a:automattic:jetpack:*:*:*:*:*:wordpress:*:*',
	},
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;

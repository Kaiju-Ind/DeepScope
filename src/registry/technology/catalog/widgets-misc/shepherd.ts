import type { TechnologyDefinition } from '@/lib/detection/types';

export const shepherdTechnologyDefinition: TechnologyDefinition = {
	id: 'shepherd',
	name: 'Shepherd',
	website: 'https://shepherdjs.dev/',
	description: 'Shepherd is a JavaScript library which makes an use-friendly user-guide to any website.',
	icon: 'Shepherd.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'shepherd:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('shepherd(?:\\.min)?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;

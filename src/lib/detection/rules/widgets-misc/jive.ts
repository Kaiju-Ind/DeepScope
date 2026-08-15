import type { TechnologyDefinition } from '../../types';

export const jiveTechnologyDefinition: TechnologyDefinition = {
	id: 'jive',
	name: 'Jive',
	website: 'https://www.jivesoftware.com',
	icon: 'Jive.png',
	categories: [
		'widgets-misc',
	],
	rules: [],
	metadata: {
		cpe: 'cpe:2.3:a:jivesoftware:jive:*:*:*:*:*:*:*:*',
	},
} as const satisfies TechnologyDefinition;

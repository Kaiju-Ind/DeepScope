import type { TechnologyDefinition } from '@/lib/detection/types';

export const asanaTechnologyDefinition: TechnologyDefinition = {
	id: 'asana',
	name: 'Asana',
	website: 'https://asana.com',
	description: 'Asana is a work management platform for coordinating projects, processes, goals, and human-agent workflows.',
	icon: 'Asana.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'asana:dom:0',
			kind: 'dom',
			selector: "a[href*='form.asana.com'], a[href*='app.asana.com']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

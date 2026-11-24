import type { TechnologyDefinition } from '@/lib/detection/types';

export const breinifyTechnologyDefinition: TechnologyDefinition = {
	id: 'breinify',
	name: 'Breinify',
	website: 'https://home.breinify.ai',
	description:
		'Breinify is a powerful personalisation engine that enables brands to create personalised digital experiences at an individual level across web, e-mail, SMS and app channels.',
	icon: 'Breinify.png',
	categories: [
		'experimentation-optimization',
	],
	rules: [
		{
			id: 'breinify:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'Breinify.version',
			valuePattern: new RegExp('([\\d\\.]+)'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;

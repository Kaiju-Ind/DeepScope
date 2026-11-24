import type { TechnologyDefinition } from '@/lib/detection/types';

export const domainfactoryTechnologyDefinition: TechnologyDefinition = {
	id: 'domainfactory',
	name: 'DomainFactory',
	website: 'https://www.df.eu',
	description:
		'DomainFactory has been operating as a web hosting company. It is owned by GoDaddy and targets businesses in Austria and Germany.',
	icon: 'DomainFactory.png',
	categories: [
		'infrastructure-hosting',
	],
	rules: [
		{
			id: 'domainfactory:dns:0',
			kind: 'dns',
			valuePattern: new RegExp('ns(?:\\d+)?\\.namespace4you\\.de', 'i'),
			recordType: 'SOA',
			description: 'DNS record matches a known technology marker.',
		},
	],
	metadata: {
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;

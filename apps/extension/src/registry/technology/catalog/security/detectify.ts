import type { TechnologyDefinition } from '@/lib/detection/types';

export const detectifyTechnologyDefinition: TechnologyDefinition = {
	id: 'detectify',
	name: 'Detectify',
	website: 'https://detectify.com/',
	description: 'Detectify is an automated scanner that checks your web application for vulnerabilities.',
	icon: 'Detectify.svg',
	categories: [
		'security',
	],
	rules: [
		{
			id: 'detectify:dns:0',
			kind: 'dns',
			valuePattern: new RegExp('detectify-verification', 'i'),
			recordType: 'TXT',
			description: 'DNS record matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;

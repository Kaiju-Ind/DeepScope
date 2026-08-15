import type { TechnologyDefinition } from '../../types';

export const cursorTechnologyDefinition: TechnologyDefinition = {
	id: 'cursor',
	name: 'Cursor',
	website: 'https://cursor.com',
	description: 'Cursor is an AI-assisted code editor.',
	icon: 'Cursor.svg',
	categories: ['developer-tooling'],
	rules: [
		{
			id: 'cursor:dns:domain-verification',
			kind: 'dns',
			recordType: 'TXT',
			valuePattern: /cursor-domain-verification-[a-z0-9]+=/i,
			confidence: 35,
			description: 'DNS shows that the domain was verified with Cursor; this does not prove active runtime use.',
		},
	],
	metadata: { saas: true },
} as const satisfies TechnologyDefinition;

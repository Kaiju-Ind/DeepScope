import type { TechnologyDefinition } from '../../types';

export const windsurfTechnologyDefinition: TechnologyDefinition = {
	id: 'windsurf',
	name: 'Windsurf',
	website: 'https://windsurf.com',
	description: 'Windsurf is an AI-assisted development environment.',
	icon: 'Windsurf.svg',
	categories: ['developer-tooling'],
	rules: [
		{
			id: 'windsurf:dns:domain-verification',
			kind: 'dns',
			recordType: 'TXT',
			valuePattern: /windsurf-verification=/i,
			confidence: 35,
			description: 'DNS shows that the domain was verified with Windsurf; this does not prove active runtime use.',
		},
	],
	metadata: { saas: true },
} as const satisfies TechnologyDefinition;

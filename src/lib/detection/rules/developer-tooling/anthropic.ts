import type { TechnologyDefinition } from '../../types';

export const anthropicTechnologyDefinition: TechnologyDefinition = {
	id: 'anthropic',
	name: 'Anthropic',
	website: 'https://www.anthropic.com',
	description: 'Anthropic develops Claude and related artificial-intelligence APIs and products.',
	icon: 'Anthropic.svg',
	categories: ['developer-tooling'],
	rules: [
		{
			id: 'anthropic:dns:domain-verification',
			kind: 'dns',
			recordType: 'TXT',
			valuePattern: /anthropic-domain-verification-[a-z0-9]+=/i,
			confidence: 35,
			description: 'DNS shows that the domain was verified with Anthropic; this does not prove active runtime use.',
		},
	],
	metadata: { saas: true },
} as const satisfies TechnologyDefinition;

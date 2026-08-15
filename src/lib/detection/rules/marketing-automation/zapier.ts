import type { TechnologyDefinition } from '../../types';

export const zapierTechnologyDefinition: TechnologyDefinition = {
	id: 'zapier',
	name: 'Zapier',
	website: 'https://zapier.com',
	description: 'Zapier is a hosted workflow automation platform that connects software services.',
	icon: 'Zapier.svg',
	categories: ['marketing-automation'],
	rules: [
		{
			id: 'zapier:dns:domain-verification',
			kind: 'dns',
			recordType: 'TXT',
			valuePattern: /zapier-domain-verification-challenge=/i,
			confidence: 35,
			description: 'DNS shows that the domain was verified with Zapier; this does not prove active runtime use.',
		},
	],
	metadata: { saas: true },
} as const satisfies TechnologyDefinition;

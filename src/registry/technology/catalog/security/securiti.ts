import type { TechnologyDefinition } from '@/lib/detection/types';

export const securitiTechnologyDefinition: TechnologyDefinition = {
	id: 'securiti',
	name: 'Securiti',
	website: 'https://securiti.ai',
	description: 'Securiti is a centralized platform that ensures the secure utilization of data and generative AI.',
	icon: 'Securiti.svg',
	categories: [
		'security',
	],
	rules: [
		{
			id: 'securiti:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.securiti\\.ai'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'securiti:scriptContent:1',
			kind: 'scriptContent',
			pattern: new RegExp('\\.securiti\\.ai'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

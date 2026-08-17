import type { TechnologyDefinition } from '@/lib/detection/types';

export const localexpressTechnologyDefinition: TechnologyDefinition = {
	id: 'localexpress',
	name: 'LocalExpress',
	website: 'https://localexpress.io',
	description: 'LocalExpress is an end-to-end ecommerce solution for food retailers and local express businesses.',
	icon: 'LocalExpress.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'localexpress:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('cdn\\.localexpress\\.io\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;

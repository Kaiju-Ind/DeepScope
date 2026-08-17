import type { TechnologyDefinition } from '@/lib/detection/types';

export const leasehawkTechnologyDefinition: TechnologyDefinition = {
	id: 'leasehawk',
	name: 'LeaseHawk',
	website: 'https://www.leasehawk.com',
	description:
		'LeaseHawk is a platform that provides tools to measure and improve ROI for leases through data insights and performance tracking.',
	icon: 'LeaseHawk.svg',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'leasehawk:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('ace-chat\\.leasehawk\\.com'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '@/lib/detection/types';

export const powerpayTechnologyDefinition: TechnologyDefinition = {
	id: 'powerpay',
	name: 'PowerPay',
	website: 'https://getpowerpay.com',
	description: 'PowerPay is a financing and loan provider offering lower-than-average interest rates.',
	icon: 'PowerPay.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'powerpay:dom:0',
			kind: 'dom',
			selector: "iframe[src*='getpowerpay.com']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

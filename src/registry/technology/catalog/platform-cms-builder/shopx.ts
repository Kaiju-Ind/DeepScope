import type { TechnologyDefinition } from '@/lib/detection/types';

export const shopxTechnologyDefinition: TechnologyDefinition = {
	id: 'shopx',
	name: 'ShopX',
	website: 'https://shopx.store',
	description: 'ShopX is an ecommerce platform built for hyperlocal businesses to sell online.',
	icon: 'ShopX.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'shopx:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('shopx-unique-identifier'),
			description: 'Script content contains a bounded technology signature.',
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

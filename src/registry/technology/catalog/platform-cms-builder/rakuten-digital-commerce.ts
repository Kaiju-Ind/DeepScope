import type { TechnologyDefinition } from '@/lib/detection/types';

export const rakutenDigitalCommerceTechnologyDefinition: TechnologyDefinition = {
	id: 'rakuten-digital-commerce',
	name: 'Rakuten Digital Commerce',
	website: 'https://digitalcommerce.rakuten.com.br',
	icon: 'RakutenDigitalCommerce.png',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'rakuten-digital-commerce:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'RakutenApplication',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
} as const satisfies TechnologyDefinition;

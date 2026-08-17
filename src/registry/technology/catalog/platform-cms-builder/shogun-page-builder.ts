import type { TechnologyDefinition } from '@/lib/detection/types';

export const shogunPageBuilderTechnologyDefinition: TechnologyDefinition = {
	id: 'shogun-page-builder',
	name: 'Shogun Page Builder',
	website: 'https://getshogun.com/page-builder',
	description: 'Shogun is a page builder commonly used with headless implementations.',
	icon: 'Shogun Page Builder.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'shogun-page-builder:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'shogunAnalytics',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;

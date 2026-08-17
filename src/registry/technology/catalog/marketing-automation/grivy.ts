import type { TechnologyDefinition } from '@/lib/detection/types';

export const grivyTechnologyDefinition: TechnologyDefinition = {
	id: 'grivy',
	name: 'Grivy',
	website: 'https://business.grivy.com',
	description: 'Grivy is a platform that connects brands with consumers, facilitating engagement and interaction.',
	icon: 'Grivy.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'grivy:dom:0',
			kind: 'dom',
			selector: "link[href*='cdn.grivy.com/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

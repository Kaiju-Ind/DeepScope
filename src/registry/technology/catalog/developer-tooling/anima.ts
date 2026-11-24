import type { TechnologyDefinition } from '@/lib/detection/types';

export const animaTechnologyDefinition: TechnologyDefinition = {
	id: 'anima',
	name: 'Anima',
	website: 'https://www.animaapp.com/',
	description:
		'Anima is a hosted design-to-code and AI application-building platform that can turn Figma, website, brand, and prompt context into editable web applications and frontend code.',
	icon: 'Anima.svg',
	categories: [
		'developer-tooling',
	],
	rules: [
		{
			id: 'anima:jsGlobal:0',
			kind: 'jsGlobal',
			property: '__ANIMA_PROJECT_DATA__',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;

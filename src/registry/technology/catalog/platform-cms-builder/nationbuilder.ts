import type { TechnologyDefinition } from '@/lib/detection/types';

export const nationbuilderTechnologyDefinition: TechnologyDefinition = {
	id: 'nationbuilder',
	name: 'NationBuilder',
	website: 'https://nationbuilder.com',
	description:
		'NationBuilder is a Los Angeles based technology start-up that develops content management and customer relationship management (CRM) software.',
	icon: 'NationBuilder.svg',
	categories: [
		'platform-cms-builder',
		'business-tools',
	],
	rules: [
		{
			id: 'nationbuilder:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'NB.FBAppId',
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'nationbuilder:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'NB.Liquid',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'mid',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;

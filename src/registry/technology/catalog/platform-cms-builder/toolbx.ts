import type { TechnologyDefinition } from '@/lib/detection/types';

export const toolbxTechnologyDefinition: TechnologyDefinition = {
	id: 'toolbx',
	name: 'Toolbx',
	website: 'https://www.toolbx.com/',
	description:
		'Toolbx is a platform that helps independent building suppliers streamline payments, simplify accounts receivable, grow online sales, and enhance customer experience.',
	icon: 'Toolbx.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'toolbx:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'toolbxPixel',
			description: 'Page-owned global matches a known technology marker.',
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

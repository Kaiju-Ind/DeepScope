import type { TechnologyDefinition } from '@/lib/detection/types';

export const socraftUiTechnologyDefinition: TechnologyDefinition = {
	id: 'socraft-ui',
	name: 'Socraft-UI',
	website: 'https://socraft-public.github.io/socraft-ui',
	description:
		'Socraft-UI is an open-source components library designed for building user interfaces with reusable and customizable elements.',
	icon: 'SocraftUI.svg',
	categories: [
		'component-library',
	],
	rules: [
		{
			id: 'socraft-ui:dom:0',
			kind: 'dom',
			selector: "link[href*='socraft.ch']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
		],
	},
} as const satisfies TechnologyDefinition;

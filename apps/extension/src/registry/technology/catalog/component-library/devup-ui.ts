import type { TechnologyDefinition } from '@/lib/detection/types';

export const devupUiTechnologyDefinition: TechnologyDefinition = {
	id: 'devup-ui',
	name: 'Devup UI',
	website: 'https://devup-ui.com',
	description:
		'Devup UI is a tool for analyzing CSS-in-JS scenarios, delivering fast styling with optimal performance.',
	icon: 'DevupUI.svg',
	categories: [
		'component-library',
	],
	rules: [
		{
			id: 'devup-ui:scriptContent:0',
			kind: 'scriptContent',
			pattern: new RegExp('Devup-ui'),
			description: 'Script content contains a bounded technology signature.',
		},
		{
			id: 'devup-ui:scriptContent:1',
			kind: 'scriptContent',
			pattern: new RegExp('devup-ui'),
			description: 'Script content contains a bounded technology signature.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '@/lib/detection/types';

export const simpleCssTechnologyDefinition: TechnologyDefinition = {
	id: 'simple-css',
	name: 'Simple.css',
	website: 'https://simplecss.org',
	description: 'Simple.css is a CSS template.',
	icon: 'Simple.css.svg',
	categories: [
		'component-library',
	],
	rules: [
		{
			id: 'simple-css:dom:0',
			kind: 'dom',
			selector: "link[href*='cdn.simplecss.org/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

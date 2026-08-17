import type { TechnologyDefinition } from '@/lib/detection/types';

export const postcssTechnologyDefinition: TechnologyDefinition = {
	id: 'postcss',
	name: 'PostCSS',
	website: 'https://postcss.org',
	description:
		'PostCSS is a tool for transforming CSS with JavaScript plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.',
	categories: [
		'styling-processor',
	],
	rules: [],
} as const satisfies TechnologyDefinition;

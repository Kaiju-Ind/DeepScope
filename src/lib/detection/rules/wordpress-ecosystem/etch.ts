import type { TechnologyDefinition } from '../../types';

export const etchTechnologyDefinition = {
	id: "etch",
	name: "Etch",
	website: "https://etchwp.com",
	description: "Etch is a developer-focused visual development environment for WordPress that combines WYSIWYG editing with IDE-level control and full block editor compatibility.",
	icon: "Etch.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "etch:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/etch/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

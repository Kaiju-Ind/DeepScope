import type { TechnologyDefinition } from '../../types';

export const automaticCssTechnologyDefinition = {
	id: "automatic-css",
	name: "Automatic.css",
	website: "https://automaticcss.com",
	description: "Automatic.css is a CSS framework for WordPress page builders.",
	icon: "Automatic.css.svg",
	categories: [
		"component-library",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "automatic-css:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/uploads/automatic-css/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

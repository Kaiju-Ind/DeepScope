import type { TechnologyDefinition } from '../../types';

export const lthemeTechnologyDefinition = {
	id: "ltheme",
	name: "LTheme",
	website: "https://ltheme.com",
	description: "LTheme is a provider of Joomla and WordPress themes.",
	icon: "LTheme.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ltheme:dom:0",
			kind: "dom",
			selector: "script[id*='ltheme-custom-js']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

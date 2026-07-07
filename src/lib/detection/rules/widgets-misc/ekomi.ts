import type { TechnologyDefinition } from '../../types';

export const ekomiTechnologyDefinition = {
	id: "ekomi",
	name: "eKomi",
	website: "https://www.ekomi.de",
	description: "eKomi is a German supplier and product review service.",
	icon: "eKomi.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ekomi:dom:0",
			kind: "dom",
			selector: ".ekomi-widget-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ekomi:jsGlobal:1",
			kind: "jsGlobal",
			property: "ekomiWidgetMain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

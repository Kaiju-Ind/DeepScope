import type { TechnologyDefinition } from '../../types';

export const shoperTechnologyDefinition = {
	id: "shoper",
	name: "Shoper",
	website: "https://www.shoper.pl",
	icon: "Shoper.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoper:jsGlobal:0",
			kind: "jsGlobal",
			property: "shoper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shoper:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/application\\/assets\\/storefront\\/shoper"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
} as const satisfies TechnologyDefinition;

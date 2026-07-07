import type { TechnologyDefinition } from '../../types';

export const appifinyTechnologyDefinition = {
	id: "appifiny",
	name: "Appifiny",
	website: "https://www.appifiny.co.uk",
	description: "Appifiny is a platform that provides a streamlined solution for developing, customizing, and launching apps.",
	icon: "Appifiny.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "appifiny:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("recently\\.appifiny\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

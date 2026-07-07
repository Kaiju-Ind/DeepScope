import type { TechnologyDefinition } from '../../types';

export const stoplightTechnologyDefinition = {
	id: "stoplight",
	name: "Stoplight",
	website: "https://stoplight.io",
	description: "Stoplight is a company that offers a platform for API design, documentation, testing, and collaboration throughout the API development lifecycle.",
	icon: "Stoplight.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "stoplight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/stoplight\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

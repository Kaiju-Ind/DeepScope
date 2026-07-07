import type { TechnologyDefinition } from '../../types';

export const feedonomicsTechnologyDefinition = {
	id: "feedonomics",
	name: "Feedonomics",
	website: "https://feedonomics.com",
	description: "Feedonomics is a product feed management platform that helps brands and retailers optimize and list product catalogs across global ecommerce shopping channels.",
	icon: "Feedonomics.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "feedonomics:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("tracking\\.feedonomics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

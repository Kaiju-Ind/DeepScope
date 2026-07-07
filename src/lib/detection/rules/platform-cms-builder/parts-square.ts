import type { TechnologyDefinition } from '../../types';

export const partsSquareTechnologyDefinition = {
	id: "parts-square",
	name: "Parts Square",
	website: "https://square.parts",
	description: "Parts Square is an enterprise-grade automotive ecommerce platform designed to support SEO-friendly sales of auto parts through a standalone website.",
	icon: "PartsSquare.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "parts-square:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.square\\.parts\\/"),
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

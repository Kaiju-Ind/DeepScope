import type { TechnologyDefinition } from '../../types';

export const macaronTechnologyDefinition = {
	id: "macaron",
	name: "Macaron",
	website: "https://go-macaron.com",
	description: "Macaron is a high productive and modular web framework in Go.",
	icon: "Macaron.png",
	categories: [
		"framework",
	],
	rules: [],
	metadata: {
		cpe: "cpe:2.3:a:go-macaron:macaron:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const cylindoTechnologyDefinition = {
	id: "cylindo",
	name: "Cylindo",
	website: "https://www.cylindo.com",
	description: "Cylindo is a provider of automated content creation for 3D assets and photorealistic images, facilitating product visualization that can be utilized in various settings.",
	icon: "Cylindo.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "cylindo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("viewer-cdn\\.cylindo\\.com\\/"),
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

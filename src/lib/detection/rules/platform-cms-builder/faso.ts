import type { TechnologyDefinition } from '../../types';

export const fasoTechnologyDefinition = {
	id: "faso",
	name: "FASO",
	website: "https://www.faso.com",
	description: "FASO is a web platform developed by BoldBrush that enables artists to create and manage professional fine art portfolio websites online.",
	icon: "FASO.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "faso:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^fasocloudflarecache$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

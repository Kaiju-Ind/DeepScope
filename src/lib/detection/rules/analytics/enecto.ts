import type { TechnologyDefinition } from '../../types';

export const enectoTechnologyDefinition = {
	id: "enecto",
	name: "Enecto",
	website: "https://www.enecto.com",
	description: "Enecto is a tool for analyzing web visitor demographics to provide insights into audience composition and behavior.",
	icon: "Enecto.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "enecto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trk\\.enecto\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const heroicTechnologyDefinition = {
	id: "heroic",
	name: "Heroic",
	website: "https://heroicnow.com",
	description: "Heroic is a platform that offers design templates and tools for creating websites.",
	icon: "Heroic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "heroic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.heroicnow\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

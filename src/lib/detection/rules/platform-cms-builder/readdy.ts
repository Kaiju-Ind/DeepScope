import type { TechnologyDefinition } from '../../types';

export const readdyTechnologyDefinition = {
	id: "readdy",
	name: "Readdy",
	website: "https://readdy.ai",
	description: "Readdy is an AI website builder for generating and editing website layouts and content through automated design and content suggestions.",
	icon: "Readdy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "readdy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("public\\.readdy\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const repusoTechnologyDefinition = {
	id: "repuso",
	name: "Repuso",
	website: "https://repuso.com",
	description: "Repuso is a tool that collects, displays, and manages customer reviews across multiple platforms to support brand reputation and engagement.",
	icon: "Repuso.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "repuso:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/repuso\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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

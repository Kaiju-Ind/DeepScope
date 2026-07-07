import type { TechnologyDefinition } from '../../types';

export const bdokTechnologyDefinition = {
	id: "bdok",
	name: "bdok",
	website: "https://bdok.ir",
	description: "bdok is a cloud-based platform which provides the capability to create and manage online stores with no technical knowledge.",
	icon: "bdok.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bdok:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ibdok\\.ir\\/"),
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

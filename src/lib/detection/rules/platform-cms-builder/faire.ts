import type { TechnologyDefinition } from '../../types';

export const faireTechnologyDefinition = {
	id: "faire",
	name: "Faire",
	website: "https://www.faire.com",
	description: "Faire is an online wholesale marketplace embed that enables retailers to browse and purchase products directly from independent brands within their existing platform.",
	icon: "Faire.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "faire:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.faire.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "faire:jsGlobal:1",
			kind: "jsGlobal",
			property: "faire.api",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

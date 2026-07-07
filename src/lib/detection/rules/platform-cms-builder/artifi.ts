import type { TechnologyDefinition } from '../../types';

export const artifiTechnologyDefinition = {
	id: "artifi",
	name: "Artifi",
	website: "https://www.artifilabs.com",
	description: "Artifi is an ecommerce product customization platform for configuring complex products, enforcing business rules, and supporting online ordering.",
	icon: "Artifi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "artifi:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("designer\\.artifi\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

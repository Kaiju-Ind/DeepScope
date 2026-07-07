import type { TechnologyDefinition } from '../../types';

export const niduxTechnologyDefinition = {
	id: "nidux",
	name: "Nidux",
	website: "https://nidux.com",
	description: "Nidux is an ecommerce platform catering to small and medium businesses.",
	icon: "Nidux.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nidux:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.nidux\\.net\\/"),
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

import type { TechnologyDefinition } from '../../types';

export const demaTechnologyDefinition = {
	id: "dema",
	name: "Dema",
	website: "https://www.dema.ai",
	description: "Dema is a next-generation ecommerce analytics system designed to provide insights and data-driven solutions for online businesses.",
	icon: "Dema.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "dema:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dema\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dema:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.dema\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

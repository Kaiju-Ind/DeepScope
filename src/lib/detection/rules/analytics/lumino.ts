import type { TechnologyDefinition } from '../../types';

export const luminoTechnologyDefinition = {
	id: "lumino",
	name: "Lumino",
	website: "https://getlumino.ai",
	description: "Lumino is a data platform that helps Shopify brands optimize marketing, conversions, and user experience by leveraging data.",
	icon: "Lumino.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "lumino:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.getlumino\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;

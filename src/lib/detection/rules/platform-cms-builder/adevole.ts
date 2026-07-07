import type { TechnologyDefinition } from '../../types';

export const adevoleTechnologyDefinition = {
	id: "adevole",
	name: "Adevole",
	website: "https://www.adevole.com",
	description: "Adevole is an ecommerce website builder for creating and managing online stores.",
	icon: "Adevole.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adevole:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.adevole\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adevole:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("www\\.adevole\\.com"),
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

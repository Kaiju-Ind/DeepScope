import type { TechnologyDefinition } from '../../types';

export const uiAvenueTechnologyDefinition = {
	id: "ui-avenue",
	name: "UI Avenue",
	website: "https://www.uiavenue.ca",
	description: "UI Avenue is a data tracking and analytics software for Shopify.",
	icon: "UIAvenue.svg",
	categories: [
		"analytics",
		"commerce-operations",
	],
	rules: [
		{
			id: "ui-avenue:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.uiavenue\\.ca"),
			description: "Script content contains a bounded technology signature.",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;

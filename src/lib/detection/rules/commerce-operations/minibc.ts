import type { TechnologyDefinition } from '../../types';

export const minibcTechnologyDefinition = {
	id: "minibc",
	name: "MiniBC",
	website: "https://www.minibc.com",
	description: "MiniBC is a BigCommerce payment app builder that enables the creation and management of custom payment solutions within the BigCommerce platform.",
	icon: "MiniBC.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "minibc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.minibc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "minibc:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("apps\\.minibc\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
	requires: [
		"bigcommerce",
	],
} as const satisfies TechnologyDefinition;

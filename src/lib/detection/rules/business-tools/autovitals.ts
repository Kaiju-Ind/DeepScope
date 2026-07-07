import type { TechnologyDefinition } from '../../types';

export const autovitalsTechnologyDefinition = {
	id: "autovitals",
	name: "AutoVitals",
	website: "https://www.autovitals.com",
	description: "AutoVitals is a shop productivity, acquisition, and retention tool designed for the automotive industry.",
	icon: "AutoVitals.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "autovitals:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("docs\\.autovitals\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

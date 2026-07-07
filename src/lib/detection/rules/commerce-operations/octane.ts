import type { TechnologyDefinition } from '../../types';

export const octaneTechnologyDefinition = {
	id: "octane",
	name: "Octane",
	website: "https://octane.co",
	description: "Octane is a financing solution for motorcycles, ATVs, mowers, and other power sports and outdoor equipment.",
	icon: "Octane.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "octane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.octane\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

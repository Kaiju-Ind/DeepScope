import type { TechnologyDefinition } from '../../types';

export const sAndPGlobalMobilityTechnologyDefinition = {
	id: "s-and-p-global-mobility",
	name: "S&P Global Mobility",
	website: "https://www.spglobal.com/mobility/en/index.html",
	description: "S&P Global Mobility, formerly Dataium is a platform that analyzes online automotive shopping behavior.",
	icon: "S&PGlobalMobility.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "s-and-p-global-mobility:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vcu\\.collserve\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

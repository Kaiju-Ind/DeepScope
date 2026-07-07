import type { TechnologyDefinition } from '../../types';

export const percyTechnologyDefinition = {
	id: "percy",
	name: "Percy",
	website: "https://percy.ai",
	description: "Percy is a platform that uses behavioral data to help real estate agents and mortgage loan officers connect effectively with each other and their clients to increase transactions.",
	icon: "Percy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "percy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/npm\\/@percy\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const carusselTechnologyDefinition = {
	id: "carussel",
	name: "Carussel",
	website: "https://www.carussel.com",
	description: "Carussel is a dealer web toolkit designed to streamline the online presence and digital operations of automotive dealerships.",
	icon: "Carussel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "carussel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.carussel\\.dealer\\.toolkit"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

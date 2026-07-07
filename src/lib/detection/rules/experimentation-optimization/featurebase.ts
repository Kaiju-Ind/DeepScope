import type { TechnologyDefinition } from '../../types';

export const featurebaseTechnologyDefinition = {
	id: "featurebase",
	name: "Featurebase",
	website: "https://www.featurebase.app",
	description: "Featurebase is feature management software designed to collect, organise, and analyse product feedback, empowering teams to make data-driven decisions for building products that align with customer preferences.",
	icon: "Featurebase.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "featurebase:dom:0",
			kind: "dom",
			selector: "meta[http-equiv*='Content-Security-Policy'][content*='//featurebase.app']",
			description: "DOM selector matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;

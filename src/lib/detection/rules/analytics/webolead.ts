import type { TechnologyDefinition } from '../../types';

export const weboleadTechnologyDefinition = {
	id: "webolead",
	name: "WeboLead",
	website: "https://www.webolead.com/",
	description: "WeboLead is an analytics tool designed to convert anonymous website visitors into qualified prospects by analysing user behaviour and providing actionable insights.",
	icon: "WeboLead.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "webolead:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.webolead\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

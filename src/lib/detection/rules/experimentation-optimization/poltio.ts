import type { TechnologyDefinition } from '../../types';

export const poltioTechnologyDefinition = {
	id: "poltio",
	name: "Poltio",
	website: "https://poltio.com",
	description: "Poltio is a platform enabling brands to enhance user segment understanding, driving revenue growth and fostering customer relationships.",
	icon: "Poltio.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "poltio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.poltio\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const quadranTechnologyDefinition = {
	id: "quadran",
	name: "Quadran",
	website: "https://www.quadran.eu",
	description: "Quadran is a real-time end-user monitoring and performance analysis tool.",
	icon: "Quadran.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "quadran:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracker\\.quadran\\.eu"),
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

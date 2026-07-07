import type { TechnologyDefinition } from '../../types';

export const ansTechnologyDefinition = {
	id: "ans",
	name: "ANS",
	website: "https://www.ans.co.uk",
	description: "ANS is an UK-based IT services company specializing in cloud computing, managed services, and digital transformation solutions.",
	icon: "ANS.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "ans:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.ukfast\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const threatmetrixTechnologyDefinition = {
	id: "threatmetrix",
	name: "ThreatMetrix",
	website: "https://risk.lexisnexis.com/products/threatmetrix",
	description: "LexisNexis ThreatMetrix is an enterprise solution for online risk and fraud protection ('digital identity intelligence and digital authentication').",
	icon: "threatmetrix.png",
	categories: [
		"security",
		"privacy-compliance",
	],
	rules: [
		{
			id: "threatmetrix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.online-metrix\\.net"),
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

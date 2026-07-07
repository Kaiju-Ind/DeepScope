import type { TechnologyDefinition } from '../../types';

export const truvalidateTechnologyDefinition = {
	id: "truvalidate",
	name: "TruValidate",
	website: "https://www.transunion.com/solution/truvalidate",
	description: "TransUnion TruValidate (previously ReputationShield/IDVision from iovation) is an online risk and fraud detection platform.",
	icon: "TruValidate.svg",
	categories: [
		"security",
		"privacy-compliance",
	],
	rules: [
		{
			id: "truvalidate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mpsnare\\.iesnare\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "truvalidate:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("ci-mpsnare\\.iovation\\.com"),
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

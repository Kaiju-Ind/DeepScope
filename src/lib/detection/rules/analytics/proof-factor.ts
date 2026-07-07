import type { TechnologyDefinition } from '../../types';

export const proofFactorTechnologyDefinition = {
	id: "proof-factor",
	name: "Proof Factor",
	website: "https://prooffactor.com",
	description: "Proof Factor is a social proof conversion optimization tool that aggregates and displays user activity data to provide objective insights for analyzing conversion performance.",
	icon: "ProofFactor.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "proof-factor:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.prooffactor\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "proof-factor:jsGlobal:1",
			kind: "jsGlobal",
			property: "PROOF_FACTOR_ACCOUNT_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proof-factor:jsGlobal:2",
			kind: "jsGlobal",
			property: "PROOF_FACTOR_ANALYTICS_SETUP",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

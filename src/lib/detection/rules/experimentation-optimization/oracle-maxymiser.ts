import type { TechnologyDefinition } from '../../types';

export const oracleMaxymiserTechnologyDefinition = {
	id: "oracle-maxymiser",
	name: "Oracle Maxymiser",
	website: "https://www.oracle.com/uk/cx/marketing/personalization-testing",
	description: "Oracle Maxymiser is a real-time behavioral targeting, in-session personalisation, and product recommendations platform.",
	icon: "Oracle.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "oracle-maxymiser:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service\\.maxymiser\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oracle-maxymiser:jsGlobal:1",
			kind: "jsGlobal",
			property: "maxy",
			confidence: 20,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "oracle-maxymiser:jsGlobal:2",
			kind: "jsGlobal",
			property: "mmsystem.getConfig",
			confidence: 80,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

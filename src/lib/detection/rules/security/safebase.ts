import type { TechnologyDefinition } from '../../types';

export const safebaseTechnologyDefinition = {
	id: "safebase",
	name: "SafeBase",
	website: "https://safebase.io",
	description: "SafeBase is a platform that simplifies security reviews by enabling teams to share and automate access to essential security, compliance, and privacy information.",
	icon: "SafeBase.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "safebase:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.safebase\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

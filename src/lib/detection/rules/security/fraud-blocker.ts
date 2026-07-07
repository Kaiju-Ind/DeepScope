import type { TechnologyDefinition } from '../../types';

export const fraudBlockerTechnologyDefinition = {
	id: "fraud-blocker",
	name: "Fraud Blocker",
	website: "https://fraudblocker.com",
	description: "Fraud Blocker is an all-in-one solution designed to reduce costs by preventing bots, competitor clicks, fake leads, and other forms of digital ad fraud.",
	icon: "FraudBlocker.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "fraud-blocker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("monitor\\.fraudblocker\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fraud-blocker:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.fraudblocker\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

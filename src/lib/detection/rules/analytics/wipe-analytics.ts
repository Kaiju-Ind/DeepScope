import type { TechnologyDefinition } from '../../types';

export const wipeAnalyticsTechnologyDefinition = {
	id: "wipe-analytics",
	name: "Wipe Analytics",
	website: "https://wipe-analytics.de",
	description: "Wipe Analytics provides user behavior analysis for high-traffic and dynamically generated websites.",
	icon: "Wipe Analytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "wipe-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wipe\\.de\\/wwa\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

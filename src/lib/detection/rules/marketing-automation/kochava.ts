import type { TechnologyDefinition } from '../../types';

export const kochavaTechnologyDefinition = {
	id: "kochava",
	name: "Kochava",
	website: "https://www.kochava.com",
	description: "Kochava is a unified platform for audience attribution and analytics, enabling accurate measurement and optimization of marketing performance across channels.",
	icon: "Kochava.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kochava:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.kochava\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

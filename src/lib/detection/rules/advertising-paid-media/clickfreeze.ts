import type { TechnologyDefinition } from '../../types';

export const clickfreezeTechnologyDefinition = {
	id: "clickfreeze",
	name: "ClickFreeze",
	website: "https://www.clickfreeze.io",
	description: "ClickFreeze is a tool that detects and blocks click fraud in Google Ads campaigns to improve performance and reduce wasted ad spend.",
	icon: "ClickFreeze.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "clickfreeze:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.clickfreeze\\.io"),
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

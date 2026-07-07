import type { TechnologyDefinition } from '../../types';

export const clickceaseTechnologyDefinition = {
	id: "clickcease",
	name: "ClickCease",
	website: "https://www.clickcease.com",
	description: "ClickCease is an ad fraud and click-fraud detection and protection service software.",
	icon: "ClickCease.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "clickcease:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clickcease\\.com\\/monitor\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clickcease:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("www\\.clickcease\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

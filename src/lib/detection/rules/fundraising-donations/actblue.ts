import type { TechnologyDefinition } from '../../types';

export const actblueTechnologyDefinition = {
	id: "actblue",
	name: "ActBlue",
	website: "https://secure.actblue.com",
	description: "ActBlue is an online fundraising platform that facilitates secure donations to Democratic candidates and progressive causes, streamlining the process of processing and distributing campaign contributions.",
	icon: "ActBlue.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "actblue:dom:0",
			kind: "dom",
			selector: "a[href*='//secure.actblue.com/donate/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "actblue:jsGlobal:1",
			kind: "jsGlobal",
			property: "actblue.__configuration",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

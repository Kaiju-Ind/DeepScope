import type { TechnologyDefinition } from '../../types';

export const actOnTechnologyDefinition = {
	id: "act-on",
	name: "Act-On",
	website: "https://act-on.com",
	description: "Act-On is a cloud-based SaaS product for marketing automation.",
	icon: "Act-On.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "act-on:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cdnr\\/\\d+\\/acton\\/bn\\/tracker\\/\\d+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "act-on:jsGlobal:1",
			kind: "jsGlobal",
			property: "ActOn",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
		cpe: "cpe:2.3:a:act-on:act-on:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

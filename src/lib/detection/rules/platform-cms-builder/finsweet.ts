import type { TechnologyDefinition } from '../../types';

export const finsweetTechnologyDefinition = {
	id: "finsweet",
	name: "Finsweet",
	website: "https://finsweet.com",
	description: "Finsweet is a platform that designs and develops websites exclusively using Webflow.",
	icon: "Finsweet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "finsweet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.finsweet\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "finsweet:jsGlobal:1",
			kind: "jsGlobal",
			property: "FinsweetAttributes.load",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "finsweet:jsGlobal:2",
			kind: "jsGlobal",
			property: "FinsweetConsentPro",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;

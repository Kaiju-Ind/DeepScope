import type { TechnologyDefinition } from '../../types';

export const zohoPagesenseTechnologyDefinition = {
	id: "zoho-pagesense",
	name: "Zoho PageSense",
	website: "https://www.zoho.com/pagesense/",
	description: "Zoho PageSense is a conversion optimisation platform which combines the power of web analytics, A/B testing, and personalisation.",
	icon: "Zoho.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "zoho-pagesense:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pagesense\\.(?:cn|io)?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoho-pagesense:jsGlobal:1",
			kind: "jsGlobal",
			property: "$pagesense",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zoho-pagesense:jsGlobal:2",
			kind: "jsGlobal",
			property: "pagesense",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
	implies: [
		"zoho",
	],
} as const satisfies TechnologyDefinition;

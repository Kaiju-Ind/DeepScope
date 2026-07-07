import type { TechnologyDefinition } from '../../types';

export const survicateTechnologyDefinition = {
	id: "survicate",
	name: "Survicate",
	website: "https://survicate.com",
	description: "Survicate is an all-in-one customer feedback tool that allows you collect feedback.",
	icon: "Survicate.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "survicate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.survicate\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "survicate:dom:1",
			kind: "dom",
			selector: "link[href*='.survicate.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "survicate:jsGlobal:2",
			kind: "jsGlobal",
			property: "survicate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "survicate:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("api\\.survicate\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

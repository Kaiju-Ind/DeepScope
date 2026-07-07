import type { TechnologyDefinition } from '../../types';

export const goaffproTechnologyDefinition = {
	id: "goaffpro",
	name: "GoAffPro",
	website: "https://goaffpro.com/",
	description: "Goaffpro is an affiliate marketing solution for ecommerce stores.",
	icon: "GoAffPro.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "goaffpro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.goaffpro\\.com\\/loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "goaffpro:jsGlobal:1",
			kind: "jsGlobal",
			property: "gfp_api_server",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

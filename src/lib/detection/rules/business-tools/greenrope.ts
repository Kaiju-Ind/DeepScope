import type { TechnologyDefinition } from '../../types';

export const greenropeTechnologyDefinition = {
	id: "greenrope",
	name: "GreenRope",
	website: "https://www.greenrope.com",
	description: "GreenRope is an all-in-one CRM platform that integrates sales, marketing, and operational tools into a single system for business management.",
	icon: "GreenRope.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "greenrope:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.greenrope\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "greenrope:jsGlobal:1",
			kind: "jsGlobal",
			property: "bfpd",
			valuePattern: new RegExp("app\\.greenrope\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const bamboohrTechnologyDefinition = {
	id: "bamboohr",
	name: "BambooHR",
	website: "https://www.bamboohr.com",
	description: "BambooHR is an American technology company that provides human resources software as a service.",
	icon: "BambooHR.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bamboohr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bamboohr\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bamboohr:dom:1",
			kind: "dom",
			selector: "a[href*='.bamboohr.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bamboohr:jsGlobal:2",
			kind: "jsGlobal",
			property: "scrollToBambooHR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bamboohr:header:3",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.bamboohr\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bamboohr:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.bamboohr\\.com", "i"),
			description: "Response header matches a known technology marker.",
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

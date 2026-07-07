import type { TechnologyDefinition } from '../../types';

export const realGeeksTechnologyDefinition = {
	id: "real-geeks",
	name: "Real Geeks",
	website: "https://www.realgeeks.com",
	description: "Real Geeks is a SaaS platform for real estate professionals that combines CRM, lead generation, and website building tools.",
	icon: "Real Geeks.svg",
	categories: [
		"platform-cms-builder",
		"business-tools",
	],
	rules: [
		{
			id: "real-geeks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.realgeeks\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "real-geeks:jsGlobal:1",
			kind: "jsGlobal",
			property: "realgeeks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "real-geeks:meta:2",
			kind: "meta",
			key: "og:image",
			valuePattern: new RegExp("\\.realgeeks\\.media\\/", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;

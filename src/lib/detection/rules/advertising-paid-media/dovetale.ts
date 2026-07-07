import type { TechnologyDefinition } from '../../types';

export const dovetaleTechnologyDefinition = {
	id: "dovetale",
	name: "Dovetale",
	website: "https://dovetale.com/",
	description: "Dovetale (Acquired by Shopify) helps e-commerce stores recruit, manage, & grow their sales with communities of people who love their products.",
	icon: "Dovetale.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "dovetale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dttrk\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dovetale:jsGlobal:1",
			kind: "jsGlobal",
			property: "Dovetale",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

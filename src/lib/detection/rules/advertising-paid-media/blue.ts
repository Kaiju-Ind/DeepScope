import type { TechnologyDefinition } from '../../types';

export const blueTechnologyDefinition = {
	id: "blue",
	name: "Blue",
	website: "https://web.getblue.io/en/",
	description: "Blue is an ecommerce data marketing, lead generation, real time bidding and recommendation solutions.",
	icon: "Blue.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "blue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getblue\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blue:dom:1",
			kind: "dom",
			selector: "iframe[src*='.getblue.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "blue:jsGlobal:2",
			kind: "jsGlobal",
			property: "blueProductId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blue:jsGlobal:3",
			kind: "jsGlobal",
			property: "bluecpy_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

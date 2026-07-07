import type { TechnologyDefinition } from '../../types';

export const sovrnTechnologyDefinition = {
	id: "sovrn",
	name: "Sovrn",
	website: "https://www.sovrn.com",
	description: "Sovrn is an advertising products and services provider for publishers.",
	icon: "Sovrn.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sovrn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lijit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sovrn:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.lijit\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "sovrn:jsGlobal:2",
			kind: "jsGlobal",
			property: "sovrn",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sovrn:jsGlobal:3",
			kind: "jsGlobal",
			property: "sovrn_render",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sovrn:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:linksmart|lijit)\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

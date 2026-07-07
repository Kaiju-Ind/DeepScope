import type { TechnologyDefinition } from '../../types';

export const appierTechnologyDefinition = {
	id: "appier",
	name: "Appier",
	website: "https://www.appier.com",
	description: "Appier is a platform that helps clients optimize advertising ROI.",
	icon: "Appier.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "appier:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.appier\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appier:dom:1",
			kind: "dom",
			selector: "link[href*='.appier.net'][rel='dns-prefetch']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "appier:jsGlobal:2",
			kind: "jsGlobal",
			property: "APPIER_LOG",
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

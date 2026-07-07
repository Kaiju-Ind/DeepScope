import type { TechnologyDefinition } from '../../types';

export const carbonAdsTechnologyDefinition = {
	id: "carbon-ads",
	name: "Carbon Ads",
	website: "https://carbonads.net",
	description: "Carbon Ads is an ad tech company, that connects advertisers to users through targeted verticals called Circles.",
	icon: "Carbon Ads.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "carbon-ads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.carbonads\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "carbon-ads:dom:1",
			kind: "dom",
			selector: "div#carbonads-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "carbon-ads:jsGlobal:2",
			kind: "jsGlobal",
			property: "_carbonads",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "carbon-ads:jsGlobal:3",
			kind: "jsGlobal",
			property: "_carbonads_go",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const anthologyEncompassTechnologyDefinition = {
	id: "anthology-encompass",
	name: "Anthology Encompass",
	website: "https://www.anthology.com/products/lifecycle-engagement/alumni-and-advancement/anthology-encompass",
	description: "Anthology Encompass is a constituent engagement management provider or educational institutions that provides modules to help you manage events, websites and content, data, and more.",
	icon: "Anthology.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "anthology-encompass:url:0",
			kind: "url",
			pattern: new RegExp("https.+\\.imodules\\.com\\/s\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "anthology-encompass:dom:1",
			kind: "dom",
			selector: "a[href*='.imodules.com/s/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

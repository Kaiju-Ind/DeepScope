import type { TechnologyDefinition } from '../../types';

export const leadpagesTechnologyDefinition = {
	id: "leadpages",
	name: "LeadPages",
	website: "https://www.leadpages.com",
	description: "LeadPages is a tool that allows users to transform their ideas into published landing pages efficiently.",
	icon: "LeadPages.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "leadpages:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.leadpages\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "leadpages:dom:1",
			kind: "dom",
			selector: "link[href*='.leadpages.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "leadpages:jsGlobal:2",
			kind: "jsGlobal",
			property: "LeadPagesCenterObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const toctocTechnologyDefinition = {
	id: "toctoc",
	name: "TocToc",
	website: "https://www.toctoc.me",
	description: "Tolstoy is a BPM platform enabling the modeling, automation, and optimization of business processes, simplifying workflows and expediting tasks.",
	icon: "TocToc.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "toctoc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.toctoc\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "toctoc:jsGlobal:1",
			kind: "jsGlobal",
			property: "_toctoc.close",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const tamagoTechnologyDefinition = {
	id: "tamago",
	name: "Tamago",
	website: "https://tamago.temonalab.com",
	description: "Tamago is a Japanese subscription management platform by Temonalab for optimizing recurring billing services.",
	icon: "Tamago.png",
	categories: [
		"widgets-misc",
		"commerce-operations",
	],
	rules: [
		{
			id: "tamago:html:0",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"http:\\/\\/tamago\\.temonalab\\.com"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "tamago:dom:1",
			kind: "dom",
			selector: "link[href*='tamago.temonalab.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const hermesTechnologyDefinition = {
	id: "hermes",
	name: "Hermes",
	website: "https://www.hermesworld.com",
	description: "Hermes offers integrated solutions along the supply chain and partners with national and international trading companies.",
	icon: "Hermes.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "hermes:text:0",
			kind: "text",
			pattern: new RegExp("\\bHermes\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

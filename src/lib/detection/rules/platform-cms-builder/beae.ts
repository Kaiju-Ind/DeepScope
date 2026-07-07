import type { TechnologyDefinition } from '../../types';

export const beaeTechnologyDefinition = {
	id: "beae",
	name: "Beae",
	website: "https://beae.com",
	description: "Beae is a Shopify page builder that enables the creation of landing, home, and product pages designed to improve store sales and conversion rates.",
	icon: "Beae.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "beae:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("beae\\.base\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beae:jsGlobal:1",
			kind: "jsGlobal",
			property: "BEAEBASE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beae:jsGlobal:2",
			kind: "jsGlobal",
			property: "BEAEVIDEO",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

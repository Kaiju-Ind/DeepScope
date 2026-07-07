import type { TechnologyDefinition } from '../../types';

export const solidusTechnologyDefinition = {
	id: "solidus",
	name: "Solidus",
	website: "https://solidus.io",
	description: "Solidus is an open source ecommerce platform designed for high volume, complex storefronts.",
	icon: "Solidus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "solidus:jsGlobal:0",
			kind: "jsGlobal",
			property: "Solidus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solidus:jsGlobal:1",
			kind: "jsGlobal",
			property: "SolidusPaypalCommercePlatform",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
		cpe: "cpe:2.3:a:nebulab:solidus:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const onuniverseTechnologyDefinition = {
	id: "onuniverse",
	name: "OnUniverse",
	website: "https://onuniverse.com",
	description: "OnUniverse is the first website builder and commerce platform built for mobile devices.",
	icon: "OnUniverse.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "onuniverse:dom:0",
			kind: "dom",
			selector: "link[href*='onuniverse-assets.imgix.net'], img[src*='onuniverse-assets.imgix.net']",
			description: "DOM selector matches a known technology marker.",
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

import type { TechnologyDefinition } from '../../types';

export const reploTechnologyDefinition = {
	id: "replo",
	name: "Replo",
	website: "https://www.replo.app",
	description: "Replo is a platform offering customizable landing pages designed for ecommerce teams.",
	icon: "replo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "replo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("replocdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "replo:dom:1",
			kind: "dom",
			selector: "div[id='replo-fullpage-element']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "replo:dom:2",
			kind: "dom",
			selector: "script[id='replo-deps-element-id']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;

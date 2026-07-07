import type { TechnologyDefinition } from '../../types';

export const commercehqTechnologyDefinition = {
	id: "commercehq",
	name: "CommerceHQ",
	website: "https://commercehq.com",
	description: "CommerceHQ is a high-conversion ecommerce store system engineered for online retail operations.",
	icon: "CommerceHQ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commercehq:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.commercehq.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

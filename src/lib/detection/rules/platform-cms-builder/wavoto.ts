import type { TechnologyDefinition } from '../../types';

export const wavotoTechnologyDefinition = {
	id: "wavoto",
	name: "Wavoto",
	website: "https://www.wavoto.com",
	description: "Wavoto is an eCommerce platform that provides integrated tools for managing online storefronts.",
	icon: "Wavoto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wavoto:dom:0",
			kind: "dom",
			selector: "link[href*='www.wavoto.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

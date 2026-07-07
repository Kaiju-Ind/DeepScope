import type { TechnologyDefinition } from '../../types';

export const kenloTechnologyDefinition = {
	id: "kenlo",
	name: "Kenlo",
	website: "https://www.kenlo.com.br",
	description: "Kenlo is a real estate system from Brazil offering houses, apartments, and more for sale.",
	icon: "Kenlo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kenlo:dom:0",
			kind: "dom",
			selector: "div[class*='logo-kenlo__default'] > span[class*='logo-kenlo__text'] ",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

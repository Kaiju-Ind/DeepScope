import type { TechnologyDefinition } from '../../types';

export const shoefitrIoTechnologyDefinition = {
	id: "shoefitr-io",
	name: "Shoefitr.io",
	website: "https://www.shoefitr.io",
	description: "Shoefitr.io is data-based shoe size advice service where we measure the length, width, ball, and instep.",
	icon: "Shoefitr.io.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "shoefitr-io:dom:0",
			kind: "dom",
			selector: "a[href*='api.shoefitr.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

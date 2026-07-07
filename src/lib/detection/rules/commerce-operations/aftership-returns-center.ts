import type { TechnologyDefinition } from '../../types';

export const aftershipReturnsCenterTechnologyDefinition = {
	id: "aftership-returns-center",
	name: "AfterShip Returns Center",
	website: "https://www.aftership.com/returns",
	description: "AfterShip Returns Center is an interactive self-service return solution.",
	icon: "AfterShip Returns Center.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "aftership-returns-center:url:0",
			kind: "url",
			pattern: new RegExp("https.+\\.returnscenter\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "aftership-returns-center:dom:1",
			kind: "dom",
			selector: "a[href*='.returnscenter.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

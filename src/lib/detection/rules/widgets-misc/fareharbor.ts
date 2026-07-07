import type { TechnologyDefinition } from '../../types';

export const fareharborTechnologyDefinition = {
	id: "fareharbor",
	name: "FareHarbor",
	website: "https://fareharbor.com",
	description: "FareHarbor is an booking and schedule management solution intended for tour and activity companies.",
	icon: "FareHarbor.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "fareharbor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fareharbor\\.com\\/embeds\\/api\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fareharbor:html:1",
			kind: "html",
			pattern: new RegExp("<iframe[^>]+fareharbor"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fareharbor:dom:2",
			kind: "dom",
			selector: "iframe[src*='fareharbor']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

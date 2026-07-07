import type { TechnologyDefinition } from '../../types';

export const guestonlineTechnologyDefinition = {
	id: "guestonline",
	name: "Guestonline",
	website: "https://www.guestonline.io",
	description: "Guestonline is a restaurant table booking widget.",
	icon: "Guestonline.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "guestonline:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ib\\.guestonline\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "guestonline:dom:1",
			kind: "dom",
			selector: "iframe[src*='ib.guestonline.']",
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

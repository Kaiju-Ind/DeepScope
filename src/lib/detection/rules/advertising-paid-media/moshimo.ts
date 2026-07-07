import type { TechnologyDefinition } from '../../types';

export const moshimoTechnologyDefinition = {
	id: "moshimo",
	name: "Moshimo",
	website: "https://af.moshimo.com",
	description: "Moshimo is a free affiliate service for individuals.",
	icon: "Moshimo.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "moshimo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.moshimo\\.com\\/af\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moshimo:dom:1",
			kind: "dom",
			selector: "link[href*='i.moshimo.com'], img[src*='i.moshimo.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

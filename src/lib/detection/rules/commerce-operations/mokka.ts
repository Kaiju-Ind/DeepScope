import type { TechnologyDefinition } from '../../types';

export const mokkaTechnologyDefinition = {
	id: "mokka",
	name: "Mokka",
	website: "https://mokka.ro",
	description: "Mokka is a Buy Now Pay Later solution that connects target customer acquisition and settlement costs through marketing and promotion.",
	icon: "Mokka.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mokka:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("revoiframe\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

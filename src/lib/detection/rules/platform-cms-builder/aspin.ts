import type { TechnologyDefinition } from '../../types';

export const aspinTechnologyDefinition = {
	id: "aspin",
	name: "Aspin",
	website: "https://aspin.co.uk",
	description: "Aspin is a B2B sales platform for distributors and wholesalers, offering ecommerce platforms, sales applications, and product information management tools.",
	icon: "Aspin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aspin:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Aspin Interactive www\\.aspininteractive\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aspin:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^aspin interactive www\\.aspininteractive\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

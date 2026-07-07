import type { TechnologyDefinition } from '../../types';

export const mginexTechnologyDefinition = {
	id: "mginex",
	name: "Mginex",
	website: "https://mginex.com",
	description: "Mginex is an online store website creation platform.",
	icon: "Mginex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mginex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.mginex\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mginex:meta:1",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("Mginex", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mginex:meta:2",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp("mginex", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

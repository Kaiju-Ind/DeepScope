import type { TechnologyDefinition } from '../../types';

export const cloudcartTechnologyDefinition = {
	id: "cloudcart",
	name: "CloudCart",
	website: "https://cloudcart.com",
	icon: "cloudcart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cloudcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cloudcart-(?:assets|storage)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cloudcart:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^CloudCart LLC$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cloudcart:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^cloudcart llc$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

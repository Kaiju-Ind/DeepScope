import type { TechnologyDefinition } from '../../types';

export const contribTechnologyDefinition = {
	id: "contrib",
	name: "Contrib",
	website: "https://www.contrib.com",
	description: "Contrib is a crypto marketplace widget that enables users to back and fund businesses through blockchain-based transactions.",
	icon: "Contrib.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "contrib:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.contrib\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "contrib:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^contrib$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

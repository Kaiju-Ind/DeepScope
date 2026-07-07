import type { TechnologyDefinition } from '../../types';

export const autocompleteJsTechnologyDefinition = {
	id: "autocomplete-js",
	name: "autoComplete.js",
	website: "https://tarekraafat.github.io/autoComplete.js",
	description: "autoComplete.js is a simple, pure vanilla Javascript library.",
	icon: "autoComplete.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "autocomplete-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@tarekraafat\\/autocomplete\\.js@([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

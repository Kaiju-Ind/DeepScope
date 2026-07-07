import type { TechnologyDefinition } from '../../types';

export const cstoreTechnologyDefinition = {
	id: "cstore",
	name: "cStore",
	website: "https://www.cstore.pl",
	description: "cStore is a B2B wholesale platform facilitating automatic order acceptance from regular customers.",
	icon: "cStore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cstore:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^cStore - www.cstore.pl$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cstore:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^cstore - www.cstore.pl$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

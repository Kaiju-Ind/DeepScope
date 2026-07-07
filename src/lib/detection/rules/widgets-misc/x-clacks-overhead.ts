import type { TechnologyDefinition } from '../../types';

export const xClacksOverheadTechnologyDefinition = {
	id: "x-clacks-overhead",
	name: "X-Clacks-Overhead",
	website: "https://xclacksoverhead.org/home/about",
	description: "X-Clacks-Overhead is a non-standard HTTP header used to transmit tribute messages within server responses.",
	icon: "XClacksOverhead.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "x-clacks-overhead:header:0",
			kind: "header",
			key: "X-Clacks-Overhead",
			valuePattern: new RegExp("^GNU Terry Pratchett$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "x-clacks-overhead:header:1",
			kind: "header",
			key: "x-clacks-overhead",
			valuePattern: new RegExp("^gnu terry pratchett$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

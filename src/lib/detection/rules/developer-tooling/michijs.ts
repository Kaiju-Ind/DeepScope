import type { TechnologyDefinition } from '../../types';

export const michijsTechnologyDefinition = {
	id: "michijs",
	name: "MichiJS",
	website: "https://dev.michijs.com",
	description: "MichiJS is a library enabling the creation of web components using TSX.",
	icon: "MichiJS.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "michijs:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.michijs\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "michijs:dom:1",
			kind: "dom",
			selector: "michi-fragment > michi-fragment",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const headwayTechnologyDefinition = {
	id: "headway",
	name: "Headway",
	website: "https://headwayapp.co",
	description: "Headway is a product widget that keeps customers informed about updates and changes.",
	icon: "Headway.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "headway:header:0",
			kind: "header",
			key: "X-Hello",
			valuePattern: new RegExp("^headway$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "headway:header:1",
			kind: "header",
			key: "x-hello",
			valuePattern: new RegExp("^headway$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

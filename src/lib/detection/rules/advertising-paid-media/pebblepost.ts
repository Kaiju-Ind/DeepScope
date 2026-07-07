import type { TechnologyDefinition } from '../../types';

export const pebblepostTechnologyDefinition = {
	id: "pebblepost",
	name: "PebblePost",
	website: "https://www.pebblepost.com",
	description: "PebblePost provides marketers a way to transform recent online data into intelligent direct mail programs that perform.",
	icon: "PebblePost.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pebblepost:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pbbl\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

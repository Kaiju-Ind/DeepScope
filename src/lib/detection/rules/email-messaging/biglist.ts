import type { TechnologyDefinition } from '../../types';

export const biglistTechnologyDefinition = {
	id: "biglist",
	name: "BIGLIST",
	website: "https://www.biglist.com",
	description: "BIGLIST is an opt-in email newsletter system designed to collect, manage, and distribute email updates to subscribers.",
	icon: "BIGLIST.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "biglist:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^BIGLIST Inc.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "biglist:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^biglist inc.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

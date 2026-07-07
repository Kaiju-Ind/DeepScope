import type { TechnologyDefinition } from '../../types';

export const countableTechnologyDefinition = {
	id: "countable",
	name: "Countable",
	website: "https://www.countable.com",
	description: "Countable is a community platform designed to support discussion, collaboration, and engagement among members through shared content, forums, and interactive features.",
	icon: "Countable.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "countable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.countable\\.us\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "countable:meta:1",
			kind: "meta",
			key: "appleid-signin-client-id",
			valuePattern: new RegExp("com\\.countable\\.signin", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

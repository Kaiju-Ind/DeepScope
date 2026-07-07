import type { TechnologyDefinition } from '../../types';

export const twitterTechnologyDefinition = {
	id: "twitter",
	name: "Twitter",
	website: "https://twitter.com",
	description: "Twitter is a 'microblogging' system that allows you to send and receive short posts called tweets.",
	icon: "Twitter.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "twitter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/platform\\.twitter\\.com\\/widgets\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

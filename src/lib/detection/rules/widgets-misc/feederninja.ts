import type { TechnologyDefinition } from '../../types';

export const feederninjaTechnologyDefinition = {
	id: "feederninja",
	name: "FeederNinja",
	website: "https://www.feederninja.com",
	description: "FeederNinja is a tool that allows users to create customizable RSS and social media feed widgets for embedding on websites.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "feederninja:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.feederninja\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

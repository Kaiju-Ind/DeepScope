import type { TechnologyDefinition } from '../../types';

export const mailcheckTechnologyDefinition = {
	id: "mailcheck",
	name: "Mailcheck",
	website: "https://github.com/mailcheck/mailcheck",
	description: "Mailcheck is a JavaScript library designed to address the issue of misspelled email addresses during user input.",
	icon: "Mailcheck.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mailcheck:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mailcheck(?:\\.min)?\\.js(?:\\?v(?:er)?=(\\d+\\.\\d+\\.\\d+))?"),
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

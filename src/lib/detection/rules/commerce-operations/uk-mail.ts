import type { TechnologyDefinition } from '../../types';

export const ukMailTechnologyDefinition = {
	id: "uk-mail",
	name: "UK Mail",
	website: "https://www.ukmail.com",
	description: "UK Mail is a postal service company operating in the United Kingdom.",
	icon: "UK Mail.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "uk-mail:text:0",
			kind: "text",
			pattern: new RegExp("\\bUK Mail\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

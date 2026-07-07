import type { TechnologyDefinition } from '../../types';

export const enquireJsTechnologyDefinition = {
	id: "enquire-js",
	name: "Enquire.js",
	website: "https://wicky.nillia.ms/enquire.js/",
	description: "enquire.js is a lightweight, pure JavaScript library for responding to CSS media queries.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "enquire-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("enquire(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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

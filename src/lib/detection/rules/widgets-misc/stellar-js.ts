import type { TechnologyDefinition } from '../../types';

export const stellarJsTechnologyDefinition = {
	id: "stellar-js",
	name: "Stellar.js",
	website: "https://markdalgleish.com/projects/stellar.js/",
	description: "Stellar.js is a JavaScript library and jQuery plugin specifically designed to deliver parallax scrolling effects for web pages.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "stellar-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("stellar(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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

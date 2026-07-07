import type { TechnologyDefinition } from '../../types';

export const punycodeTechnologyDefinition = {
	id: "punycode",
	name: "punycode",
	website: "https://github.com/mathiasbynens/punycode.js",
	description: "A robust Punycode converter that fully complies to RFC 3492 and RFC 5891, and works on nearly all JavaScript platforms.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "punycode:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("punycode(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.){1,2}\\d+))?"),
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

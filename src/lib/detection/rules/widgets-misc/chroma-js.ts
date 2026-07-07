import type { TechnologyDefinition } from '../../types';

export const chromaJsTechnologyDefinition = {
	id: "chroma-js",
	name: "chroma.js",
	website: "https://www.vis4.net/chromajs/",
	description: "chroma.js is a small-ish zero-dependency JavaScript library for all kinds of color conversions and color scales.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "chroma-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chroma(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chroma-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?chroma(?:\\.min)?\\.js"),
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

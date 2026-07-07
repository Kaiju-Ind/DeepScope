import type { TechnologyDefinition } from '../../types';

export const screenfullJsTechnologyDefinition = {
	id: "screenfull-js",
	name: "Screenfull.js",
	website: "https://sindresorhus.com/screenfull/",
	description: "Simple wrapper for cross-browser usage of the JavaScript Fullscreen API.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "screenfull-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("screenfull(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "screenfull-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?screenfull(?:\\.min)?\\.js"),
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

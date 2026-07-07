import type { TechnologyDefinition } from '../../types';

export const flipclockJsTechnologyDefinition = {
	id: "flipclock-js",
	name: "FlipClock.js",
	website: "https://flipclock.readthedocs.io/en/dev-1.0.0/CHANGE%20LOG/",
	description: "FlipClock.js is a JavaScript library, offering a modern twist to displaying time and countdowns on web applications.",
	categories: [
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "flipclock-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("flipclock(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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

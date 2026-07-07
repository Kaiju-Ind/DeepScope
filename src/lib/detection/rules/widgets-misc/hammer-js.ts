import type { TechnologyDefinition } from '../../types';

export const hammerJsTechnologyDefinition = {
	id: "hammer-js",
	name: "Hammer.js",
	website: "https://hammerjs.github.io",
	description: "Hammer.js is a JavaScript library for adding touch gestures like swipe, pinch, and rotate to web applications.",
	icon: "Hammer.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "hammer-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hammer(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hammer-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ha.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hammer-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Hammer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hammer-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "Hammer.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

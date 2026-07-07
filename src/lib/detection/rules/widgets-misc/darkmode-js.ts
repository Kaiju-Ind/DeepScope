import type { TechnologyDefinition } from '../../types';

export const darkmodeJsTechnologyDefinition = {
	id: "darkmode-js",
	name: "Darkmode.js",
	website: "https://github.com/sandoche/Darkmode.js",
	description: "Darkmode.js is a JavaScript library that enables an HTML element to switch between CSS themes.",
	icon: "default.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "darkmode-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("darkmode-js@([\\d\\.]+)\\/lib\\/darkmode-js\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "darkmode-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Darkmode",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const howlerJsTechnologyDefinition = {
	id: "howler-js",
	name: "Howler.js",
	website: "https://howlerjs.com",
	description: "Howler.js is an audio library with support for the Web Audio API and a fallback mechanism for HTML5 Audio.",
	icon: "Howler.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "howler-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("howler@([\\d.]+)\\/dist\\/howler\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "howler-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("howler\\/([\\d.]+)\\/howler(?:\\.core)?\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "howler-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "Howler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "howler-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "HowlerGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;

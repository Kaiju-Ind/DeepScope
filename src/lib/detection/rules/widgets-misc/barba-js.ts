import type { TechnologyDefinition } from '../../types';

export const barbaJsTechnologyDefinition = {
	id: "barba-js",
	name: "Barba.js",
	website: "https://barba.js.org",
	description: "Barba.js is a small and easy-to-use javascript library that helps you creating fluid and smooth transitions between your website's pages.",
	icon: "Barba.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "barba-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@barba\\/core(?:@([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "barba-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "barba.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

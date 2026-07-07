import type { TechnologyDefinition } from '../../types';

export const riotJsTechnologyDefinition = {
	id: "riot-js",
	name: "Riot.js",
	website: "https://riot.js.org",
	description: "Riot.js is a minimalistic, component-based UI library that enables developers to create custom elements in modern browsers with a small footprint and simple API.",
	icon: "Riot.js.svg",
	categories: [
		"api-pattern",
		"ui-library",
		"framework",
	],
	rules: [
		{
			id: "riot-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("riot(?:\\+compiler)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "riot-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "riot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "riot-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "riot.version",
			valuePattern: new RegExp("v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
		cpe: "cpe:2.3:a:riot.js:riot-compiler:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

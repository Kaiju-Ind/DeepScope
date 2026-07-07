import type { TechnologyDefinition } from '../../types';

export const splitbeeTechnologyDefinition = {
	id: "splitbee",
	name: "Splitbee",
	website: "https://splitbee.io",
	description: "Track and optimize your online business with Splitbee. Friendly analytics & conversion platform.",
	icon: "splitbee.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "splitbee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https:\\/\\/cdn\\.splitbee\\.io\\/sb\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "splitbee:jsGlobal:1",
			kind: "jsGlobal",
			property: "splitbee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "splitbee:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.splitbee\\.io"),
			confidence: 75,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;

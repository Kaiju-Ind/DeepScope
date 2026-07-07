import type { TechnologyDefinition } from '../../types';

export const runkitTechnologyDefinition = {
	id: "runkit",
	name: "RunKit",
	website: "https://runkit.com",
	description: "RunKit is a tool for prototyping server-side JavaScript.",
	icon: "RunKit.svg",
	categories: [
		"developer-tooling",
		"widgets-misc",
	],
	rules: [
		{
			id: "runkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.runkit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "runkit:jsGlobal:1",
			kind: "jsGlobal",
			property: "RunKit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "runkit:jsGlobal:2",
			kind: "jsGlobal",
			property: "RunKit.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
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

import type { TechnologyDefinition } from '../../types';

export const unpolyTechnologyDefinition = {
	id: "unpoly",
	name: "Unpoly",
	website: "https://unpoly.com",
	description: "Unpoly is an unobtrusive Javascript framework for applications that render on the server.",
	icon: "Unpoly.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "unpoly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/unpoly@([\\d\\.]+)\\/unpoly\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unpoly:jsGlobal:1",
			kind: "jsGlobal",
			property: "up.CompilerPass",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unpoly:jsGlobal:2",
			kind: "jsGlobal",
			property: "up.framework",
			confidence: 26,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unpoly:jsGlobal:3",
			kind: "jsGlobal",
			property: "up.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unpoly:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_unpoly_demo_layers_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

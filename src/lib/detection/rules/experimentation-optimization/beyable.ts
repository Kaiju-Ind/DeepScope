import type { TechnologyDefinition } from '../../types';

export const beyableTechnologyDefinition = {
	id: "beyable",
	name: "Beyable",
	website: "https://beyable.com",
	description: "Beyable is a suite of tools that analyze website traffic to understand visitors' behaviors in real-time, through multi-channel in order to optimise conversion rate.",
	icon: "Beyable.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "beyable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("msecnd\\.net\\/api\\/beYableJSv(\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beyable:jsGlobal:1",
			kind: "jsGlobal",
			property: "BEYABLE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beyable:jsGlobal:2",
			kind: "jsGlobal",
			property: "beYableDomain",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beyable:jsGlobal:3",
			kind: "jsGlobal",
			property: "beYableKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beyable:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^beyable\\-cart$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "beyable:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^beyable\\-cartd$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "beyable:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("msecnd\\.net\\/api\\/beyablejsv(\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

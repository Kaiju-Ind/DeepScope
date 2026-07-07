import type { TechnologyDefinition } from '../../types';

export const highstoreTechnologyDefinition = {
	id: "highstore",
	name: "HighStore",
	website: "https://digitalserver.ir",
	description: "HighStore is an ecommerce platform from Iran.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "highstore:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^HighStore\\.IR$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "highstore:meta:1",
			kind: "meta",
			key: "hs:version",
			valuePattern: new RegExp("^([\\d\\.]+)$", "i"),
			confidence: 50,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "highstore:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^highstore\\.ir$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;

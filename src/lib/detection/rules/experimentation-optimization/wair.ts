import type { TechnologyDefinition } from '../../types';

export const wairTechnologyDefinition = {
	id: "wair",
	name: "Wair",
	website: "https://getwair.com",
	description: "Wair is the widget to personalised fit.",
	icon: "Wair.png",
	categories: [
		"experimentation-optimization",
		"widgets-misc",
	],
	rules: [
		{
			id: "wair:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("getwair\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wair:jsGlobal:1",
			kind: "jsGlobal",
			property: "PredictV3.default.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wair:jsGlobal:2",
			kind: "jsGlobal",
			property: "predictWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

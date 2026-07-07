import type { TechnologyDefinition } from '../../types';

export const forsidTechnologyDefinition = {
	id: "forsid",
	name: "Forsid",
	website: "https://forsid.com",
	description: "Forsid is an ecommerce platform for creating and managing online stores.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "forsid:jsGlobal:0",
			kind: "jsGlobal",
			property: "ForsidMiniCart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "forsid:jsGlobal:1",
			kind: "jsGlobal",
			property: "__forsid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "forsid:jsGlobal:2",
			kind: "jsGlobal",
			property: "forsidAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "forsid:jsGlobal:3",
			kind: "jsGlobal",
			property: "forsidDL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "forsid:header:4",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("(?:^|,\\s*)Forsid(?:\\s*,|$)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "forsid:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Forsid$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

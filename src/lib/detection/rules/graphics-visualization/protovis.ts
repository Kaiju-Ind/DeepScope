import type { TechnologyDefinition } from '../../types';

export const protovisTechnologyDefinition = {
	id: "protovis",
	name: "Protovis",
	website: "https://mbostock.github.io/protovis",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "protovis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("protovis.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "protovis:jsGlobal:1",
			kind: "jsGlobal",
			property: "protovis",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const infernojsTechnologyDefinition = {
	id: "infernojs",
	name: "InfernoJS",
	website: "https://infernojs.org",
	description: "InfernoJS is a JavaScript library designed for building user interfaces, known for its high performance and similarity to React.js in terms of API and structure.",
	icon: "InfernoJS.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "infernojs:jsGlobal:0",
			kind: "jsGlobal",
			property: "Inferno",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "infernojs:jsGlobal:1",
			kind: "jsGlobal",
			property: "Inferno.version",
			valuePattern: new RegExp("^(.+)$"),
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

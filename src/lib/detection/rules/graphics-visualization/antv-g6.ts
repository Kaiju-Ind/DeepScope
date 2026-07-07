import type { TechnologyDefinition } from '../../types';

export const antvG6TechnologyDefinition = {
	id: "antv-g6",
	name: "AntV G6",
	website: "https://g6.antv.vision",
	description: "AntV G6 is a graph visualisation framework in JavaScript.",
	icon: "AntV.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "antv-g6:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@antv\\/g6(?:@([\\d.]+))?\\/dist\\/g6(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "antv-g6:jsGlobal:0",
			kind: "jsGlobal",
			property: "G6.Graph",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "antv-g6:jsGlobal:1",
			kind: "jsGlobal",
			property: "G6.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const antvG2TechnologyDefinition = {
	id: "antv-g2",
	name: "AntV G2",
	website: "https://g2plot.antv.vision",
	description: "AntV G2 is a highly interactive data-driven visualisation grammar for statistical charts.",
	icon: "AntV.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "antv-g2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("@antv\\/g2(?:@([\\d.]+))?\\/dist\\/g2(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "antv-g2:dom:0",
			kind: "dom",
			selector: "div.g2-tooltip",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "antv-g2:jsGlobal:1",
			kind: "jsGlobal",
			property: "G2.Chart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "antv-g2:jsGlobal:2",
			kind: "jsGlobal",
			property: "G2.VERSION",
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

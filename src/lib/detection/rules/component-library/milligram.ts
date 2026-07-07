import type { TechnologyDefinition } from '../../types';

export const milligramTechnologyDefinition = {
	id: "milligram",
	name: "Milligram",
	website: "https://milligram.io",
	description: "Milligram is a minimalist CSS framework designed to provide a base for web development projects.",
	icon: "Milligram.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "milligram:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+?href=\"[^\"]+milligram(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "milligram:dom:1",
			kind: "dom",
			selector: "link[href*='milligram.css'], link[href*='milligram.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

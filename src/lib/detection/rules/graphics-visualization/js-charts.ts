import type { TechnologyDefinition } from '../../types';

export const jsChartsTechnologyDefinition = {
	id: "js-charts",
	name: "JS Charts",
	website: "https://www.jscharts.com",
	description: "JS Charts is a JavaScript-based tool for creating customizable charts, such as bar, pie, and line charts, with minimal coding required for integration into web projects.",
	icon: "JS Charts.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "js-charts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jscharts.{0,32}\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "js-charts:jsGlobal:1",
			kind: "jsGlobal",
			property: "JSChart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

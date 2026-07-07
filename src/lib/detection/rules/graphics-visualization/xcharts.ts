import type { TechnologyDefinition } from '../../types';

export const xchartsTechnologyDefinition = {
	id: "xcharts",
	name: "xCharts",
	website: "https://tenxer.github.io/xcharts/",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "xcharts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("xcharts\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xcharts:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=\"[^\"]*xcharts(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "xcharts:jsGlobal:2",
			kind: "jsGlobal",
			property: "xChart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "xcharts:dom:3",
			kind: "dom",
			selector: "link[href*='xcharts.css'], link[href*='xcharts.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"d3",
	],
} as const satisfies TechnologyDefinition;

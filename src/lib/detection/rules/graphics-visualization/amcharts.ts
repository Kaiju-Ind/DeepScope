import type { TechnologyDefinition } from '../../types';

export const amchartsTechnologyDefinition = {
	id: "amcharts",
	name: "amCharts",
	website: "https://amcharts.com",
	description: "amCharts is a JavaScript-based interactive charts and maps programming library and tool.",
	icon: "amCharts.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "amcharts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("amcharts.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amcharts:html:1",
			kind: "html",
			pattern: new RegExp("<svg[^>]*><desc>JavaScript chart by amCharts ([\\d.]*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "amcharts:jsGlobal:2",
			kind: "jsGlobal",
			property: "AmCharts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amcharts:html:3",
			kind: "html",
			pattern: new RegExp("<svg[^>]*><desc>javascript chart by amcharts ([\\d.]*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;

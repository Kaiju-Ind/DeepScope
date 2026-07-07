import type { TechnologyDefinition } from '../../types';

export const highstockTechnologyDefinition = {
	id: "highstock",
	name: "Highstock",
	website: "https://highcharts.com/products/highstock",
	icon: "Highcharts.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "highstock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("highstock[.-]?([\\d\\.]*\\d).*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "highstock:html:1",
			kind: "html",
			pattern: new RegExp("<svg[^>]*><desc>Created with Highstock ([\\d.]*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "highstock:html:2",
			kind: "html",
			pattern: new RegExp("<svg[^>]*><desc>created with highstock ([\\d.]*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;

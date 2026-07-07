import type { TechnologyDefinition } from '../../types';

export const highchartsTechnologyDefinition = {
	id: "highcharts",
	name: "Highcharts",
	website: "https://www.highcharts.com",
	description: "Highcharts is a charting library written in pure JavaScript, for adding interactive charts to a website or web application. Highcharts meets accessibility standards and works with Python, Angular, React, iOS, Android, and more.",
	icon: "Highcharts.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "highcharts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("highcharts.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "highcharts:html:1",
			kind: "html",
			pattern: new RegExp("<svg[^>]*><desc>Created with Highcharts ([\\d.]*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "highcharts:jsGlobal:2",
			kind: "jsGlobal",
			property: "Highcharts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "highcharts:jsGlobal:3",
			kind: "jsGlobal",
			property: "Highcharts.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "highcharts:html:4",
			kind: "html",
			pattern: new RegExp("<svg[^>]*><desc>created with highcharts ([\\d.]*)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:highcharts:highcharts:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const plotlyTechnologyDefinition = {
	id: "plotly",
	name: "Plotly",
	website: "https://plot.ly/javascript/",
	description: "Plotly is a data visualization library and platform that enables the creation of interactive, high-quality charts, graphs, and dashboards for web applications and data analysis using languages like JavaScript, Python, and R.",
	icon: "Plotly.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "plotly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/cdn\\.plot\\.ly\\/plotly"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plotly:jsGlobal:1",
			kind: "jsGlobal",
			property: "Plotly.version",
			valuePattern: new RegExp("([\\d.])"),
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
	implies: [
		"d3",
	],
} as const satisfies TechnologyDefinition;

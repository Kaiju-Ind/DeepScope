import type { TechnologyDefinition } from '../../types';

export const jqplotTechnologyDefinition = {
	id: "jqplot",
	name: "jqPlot",
	website: "https://www.jqplot.com",
	icon: "jqPlot.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "jqplot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jqplot.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;

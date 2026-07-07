import type { TechnologyDefinition } from '../../types';

export const timeplotTechnologyDefinition = {
	id: "timeplot",
	name: "Timeplot",
	website: "https://www.simile-widgets.org/timeplot/",
	icon: "Timeplot.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "timeplot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("timeplot.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "timeplot:jsGlobal:1",
			kind: "jsGlobal",
			property: "Timeplot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const easyPieChartTechnologyDefinition = {
	id: "easy-pie-chart",
	name: "Easy Pie Chart",
	website: "https://rendro.github.io/easy-pie-chart/",
	description: "Lightweight jQuery plugin to render and animate nice pie charts with the HTML5 canvas element.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "easy-pie-chart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("[Ee]asy-?[Pp]ie-?[Cc]hart(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easy-pie-chart:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("[ee]asy-?[pp]ie-?[cc]hart(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

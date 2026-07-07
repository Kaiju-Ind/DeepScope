import type { TechnologyDefinition } from '../../types';

export const clickheatTechnologyDefinition = {
	id: "clickheat",
	name: "ClickHeat",
	website: "https://www.labsmedia.com/clickheat/index.html",
	description: "ClickHeat is an open-source heatmap tool for visualizing clicks on web pages.",
	icon: "ClickHeat.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "clickheat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clickheat.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clickheat:jsGlobal:1",
			kind: "jsGlobal",
			property: "clickHeatServer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:labsmedia:clickheat:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

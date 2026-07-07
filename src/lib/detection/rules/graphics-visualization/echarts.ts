import type { TechnologyDefinition } from '../../types';

export const echartsTechnologyDefinition = {
	id: "echarts",
	name: "ECharts",
	website: "https://echarts.apache.org/",
	description: "ECharts is an open-source JavaScript charting and data visualization library.",
	icon: "echarts.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "echarts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/echarts\\.min\\.[a-zA-Z0-9]*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "echarts:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/echarts(?:\\.simple)?(?:\\.esm)?(?:\\.common)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "echarts:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/(?:npm|gh\\/apache)\\/echarts@([\\d.]+(?:-[^/]+)?|latest)\\/dist\\/echarts.*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "echarts:dom:3",
			kind: "dom",
			selector: "div[_echarts_instance_]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "echarts:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/echarts\\.min\\.[a-za-z0-9]*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

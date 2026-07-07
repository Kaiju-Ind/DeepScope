import type { TechnologyDefinition } from '../../types';

export const flotTechnologyDefinition = {
	id: "flot",
	name: "Flot",
	website: "https://flotcharts.org/",
	description: "Flot is a JavaScript plotting library for jQuery that provides interactive charts and graphs using HTML canvas.",
	icon: "Flot.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "flot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:jquery\\.)?)?flot(?:\\/curvedLines)?(?:\\/excanvas)?(?:\\/jquery)?(?:\\.categories)?(?:\\.pack)?(?:\\.pie)?(?:\\.resize)?(?:\\.selection)?(?:\\.spline)?(?:\\.symbol)?(?:\\.time)?(?:\\.tooltip)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flot:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:(?:jquery\\.)?)?flot(?:\\/curvedLines)?(?:\\/excanvas)?(?:\\/jquery)?(?:\\.categories)?(?:\\.pack)?(?:\\.pie)?(?:\\.resize)?(?:\\.selection)?(?:\\.spline)?(?:\\.symbol)?(?:\\.time)?(?:\\.tooltip)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flot:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:jquery\\.)?)?flot(?:\\/curvedlines)?(?:\\/excanvas)?(?:\\/jquery)?(?:\\.categories)?(?:\\.pack)?(?:\\.pie)?(?:\\.resize)?(?:\\.selection)?(?:\\.spline)?(?:\\.symbol)?(?:\\.time)?(?:\\.tooltip)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flot:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("(?:(?:jquery\\.)?)?flot(?:\\/curvedlines)?(?:\\/excanvas)?(?:\\/jquery)?(?:\\.categories)?(?:\\.pack)?(?:\\.pie)?(?:\\.resize)?(?:\\.selection)?(?:\\.spline)?(?:\\.symbol)?(?:\\.time)?(?:\\.tooltip)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flot:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/flot\\/jquery\\.flot\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;

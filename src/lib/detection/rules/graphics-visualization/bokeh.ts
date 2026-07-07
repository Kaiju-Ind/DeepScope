import type { TechnologyDefinition } from '../../types';

export const bokehTechnologyDefinition = {
	id: "bokeh",
	name: "Bokeh",
	website: "https://bokeh.org",
	description: "Bokeh is an open-source Python library for interactive data visualization in web browsers.",
	icon: "bokeh.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "bokeh:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bokeh\\.org\\/bokeh\\/release\\/bokeh-([\\d.]+(?:[a-zA-Z0-9.-]*)?)\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bokeh:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("bokeh.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bokeh:jsGlobal:1",
			kind: "jsGlobal",
			property: "Bokeh",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bokeh:jsGlobal:2",
			kind: "jsGlobal",
			property: "Bokeh.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:bokeh:bokeh:*:*:*:*:*:python:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const nvd3TechnologyDefinition = {
	id: "nvd3",
	name: "NVD3",
	website: "https://nvd3.org",
	description: "NVD3 is a JavaScript visualisation library that is a free open-source tool.",
	icon: "NVD3.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "nvd3:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("nv\\.d3(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nvd3:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]+nv\\.d3(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nvd3:jsGlobal:2",
			kind: "jsGlobal",
			property: "nv.addGraph",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nvd3:jsGlobal:3",
			kind: "jsGlobal",
			property: "nv.version",
			valuePattern: new RegExp("^(.+)$"),
			confidence: 0,
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nvd3:dom:4",
			kind: "dom",
			selector: "link[href*='nv.d3.css'], link[href*='nv.d3.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"d3",
	],
} as const satisfies TechnologyDefinition;

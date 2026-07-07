import type { TechnologyDefinition } from '../../types';

export const shapecssTechnologyDefinition = {
	id: "shapecss",
	name: "Shapecss",
	website: "https://shapecss.com",
	icon: "Shapecss.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "shapecss:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("shapecss[-.]([\\d.]*\\d)[^/]*\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shapecss:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/([\\d.]+)\\/shapecss(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shapecss:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("shapecss.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shapecss:html:3",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=\"[^\"]*shapecss(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "shapecss:jsGlobal:4",
			kind: "jsGlobal",
			property: "Shapecss",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "shapecss:dom:5",
			kind: "dom",
			selector: "link[href*='shapecss.css'],link[href*='shapecss.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

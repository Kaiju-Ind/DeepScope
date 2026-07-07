import type { TechnologyDefinition } from '../../types';

export const genexusTechnologyDefinition = {
	id: "genexus",
	name: "GeneXus",
	website: "https://www.genexus.com/",
	description: "GeneXus is a low-code development platform for building business applications.",
	icon: "GeneXus.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "genexus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/gxgral\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "genexus:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/gxtimezone\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "genexus:html:2",
			kind: "html",
			pattern: new RegExp("<link[^>]+?id=\"gxtheme_css_reference\""),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "genexus:jsGlobal:3",
			kind: "jsGlobal",
			property: "gx.gxVersion",
			valuePattern: new RegExp("^(.+)-.*$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "genexus:dom:4",
			kind: "dom",
			selector: "link[id^='gxtheme_css_reference']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "genexus:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/(gxgral|gxtimezone)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

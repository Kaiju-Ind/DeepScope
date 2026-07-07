import type { TechnologyDefinition } from '../../types';

export const glyphiconsTechnologyDefinition = {
	id: "glyphicons",
	name: "Glyphicons",
	website: "https://glyphicons.com",
	description: "Glyphicons are icon fonts which you can use in your web projects.",
	icon: "Glyphicons.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "glyphicons:html:0",
			kind: "html",
			pattern: new RegExp("(?:<link[^>]* href=[^>]+glyphicons(?:\\.min)?\\.css|<img[^>]* src=[^>]+glyphicons)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "glyphicons:dom:1",
			kind: "dom",
			selector: "link[href*='glyphicons.css'], link[href*='glyphicons.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

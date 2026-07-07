import type { TechnologyDefinition } from '../../types';

export const slimboxTechnologyDefinition = {
	id: "slimbox",
	name: "Slimbox",
	website: "https://www.digitalia.be/software/slimbox",
	icon: "Slimbox.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "slimbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("slimbox\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slimbox:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^/]*slimbox(?:-rtl)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "slimbox:dom:2",
			kind: "dom",
			selector: "link[href*='slimbox.css'],link[href*='slimbox-rtl.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"mootools",
	],
} as const satisfies TechnologyDefinition;

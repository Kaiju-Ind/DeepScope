import type { TechnologyDefinition } from '../../types';

export const slimbox2TechnologyDefinition = {
	id: "slimbox-2",
	name: "Slimbox 2",
	website: "https://www.digitalia.be/software/slimbox2",
	icon: "Slimbox 2.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "slimbox-2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("slimbox2\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slimbox-2:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^/]*slimbox2(?:-rtl)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "slimbox-2:dom:2",
			kind: "dom",
			selector: "link[href*='slimbox2.css'], link[href*='slimbox2-rtl.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const epochTechnologyDefinition = {
	id: "epoch",
	name: "Epoch",
	website: "https://fastly.github.io/epoch",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "epoch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("epoch(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "epoch:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+?href=\"[^\"]+epoch(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "epoch:dom:2",
			kind: "dom",
			selector: "link[href*='epoch.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "epoch:dom:3",
			kind: "dom",
			selector: "link[href*='epoch.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "epoch:dom:4",
			kind: "dom",
			selector: "link[href*='epoch.css'], link[href*='epoch.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"d3",
	],
} as const satisfies TechnologyDefinition;

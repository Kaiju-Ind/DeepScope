import type { TechnologyDefinition } from '../../types';

export const flysprayTechnologyDefinition = {
	id: "flyspray",
	name: "Flyspray",
	website: "https://flyspray.org",
	description: "Flyspray is a web-based bug tracking system.",
	icon: "Flyspray.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "flyspray:html:0",
			kind: "html",
			pattern: new RegExp("(?:<a[^>]+>Powered by Flyspray|<map id=\"projectsearchform)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "flyspray:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^flyspray_project$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "flyspray:dom:2",
			kind: "dom",
			selector: "map#projectsearchform",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "flyspray:html:3",
			kind: "html",
			pattern: new RegExp("(?:<a[^>]+>powered by flyspray|<map id=\"projectsearchform)"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:flyspray:flyspray:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

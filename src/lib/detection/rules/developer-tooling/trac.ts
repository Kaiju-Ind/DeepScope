import type { TechnologyDefinition } from '../../types';

export const tracTechnologyDefinition = {
	id: "trac",
	name: "Trac",
	website: "https://trac.edgewall.org",
	description: "Trac is an enhanced wiki and issue tracking system for software development projects, using a minimalistic approach to web-based software project management.",
	icon: "Trac.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "trac:html:0",
			kind: "html",
			pattern: new RegExp("<a id=\"tracpowered"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "trac:html:1",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^\"]*\"><strong>Trac(?:[ /]([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "trac:dom:2",
			kind: "dom",
			selector: "link[type*='text/x-trac-wiki']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "trac:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^trac_form_token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "trac:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^trac_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "trac:html:5",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^\"]*\"><strong>trac(?:[ /]([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:edgewall:trac:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;

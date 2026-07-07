import type { TechnologyDefinition } from '../../types';

export const oxygenTechnologyDefinition = {
	id: "oxygen",
	name: "Oxygen",
	website: "https://oxygenbuilder.com",
	description: "Oxygen Builder is a tool to build a WordPress website.",
	icon: "Oxygen.png",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "oxygen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/oxygen"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "oxygen:html:1",
			kind: "html",
			pattern: new RegExp("<body class=(?:\"|')[^\"']*oxygen-body"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oxygen:html:2",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=(?:\"|')[^>]*wp-content\\/plugins\\/oxygen\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "oxygen:dom:3",
			kind: "dom",
			selector: "body[class*='oxygen-body'], link[href*='wp-content/plugins/oxygen/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:soflyy:oxygen:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

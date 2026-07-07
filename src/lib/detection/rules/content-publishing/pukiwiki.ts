import type { TechnologyDefinition } from '../../types';

export const pukiwikiTechnologyDefinition = {
	id: "pukiwiki",
	name: "PukiWiki",
	website: "https://pukiwiki.sourceforge.io",
	description: "PukiWiki is a web-based WikiEngine that enables collaborative editing by allowing anyone to modify pages.",
	icon: "PukiWiki.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "pukiwiki:dom:0",
			kind: "dom",
			selector: "link[href*='/pukiwiki.css'], link[href*='/skin/pukiwiki.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:pukiwiki:pukiwiki:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

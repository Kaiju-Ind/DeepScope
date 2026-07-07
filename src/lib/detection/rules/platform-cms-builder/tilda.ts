import type { TechnologyDefinition } from '../../types';

export const tildaTechnologyDefinition = {
	id: "tilda",
	name: "Tilda",
	website: "https://tilda.cc",
	description: "Tilda is a web design tool.",
	icon: "Tilda.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tilda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tilda(?:cdn|\\.ws|-blocks)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tilda:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]+tilda(?:cdn|\\.ws|-blocks)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "tilda:dom:2",
			kind: "dom",
			selector: "link[href*='tildacdn'],link[href*='tilda.ws'],link[href*='tilda-blocks']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

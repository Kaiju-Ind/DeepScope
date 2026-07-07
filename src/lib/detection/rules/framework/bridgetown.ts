import type { TechnologyDefinition } from '../../types';

export const bridgetownTechnologyDefinition = {
	id: "bridgetown",
	name: "Bridgetown",
	website: "https://www.bridgetownrb.com",
	description: "Bridgetown is an open-source static site generator built with Ruby, facilitating the creation of fast and efficient websites by generating static HTML and CSS files.",
	icon: "Bridgetown.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "bridgetown:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^\\/_bridgetown\\/static\\/.+\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bridgetown:dom:1",
			kind: "dom",
			selector: "link[href^='/_bridgetown/static/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;

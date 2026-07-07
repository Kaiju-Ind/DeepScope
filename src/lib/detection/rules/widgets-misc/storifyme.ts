import type { TechnologyDefinition } from '../../types';

export const storifymeTechnologyDefinition = {
	id: "storifyme",
	name: "StorifyMe",
	website: "https://www.storifyme.com",
	description: "StorifyMe is a storytelling platform for creating and distributing web stories on social networks and the open web.",
	icon: "StorifyMe.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "storifyme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.storifyme\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storifyme:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.storifyme.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

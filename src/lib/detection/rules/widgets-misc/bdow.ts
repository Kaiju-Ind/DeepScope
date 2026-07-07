import type { TechnologyDefinition } from '../../types';

export const bdowTechnologyDefinition = {
	id: "bdow",
	name: "BDOW",
	website: "https://bdow.com/",
	description: "BDOW is a plugin offering set of marketing tools to automate a website's growth. These tools help drive extra traffic, engage visitors, increase email subscribers and build community.",
	icon: "Bdow.svg",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "bdow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sumo(?:me)?\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bdow:jsGlobal:1",
			kind: "jsGlobal",
			property: "sumo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bdow:jsGlobal:2",
			kind: "jsGlobal",
			property: "sumome",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

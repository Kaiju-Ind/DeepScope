import type { TechnologyDefinition } from '../../types';

export const sumoTechnologyDefinition = {
	id: "sumo",
	name: "Sumo",
	website: "https://sumo.com",
	description: "Sumo is a plugin offering set of marketing tools to automate a website's growth. These tools help drive extra traffic, engage visitors, increase email subscribers and build community.",
	icon: "Sumo.png",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "sumo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sumo(?:me)?\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sumo:jsGlobal:1",
			kind: "jsGlobal",
			property: "sumo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sumo:jsGlobal:2",
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

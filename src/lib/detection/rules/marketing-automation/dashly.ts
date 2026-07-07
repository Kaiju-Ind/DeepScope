import type { TechnologyDefinition } from '../../types';

export const dashlyTechnologyDefinition = {
	id: "dashly",
	name: "Dashly",
	website: "https://www.dashly.io",
	description: "Dashly is a conversational marketing platform designed to increase quality lead encounters and reduce customer acquisition costs.",
	icon: "Dashly.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "dashly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.dashly\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dashly:jsGlobal:1",
			kind: "jsGlobal",
			property: "dashly",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

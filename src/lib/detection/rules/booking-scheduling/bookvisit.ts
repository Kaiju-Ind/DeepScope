import type { TechnologyDefinition } from '../../types';

export const bookvisitTechnologyDefinition = {
	id: "bookvisit",
	name: "BookVisit",
	website: "https://bookvisit.com",
	description: "BookVisit is an online booking and channel management platform used by hotels and tourism organizations, primarily in Scandinavia.",
	icon: "BookVisit.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookvisit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bookvisit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookvisit:jsGlobal:1",
			kind: "jsGlobal",
			property: "initBookVisitWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bookvisit:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("online\\.bookvisit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

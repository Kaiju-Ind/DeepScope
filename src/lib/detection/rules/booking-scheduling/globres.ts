import type { TechnologyDefinition } from '../../types';

export const globresTechnologyDefinition = {
	id: "globres",
	name: "GlobRes",
	website: "https://globres.com",
	description: "GlobRes is a hospitality management solution designed to streamline operations, reservations, and customer service for hotels and other lodging providers.",
	icon: "GlobRes.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "globres:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.globres\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "globres:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.globres\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

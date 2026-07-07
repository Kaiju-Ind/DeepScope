import type { TechnologyDefinition } from '../../types';

export const livesessionTechnologyDefinition = {
	id: "livesession",
	name: "LiveSession",
	website: "https://livesession.io/",
	description: "LiveSession helps increase conversion rates using session replays, and event-based product analytics.",
	icon: "LiveSession.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "livesession:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.livesession\\.io"),
			description: "Script source URL matches a known technology marker.",
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

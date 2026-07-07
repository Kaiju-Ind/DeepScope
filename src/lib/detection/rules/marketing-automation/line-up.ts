import type { TechnologyDefinition } from '../../types';

export const lineUpTechnologyDefinition = {
	id: "line-up",
	name: "Line-Up",
	website: "https://www.line-up.tickets",
	description: "Line-Up is an event discovery service that organizes and presents local activities, shows, and gatherings to help audiences access timely information about upcoming events.",
	icon: "Line-Up.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "line-up:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.lineupnow\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "line-up:jsGlobal:1",
			kind: "jsGlobal",
			property: "LineupPurchaseLoader.baseId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "line-up:jsGlobal:2",
			kind: "jsGlobal",
			property: "LineupSDKLoader.baseId",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const sessionRewindTechnologyDefinition = {
	id: "session-rewind",
	name: "Session Rewind",
	website: "https://sessionrewind.com",
	description: "Session Rewind is a playback and monitoring service that records and tracks every session and issue.",
	icon: "SessionRewind.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "session-rewind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sessionrewind\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "session-rewind:jsGlobal:1",
			kind: "jsGlobal",
			property: "SessionRewindConfig.apiKey",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

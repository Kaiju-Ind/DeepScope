import type { TechnologyDefinition } from '../../types';

export const betterReplayTechnologyDefinition = {
	id: "better-replay",
	name: "Better Replay",
	website: "https://www.better-replay.com",
	description: "Better Replay is a platform for session recording and replay, designed to capture and review content efficiently.",
	icon: "BetterReplay.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "better-replay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp(".api\\.better-replay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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

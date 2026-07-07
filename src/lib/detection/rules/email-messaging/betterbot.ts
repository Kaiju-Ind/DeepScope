import type { TechnologyDefinition } from '../../types';

export const betterbotTechnologyDefinition = {
	id: "betterbot",
	name: "BetterBot",
	website: "https://betterbot.com",
	description: "BetterBot is a conversational leasing tool tailored for real estate.",
	icon: "BetterBot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "betterbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:dashboard\\.betterbot\\.ai|\\.betterbot\\.com)"),
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

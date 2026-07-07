import type { TechnologyDefinition } from '../../types';

export const guestSuiteTechnologyDefinition = {
	id: "guest-suite",
	name: "Guest Suite",
	website: "https://guestapp.me",
	description: "Guest Suite is a tool that collects customer opinions during their stay, directly from the reception of the establishment.",
	icon: "GuestSuite.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "guest-suite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.guestapp\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "guest-suite:jsGlobal:1",
			kind: "jsGlobal",
			property: "guestsuite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

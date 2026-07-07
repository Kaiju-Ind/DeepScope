import type { TechnologyDefinition } from '../../types';

export const botsplashTechnologyDefinition = {
	id: "botsplash",
	name: "Botsplash",
	website: "https://www.botsplash.com",
	description: "Botsplash is a communication platform that manages conversations across SMS, web chat, email, voice, and AI in real time from a single interface.",
	icon: "Botsplash.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botsplash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chatcdn\\.botsplash\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "botsplash:jsGlobal:1",
			kind: "jsGlobal",
			property: "$botsplash",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botsplash:jsGlobal:2",
			kind: "jsGlobal",
			property: "BOTSPLASH_APP_ID",
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

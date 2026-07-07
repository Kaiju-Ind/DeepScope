import type { TechnologyDefinition } from '../../types';

export const instabotTechnologyDefinition = {
	id: "instabot",
	name: "Instabot",
	website: "https://instabot.io/",
	description: "Instabot is a conversion chatbot that understands your users, and curates information, answers questions, captures contacts, and books meetings instantly.",
	icon: "Instabot.png",
	categories: [
		"widgets-misc",
		"analytics",
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "instabot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/rokoInstabot\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instabot:jsGlobal:1",
			kind: "jsGlobal",
			property: "Instabot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "instabot:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/rokoinstabot\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

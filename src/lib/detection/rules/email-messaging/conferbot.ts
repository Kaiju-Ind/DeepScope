import type { TechnologyDefinition } from '../../types';

export const conferbotTechnologyDefinition = {
	id: "conferbot",
	name: "Conferbot",
	website: "https://www.conferbot.com",
	description: "Conferbot is a platform designed to improve website engagement through customisable chatbots, catering to various business requirements.",
	icon: "Conferbot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "conferbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("conferbot\\.defaults.*\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "conferbot:jsGlobal:1",
			kind: "jsGlobal",
			property: "ConferbotWidget",
			description: "Page-owned global matches a known technology marker.",
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

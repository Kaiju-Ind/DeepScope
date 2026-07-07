import type { TechnologyDefinition } from '../../types';

export const landbotTechnologyDefinition = {
	id: "landbot",
	name: "Landbot",
	website: "https://landbot.io",
	description: "Landbot is a no code conversational chatbots, conversational landing pages and website, interactive survey and lead generation bot.",
	icon: "landbot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "landbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.landbot\\.io\\/.*-([\\d\\.]+)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "landbot:jsGlobal:1",
			kind: "jsGlobal",
			property: "LandbotLivechat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "landbot:jsGlobal:2",
			kind: "jsGlobal",
			property: "initLandbot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const podiumTechnologyDefinition = {
	id: "podium",
	name: "Podium",
	website: "https://www.podium.com",
	description: "Podium is a customer communication platform for businesses who interact with customers on a local level.",
	icon: "Podium.png",
	categories: [
		"widgets-misc",
		"email-messaging",
	],
	rules: [
		{
			id: "podium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.podium\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "podium:jsGlobal:1",
			kind: "jsGlobal",
			property: "PodiumWebChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "podium:jsGlobal:2",
			kind: "jsGlobal",
			property: "podiumWebsiteWidgetLoaded",
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

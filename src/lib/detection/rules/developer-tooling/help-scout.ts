import type { TechnologyDefinition } from '../../types';

export const helpScoutTechnologyDefinition = {
	id: "help-scout",
	name: "Help Scout",
	website: "https://www.helpscout.com",
	description: "Help Scout is a customer service platform including email, a knowledge base tool and live chat.",
	icon: "Help Scout.svg",
	categories: [
		"developer-tooling",
		"email-messaging",
	],
	rules: [
		{
			id: "help-scout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.helpscout\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "help-scout:jsGlobal:1",
			kind: "jsGlobal",
			property: "__onBeaconDestroy",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "help-scout:jsGlobal:2",
			kind: "jsGlobal",
			property: "beaconStore",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const startiAppTechnologyDefinition = {
	id: "starti-app",
	name: "starti.app",
	website: "https://starti.app",
	description: "starti.app is a subscription-based platform that converts websites into mobile applications.",
	icon: "StartiApp.svg",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "starti-app:jsGlobal:0",
			kind: "jsGlobal",
			property: "startiapp.App",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "starti-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "startiappAlternateIcons",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "starti-app:jsGlobal:2",
			kind: "jsGlobal",
			property: "startiappApp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "starti-app:jsGlobal:3",
			kind: "jsGlobal",
			property: "startiappUser",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

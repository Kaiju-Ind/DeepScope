import type { TechnologyDefinition } from '../../types';

export const rafflepressTechnologyDefinition = {
	id: "rafflepress",
	name: "RafflePress",
	website: "https://rafflepress.com",
	description: "RafflePress is a WordPress plugin designed for creating and managing giveaways to boost website engagement and grow audiences.",
	icon: "RafflePress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "rafflepress:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.rafflepress\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "rafflepress:jsGlobal:1",
			kind: "jsGlobal",
			property: "rafflepress_api_url",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rafflepress:jsGlobal:2",
			kind: "jsGlobal",
			property: "rafflepress_cookies",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

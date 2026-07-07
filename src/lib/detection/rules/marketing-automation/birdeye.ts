import type { TechnologyDefinition } from '../../types';

export const birdeyeTechnologyDefinition = {
	id: "birdeye",
	name: "Birdeye",
	website: "https://birdeye.com",
	description: "Birdeye is a customer experience platform for reviews, messaging, surveys, and listings.",
	icon: "Birdeye.svg",
	categories: [
		"marketing-automation",
		"widgets-misc",
	],
	rules: [
		{
			id: "birdeye:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("birdeye\\.com\\/embed"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "birdeye:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("birdeye\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "birdeye:jsGlobal:2",
			kind: "jsGlobal",
			property: "bfiframe",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const promotixTechnologyDefinition = {
	id: "promotix",
	name: "PromoTix",
	website: "https://www.promotix.com",
	description: "PromoTix is a ticketing software application designed to streamline event ticket sales and management.",
	icon: "PromoTix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "promotix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.promotix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "promotix:meta:1",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^PromoTix$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "promotix:meta:2",
			kind: "meta",
			key: "apple-mobile-web-app-title",
			valuePattern: new RegExp("^promotix$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

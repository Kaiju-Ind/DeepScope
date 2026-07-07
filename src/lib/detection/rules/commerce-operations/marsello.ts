import type { TechnologyDefinition } from '../../types';

export const marselloTechnologyDefinition = {
	id: "marsello",
	name: "Marsello",
	website: "https://www.marsello.com",
	description: "Marsello is an omnichannel loyalty platform that integrates with sales channels, enhancing customer engagement and retention by providing a unified experience across various points of sale.",
	icon: "Marsello.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "marsello:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.marsello\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "marsello:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^marselloExitPopup$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "marsello:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^marselloexitpopup$", "i"),
			description: "Cookie name matches a known technology marker.",
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

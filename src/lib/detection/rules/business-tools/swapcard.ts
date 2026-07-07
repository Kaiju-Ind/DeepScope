import type { TechnologyDefinition } from '../../types';

export const swapcardTechnologyDefinition = {
	id: "swapcard",
	name: "Swapcard",
	website: "https://www.swapcard.com",
	description: "Swapcard is a platform that helps convert event engagement into revenue by connecting attendees, enhancing interaction, and providing monetization tools for organizers.",
	icon: "Swapcard.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "swapcard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.swapcard\\.com"),
			description: "Script source URL matches a known technology marker.",
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

import type { TechnologyDefinition } from '../../types';

export const clickaineTechnologyDefinition = {
	id: "clickaine",
	name: "Clickaine",
	website: "https://clickaine.com",
	description: "Clickaine is a traffic ad network that helps advertisers drive targeted traffic to their websites through various digital marketing solutions, offering a platform for publishers to monetize their traffic effectively.",
	icon: "Clickaine.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "clickaine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.clickaine\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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

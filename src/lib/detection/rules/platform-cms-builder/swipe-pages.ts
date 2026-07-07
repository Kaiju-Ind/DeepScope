import type { TechnologyDefinition } from '../../types';

export const swipePagesTechnologyDefinition = {
	id: "swipe-pages",
	name: "Swipe Pages",
	website: "https://swipepages.com",
	description: "Swipe Pages is a platform used to build landing pages.",
	icon: "Swipe Pages.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "swipe-pages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.swipepages\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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

import type { TechnologyDefinition } from '../../types';

export const virtooalTechnologyDefinition = {
	id: "virtooal",
	name: "Virtooal",
	website: "https://try.virtooal.com",
	description: "Virtooal allows shoppers to try on and combine decorative cosmetics, sunglasses, contact lenses, jewellery and fashion accessories using models, their own photo or a live webcam feed.",
	icon: "Virtooal.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "virtooal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.virtooal\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

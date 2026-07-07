import type { TechnologyDefinition } from '../../types';

export const proticaretTechnologyDefinition = {
	id: "proticaret",
	name: "Proticaret",
	website: "https://www.proticaret.org",
	description: "Proticaret is an ecommerce solution from Turkey designed to support online retail operations across various industries.",
	icon: "Proticaret.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "proticaret:jsGlobal:0",
			kind: "jsGlobal",
			property: "proticaret",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "proticaret:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^proticaretCookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "proticaret:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^proticaretcookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

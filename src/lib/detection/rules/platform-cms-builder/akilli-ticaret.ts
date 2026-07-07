import type { TechnologyDefinition } from '../../types';

export const akilliTicaretTechnologyDefinition = {
	id: "akilli-ticaret",
	name: "Akilli Ticaret",
	website: "https://akilliticaret.com",
	description: "Akilli Ticaret is an all-in-one ecommerce platform from Turkey.",
	icon: "Akilli Ticaret.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "akilli-ticaret:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.akilliticaret\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "akilli-ticaret:jsGlobal:1",
			kind: "jsGlobal",
			property: "akillitel",
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
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const aitthemesTechnologyDefinition = {
	id: "aitthemes",
	name: "AitThemes",
	website: "https://www.ait-themes.club",
	description: "AitThemes is a customisable theme suitable for business, ecommerce, content, and directory websites.",
	icon: "AitThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "aitthemes:jsGlobal:0",
			kind: "jsGlobal",
			property: "AitSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aitthemes:jsGlobal:1",
			kind: "jsGlobal",
			property: "ait",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aitthemes:meta:2",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("AitThemes\\.club", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "aitthemes:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("aitthemes\\.club", "i"),
			description: "Meta tag matches a known technology marker.",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

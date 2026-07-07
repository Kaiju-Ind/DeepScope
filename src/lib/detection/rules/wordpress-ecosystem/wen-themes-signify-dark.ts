import type { TechnologyDefinition } from '../../types';

export const wenThemesSignifyDarkTechnologyDefinition = {
	id: "wen-themes-signify-dark",
	name: "WEN Themes Signify Dark",
	website: "https://wenthemes.com/item/wordpress-themes/signify-dark",
	description: "Signify Dark is a free dark blog and corporate WordPress theme that is trendy, responsive, and dynamic by WEN Themes.",
	icon: "WEN Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wen-themes-signify-dark:jsGlobal:0",
			kind: "jsGlobal",
			property: "signifyOptions",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const wenThemesEducationHubTechnologyDefinition = {
	id: "wen-themes-education-hub",
	name: "WEN Themes Education Hub",
	website: "https://wenthemes.com/item/wordpress-themes/education-hub",
	description: "WEN Themes Education Hub is a clean and elegant WordPress education theme.",
	icon: "WEN Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wen-themes-education-hub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/education-hub(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wen-themes-education-hub:jsGlobal:1",
			kind: "jsGlobal",
			property: "EducationHubScreenReaderText",
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

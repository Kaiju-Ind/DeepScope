import type { TechnologyDefinition } from '../../types';

export const boldThemesTechnologyDefinition = {
	id: "bold-themes",
	name: "Bold Themes",
	website: "https://bold-themes.com/wordpress-themes-plugins/",
	description: "Bold Themes is a powerful and easy to use premium WordPress themes.",
	icon: "Bold Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "bold-themes:jsGlobal:0",
			kind: "jsGlobal",
			property: "BoldThemesURI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bold-themes:jsGlobal:1",
			kind: "jsGlobal",
			property: "boldthemes_theme_loaded",
			valuePattern: new RegExp("^true$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

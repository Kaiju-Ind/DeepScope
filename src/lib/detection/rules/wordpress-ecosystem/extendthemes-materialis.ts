import type { TechnologyDefinition } from '../../types';

export const extendthemesMaterialisTechnologyDefinition = {
	id: "extendthemes-materialis",
	name: "ExtendThemes Materialis",
	website: "https://extendthemes.com/materialis",
	description: "ExtendThemes Materialis is an flexible, multipurpose WordPress theme.",
	icon: "ExtendThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "extendthemes-materialis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/materialis(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extendthemes-materialis:dom:1",
			kind: "dom",
			selector: "link#materialis-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "extendthemes-materialis:jsGlobal:2",
			kind: "jsGlobal",
			property: "MaterialisTheme",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extendthemes-materialis:jsGlobal:3",
			kind: "jsGlobal",
			property: "materialisSetHeaderTopSpacing",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extendthemes-materialis:jsGlobal:4",
			kind: "jsGlobal",
			property: "materialis_theme_pro_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

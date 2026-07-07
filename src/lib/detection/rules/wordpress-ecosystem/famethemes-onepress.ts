import type { TechnologyDefinition } from '../../types';

export const famethemesOnepressTechnologyDefinition = {
	id: "famethemes-onepress",
	name: "FameThemes OnePress",
	website: "https://www.famethemes.com/themes/onepress",
	description: "FameThemes OnePress is a free portfolio one page WordPress theme suited for an individual or digital agency.",
	icon: "FameThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "famethemes-onepress:jsGlobal:0",
			kind: "jsGlobal",
			property: "OnePress_Plus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "famethemes-onepress:jsGlobal:1",
			kind: "jsGlobal",
			property: "onepressIsMobile",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "famethemes-onepress:jsGlobal:2",
			kind: "jsGlobal",
			property: "onepress_js_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

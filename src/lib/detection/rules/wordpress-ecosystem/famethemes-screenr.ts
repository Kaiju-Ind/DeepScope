import type { TechnologyDefinition } from '../../types';

export const famethemesScreenrTechnologyDefinition = {
	id: "famethemes-screenr",
	name: "FameThemes Screenr",
	website: "https://www.famethemes.com/themes/screenr",
	description: "FameThemes Screenr is a fullscreen parallax WordPress theme suited for business, portfolio, digital agency, freelancers.",
	icon: "FameThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "famethemes-screenr:jsGlobal:0",
			kind: "jsGlobal",
			property: "Screenr.autoplay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "famethemes-screenr:jsGlobal:1",
			kind: "jsGlobal",
			property: "Screenr_Plus",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

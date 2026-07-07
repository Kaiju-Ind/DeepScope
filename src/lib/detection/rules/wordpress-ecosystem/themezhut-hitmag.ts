import type { TechnologyDefinition } from '../../types';

export const themezhutHitmagTechnologyDefinition = {
	id: "themezhut-hitmag",
	name: "ThemezHut HitMag",
	website: "https://themezhut.com/themes/hitmag",
	description: "ThemezHut HitMag is a stylish and powerful WordPress theme crafted for magazines, newspapers or personal blogs.",
	icon: "ThemezHut.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themezhut-hitmag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/hitmag(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
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

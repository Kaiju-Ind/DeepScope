import type { TechnologyDefinition } from '../../types';

export const themeFreesiaPhotographTechnologyDefinition = {
	id: "theme-freesia-photograph",
	name: "Theme Freesia Photograph",
	website: "https://themefreesia.com/themes/Photograph",
	description: "Photograph is a WordPress theme exclusively built for photographer, blogger, portfolio, photography agency or photo studio websites.",
	icon: "Theme Freesia.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme-freesia-photograph:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/photograph(?:-plus)?\\/"),
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

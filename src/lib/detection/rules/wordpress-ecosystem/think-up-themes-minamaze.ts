import type { TechnologyDefinition } from '../../types';

export const thinkUpThemesMinamazeTechnologyDefinition = {
	id: "think-up-themes-minamaze",
	name: "Think Up Themes Minamaze",
	website: "https://www.thinkupthemes.com/themes/minamaze",
	description: "Think Up Themes Minamaze is a multipurpose WordPress theme that is available for free download and also offers a pro version.",
	icon: "Think Up Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "think-up-themes-minamaze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/minamaze(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "think-up-themes-minamaze:dom:1",
			kind: "dom",
			selector: "link#minamaze-style-css",
			description: "DOM selector matches a known technology marker.",
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

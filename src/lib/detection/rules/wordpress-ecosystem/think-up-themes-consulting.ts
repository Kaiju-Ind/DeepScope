import type { TechnologyDefinition } from '../../types';

export const thinkUpThemesConsultingTechnologyDefinition = {
	id: "think-up-themes-consulting",
	name: "Think Up Themes Consulting",
	website: "https://www.thinkupthemes.com/themes/consulting",
	description: "Think Up Themes Consulting is a multipurpose WordPress theme that is available for free download and also offers a pro version.",
	icon: "Think Up Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "think-up-themes-consulting:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/consulting(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "think-up-themes-consulting:dom:1",
			kind: "dom",
			selector: "link#consulting-style-css",
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

import type { TechnologyDefinition } from '../../types';

export const scissorThemesWriteeTechnologyDefinition = {
	id: "scissor-themes-writee",
	name: "Scissor Themes Writee",
	website: "https://www.scissorthemes.com/themes/writee-free",
	description: "Writee is an elegant free personal WordPress blog theme and well suited for personal, food, travel, fashion, corporate, or any other amazing blog.",
	icon: "Scissor Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "scissor-themes-writee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/writee(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "scissor-themes-writee:dom:1",
			kind: "dom",
			selector: "link#WRT-style-css",
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

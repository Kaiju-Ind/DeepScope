import type { TechnologyDefinition } from '../../types';

export const afthemesCovernewsTechnologyDefinition = {
	id: "afthemes-covernews",
	name: "AFThemes CoverNews",
	website: "https://afthemes.com/products/covernews",
	description: "AFThemes CoverNews is a clean and elegant free WordPress theme that is perfect for online blog and magazine.",
	icon: "AFThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "afthemes-covernews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/covernews(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
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

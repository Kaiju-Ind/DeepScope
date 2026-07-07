import type { TechnologyDefinition } from '../../types';

export const themezhutBamTechnologyDefinition = {
	id: "themezhut-bam",
	name: "ThemezHut Bam",
	website: "https://themezhut.com/themes/bam",
	description: "ThemezHut Bam is a great flexible WordPress theme for blogging sites.",
	icon: "ThemezHut.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themezhut-bam:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/bam(?:-pro)?\\/"),
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

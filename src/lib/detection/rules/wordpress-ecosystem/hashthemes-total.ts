import type { TechnologyDefinition } from '../../types';

export const hashthemesTotalTechnologyDefinition = {
	id: "hashthemes-total",
	name: "HashThemes Total",
	website: "https://hashthemes.com/wordpress-theme/total",
	description: "HashThemes Total is the powerful and creative multipurpose WordPress theme.",
	icon: "HashThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hashthemes-total:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/(?:t|T)otal(?:-plus)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hashthemes-total:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/(?:t|t)otal(?:-plus)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

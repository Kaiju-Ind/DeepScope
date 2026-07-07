import type { TechnologyDefinition } from '../../types';

export const enigmaTechnologyDefinition = {
	id: "enigma",
	name: "Enigma",
	website: "https://wordpress.org/themes/enigma",
	description: "Enigma is the popular superfine multipurpose responsive WordPress theme from Infigo Software.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "enigma:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/enigma\\/"),
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

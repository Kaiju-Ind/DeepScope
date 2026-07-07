import type { TechnologyDefinition } from '../../types';

export const apollo13themesRifeTechnologyDefinition = {
	id: "apollo13themes-rife",
	name: "Apollo13Themes Rife",
	website: "https://apollo13themes.com/rife",
	description: "Apollo13Themes Rife is a great portfolio and photography WordPress theme with 7 ready-to-use demo layouts.",
	icon: "Apollo13Themes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "apollo13themes-rife:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/rife(?:-free)?\\/(?:.+script\\.min\\.js(?:\\?ver=([\\d\\.]+)))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

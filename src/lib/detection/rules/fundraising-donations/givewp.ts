import type { TechnologyDefinition } from '../../types';

export const givewpTechnologyDefinition = {
	id: "givewp",
	name: "GiveWP",
	website: "https://givewp.com",
	description: "GiveWP is a donation plugin for WordPress.",
	icon: "GiveWP.svg",
	categories: [
		"fundraising-donations",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "givewp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/give\\/.+give\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "givewp:jsGlobal:1",
			kind: "jsGlobal",
			property: "Give.donor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "givewp:jsGlobal:2",
			kind: "jsGlobal",
			property: "giveApiSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:givewp:givewp:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

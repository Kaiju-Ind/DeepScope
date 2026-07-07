import type { TechnologyDefinition } from '../../types';

export const akismetTechnologyDefinition = {
	id: "akismet",
	name: "Akismet",
	website: "https://akismet.com",
	description: "Akismet is a service that filters spam from comments, trackbacks, and contact form messages.",
	icon: "Akismet.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "akismet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/akismet\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "akismet:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/akismet/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "akismet:jsGlobal:2",
			kind: "jsGlobal",
			property: "ak_js.checkValidity",
			description: "Page-owned global matches a known technology marker.",
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

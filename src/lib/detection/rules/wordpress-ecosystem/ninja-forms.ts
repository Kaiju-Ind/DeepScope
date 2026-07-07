import type { TechnologyDefinition } from '../../types';

export const ninjaFormsTechnologyDefinition = {
	id: "ninja-forms",
	name: "Ninja Forms",
	website: "https://ninjaforms.com",
	description: "Ninja Forms is the WordPress form builder.",
	icon: "Ninja Forms.svg",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "ninja-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/ninja-forms\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ninja-forms:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/ninja-forms/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ninja-forms:jsGlobal:2",
			kind: "jsGlobal",
			property: "nfForms",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:ninjaforms:ninja_forms:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

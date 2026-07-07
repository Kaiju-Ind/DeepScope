import type { TechnologyDefinition } from '../../types';

export const calderaFormsTechnologyDefinition = {
	id: "caldera-forms",
	name: "Caldera Forms",
	website: "https://calderaforms.com",
	description: "Caldera Forms is the free WordPress form builder plugin.",
	icon: "Caldera Forms.png",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "caldera-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/caldera-forms\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "caldera-forms:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/caldera-forms/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "caldera-forms:jsGlobal:2",
			kind: "jsGlobal",
			property: "calderaForms",
			description: "Page-owned global matches a known technology marker.",
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

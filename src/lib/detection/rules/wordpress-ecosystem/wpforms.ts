import type { TechnologyDefinition } from '../../types';

export const wpformsTechnologyDefinition = {
	id: "wpforms",
	name: "WPForms",
	website: "https://wpforms.com",
	description: "WPForms is a drag and drop WordPress form builder.",
	icon: "WPForms.svg",
	categories: [
		"wordpress-ecosystem",
		"surveys-feedback",
	],
	rules: [
		{
			id: "wpforms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wpforms(?:-lite)?\\/.+(?:frontend\\.min|wpforms)\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wpforms:jsGlobal:1",
			kind: "jsGlobal",
			property: "wpforms",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wpforms:jsGlobal:2",
			kind: "jsGlobal",
			property: "wpforms_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:wpforms:wpforms:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

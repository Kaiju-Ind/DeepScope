import type { TechnologyDefinition } from '../../types';

export const themes4wpBulkTechnologyDefinition = {
	id: "themes4wp-bulk",
	name: "Themes4Wp Bulk",
	website: "https://themes4wp.com/theme/bulk",
	description: "Themes4Wp Bulk is a modern and responsive multipurpose WordPress theme.",
	icon: "Themes4Wp.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themes4wp-bulk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/bulk(?:-pro)?\\/.+customscript\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
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
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

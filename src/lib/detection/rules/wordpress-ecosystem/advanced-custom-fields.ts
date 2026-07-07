import type { TechnologyDefinition } from '../../types';

export const advancedCustomFieldsTechnologyDefinition = {
	id: "advanced-custom-fields",
	name: "Advanced Custom Fields",
	website: "https://www.advancedcustomfields.com",
	description: "Advanced Custom Fields is a WordPress plugin which allows you to add extra content fields to your WordPress edit screens.",
	icon: "Advanced Custom Fields.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "advanced-custom-fields:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/advanced-custom-fields(?:-pro)?\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "advanced-custom-fields:jsGlobal:1",
			kind: "jsGlobal",
			property: "acf",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "advanced-custom-fields:jsGlobal:2",
			kind: "jsGlobal",
			property: "acfL10n",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:advancedcustomfields:advanced_custom_fields:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

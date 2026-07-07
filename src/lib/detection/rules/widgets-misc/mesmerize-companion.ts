import type { TechnologyDefinition } from '../../types';

export const mesmerizeCompanionTechnologyDefinition = {
	id: "mesmerize-companion",
	name: "Mesmerize Companion",
	website: "https://wordpress.org/plugins/mesmerize-companion",
	description: "The Mesmerize Companion is a WordPress plugin that enhances the Mesmerize theme by adding drag-and-drop page builder functionality.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mesmerize-companion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mesmerize-companion\\/theme-data\\/mesmerize\\/assets\\/js\\/companion(?:\\.bundle)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mesmerize-companion:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/mesmerize-companion/'], link#companion-bundle-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const thriveArchitectTechnologyDefinition = {
	id: "thrive-architect",
	name: "Thrive Architect",
	website: "https://thrivethemes.com/architect/",
	description: "Thrive Architect is the visual page builder for WordPress.",
	icon: "Thrive.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "thrive-architect:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/thrive-visual-editor\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrive-architect:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/thrive-visual-editor/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const thriveUltimatumTechnologyDefinition = {
	id: "thrive-ultimatum",
	name: "Thrive Ultimatum",
	website: "https://thrivethemes.com/ultimatum/",
	description: "Thrive Ultimatum is a WordPress scarcity marketing plugin with built-in templates and campaign tracking tools from developer Thrive Themes.",
	icon: "Thrive.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thrive-ultimatum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/thrive-ultimatum\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrive-ultimatum:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/thrive-ultimatum/']",
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

import type { TechnologyDefinition } from '../../types';

export const weglotTechnologyDefinition = {
	id: "weglot",
	name: "Weglot",
	website: "https://www.weglot.com",
	description: "Weglot is a website translation solution facilitating automatic and manual multilingual content management for website owners and developers.",
	icon: "Weglot.png",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "weglot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.weglot\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "weglot:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/weglot"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const cwiclyTechnologyDefinition = {
	id: "cwicly",
	name: "Cwicly",
	website: "https://cwicly.com",
	description: "Cwicly is an advanced professional design and block toolkit that integrates directly with the WordPress editor.",
	icon: "Cwicly.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cwicly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/cwicly\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cwicly:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/uploads/cwicly/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"gutenberg",
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

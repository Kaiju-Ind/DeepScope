import type { TechnologyDefinition } from '../../types';

export const supsysticTechnologyDefinition = {
	id: "supsystic",
	name: "Supsystic",
	website: "https://supsystic.com",
	description: "Supsystic is a WordPress plugin that enables opt-in popups for collecting user information or promoting content.",
	icon: "Supsystic.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "supsystic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/plugins\\/data-tables-generator-by-supsystic\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "supsystic:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\/plugins\\/data-tables-generator-by-supsystic\\/"),
			description: "Script content contains a bounded technology signature.",
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
